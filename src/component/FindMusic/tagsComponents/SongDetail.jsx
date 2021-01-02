import React from 'react';
import { Link } from "react-router-dom";

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";
import albumDetailStyles from "../../../css/findmusic/albumDetailStyles.scss";
import songDetailStyles from "../../../css/findmusic/songDetailStyles.scss";
import moment from "moment";
import format from "../../../utils/format";

import CommentsList from "../../commonComponent/CommentsList.jsx";
import ClientDown from "../../commonComponent/ClientDown.jsx";
import Description from "../../commonComponent/Description.jsx";
import AudioList from "../../commonComponent/AudioList.jsx";


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

export default class SongDetail extends React.Component{
  constructor(props)　{
    super(props);
    
    if(this.props.location.state && this.props.location.state.id != sessionStorage.getItem("song_id")){
      window.sessionStorage.setItem("song_id", this.props.location.state.id);
    }
    
    this.state = {
      detail: JSON.parse(JSON.stringify(defaultDetail)),
      song_id: sessionStorage.getItem("song_id"),
      songdetail: {
        al: {
          picUrl: ""
        },
        ar: []
      },
      total: 0,
      lyric: "",
      includeThisSongList: [],
      simpleSonglist: [],
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.song_id){
      this.getPlaylistDetail(this.state.song_id);
      this.getCommentsTotal(this.state.song_id);
      this.getLyric(this.state.song_id);
      this.getIncludeThisSongList(this.state.song_id);
      this.getSimpleSong(this.state.song_id);
    }
  }
  // 获取歌曲详情
  getPlaylistDetail = (id) => {
    fetch("http://localhost:3000/song/detail?ids=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        songdetail: data.songs[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // 获取评论数量
  getCommentsTotal = (id) => {
    fetch("http://localhost:3000/comment/music?id=" + id + "&limit=1")
    .then(res => res.json())
    .then(total => {
      this.setState({
        total: total.total
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

    // 获取歌词
    getLyric = (id) => {
    fetch("http://localhost:3000/lyric?id=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        lyric: data.lrc.lyric
      })
    })
    .catch(err => {
      this.setState({
        lyric: "暂无歌词"
      })
    })
  }

  // 获取包含这首歌的歌单
  getIncludeThisSongList = (id) => {
    fetch("http://localhost:3000/simi/playlist?id=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        includeThisSongList: data.playlists
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  // 获取相似歌曲
  getSimpleSong = (id) => {
    fetch("http://localhost:3000/simi/song?id=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        simpleSonglist: data.songs
      })
    }) 
    .catch(err => {
      console.log(err);
    })
  }
  
  onRef = (ref) => {
    this.child = ref;
  }

  render() {
    return <div className={playlistStyles.container}>
        <div className={playlistStyles.container_left}>
          <div className={albumDetailStyles.playlistInfo}>
            <div className={albumDetailStyles.playlistCoverimg} style={{background: "none",height: 205}}>
              <img src={this.state.songdetail.al.picUrl} alt="" style={{width: 130,height: 130, margin: 38}}/>
              <span className={albumDetailStyles.cloak} style={{width: 205, height: 205,backgroundPosition: "-140px -580px"}}></span>
            </div>
            <div className={albumDetailStyles.albumInfo + " songDetaildesc"}>
              <h2 style={{fontSize: 22}}><i className={albumDetailStyles.icon} style={{backgroundPosition: "0 -463px"}}></i>{this.state.songdetail.name}</h2>
              <p className={albumDetailStyles.artists}>
             歌手&nbsp;:&nbsp;
             {
              this.state.songdetail.ar.map((item, index) => {
                return this.state.songdetail.ar.length == index + 1 
                ? <a href="" key={index}>{item.name}</a>
                : <span key={index}><a href="">{item.name}</a>&nbsp;/&nbsp;</span>;
              })
             }
              </p>
              <p className={albumDetailStyles.publishTime}>所属专辑: <a href="" style={{color: "#0c73c2"}}>{this.state.songdetail.al.name}</a></p>
              <div className={albumDetailStyles.iconGroup} style={{marginBottom: 40}}>
                <a href="" className={albumDetailStyles.play} onClick={(e) => {
                  e.preventDefault();
                  this.child.setState({
                    play: true
                  })
                  this.child.refs.audio.play();
                }}>
                  <i>
                    <em></em>播放
                  </i>
                </a>
                <a href="" className={albumDetailStyles.addPlaylist}></a>
                <a href="" className={albumDetailStyles.collect}><i>收藏</i></a>
                <a href="" className={albumDetailStyles.transmit}><i>分享</i></a>
                <a href="" className={albumDetailStyles.download}><i>下载</i></a>
                <a href="" className={albumDetailStyles.comment}><i>({this.state.total})</i></a>
              </div>
              {this.state.lyric.length == 0 ? null : <Description desc={this.state.lyric.replace(/\[[0-9]{0,}:[0-9]{0,}\.[0-9]{0,}\]/g, "")}/>}
              <p className={songDetailStyles.lyric}>
                <a href="#">报错</a>
                <a href="#">上传歌词</a>
              </p>
            </div>
          </div>
          <CommentsList fetchUrl={"http://localhost:3000/comment/music?id="} id={this.state.song_id}/>
        </div>
        <div className={playlistStyles.container_right}>
          {this.state.includeThisSongList.length == 0 ? null : 
            <div>
              <h4 className="subtitle">包含这首歌的歌单</h4>
              <div className={playlistStyles.likePlaylist} style={{marginBottom: 20}}>
                <div style={{marginBottom: 30}}>
                  <ul>
                    {this.state.includeThisSongList.map((item, index) => {
                      return <li key={index} className={playlistStyles.relatedPlaylist}>
                          <Link to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}>
                            <img src={item.coverImgUrl} title={item.creator.nickname} alt="" 
                          className={playlistStyles.coverImgUrl}/>
                          </Link>
                          <div className={playlistStyles.relatedInfo}>
                            <Link to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}>
                              <h3 className={playlistStyles.relatedTitle} >
                                <span className={playlistStyles.nickname} style={{fontSize: 14, color: "#000"}}>{item.name}</span>
                              </h3>
                            </Link>
                            <p className={playlistStyles.userInfo}>
                              <span style={{color: "#999", marginRight: 6}}>by</span>
                              <span style={{color: "#666"}} className={playlistStyles.nickname}>{item.creator.nickname}</span>
                            </p>
                          </div>
                      </li>
                    })}
                  </ul>
                </div>
              </div>
            </div>
          }
          <div className={songDetailStyles.simpleSonglist} style={{marginBottom: 30}}>
            <h4 className="subtitle" style={{marginBottom: 15}}>相似歌曲</h4>
            <ul>
              {this.state.simpleSonglist.map(item => {
                return <li key={item.id}>
                  <div>
                    <p className={songDetailStyles.songTitle}>
                      <Link 
                        to={{pathname: "/discover/songdetail", state: {id: item.id}}}
                        onClick={() => {
                          window.sessionStorage.setItem("song_id", item.id);
                          window.location.reload();
                        }}>{item.name}</Link></p>
                    <p className={songDetailStyles.songAuthor}>{item.artists.map(item => item.name)}</p>
                  </div>
                  <span></span>
                  <i></i>
                </li>
              })}
            </ul>
          </div>
          <ClientDown/>
        </div>
        <AudioList onRef={this.onRef} id={window.sessionStorage.getItem("song_id")}/>
      </div>
  }
}