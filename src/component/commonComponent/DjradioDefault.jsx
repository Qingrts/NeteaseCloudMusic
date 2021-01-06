import React from 'react';

import djraioDefaultStyles from "../../css/findmusic/djraioDefaultStyles.scss";

import { Link } from "react-router-dom";


export default class DjradioDefault extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      recommendList: [],
      djtoplist: [],
      getCateGoriesDesc: [
        {name: "musicStory", radioname: "音乐故事", type: 2, list: []},
        {name: "helpSleep", radioname: "助眠解压", type: 6, list: []},
        {name: "fluencySpeak", radioname: "侃侃而谈", type: 5, list: []},
        {name: "emotionRadio", radioname: "情感调频", type: 3, list: []},
        {name: "creationSong", radioname: "创作翻唱", type: 2001, list: []},
        {name: "other", radioname: "其他", type: 11, list: []},
      ]
    };
  }

  componentDidMount() {
    this.getDjradioRecommentList();
    this.getDjradioToplist();

    
    this.getCateRecomment(this.state.getCateGoriesDesc[0], 0)
    .then(this.getCateRecomment(this.state.getCateGoriesDesc[1], 1))
    .then(this.getCateRecomment(this.state.getCateGoriesDesc[2], 2))
    .then(this.getCateRecomment(this.state.getCateGoriesDesc[3], 3))
    .then(this.getCateRecomment(this.state.getCateGoriesDesc[4], 4))
    .then(this.getCateRecomment(this.state.getCateGoriesDesc[5], 5));
  }

  // 获取电台主页,推荐节目列表
  getDjradioRecommentList = () => {
    fetch("http://localhost:3000/program/recommend")
    .then(res => res.json())
    .then(data => {
      this.setState({
        recommendList: data.programs
      })
    })
    .catch(err => err);
  }
  // 获取电台排行榜
  getDjradioToplist = () => {
    fetch("http://localhost:3000/dj/program/toplist?limit=10")
    .then(res => res.json())
    .then(data => {
      this.setState({
        djtoplist: data.toplist
      })
    })
    .catch(err => err)
  }

  getCateRecomment = (obj, index) => {
    return new Promise(() => {
      fetch("http://localhost:3000/dj/recommend/type?type=" + obj.type)
      .then(res => res.json())
      .then(data => {
        let newObj = JSON.parse(JSON.stringify(this.state.getCateGoriesDesc));
        newObj[index].list = data.djRadios.slice(0, 4);
        this.setState({
          getCateGoriesDesc: newObj
        })
      })
      .catch(err => err);
    })
  }

  render() {
    return <div className={djraioDefaultStyles.recommendListAndToplist}>
      <div className={djraioDefaultStyles.recommendList}>
        <h2>推荐节目<a href="#">更多&gt;</a></h2>
        <ul>
          {this.state.recommendList.map(item => {
            return <li key={item.id}>
              <a href="#" className={djraioDefaultStyles.coverUrl}><img src={item.coverUrl} alt=""/></a>
              <div className={djraioDefaultStyles.programsInfo}>
                <h3><Link to={{pathname: "/discover/djradiodetail", state: {id: item.id}}}>{item.name}</Link></h3>
                <p><a href="">{item.radio.name}</a></p>
              </div>
              <a href="" className={djraioDefaultStyles.programsTag}>{item.radio.category}</a>
            </li>
          })}
        </ul>
      </div>
      <div className={djraioDefaultStyles.toplist}>
        <h2>节目排行榜<a href="#">更多&gt;</a></h2>
        <ul>
          {this.state.djtoplist.map((item) => {
            return <li key={item.program.id}>
              <div className={djraioDefaultStyles.rank}>
                <em>{item.rank.toString().padStart(2, "0")}</em>
                <p>
                  {item.lastRank != -1 ? 
                  (item.rank - item.lastRank > 0 ? <span className={djraioDefaultStyles.decline}><i/>{Math.abs(item.rank - item.lastRank)}</span> : (item.rank - item.lastRank == 0? "- 0" : <span className={djraioDefaultStyles.rise}><i/>{Math.abs(item.rank - item.lastRank)}</span>))
                  : <i className={djraioDefaultStyles.new}/>}
                </p>
              </div>
              <a href="#" className={djraioDefaultStyles.coverUrl}><img src={item.program.coverUrl} alt=""/></a>
              <div className={djraioDefaultStyles.programsInfo}>
                <h3><Link to={{pathname: "/discover/djradiodetail", state: {id: item.program.id}}}>{item.program.name}</Link></h3>
                <p><a href="">{item.program.radio.name}</a></p>
              </div>
              <span className={djraioDefaultStyles.process}>
                <i style={{width: item.score / 1000 + "%"}}></i>
              </span>
            </li>
          })}
        </ul>
      </div>

      {this.state.getCateGoriesDesc.map((item ,index) => {
        return <div key={index} className={djraioDefaultStyles.djradio_item}>
          <h2><a href="#">{item.radioname}</a><b> · </b>电台<a href="#" className={djraioDefaultStyles.more}>更多&gt;</a></h2>
          <ul>
            {item.list.map(programItem => {
              return <li key={programItem.id}>
                <a href="" className={djraioDefaultStyles.programCoverimg}><img src={programItem.picUrl} alt=""/></a>
                <div className={djraioDefaultStyles.programItemInfo}>
                  <h3 className={djraioDefaultStyles.programName}><a href="">{programItem.name}</a></h3>
                  <p className={djraioDefaultStyles.programDesc}>{programItem.rcmdtext}</p>
                </div>
              </li>
            })}
          </ul>
        </div>
      })}
    </div>
  }
}