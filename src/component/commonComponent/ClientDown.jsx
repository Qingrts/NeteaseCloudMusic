import React from 'react';

import ClientDownStyles from "../../css/commonComponentStyles/clientDownStyles.scss";

export default class ClientDown extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {};
  }

  render() {
    return <div className={ClientDownStyles.moreClientDownload}>
        <h4 className="subtitle">网易云音乐多端下载</h4>
        <ul>
          <li><a href="#">iphone</a></li>
          <li><a href="#">window</a></li>
          <li><a href="#">android</a></li>
        </ul>
        <p>同步歌单，随时畅听320k好音乐</p>
      </div>
  }
}