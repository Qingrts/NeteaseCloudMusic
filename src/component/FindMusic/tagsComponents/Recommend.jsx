import React from 'react';
import {Link} from "react-router-dom";

import styles from "../../../css/findmusic/recommend.scss";

import {Carousel} from "antd";

export default class Recommmend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      banners: [],
      tags: [],
      recommendList: []
    };
  }

  componentDidMount() {
    this.getBanners();
    this.getTags();
    this.getRecommendList();
  }

  getBanners = () => {
    fetch("http://localhost:3000/banner?type=2").then(function (response) {
      return response.json();
    }).then((data) => {
      this.setState({banners: data.banners})
      this.refs.bg_img.style = "background: url(" + this.state.banners[0].pic + ") no-repeat center center;background-size: 6000px";
    }).catch((err) => {
      console.log("Oops, error");
    });
  }

  getTags = () => {
    fetch("http://localhost:3000/playlist/hot").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({
        tags: data.tags.splice(0, 5)
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getRecommendList = () => {
    fetch("http://localhost:3000/top/playlist?limit=8&order=hot").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({
        recommendList: data.playlists
      })
    }).catch(err => {
      console.log(err);
    })
  }

  prev() {
    this.carousel.prev();
    console.log(this.carousel);
  }
  next() {
    this.carousel.next();
  }
  getPlaylist = (id, e) => {
    e.preventDefault();
    this.props.history.push({pathname: "/discover/playlist", query: {id: id}});
  }

  numberFormat = (num) => {
    if(num > 100000000){
      return parseInt(num / 100000000) + "亿";
    }else if(num > 10000){
      return parseInt(num / 10000) + "万"
    }else{
      return num;
    }
  }

  render() {
    return <div>
      <div ref="bg_img">
        <div className={styles.container} style={
          {
            height: "285px",
            display: "flex",
            position: "relative"
          }
        }>
          <Carousel effect="fade" autoplay dotPosition="bottom"
            beforeChange={
              (function (current, nextSlide) {
                this.refs.bg_img.style = "background: url(" + this.state.banners[nextSlide].pic + ") no-repeat center center;background-size: 6000px;";
              }).bind(this)
            }
            ref={
              carousel => {
                this.carousel = carousel;
              }
            }
            style={
              {
                width: "730px",
                height: "285px",
                cursor: "pointer"
              }
          }>
            {
            this.state.banners.map((item, index) => {
              return <h3 key={index}
                className={
                  styles.contentStyle
              }>
                <img src={
                    item.pic
                  }
                  alt="Image"/>
              </h3>
          })
          } </Carousel>
          <div className={
            styles.download
          }>
            <p className={
              styles.terminal
            }>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
          </div>
          <button className={
              styles.arrow + " " + styles.arrow_left
            }
            onClick={
              this.prev.bind(this)
          }></button>
          <button className={
              styles.arrow + " " + styles.arrow_right
            }
            onClick={
              this.next.bind(this)
          }></button>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.container_left}>
          <div className={styles.outbox}>
            <div className={styles.recommend}>
              <a href="#">热门推荐</a>
              <ul className={styles.tags}>
                {this.state.tags.map((item, index) => {
                  return <li key={index}><Link to={"/discover/playlist?cat=" + item.name}>{item.name}</Link></li>
                })}
              </ul>
              <span className={styles.more}>更多</span>
            </div>
            <ul className={styles.recommendList}>
              {this.state.recommendList.map((item, index) => {
                return <li key={index}>
                      <div  style={{paddingTop: "10px", position: "relative"}}>
                        <img src={item.coverImgUrl} alt="" style={{width: 140, height: 140}}/>
                        <a onClick={this.getPlaylist.bind(this, item.id)} className={styles.cloak} ></a>
                        <div className={styles.bottom}>
                          <span className={styles.listenIcon}></span>
                          <span>{this.numberFormat(item.playCount)}</span>
                          <a href="" className={styles.playIcon}></a>
                        </div>
                      </div>
                      <div style={{margin: "5px 0 30px", lineHeight: "1.2"}}>
                        <a href="#" style={{color: "#000"}}>{item.name}</a>
                      </div>
                  </li>
              })}
            </ul>
          </div>
          <div className={styles.outbox}>
            <div className={styles.recommend}>
              <a href="#">新碟上架</a>
              <span className={styles.tags}></span>
              <span className={styles.more}>更多</span>
            </div>
          </div>
          <div className={styles.outbox}>
            <div className={styles.recommend}>
              <a href="#">榜单</a>
              <span className={styles.tags}></span>
              <span className={styles.more}>更多</span>
            </div>
          </div>
        </div>
        <div className={styles.container_right}>

        </div>
      </div>
    </div>
  }
}
