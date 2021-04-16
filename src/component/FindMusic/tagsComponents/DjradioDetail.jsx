import React from 'react';
import { Link } from "react-router-dom";

import playlistStyles from "../../../css/findmusic/playlistdetail.scss";

import moment from "moment";
import ClientDown from "../../commonComponent/ClientDown.jsx";
import format from "../../../utils/format.js";

import Description from "../../../component/commonComponent/Description.jsx";

import { Spin } from "antd";



let defaultDetail = {
  dj: {
    avatarUrl: "",
    nickname: "",
    avatarDetail: ""
  },
  desc: ""
};

export default class DjradioDetail extends React.Component{
  constructor(props)　{
    super(props);

    if(this.props.location.state && this.props.location.state.id != sessionStorage.getItem("djradio_id")){
      window.sessionStorage.setItem("djradio_id", this.props.location.state && this.props.location.state.id)
    }
    
    
    this.state = {
      detail: JSON.parse(JSON.stringify(defaultDetail)),
      relatDjradio: [],
      djProgramlist: [],
      djradio_id: sessionStorage.getItem("djradio_id"),
    };
  }

  componentDidMount() {
    // 根据状态,确定是否需要发送请求
    if(this.state.djradio_id){
      this.getDjradioDetail(this.state.djradio_id);
    }
  }
  
  getDjradioDetail = (id) => {
    // 获取电台详情
    fetch(window.baseUrl + "/dj/detail?rid=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        detail: data.data
      })

      // 获取热门推荐
      fetch(window.baseUrl + "/dj/radio/hot?limit=5&cateId=" + data.data.categoryId)
      .then(res => res.json())
      .then(relat => {
        this.setState({
          relatDjradio: relat.djRadios.slice(0, 5)
        })
      })
      .catch(err => err);

      // 获取节目列表
      fetch(window.baseUrl + "/dj/program?asc=true&rid=" + data.data.id)
      .then(res => res.json())
      .then(djprogramdata => {
        this.setState({
          djProgramlist: djprogramdata.programs
        })
      })
      .catch(err => err);
    })
    .catch(err => err);
  }

  render() {
    return <div className={playlistStyles.container}>
        <div className={playlistStyles.container_left}>
          <div className={playlistStyles.playlistInfo}>
            <div className={playlistStyles.playlistCoverimg}>
              <img src={this.state.detail.picUrl} alt=""/>
            </div>
            <div className={playlistStyles.playlistInfo_content}>
              <div className={playlistStyles.playlistTitle}>
                <i style={
                  {
                    background: "url(/src/images/icon.png) no-repeat 0 -1014px" 
                  }
                }></i>
                {this.state.detail.name}
              </div>
              <div>
                <img src={this.state.detail.dj.avatarUrl} style={{width: 35, height: 35}} alt=""/>
                <a href="" style={{marginLeft: 15}} className={playlistStyles.nickname} >{this.state.detail.dj.nickname}</a>
                {this.state.detail.dj.avatarDetail ? <img style={{width: 13, height: 13, display: "inline-block", marginLeft: 5}} src={this.state.detail.dj.avatarDetail.identityIconUrl} alt=""/> : null}
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
                <span style={{padding: "1px 4px", marginTop: 4,color: "#cc0000",border: "1px solid #cc0000", fontSize: 12}}>{this.state.detail.category}</span>
              </div>
              {this.state.detail.desc.length == 0 ? null :<Description startStr={" 介绍 :"} desc={this.state.detail.desc}/>}
            </div>
          </div>
          <div className={playlistStyles.playList}>
            <div className={playlistStyles.title}>
              <h3>节目列表</h3>
              <span>共{this.state.detail.programCount}期</span>
              <div className={playlistStyles.moreWayPlay}>
                <a href=""><i></i>生成外链播放器</a>
              </div>
            </div>
            <div className={playlistStyles.songlist}>
              {this.state.djProgramlist.length == 0 ? <Spin tip="加载中..."/> :
              <table>
               <tbody>
                {this.state.djProgramlist.map(item => {
                  return <tr key={item.id} style={{height: 55, lineHeight: "55px", color: "#666"}} className="songLine">
                    <td>
                      {item.serialNum}
                      <i style={{marginTop: 20}}></i>
                    </td>
                    <td style={{maxWidth: 135}}>
                      <Link to={{pathname: "/discover/djradioprogram", state: {id: item.id}}} style={{color: "#333"}}>{item.name}</Link>
                    </td>
                    <td>
                      <div style={{marginTop: 14}} className={playlistStyles.songlistIcon + " " + "songlistIcon"}>
                        <span></span>
                        <span></span>
                        <span></span>
                        <span></span>
                      </div>
                    </td>
                    <td style={{width: 80}}>
                      播放{format.numberFormat(item.listenerCount)}
                    </td>
                    <td style={{width: 90}}>
                      赞{format.numberFormat(item.likedCount)}
                    </td>
                    <td style={{width: 85}}>
                      {moment(item.createTime).format("YYYY-MM-DD")}
                    </td>
                    <td style={{width: 60}}>
                      {format.durationFormat(item.duration)}
                    </td>
                  </tr>
                })}
               </tbody>
              </table>
              }
            </div>
          </div>
        </div>
        <div className={playlistStyles.container_right}>
          <h4 className={playlistStyles.subtitle}>你可能也喜欢</h4>
          <div style={{marginBottom: 40}}>
            <ul>
              {this.state.relatDjradio.length == 0 ? <Spin tip="加载中..."/> : this.state.relatDjradio.map((item, index) => {
                return <li key={index} className={playlistStyles.relatedPlaylist}>
                    <img src={item.picUrl} title={item.name} alt="" 
                    className={playlistStyles.coverImgUrl}
                    onClick={
                      () => {
                        sessionStorage.setItem("djradio_id", item.id);
                        window.location.reload();
                      }  
                    }/>
                    <div className={playlistStyles.relatedInfo}>
                      <h3 className={playlistStyles.relatedTitle} onClick={
                        () => {
                          sessionStorage.setItem("djradio_id", item.id);
                          window.location.reload();
                        }  
                      }>
                        <span className={playlistStyles.nickname} style={{fontSize: 14, color: "#000"}}>{item.name}</span>
                      </h3>
                      <p className={playlistStyles.userInfo}>
                        <span style={{color: "#999", marginRight: 6}}>by</span>
                        <span style={{color: "#666"}} className={playlistStyles.nickname}>{item.dj.nickname}</span>
                        {item.dj.avatarDetail && <img style={{width: 13, height: 13, display: "inline-block", marginLeft: 5}} src={item.dj.avatarDetail.identityIconUrl} alt=""/>}
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
