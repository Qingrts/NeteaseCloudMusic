import React from 'react';

import djradioStyles from "../../../css/findmusic/djradioStyles.scss";

import DjradioDefault from "../../commonComponent/DjradioDefault.jsx";

import DjradioCategoryInfo from "../../commonComponent/DjradioCategoryInfo.jsx";

import { Spin } from "antd";

export default class Djradio extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      categories: [],
      active: null,
      cateId: null
    };
  }

  componentDidMount() {
    this.getDjradioCatelist();
  }

  // 获取电台分类列表
  getDjradioCatelist = () => {
    fetch("http://localhost:3000/dj/catelist")
    .then(res => res.json())
    .then(data => {
      this.setState({
        categories: data.categories
      })
    })
    .catch(err => {
      console.log(err);
    })
  }

  

  

  changeActive = (name, id) => {
    event.preventDefault();
    this.setState({
      active: name,
      cateId: id
    })
  }

  render() {
    return <div className={djradioStyles.djradioContainer}>
      {this.state.categories.length == 0 ? <Spin tip="加载中..."/> : 
      <ul className={djradioStyles.categoryList}>
        {this.state.categories.map(item => {
          return <li key={item.id} className={this.state.active == item.name ? djradioStyles.active: null}>
            <a href="#" onClick={this.changeActive.bind(this, item.name, item.id)}>
              <i style={this.state.active == item.name ? {backgroundImage: "url(" + item.pic56x56Url + ")"} : {backgroundImage: "url(" + item.picWebUrl + ")"}}></i>
              <span style={this.state.active == item.name ? {color: "#d35757"} : null}>{item.name}</span>
            </a>
          </li>
        })}
        <li>
            <a href="#">
              <i style={{backgroundImage: "url(../src/images/radio_faq.png)"}}></i>
              <span>常见问题</span>
            </a>
        </li>
        <li>
            <a href="#">
              <i style={{backgroundImage: "url(../src/images/radio_apply.png)"}}></i>
              <span>我要做主播</span>
            </a>
        </li>
      </ul>
      }
      {this.state.active == null ? <DjradioDefault/> : <DjradioCategoryInfo cateId={this.state.cateId}/>}
    </div>
  }
}