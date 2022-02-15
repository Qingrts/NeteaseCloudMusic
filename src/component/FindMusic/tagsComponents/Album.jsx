import React from 'react';

import AlbumItem from "../../commonComponent/AlbumItem.jsx";

import albumStyles from "../../../css/findmusic/albumStyles.scss";

import { Pagination,Spin } from "antd";

export default class Album extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      hotAlbums: [],
      categoryList: [],
      currentPage: 1,
      playlistTotal: 0
    };
  }

  componentDidMount() {
    this.getHotAlbum();
    this.getAllNewAlbum(0);
  }

  // 获取热门新碟
  getHotAlbum = () => {
    fetch(window.baseUrl + "/album/newest")
    .then(res => res.json())
    .then(data => {
      this.setState({
        hotAlbums: data.albums.slice(0, 10)
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  getAllNewAlbum = (offset) => {
    fetch(window.baseUrl + "/album/new?area=ALL&limit=35&offset=" + offset)
    .then(res => res.json())
    .then(data => {
      this.setState({
        categoryList: data.albums,
        playlistTotal: data.total
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  pageChange = (page) => {
    this.setState({
      categoryList: [],
      currentPage: page
    })
    this.getAllNewAlbum((page-1) * 35);
  }

  render() {
    return <div className={albumStyles.albumContainer}>
      <h2>热门新碟</h2>
      {this.state.hotAlbums.length == 0 ? <Spin tip="加载中..."/> : 
      <div className={albumStyles.hotAlbumList}>
        {this.state.hotAlbums.map((item, index) => {
          return <AlbumItem key={index} {...item}/>
        })}
      </div>
      }
      <h2 style={{marginTop: 30}}>全部新碟</h2>
      {this.state.categoryList.length == 0 ? <Spin tip="加载中..."/> : 
      <div className={albumStyles.hotAlbumList}>
        {this.state.categoryList.map((item, index) => {
          return <AlbumItem key={index} {...item}/>
        })}
      </div>
      }
      <Pagination 
        style={{textAlign: "center", margin: "50px auto 0"}} 
        current={this.state.currentPage}
        onChange={this.pageChange}
        showSizeChanger={false} 
        total={parseInt((this.state.playlistTotal + 1) * 10 / 35)} />
    </div>
  }
}