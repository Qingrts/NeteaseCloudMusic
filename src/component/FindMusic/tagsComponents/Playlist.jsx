import React from 'react';
import { Link } from "react-router-dom";

import { Pagination, Spin } from "antd";

import playlistStyles from "../../../css/findmusic/playlist.scss";
import PlayListItem from "../../commonComponent/PlayListItem.jsx";

export default class PlaylistCategory extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      hotPlaylist: [],
      playlistTotal: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.getHotPlaylist({
      order: "hot",
      limit: 35
    });
  }

  getHotPlaylist = (obj) => {
    let arr = [];
    for (const key in obj) {
      arr.push(key + "=" + obj[key])
    }
    arr = arr.join("&")
    fetch("http://localhost:3000/top/playlist?" + arr)
    .then(response => response.json())
    .then(data => {
      this.setState({
        hotPlaylist: data.playlists,
        playlistTotal: data.total
      })
      console.log(playlistTotal);
    })
    .catch(err => {
      console.log(err);
    })
  }

  pageChange = (page) => {
    this.state.hotPlaylist = [];
    this.getHotPlaylist({
      order: "hot",
      limit: 35,
      offset: (page - 1) * 35
    });
    this.setState({
      currentPage: page
    });
  }

  render() {
    return <div className={playlistStyles.detail}>
      <h3 className={playlistStyles.detailTitle}>全部<a href="#" className={playlistStyles.getRecommend}>热门</a></h3>
      {
      this.state.hotPlaylist.length == 0 ? <Spin tip="加载中..."/> : 
      <div className={playlistStyles.allPlaylist}>
        <div className={playlistStyles.allList}>
          {this.state.hotPlaylist.map((item) => {
            return <div key={item.id}>
              <Link to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}><PlayListItem {...item} /></Link>
              <p className={playlistStyles.userInfo}>by &nbsp;
                <a href="#">{item.creator.nickname}</a>&nbsp;
                {
                  item.creator.avatarDetail
                  ?
                  <img src={item.creator.avatarDetail.identityIconUrl} alt=""/>
                  : 
                  null
                }
              </p>
            </div>
            })}
        </div>
        <Pagination 
        style={{textAlign: "center", marginTop: "60px"}} 
        current={this.state.currentPage}
        onChange={this.pageChange}
        showSizeChanger={false} 
        total={(this.state.playlistTotal + 1) * 10 / 35} />
      </div>
      }
    </div>
  }
}