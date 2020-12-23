import React from 'react';

import playlistStyles from "../../../css/findmusic/playlist.scss";

import moment from "moment";

let defaultDetail = {
  creator: {
    nickname: "",
    avatarUrl: "",
    avatarDetail: {
      identityIconUrl: ""
    }
  },
  tags: [],
  description: "",
  tracks: []
};

export default class Playlist extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      detail: JSON.parse(window.localStorage.getItem("playlistDetail")) || defaultDetail,
      descriptionToggle: false
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.props.location.query && this.props.location.query.id){
      this.getPlaylistDetail(this.props.location.query.id);
    }
  }
  // 发送请求,获取歌单详情
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

  render() {
    // 如果有id的话,展示id对应的歌单详情,否则展示所有的歌单列表
    if(this.props.location.query && this.props.location.query.id){
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
                <a href="" className={playlistStyles.nickname} >{this.state.detail.creator.nickname}</a>
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
                <a href="" className={playlistStyles.collect}><i>({this.state.detail.subscribedCount})</i></a>
                <a href="" className={playlistStyles.transmit}><i>({this.state.detail.shareCount})</i></a>
                <a href="" className={playlistStyles.download}><i>下载</i></a>
                <a href="" className={playlistStyles.comment}><i>({this.state.detail.commentCount})</i></a>
              </div>
              <div className={playlistStyles.tags}>
                <span>标签:</span>
                {this.state.detail.tags.map((item, index) => {
                  return <a href="" key={index}>{item}</a>
                })}
              </div>
              {
              (this.state.descriptionToggle == false && this.state.detail.description.length >= 150)
              ? 
              <div className={playlistStyles.description} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.detail.description.replace(/\n/g, "<br />").substr(0, 150) + "..."}}>
              </div>
              :
              <div className={playlistStyles.description} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.detail.description.replace(/\n/g, "<br />")}}></div>
              }
              {
              this.state.detail.description.length > 150 
              ? 
              <a href="#" onClick={(e) => {
                e.preventDefault();
                this.setState({
                  descriptionToggle: !this.state.descriptionToggle
                })
              }} className={playlistStyles.toggle}>{this.state.descriptionToggle == false ? "展开" : "收起"} <i></i></a> 
              : 
              null}
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
                    <td><a href="#">{item.name}</a></td>
                    <td>
                      <span className="duration">{this.durationFormat(item.dt)}</span>
                      <div className={playlistStyles.songlistIcon + " " + "songlistIcon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </td>
                    <td><a href="#">{item.ar[0].name}</a></td>
                    <td><a href="#">{item.name}</a></td>
                  </tr>
                })}
                </tbody>
              </table>
              <div className={playlistStyles.clientDownload}>
                <p>查看更多内容,请下载客户端</p>
                <a href="#">立即下载</a>
              </div>
            </div>
          </div>
          <div className={playlistStyles.playList}>
            <div className={playlistStyles.title}>
              <h3>评论</h3>
              <span>共{this.state.detail.commentCount}条评论</span>
            </div>
            <div className={playlistStyles.postComment}>
              <img src={"http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"} alt=""/>
              <div style={{flex: "1"}}>
                <div style={{width: "100%", position: "relative"}}>
                  <textarea placeholder="评论"></textarea>
                  <span className={playlistStyles.trigon}></span>
                </div>
                <div className={playlistStyles.commentButton}>
                  <i></i>
                  <i></i>
                  <div>
                    <span>140</span>
                    <a href="">评论</a>
                  </div>
                </div>
              </div>
            </div>
            <div className={playlistStyles.commentList}></div>
          </div>
        </div>
        <div className={playlistStyles.container_right}></div>
      </div>
    }


    return <div className={playlistStyles.container}>
      <div className="container_left">歌单详情</div>
      <div className="container_right"></div>
    </div>
  }
}