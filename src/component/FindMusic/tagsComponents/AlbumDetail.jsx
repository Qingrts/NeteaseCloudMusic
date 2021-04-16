
import React from 'react';
import { Link } from "react-router-dom";

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";
import albumDetailStyles from "../../../css/findmusic/albumDetailStyles.scss";
import moment from "moment";
import format from "../../../utils/format";

import CommentsList from "../../commonComponent/CommentsList.jsx";
import ClientDown from "../../commonComponent/ClientDown.jsx";
import Description from "../../commonComponent/Description.jsx";


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
      relatedPlaylist: [],
      detailInfo: {},
      songs: []
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.playlist_id){
      this.getPlaylistDetail(this.state.playlist_id);
      this.getDynamic(this.state.playlist_id);
    }
  }
  // 获取专辑详情
  getPlaylistDetail = (id) => {
    fetch(window.baseUrl + "/album?id=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        detail: data.album,
        songs: data.songs
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  getDynamic = (id) => {
    fetch(window.baseUrl + "/album/detail/dynamic?id=" + id)
    .then(response => response.json())
    .then(data => {
      this.setState({
        detailInfo: data
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
              <div className={albumDetailStyles.iconGroup}>
                <a href="" className={albumDetailStyles.play}>
                  <i>
                    <em></em>播放
                  </i>
                </a>
                <a href="" className={albumDetailStyles.addPlaylist}></a>
                <a href="" className={albumDetailStyles.collect}><i>收藏</i></a>
                <a href="" className={albumDetailStyles.transmit}><i>({format.numberFormat(this.state.detailInfo.shareCount)})</i></a>
                <a href="" className={albumDetailStyles.download}><i>下载</i></a>
                <a href="" className={albumDetailStyles.comment}><i>({this.state.detailInfo.commentCount})</i></a>
              </div>
            </div>
          </div>
          <h2 style={{fontSize: 12, fontWeight: 'bold', marginTop: 20}}>专辑介绍:</h2>
          {this.state.detail.description.length == 0 ? null : <Description type={"album"} desc={this.state.detail.description}/>}
          
          <div className={playlistStyles.playList} style={{marginBottom: 30}}>
            <div className={playlistStyles.title}>
              <h3>包含歌曲列表</h3>
              <span>{this.state.songs.length}首歌</span>
              <div className={playlistStyles.moreWayPlay} style={{marginRight: 20}}>
                <a href=""><i></i>生成外链播放器</a>
              </div>
            </div>
            <div className={playlistStyles.songlist + " " + albumDetailStyles.songlist}>
              <table>
                <thead>
                  <tr>
                    <td></td>
                    <td>歌曲标题</td>
                    <td>时长</td>
                    <td>歌手</td>
                  </tr>
                </thead>
                <tbody>
                {this.state.songs.map((item, index) => {
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
                  </tr>
                })}
                </tbody>
              </table>
            </div>
          </div>
          <CommentsList fetchUrl={window.baseUrl + "/comment/album?id="} id={this.state.playlist_id}/>
        </div>
        <div className={playlistStyles.container_right}>
          <h4 className={playlistStyles.subtitle}>喜欢这个专辑的人</h4>
          <div className={playlistStyles.likePlaylist} style={{marginBottom: 30}}>
            接口未找到!!!!
          </div>
          <ClientDown/>
        </div>
      </div>
  }
}