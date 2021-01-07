import React from 'react';
import { Link } from "react-router-dom";

import djradioCategofyInfoStyles from "../../css/commonComponentStyles/djradioCategofyInfoStyles.scss";


import { Pagination, Spin } from "antd";

export default class DjradioCategoryInfo extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      cateId: null,
      cateList: [],
      toplist: [],
      playlistTotal: 0,
      currentPage: 1
    };
  }

  componentDidMount() {
    this.getCateData(this.props.cateId);
    this.setState({
      cateId: this.props.cateId
    });

    this.getToplistData(this.props.cateId, 0);
  }

  componentWillReceiveProps(nextProps) {
    this.state.toplist = [];
    this.state.cateList = [];
    if(nextProps.cateId != this.state.cateId){
      this.setState({
        cateId: nextProps.cateId
      });
      this.getCateData(nextProps.cateId);
      this.getToplistData(nextProps.cateId, 0);
    }
  }

  getCateData = (cateId) => {
    fetch("http://localhost:3000/dj/recommend/type?type=" + cateId)
    .then(res => res.json())
    .then(data => {
      this.setState({
        cateList: data.djRadios.slice(0, 5)
      })
    })
    .catch(err => err);
  }

  getToplistData = (cateId, offset) => {
    fetch("http://localhost:3000/dj/radio/hot?limit=20&offset=" + offset + "&cateId=" + cateId)
    .then(res => res.json())
    .then(data => {
      this.setState({
        toplist: data.djRadios,
        playlistTotal: data.count
      })
    })
    .catch(err => err);
  }

  pageChange = (page) => {
    this.state.toplist = [];
    this.setState({
      currentPage: page
    });
    this.getToplistData(this.state.cateId, (page - 1) * 20);
  }

  render() {
    return <div className={djradioCategofyInfoStyles.container}>
      <h2>优秀新电台</h2>
      <ul className={djradioCategofyInfoStyles.excellentRadio}>
        {this.state.cateList.length == 0 ? <Spin tip="加载中..."/> : this.state.cateList.map((item, index) => {
          return <li key={index}>
            <Link to={{pathname: "/discover/djradiodetail", state: {id: item.id}}} className={djradioCategofyInfoStyles.picUrl} href=""><img src={item.picUrl} alt=""/></Link>
            <p className={djradioCategofyInfoStyles.name}><a href="">{item.name}</a></p>
            <p className={djradioCategofyInfoStyles.rcmdtext}>{item.rcmdtext}</p>
          </li>
        })}
      </ul>
      <h2 style={{marginTop: 30}}>电台排行榜</h2>
      <ul className={djradioCategofyInfoStyles.toplist}>
        {this.state.toplist.length == 0 ? <Spin tip="加载中..."/> : this.state.toplist.map(item => {
          return <li key={item.id} className={djradioCategofyInfoStyles.programItem}>
            <Link to={{pathname: "/discover/djradiodetail"}} className={djradioCategofyInfoStyles.toplistItemCover}>
              <img src={item.picUrl} alt=""/>
            </Link>
            <div className={djradioCategofyInfoStyles.programItemInfo}>
              <h3>{item.name}</h3>
              <p className={djradioCategofyInfoStyles.userIcon}><i></i>{item.dj.nickname}</p>
              <p className={djradioCategofyInfoStyles.subCount}><span>共{item.programCount}期</span>&nbsp;&nbsp;&nbsp;<span>订阅{item.subCount}次</span></p>
            </div>
          </li>
        })}
      </ul>

      <Pagination 
        style={{textAlign: "center", marginTop: "60px"}} 
        current={this.state.currentPage}
        onChange={this.pageChange}
        showSizeChanger={false} 
        total={(this.state.playlistTotal + 1) * 10 / 35} />
    </div>
  }
}