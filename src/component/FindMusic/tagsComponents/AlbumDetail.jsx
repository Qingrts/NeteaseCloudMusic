import React from 'react';

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";

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