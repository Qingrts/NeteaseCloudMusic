import React from 'react';
import { Route } from 'react-router-dom';

import djradioStyles from "../../../css/findmusic/djradioStyles.scss";

import DjradioDefault from "../../commonComponent/DjradioDefault.jsx";

export default class Djradio extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      categories: [],
      active: null
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

  

  changeActive = (name) => {
    event.preventDefault();
    this.setState({
      active: name
    })
  }

  render() {
    return <div className={djradioStyles.djradioContainer}>
      <ul className={djradioStyles.categoryList}>
        {this.state.categories.map(item => {
          return <li key={item.id} className={this.state.active == item.name ? djradioStyles.active: null}>
            <a href="#" onClick={this.changeActive.bind(this, item.name)}>
              <i style={this.state.active == item.name ? {backgroundImage: "url(" + item.pic56x56Url + ")"} : {backgroundImage: "url(" + item.picWebUrl + ")"}}></i>
              <span>{item.name}</span>
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

      <Route exact path="/discover/djradio" component={DjradioDefault}/>
    </div>
  }
}