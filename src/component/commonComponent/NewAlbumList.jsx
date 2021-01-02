import React from 'react';

import { Carousel } from "antd";
import { Link } from "react-router-dom";
import AlbumItem from "./AlbumItem.jsx";

import newAlbumListStyles from "../../css/commonComponentStyles/newAlbumListStyles.scss";

export default class NewAlbumList extends React.Component{
  constructor(props)　{
    super(props);
    this.state = {
      albumList: []
    };
  }
  // 在页面挂载完毕以后,获取专辑列表
  componentDidMount() {
    this.getAlbumlist();
  }
  // 上一页,下一页
  listprev() {
    this.newList.prev();
  }
  listnext() {
    this.newList.next();
  }

  getAlbumlist = () => {
    fetch("http://localhost:3000/album/newest").then(response => {
      return response.json();
    }).then(data => {
      this.setState({
        albumList: data.albums.splice(0, 10)
      })
    }).catch(err => {
      console.log(err);
    })
  }
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0
    };


    return <div className="outbox">
      <div className={newAlbumListStyles.newalbum}>
        <button className={newAlbumListStyles.leftArrow}
          onClick={
            this.listprev.bind(this)
        }></button>
        <button className={newAlbumListStyles.rightArrow}
          onClick={this.listnext.bind(this)}></button>
        <Carousel className={newAlbumListStyles.carouselBox}
          {...settings}
          ref={newList => {this.newList = newList;}
        }>
          {
          this.state.albumList.map((item, index) => {
            return <AlbumItem key={index} {...item}/>
        })
        } </Carousel>
      </div>
    </div>
  }
}