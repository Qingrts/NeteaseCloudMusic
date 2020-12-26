import React from 'react';
import { Link } from "react-router-dom";

import { Pagination } from "antd";

import playlistStyles from "../../../css/findmusic/playlist.scss";
import format from "../../../utils/format.js";
import recommendStyles from "../../../css/findmusic/recommend.scss";

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
      limit: 40
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
    })
    .catch(err => {
      console.log(err);
    })
  }

  pageChange = (page) => {
    this.getHotPlaylist({
      order: "hot",
      limit: 40,
      offset: (page - 1) * 20
    });
    this.setState({
      currentPage: page
    });
  }

  render() {
    return <div className={playlistStyles.detail}>
      <h3 className={playlistStyles.detailTitle}>全部<a href="#" className={playlistStyles.getRecommend}>热门</a></h3>
      <div className={playlistStyles.allPlaylist}>
        <ul className={playlistStyles.allList}>
          {this.state.hotPlaylist.map((item) => {
            return <li key={item.id}>
                <div style={{position: "relative"}}>
                  <img src={item.coverImgUrl} alt="" style={{width: 140,height: 140}}/>
                  <Link to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}>
                    <span className={recommendStyles.cloak} style={{top: 0}}></span>
                  </Link>
                  <div className={recommendStyles.bottom}>
                    <span className={recommendStyles.listenIcon}></span>
                    {
                    item.type == 1 
                    ? 
                    <span>{format.numberFormat(item.program.adjustedPlayCount)}</span> 
                    : 
                    <span>{format.numberFormat(item.playCount)}</span>
                    }
                    <span className={recommendStyles.playIcon}></span>
                  </div>
                </div>
                <p className={playlistStyles.songTitle}><a href="#">{item.name}</a></p>
                <p className={playlistStyles.nickname}>by&nbsp;
                  <span style={{color: "#666"}}><a href="">{item.creator.nickname}</a></span>&nbsp;
                  {item.creator.avatarDetail && <img style={{wdith: 13, height: 13, position: "relative", top: -2}} src={item.creator.avatarDetail.identityIconUrl} alt=""/>}
                </p>
            </li>
          })}
        </ul>
        <Pagination 
        style={{textAlign: "center", marginTop: "30px"}} 
        current={this.state.currentPage}
        onChange={this.pageChange}
        showSizeChanger={false} 
        total={this.state.playlistTotal * 20 / 10} />
      </div>
    </div>
  }
}