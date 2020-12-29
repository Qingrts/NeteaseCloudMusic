import React from 'react';
import { Route } from "react-router-dom";

import styles from "../../../css/findmusic/recommend.scss";

import ToplistDetail from "./ToplistDetail.jsx";

export default class Toplist extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      category: this.props.category || "全部",
      detaultList: [],
      current: "",
      updateFrequency: "每天更新"
    };
  }

  componentDidMount() {
    this.getToplist();
  }

  // 获取榜单信息
  getToplist = () => {
    fetch("http://localhost:3000/toplist")
    .then(res => res.json())
    .then(data => {
      this.setState({
        detaultList: data.list,
        current: data.list[0].id
      })      
    })
    .catch(err => err);
  }

  render() {
    return <div className={styles.container}>
      <div className={styles.container_right} style={{padding: "30px 0", maxWidth: 240}}>
        <h2 style={{fontSize: 16, color: "#000", fontWeight: "600", fontFamily: "simsun,\\5b8b\\4f53", paddingLeft: 20}}>云音乐特色榜</h2>
        <ul>
          {this.state.detaultList.slice(0,4).map(item => {
            return <li 
            key={item.id} 
            style={{display: "flex",padding: "12px 0 12px 20px", cursor: "pointer"}}
            className={this.state.current == item.id ? "current" : null}
            onClick={() => {
              if(this.state.current != item.id){
                this.setState({
                  current: item.id,
                  updateFrequency: item.updateFrequency
                })
              }
            }}
            >
              <img src={item.coverImgUrl} alt="" style={{width: 40, height: 40}}/>
              <div style={{lineHeight: "20px", fontSize: 12, paddingLeft: 10}}>
                <p>{item.name}</p>
                <p style={{color: "#999"}}>{item.updateFrequency}</p>
              </div>
            </li>
          })}
        </ul>

        <h2 style={{fontSize: 16, color: "#000", fontWeight: "600", fontFamily: "simsun,\\5b8b\\4f53", paddingLeft: 20, marginTop: 20}}>全球媒体榜</h2>
        <ul>
          {this.state.detaultList.slice(4).map(item => {
            return <li 
              key={item.id} 
              style={{display: "flex",padding: "12px 0 12px 20px", cursor: "pointer"}}
              className={this.state.current == item.id ? "current" : null}
              onClick={() => {
                if(this.state.current != item.id){
                  this.setState({
                    current: item.id,
                    updateFrequency: item.updateFrequency
                  })
              }
            }}>
              <img src={item.coverImgUrl} alt="" style={{width: 40, height: 40}}/>
              <div style={{lineHeight: "20px", fontSize: 12, paddingLeft: 10}}>
                <p>{item.name}</p>
                <p style={{color: "#999"}}>{item.updateFrequency}</p>
              </div>
            </li>
          })}
        </ul>
      </div>
      <div className={styles.container_left} style={{border: 0, borderRight: "1px solid #d3d3d3"}}>
        <ToplistDetail updateFrequency={this.state.updateFrequency} toplist_id={this.state.current}/>
      </div>
    </div>
  }
}