import React from 'react';

import MyMusicStyles from "../../css/MyMusic/MyMusic.scss";


export default class MyMusic extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {};
  }

  render() {
    return <div>
      <div className={MyMusicStyles.floatBox}></div>
      <div className={MyMusicStyles.container}>
        <div className={MyMusicStyles.containerLeft}>
          <ul>
            <li><a href="">我的歌手</a></li>
            <li><a href="">我的视频</a></li>
            <li><a href="">我的电台</a></li>
            <li><a href="">创建的歌单<span className={MyMusicStyles.copyRight}></span>(8)</a></li>
            <li><a href="">收藏的歌单(8)</a></li>
          </ul>
        </div>
        <div className={MyMusicStyles.containerRight}>

        </div>
      </div>
    </div>
  }
}