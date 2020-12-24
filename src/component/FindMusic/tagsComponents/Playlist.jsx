import React from 'react';

import playlistStyles from "../../../css/findmusic/playlist.scss";

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

    this.state = {
      detail: JSON.parse(JSON.stringify(defaultDetail)),
      descriptionToggle: false,
      comments: [],
      total: 0,
      current: 1
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.props.location.state && this.props.location.state.id){
      /*
      this.getPlaylistDetail(this.props.location.state.id);
      this.getCommentList(this.props.location.state.id, 20)
      */
    }

    this.getPlaylistDetail(5379180778);
    this.getCommentList(5379180778, 20)
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
  getCommentList = (id, limit) => {
    fetch("http://localhost:3000/comment/playlist?id=" + id + "&limit=" + limit)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        comments: data.comments,
        total: data.total
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
  
  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };
  

  render() {
    // 如果有id的话,展示id对应的歌单详情,否则展示所有的歌单列表
    if(this.props.location.state && this.props.location.state.id){
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
                  <td><a href="#">{item.al.name}</a></td>
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
          <div className={playlistStyles.commentList}>
            <h4 className={playlistStyles.subtitle}>最新评论({this.state.detail.commentCount})</h4>
            {/* 渲染评论列表 */}
            <ul>
              {this.state.comments.map((item, index) => {
                return <li key={index}>
                  <div className={playlistStyles.commentItem} >
                    <img src={item.user.avatarUrl} style={{width: 50, height: 50}} alt=""/>
                    <div style={{flex: "1",paddingLeft: "10px"}}>
                      <div className={playlistStyles.commentNickname}>
                        <a href="#" className={playlistStyles.nickname}>{item.user.nickname}</a>&nbsp;
                        {item.user.vipRights ? <img style={{width: 35, height: 12, position: "relative", top: -2}} src="//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922817/9124/a83c/7eb7/6d7d81b608bfb56d7fb286bd8eb72346.png"/> : ""}
                        ：{item.content}
                      </div>
                      {item.beReplied.length > 0 && item.beReplied.map((replied, index) => {
                          return <div className={playlistStyles.replied} key={index}>
                            <a href="#" className={playlistStyles.nickname}>{replied.user.nickname}</a>&nbsp;&nbsp; :
                            {replied.content}
                          </div>
                      })}
                      <div className={playlistStyles.commentContent}>
                        <span className={playlistStyles.commentDate}>{this.commentDateFormat(item.time)}</span>
                        <div className={playlistStyles.commentLikeAndReply}>
                          <a href="" className={playlistStyles.likeCount}><i></i>&nbsp;
                            {item.likedCount && item.likedCount >= 0 ? "(" + item.likedCount + ")" : ""}
                          </a>
                          <a href="" className={playlistStyles.commentReply}>回复</a>
                        </div>
                      </div>
                    </div>
                  </div>
                </li>
              })}
            </ul>
            {this.state.total > 20 ? <Pagination style={{textAlign: "center"}} current={this.state.current} onChange={this.onChange} showSizeChanger={false} total={this.state.total * 10 / 20} /> : null}
          </div>
        </div>
      </div>
      <div className={playlistStyles.container_right}>
        <h4 className={playlistStyles.subtitle}>喜欢这个歌单的人</h4>
        {/* 渲染收藏歌单的人列表 */}
        <div className={playlistStyles.likePlaylist}>
          {this.state.detail.subscribers.map((item, index) => {
            return <img src={item.avatarUrl} alt="" key={index}/>
          })}
        </div>
      </div>
    </div>

    
    {/*
    return <div className={playlistStyles.container}>
      <div className="container_left">歌单详情</div>
      <div className="container_right"></div>
    </div>
    */}
  }
}