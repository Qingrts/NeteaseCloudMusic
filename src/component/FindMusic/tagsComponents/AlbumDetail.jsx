import React from 'react';

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";
import albumDetailStyles from "../../../css/findmusic/albumDetailStyles.scss";
import moment from "moment";
import format from "../../../utils/format";

let defaultDetail = {
  creator: {
    nickname: "",
    avatarUrl: "",
    avatarDetail: {
      identityIconUrl: ""
    }
  },
  coverImgUrl: "",
  tags: [],
  description: "",
  tracks: [],
  subscribers: [],
  artists: []
};

export default class Playlist extends React.Component{
  constructor(props)　{
    super(props);
    
    if(this.props.location.state && this.props.location.state.id != sessionStorage.getItem("playlist_id")){
      window.sessionStorage.setItem("playlist_id", this.props.location.state && this.props.location.state.id)
    }
    
    this.state = {
      detail: JSON.parse(JSON.stringify(defaultDetail)),
      descriptionToggle: false,
      comments: [],
      commentTotal: 0,
      commentCurrentPage: 1,
      playlist_id: sessionStorage.getItem("playlist_id"),
      relatedPlaylist: []
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.playlist_id){
      this.getPlaylistDetail(this.state.playlist_id);
    }
  }
  // 获取歌单详情
  getPlaylistDetail = (id) => {
    fetch("http://localhost:3000/album?id=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        detail: data.album
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  

  render() {
    return <div className={playlistStyles.container}>
        <div className={playlistStyles.container_left}>
          <div className={albumDetailStyles.playlistInfo}>
            <div className={albumDetailStyles.playlistCoverimg}>
              <img src={this.state.detail.picUrl} alt=""/>
              <span className={albumDetailStyles.cloak}></span>
            </div>
            <div className={albumDetailStyles.albumInfo}>
              <h2><i className={albumDetailStyles.icon}></i>{this.state.detail.name}</h2>
              <p className={albumDetailStyles.artists}>
              歌手&nbsp;:&nbsp;
              {
                this.state.detail.artists.map((item, index) => {
                  return this.state.detail.artists.length == index + 1 ? <a herf="" key={index}>{item.name}</a> : <span key={index}><a herf="">{item.name}</a>&nbsp;/&nbsp;</span>;
                })
              }
              </p>
              <p className={albumDetailStyles.publishTime}>发行时间: {moment(this.state.detail.publishTime).format("YYYY-MM-DD")}</p>
              <p className={albumDetailStyles.company}>发行公司 : {this.state.detail.company}</p>
            </div>
          </div>
        </div>
        <div className={playlistStyles.container_right}>
          <h4 className={playlistStyles.subtitle}>喜欢这个专辑的人</h4>
          <div className={playlistStyles.likePlaylist} style={{marginBottom: 30}}>
            
          </div>
        </div>
      </div>
  }
}