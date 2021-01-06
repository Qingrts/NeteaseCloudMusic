import React from 'react';

import djraioDetaultStyles from "../../css/findmusic/djraioDetaultStyles.scss";

import { Link } from "react-router-dom";


export default class DjradioDefault extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      recommendList: [],
      djtoplist: []
    };
  }

  componentDidMount() {
    this.getDjradioRecommentList();
    this.getDjradioToplist();
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

  render() {
    return <div className={djraioDetaultStyles.recommendListAndToplist}>
      <div className={djraioDetaultStyles.recommendList}>
        <h2>推荐节目<a href="#">更多&gt;</a></h2>
        <ul>
          {this.state.recommendList.map(item => {
            return <li key={item.id}>
              <a href="#" className={djraioDetaultStyles.coverUrl}><img src={item.coverUrl} alt=""/></a>
              <div className={djraioDetaultStyles.programsInfo}>
                <h3><Link to={{pathname: "/discover/djradiodetail", state: {id: item.id}}}>{item.name}</Link></h3>
                <p><a href="">{item.radio.name}</a></p>
              </div>
              <a href="" className={djraioDetaultStyles.programsTag}>{item.radio.category}</a>
            </li>
          })}
        </ul>
      </div>
      <div className={djraioDetaultStyles.toplist}>
        <h2>节目排行榜<a href="#">更多&gt;</a></h2>
        <ul>
          {this.state.djtoplist.map((item) => {
            return <li key={item.program.id}>
              <div className={djraioDetaultStyles.rank}>
                <em>{item.rank.toString().padStart(2, "0")}</em>
                <p>
                  {item.lastRank != -1 ? 
                  (item.rank - item.lastRank > 0 ? <span className={djraioDetaultStyles.decline}><i/>{Math.abs(item.rank - item.lastRank)}</span> : (item.rank - item.lastRank == 0? "- 0" : <span className={djraioDetaultStyles.rise}><i/>{Math.abs(item.rank - item.lastRank)}</span>))
                  : <i className={djraioDetaultStyles.new}/>}
                </p>
              </div>
              <a href="#" className={djraioDetaultStyles.coverUrl}><img src={item.program.coverUrl} alt=""/></a>
              <div className={djraioDetaultStyles.programsInfo}>
                <h3><Link to={{pathname: "/discover/djradiodetail", state: {id: item.program.id}}}>{item.program.name}</Link></h3>
                <p><a href="">{item.program.radio.name}</a></p>
              </div>
              <span className={djraioDetaultStyles.process}>
                <i style={{width: item.score / 1000 + "%"}}></i>
              </span>
            </li>
          })}
        </ul>
      </div>
    </div>
  }
}