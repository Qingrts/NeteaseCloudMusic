import React from 'react';

import playlistStyles from "../../../css/findmusic/playlist.scss";

import { Link } from "react-router-dom";
import moment from "moment";
import { Pagination } from "antd";

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
  subscribers: []
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
      this.getCommentList(this.state.playlist_id, 0)
      this.getRelated(this.state.playlist_id);
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
  // 获取评论列表
  getCommentList = (id, offset) => {
    fetch("http://localhost:3000/comment/album?limit=20&id=" + id + "&offset=" + offset)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        comments: data.comments,
        commentTotal: data.total
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // 获取相关推荐
  getRelated = (id) => {
    fetch("http://localhost:3000/related/playlist?id=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        relatedPlaylist: data.playlists
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // 时长格式化
  durationFormat = (duration) => {
    if(isNaN(duration)){
      return false;
    }
    let minute = (Math.floor(duration / 60000) % 60).toString().padStart(2, "0");
    let second = (Math.floor(duration / 1000) % 60).toString().padStart(2, "0");
    let millisecond=Math.floor(duration) % 1000;
    return `${minute}:${second}`;
  }

  // 评论时间格式化
  commentDateFormat = (time) => {
    let date = new Date(time);
    let nowdate = new Date();
    let y = date.getFullYear().toString().padStart(2, "0");
    let m = (date.getMonth() + 1).toString().padStart(2, "0");
    let d = date.getDate().toString().padStart(2, "0");
    let hh = date.getHours().toString().padStart(2, "0");
    let mm = date.getMinutes().toString().padStart(2, "0");
    if(parseInt(y) != nowdate.getFullYear()){
      return `${y}年${m}月${d}日 ${hh}:${mm}`;
    }else if(parseInt(m) != nowdate.getMonth() + 1 || parseInt(d) < nowdate.getDate() - 1){
      return `${m}月${d}日 ${hh}:${mm}`;
    }else if(parseInt(d) == nowdate.getDate() - 1){
      return `昨天${hh}:${mm}`;
    }else if(parseInt((nowdate - date) /60000) < 60){
      return `${parseInt((nowdate - date) /60000)}分钟前`;
    }else{
      return `${hh}:${mm}`;
    }
  }
  
  // 评论分页
  onChange = page => {
    this.getCommentList(this.state.playlist_id, (page - 1) * 20);
    // this.getCommentList(this.props.location.state.id, (page - 1) * 20);
    this.setState({
      commentCurrentPage: page,
    });
  };
  

  render() {
    return <div className={playlistStyles.container}>
        <div className={playlistStyles.container_left}>
          <div className={playlistStyles.playlistInfo}>
            <div className={playlistStyles.playlistCoverimg}>
              <img src={this.state.detail.picUrl} alt=""/>
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