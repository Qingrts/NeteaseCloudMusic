import React from 'react';

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

export default class SongDetail extends React.Component{
  constructor(props)　{
    super(props);
    
    if(this.props.location.state && this.props.location.state.id != sessionStorage.getItem("song_id")){
      window.sessionStorage.setItem("song_id", this.props.location.state && this.props.location.state.id)
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
      lyric: ""
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.song_id){
      this.getPlaylistDetail(this.state.song_id);
    }
  }
  // 获取专辑详情
  getPlaylistDetail = (id) => {
    fetch("http://localhost:3000/song/detail?ids=" + id)
    .then(response => {
      return response.json();
    })
    .then(data => {
      this.setState({
        songdetail: data.songs[0]
      })
      // 获取评论数量
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
      // 获取歌词
      fetch("http://localhost:3000/lyric?id=" + id)
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.setState({
          lyric: data.lrc.lyric
        })
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
            <div className={albumDetailStyles.playlistCoverimg} style={{background: "none",height: 205}}>
              <img src={this.state.songdetail.al.picUrl} alt="" style={{width: 130,height: 130, margin: 38}}/>
              <span className={albumDetailStyles.cloak} style={{width: 205, height: 205,backgroundPosition: "-140px -580px"}}></span>
            </div>
            <div className={albumDetailStyles.albumInfo}>
              <h2 style={{fontSize: 22}}><i className={albumDetailStyles.icon} style={{backgroundPosition: "0 -463px"}}></i>{this.state.songdetail.al.name}</h2>
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
              <div className={albumDetailStyles.iconGroup}>
                <a href="" className={albumDetailStyles.play}>
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
            </div>
          </div>
          {this.state.lyric.length == 0 ? null : <Description desc={this.state.lyric}/>}
          {/* <CommentsList fetchUrl={"http://localhost:3000/comment/album?id="} id={this.state.song_id}/> */}
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