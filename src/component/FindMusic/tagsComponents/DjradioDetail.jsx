import React from 'react';

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";
import DjradioDetailStyles from "../../../css/findmusic/djradioDetailStyles.scss";

import CommentsList from "../../commonComponent/CommentsList.jsx";
import ClientDown from "../../commonComponent/ClientDown.jsx";
import format from "../../../utils/format.js";
import moment from "moment";

import { Link } from "react-router-dom";

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
  dj:{
    brand: ""
  },
  radio: {
    subCount: "",
    category: "",
    id: ""
  }
};

export default class DjradioDetail extends React.Component{
  constructor(props)　{
    super(props);
    if(this.props.location.state && this.props.location.state.id != sessionStorage.getItem("djradio_id")){
      window.sessionStorage.setItem("djradio_id", this.props.location.state && this.props.location.state.id)
    }
    
    this.state = {
      detail: JSON.parse(JSON.stringify(defaultDetail)),
      descriptionToggle: false,
      comments: [],
      commentTotal: 0,
      commentCurrentPage: 1,
      djradio_id: sessionStorage.getItem("djradio_id"),
      relatedPlaylist: []
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.djradio_id){
      this.getPlaylistDetail(this.state.djradio_id);
    }
  }
  // 获取歌单详情
  getPlaylistDetail = (id) => {
    fetch("http://localhost:3000/dj/program/detail?id=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        detail: data.program
      })
      this.getUserRadio(data.program.radio.id);
    })
    .catch(err => {
      console.log(err);
    })
  }

  getUserRadio = (id) => {
    fetch("http://localhost:3000/dj/program?rid=" + id)
    .then(response => response.json())
    .then(data => {
      let programs = data.programs.length >= 6 ? data.programs.slice(1, 6) : data.programs;
      console.log(programs);
      this.setState({
        relatedPlaylist: programs
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  

  render() {
    return <div style={{
              width: 982, 
              margin: "0 auto", 
              border: "1px solid #d3d3d3", 
              borderTop: "0", 
              borderBottom: "0", 
              display: "flex", 
              backgroundColor: "white"}}>
        <div style={{width: "709px",
    padding: '42px 30px 40px 39px'}}>
          <div className={playlistStyles.playlistInfo} style={{marginBottom: 25}}>
            <div className={playlistStyles.playlistCoverimg} style={{width: 148, height: 148}}>
              <img src={this.state.detail.coverUrl} style={{width: 140, height:140}} alt=""/>
            </div>
            <div className={DjradioDetailStyles.coverInfoTitle}>
              <div className={DjradioDetailStyles.title}>
              <i className={DjradioDetailStyles.coverImg}></i><h2><span>{this.state.detail.name}</span></h2>
              </div>
              <div className={DjradioDetailStyles.radioName}>
                <i></i>&nbsp;&nbsp;<a href="" className={DjradioDetailStyles.nickname}>{this.state.detail.dj.brand}</a>
                <a href="" className={DjradioDetailStyles.subscription}>
                  <i>
                    <em></em>
                    订阅({format.numberFormat(this.state.detail.radio.subCount)})
                  </i>
                </a>
              </div>
            </div>
          </div>
          <div className={DjradioDetailStyles.djInfo}>
            <div className={DjradioDetailStyles.iconGroup}>
              <a href="" className={DjradioDetailStyles.playIcon}>
                <i>播放 {format.durationFormat(this.state.detail.duration, "分", "秒")}</i>
              </a>
              <a href="" className={DjradioDetailStyles.likeCount}>
                <i>
                  <em></em>({format.numberFormat(this.state.detail.likedCount)})
                </i>
              </a>
              <a href="" className={DjradioDetailStyles.comment}>
                <i>({this.state.detail.commentCount})</i>
              </a>
              <a href="" className={DjradioDetailStyles.share}>
                <i>({this.state.detail.shareCount})</i>
              </a>
              <a href="" className={DjradioDetailStyles.download}>
                <i>下载</i>
              </a>
              <a href="" className={DjradioDetailStyles.morePlay}><i></i>生成外链播放器</a>
            </div>
            <div className={DjradioDetailStyles.sub}>
              <a href="#">{this.state.detail.radio.category}</a>
              <strong>{this.state.detail.radio.name} 第{this.state.detail.serialNum}期</strong>
              <span>{moment(this.state.detail.createTime).format("YYYY-MM-DD")} 创建</span>
              <span>播放 :<strong>{this.state.detail.listenerCount}</strong>次</span>
              <div style={{margin: "20px 0 50px"}} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.detail.description.replace(/\n/g, "<br />")}}>
              </div>
              <CommentsList id={this.state.djradio_id} fetchUrl={"http://localhost:3000/comment/dj?limit=20&id="}/>
            </div>
          </div>
        </div>
        <div style={{flex: 1,borderLeft: "1px solid #d3d3d3",padding: "20px 40px 40px 30px"}}>
          {this.state.relatedPlaylist.length == 1 ? null :
          <div>
            <h4 className={playlistStyles.subtitle}>更多节目 <a href="#" style={{float: "right", color: "#666", fontWeight: "400"}}>全部&gt;</a></h4>
            <div style={{marginBottom: 40}}>
            <ul>
              {this.state.relatedPlaylist.map((item, index) => {
                return <li key={index} className={playlistStyles.relatedPlaylist}>
                    <Link onClick={
                      () => {
                        window.sessionStorage.setItem("djradio_id", item.id);
                        window.location.reload();
                      }
                    } to={{pathname: "/discover/djradiodetail", state: this.state.djradio_id}}>
                      <img src={item.coverUrl} alt="" className={playlistStyles.coverImgUrl}/>
                    </Link>
                    <div className={playlistStyles.relatedInfo}>
                      <Link onClick={
                        () => {
                          window.sessionStorage.setItem("djradio_id", item.id);
                          window.location.reload();
                        }
                      } to={{pathname: "/discover/djradiodetail", state: this.state.djradio_id}}>
                      <h3 className={playlistStyles.relatedTitle}>
                        <span className={playlistStyles.nickname} style={{fontSize: 14, color: "#000"}}>{item.name}</span>
                      </h3>
                      </Link>
                      <p className={playlistStyles.userInfo}>
                        <span style={{color: "#999", marginRight: 6}}>Vol. {item.serialNum}</span>
                      </p>
                    </div>
                </li>
              })}
            </ul>
          </div>
          </div>
          }
          <ClientDown/>
        </div>
      </div>
  }
}