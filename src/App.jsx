import React from 'react';
// 路由相关的模块
import {
  HashRouter,
  Route,
  Link,
  Redirect,
  Switch
} from "react-router-dom";

import {Layout, Menu } from 'antd';
const {Header, Content, Footer} = Layout;

import FindMusic from "./component/FindMusic/FindMusic.jsx";
import MyMusic from "./component/MyMusic/MyMusic.jsx";
import Friend from "./component/Friend/Friend.jsx";
import Store from "./component/Store/Store.jsx";
import Musicperson from "./component/Musicperson/Musicperson.jsx";
import Download from "./component/Download/Download.jsx";


import styles from "./css/app.scss";
import "./css/common.css";

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      hashKey: window.location.hash.substr(2).split("/")[0] || "discover",
      tags: [
        {value: "发现音乐", to: "discover", component: FindMusic},
        {value: "我的音乐", to: "my", component: MyMusic},
        {value: "朋友", to: "friend", component: Friend},
        {value: "商城", to: "store", component: Store},
        {value: "音乐人", to: "musicperson", component: Musicperson},
        {value: "下载客户端", to: "download", className: styles.hot, component: Download},
      ]
    };
  }
  componentDidMount() {
  }


  render() {
    return <HashRouter>
      <Layout className="layout"
        stlye={
          {height: "100%"}
      }>
        <Header className="header">
          <div className="container">
            <h1 className="logo">
              <a href="/#/discover"></a>
            </h1>
            <Menu theme="dark" mode="horizontal"
              defaultSelectedKeys={
                [this.state.hashKey]
            }>
              { this.state.tags.map((item, index) => {
                return <Menu.Item 
                key={item.to} 
                className={
                  [item.className,
                  this.state.hashKey == item.to ? styles.find : null]
                }>
                  <Link to={ '/' + item.to} onClick={() => {this.setState({hashKey: item.to})}}>{item.value}</Link>
                </Menu.Item>
              })}
            </Menu>
            <div className={
              styles.search
            }>
              <input type="text" placeholder="音乐/视频/电台/用户"/>
              <span>创作者中心</span>
              <Link className={
                  styles.login
                }
                to="/login">登录</Link>
            </div>
          </div>
          
        </Header>
        <Content>
          <Switch>
            { this.state.tags.map((item, index) => {
              return <Route key={index} path={"/" + item.to}
              component={item.component} ></Route>
            })}
            <Redirect from="/" to="/discover"/>
          </Switch>
        </Content>
        <Footer style={
          {
            height: 173,
            backgroundColor: "#f2f2f2",
            borderTop: "1px solid #d3d3d3",
            padding: "0"
          }
        }>
          <div className="container" style={{width: "982px"}}>
            <div className={
              styles.footerLeft
            }>
              <ul>
                <li><a href="#">服务条款</a></li>
                <li><a href="#">隐私服务</a></li>
                <li><a href="#">儿童隐私服务</a></li>
                <li><a href="#">版权投诉指引</a></li>
                <li><a href="#">意见反馈</a></li>
              </ul>
              <p>网易公司版权所有©1997-2020杭州乐读科技有限公司运营：浙网文[2018]3506-263号</p>
              <p>违法和不良信息举报电话：0571-89853516 举报邮箱：ncm5990@163.com</p>
              <p>粤B2-20090191-18工业和信息化部备案管理系统网站  <img src="/src/images/police.png" alt="" style={{height: 15, width: 15}}/> 浙公网安备 33010902002564号</p>
            </div>
          </div>
        </Footer>
      </Layout>
    </HashRouter>;
  }
}
