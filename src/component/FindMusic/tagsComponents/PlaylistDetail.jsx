import React from 'react';
import { Link } from "react-router-dom";

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";

import moment from "moment";
import ClientDown from "../../commonComponent/ClientDown.jsx";
import CommentsList from "../../commonComponent/CommentsList.jsx";
import format from "../../../utils/format.js";

import Description from "../../../component/commonComponent/Description.jsx";



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
    fetch("http://localhost:3000/playlist/detail?id=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        detail: data.playlist
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  // 获取评论列表
  getCommentList = (id, offset) => {
    fetch("http://localhost:3000/comment/playlist?limit=20&id=" + id + "&offset=" + offset)
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

  


  render() {
    return <div className={playlistStyles.container}>
        <div className={playlistStyles.container_left}>
          <div className={playlistStyles.playlistInfo}>
            <div className={playlistStyles.playlistCoverimg}>
              <img src={this.state.detail.coverImgUrl} alt=""/>
            </div>
            <div className={playlistStyles.playlistInfo_content}>
              <div className={playlistStyles.playlistTitle}><i><span></span></i>{this.state.detail['name']}</div>
              <div>
                <img src={this.state.detail.creator.avatarUrl} style={{width: 35, height: 35}} alt=""/>
                <a href="" style={{marginLeft: 15}} className={playlistStyles.nickname} >{this.state.detail.creator.nickname}</a>
                <img style={{width: 13, height: 13, display: "inline-block"}} src={this.state.detail.creator.avatarDetail && this.state.detail.creator.avatarDetail.identityIconUrl} alt=""/>
                <span style={{fontSize: 12,marginLeft: "15px", color: "#999"}}>{moment(this.state.detail.createTime).format("YYYY-MM-DD")} 创建</span>
              </div>
              <div className={playlistStyles.iconGroup}>
                <a href="" className={playlistStyles.play}>
                  <i>
                    <em></em>播放
                  </i>
                </a>
                <a href="" className={playlistStyles.addPlaylist}></a>
                <a href="" className={playlistStyles.collect}><i>({format.numberFormat(this.state.detail.subscribedCount)})</i></a>
                <a href="" className={playlistStyles.transmit}><i>({format.numberFormat(this.state.detail.shareCount)})</i></a>
                <a href="" className={playlistStyles.download}><i>下载</i></a>
                <a href="" className={playlistStyles.comment}><i>({this.state.detail.commentCount})</i></a>
              </div>
              <div className={playlistStyles.tags}>
                <span>标签:</span>
                {this.state.detail.tags.map((item, index) => {
                  return <a href="" key={index}>{item}</a>
                })}
              </div>
              {this.state.detail.description.length == 0 ? null :<Description startStr={" 介绍 :"} desc={this.state.detail.description}/>}
            </div>
          </div>
          <div className={playlistStyles.playList}>
            <div className={playlistStyles.title}>
              <h3>歌曲列表</h3>
              <span>{this.state.detail.trackCount}首歌</span>
              <div className={playlistStyles.moreWayPlay}>
                <a href=""><i></i>生成外链播放器</a>
                <span>播放 : <strong>{this.state.detail.playCount}</strong>次</span>
              </div>
            </div>
            <div className={playlistStyles.songlist}>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>歌曲标题</td>
                    <td>时长</td>
                    <td>歌手</td>
                    <td>专辑</td>
                  </tr>
                </thead>
                <tbody>
                {this.state.detail.tracks.map((item, index) => {
                  return <tr key={index} className="songLine">
                    <td>
                      {index+1}
                      <i></i>
                    </td>
                    <td>
                      <Link to={{pathname: "/discover/songdetail",state: {id: item.id}}}>{item.name}</Link>&nbsp;
                      {item.alia.length != 0 && <span className={playlistStyles.alia}>{"-(" + item.alia[0] + ")"}</span>}
                      {item.mv != 0 && <span title="播放mv" className={playlistStyles.mv}></span>}
                    </td>
                    <td>
                      <span className="duration">{format.durationFormat(item.dt)}</span>
                      <div className={playlistStyles.songlistIcon + " " + "songlistIcon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </td>
                    <td><a href="#">{item.ar.map(item => item.name).join("/")}</a></td>
                    <td><a href="#">{item.al.name}</a></td>
                  </tr>
                })}
                </tbody>
              </table>
              {this.state.detail.tracks.length <= 10 ? <div className={playlistStyles.clientDownload}>
                <p>查看更多内容,请下载客户端</p>
                <a href="#">立即下载</a>
              </div> : null}
            </div>
          </div>
          <CommentsList id={this.state.playlist_id} fetchUrl={"http://localhost:3000/comment/playlist?litmit=20&id="}/>
          </div>
        <div className={playlistStyles.container_right}>
          <h4 className={playlistStyles.subtitle}>喜欢这个歌单的人</h4>
          {/* 渲染收藏歌单的人列表 */}
          <div className={playlistStyles.likePlaylist} style={{marginBottom: 30}}>
            {this.state.detail.subscribers.map((item, index) => {
              return <img title={item.nickname} src={item.avatarUrl} alt="" key={index}/>
            })}
          </div>
          <h4 className={playlistStyles.subtitle}>相关推荐</h4>
          <div style={{marginBottom: 40}}>
            <ul>
              {this.state.relatedPlaylist.map((item, index) => {
                return <li key={index} className={playlistStyles.relatedPlaylist}>
                    <img src={item.coverImgUrl} title={item.creator.nickname} alt="" 
                    className={playlistStyles.coverImgUrl}
                    onClick={
                      () => {
                        sessionStorage.setItem("playlist_id", item.id);
                        window.location.reload();
                      }  
                    }/>
                    <div className={playlistStyles.relatedInfo}>
                      <h3 className={playlistStyles.relatedTitle} onClick={
                        () => {
                          sessionStorage.setItem("playlist_id", item.id);
                          window.location.reload();
                        }  
                      }>
                        <span className={playlistStyles.nickname} style={{fontSize: 14, color: "#000"}}>{item.name}</span>
                      </h3>
                      <p className={playlistStyles.userInfo}>
                        <span style={{color: "#999", marginRight: 6}}>by</span>
                        <span style={{color: "#666"}} className={playlistStyles.nickname}>{item.creator.nickname}</span>
                      </p>
                    </div>
                </li>
              })}
            </ul>
          </div>
          <ClientDown/>
        </div>
      </div>
  }
}