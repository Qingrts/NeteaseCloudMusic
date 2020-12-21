import React from 'react';

import styles from "../../../css/findmusic/recommend.scss";

import {Carousel} from "antd";

export default class Recommmend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      banners: []
    };
  }

  componentDidMount() {

    fetch("http://localhost:3000/banner?type=2").then(function (response) {
      return response.json();
    }).then((data) => {
      this.setState({banners: data.banners})
      this.refs.bg_img.style = "background: url(" + this.state.banners[0].pic + ") no-repeat center center;background-size: 6000px";
    }).catch((err) => {
      console.log("Oops, error");
    });
  }

  prev() {
    this.carousel.prev();
    console.log(this.carousel);
  }
  next() {
    this.carousel.next();
  }

  render() {
    return <div ref="bg_img">
      <div style={
        {
          width: "982px",
          margin: "0 auto",
          height: "285px",
          display: "flex",
          position: "relative"
        }
      }>
        <Carousel effect="fade" autoplay dotPosition="bottom"
          beforeChange={
            (function (current,nextSlide) {
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
          <p className={styles.terminal}>PC 安卓 iPhone WP iPad Mac 六大客户端</p>
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
  }
}
