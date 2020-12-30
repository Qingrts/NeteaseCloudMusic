import React from 'react';

import toplistDetailStyles from "../../../css/findmusic/toplistDetailStyles.scss";

import moment from "moment";
import format from "../../../utils/format";

import CommentsList from "../../commonComponent/CommentsList.jsx";

import {Link} from "react-router-dom";

export default class ToplistDetail extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      toplist_id: this.props.toplist_id,
      toplistDetail: {
        tracks: []
      },
      updateFrequency: this.props.updateFrequency
    };
  }

  // getDerivedStateFromProps(nextProps, prevState) {
  //   console.log(nextProps, prevState);
  // }
  componentWillReceiveProps(nextProps) {
    if(this.state.toplist_id !== nextProps.toplist_id){
      this.setState({
        toplist_id: nextProps.toplist_id,
        updateFrequency: nextProps.updateFrequency
      });
      this.getToplistDetail(nextProps.toplist_id);
    }
  }

  getToplistDetail = (id) => {
    fetch("http://localhost:3000/playlist/detail?id=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        toplistDetail: data.playlist
      })
    })
    .catch(err => err);
  }

  render() {
    return <div className={toplistDetailStyles.toplistDetailContainer}>
      <div className={toplistDetailStyles.toplistTitle}>
        <div className={toplistDetailStyles.cloak}>
          <img src={this.state.toplistDetail.coverImgUrl} style={{width: "100%", height: "100%"}} alt=""/>
        </div>
        <div style={{marginLeft: 30, marginTop: 15}}>
          <h2>{this.state.toplistDetail.name}</h2>
          <div className={toplistDetailStyles.user}>
            <i className={toplistDetailStyles.time}></i>
            <span>最近更新: {moment(this.state.toplistDetail.updateTime).format("MM月DD日")} <em>({this.state.updateFrequency})</em></span>
          </div>
          <div className={toplistDetailStyles.iconGroup}>
            <a href="" className={toplistDetailStyles.play}>
              <i>
                <em></em>播放
              </i>
            </a>
            <a href="" className={toplistDetailStyles.addPlaylist}></a>
            <a href="" className={toplistDetailStyles.collect}><i>({this.state.toplistDetail.subscribedCount})</i></a>
            <a href="" className={toplistDetailStyles.transmit}><i>({this.state.toplistDetail.shareCount})</i></a>
            <a href="" className={toplistDetailStyles.download}><i>下载</i></a>
            <a href="" className={toplistDetailStyles.comment}><i>({this.state.toplistDetail.commentCount})</i></a>
          </div>
        </div>
      </div>
      <div className={toplistDetailStyles.playList}>
        <div className={toplistDetailStyles.title}>
          <h3>歌曲列表</h3>
          <span>{this.state.toplistDetail.trackCount}首歌</span>
          <div className={toplistDetailStyles.moreWayPlay} style={{flex: "1"}}>
            <span style={{float: "right"}}>播放 : <strong>{this.state.toplistDetail.playCount}</strong>次</span>
          </div>
        </div>
        <div className={toplistDetailStyles.songlist}>
          <table>
            <thead>
              <tr>
                <td></td>
                <td>标题</td>
                <td>时长</td>
                <td>歌手</td>
              </tr>
            </thead>
            <tbody>
            {this.state.toplistDetail.tracks.map((item, index) => {
              return <tr key={index} className="songLine">
                <td>
                  {index+1}
                  <i></i>
                </td>
                <td>
                  <Link to={{pathname: "/discover/songdetail", state: {id: item.id}}}>{item.name}</Link>&nbsp;
                  {item.alia.length != 0 && <span className={toplistDetailStyles.alia}>{"-(" + item.alia[0] + ")"}</span>}
                  {item.mv != 0 && <span title="播放mv" className={toplistDetailStyles.mv}></span>}
                </td>
                <td>
                  <span className="duration">{format.durationFormat(item.dt)}</span>
                  <div className={toplistDetailStyles.songlistIcon + " " + "songlistIcon"}>
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
      <CommentsList id={this.state.toplist_id || 19723756} fetchUrl={"http://localhost:3000/comment/playlist?litmit=20&id="}/>
    </div>
  }
}