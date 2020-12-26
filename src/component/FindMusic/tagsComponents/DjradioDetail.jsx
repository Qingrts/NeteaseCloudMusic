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
      this.setState({
        detail: data.program
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
          <div className={playlistStyles.playlistInfo}>
            <div className={playlistStyles.playlistCoverimg}>
              <img src={this.state.detail.blurCoverUrl} alt=""/>
            </div>
          </div>
        </div>
        <div style={{flex: 1,borderLeft: "1px solid #d3d3d3",padding: "20px 40px 40px 30px"}}>
          <h4 className={playlistStyles.subtitle}>更多节目</h4>
          <div className={playlistStyles.likePlaylist} style={{marginBottom: 30}}>
            
          </div>
        </div>
      </div>
  }
}