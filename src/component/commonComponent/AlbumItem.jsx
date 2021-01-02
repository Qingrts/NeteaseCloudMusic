import React from 'react';

import { Link } from "react-router-dom";

import albumItemStyles from "../../css/commonComponentStyles/albumItemStyles.scss";

export default class AlbumItem extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {};
  }

  render() {
    return <div className={albumItemStyles.albumItem}>
      <Link to={{pathname: "/discover/albumdetail", state: {id: this.props.id}}}>
        <span className={albumItemStyles.picUrl}><img src={this.props.picUrl}alt=""/></span>
        <p className={albumItemStyles.albumName}>{this.props.name}</p>
      </Link>
      <p className={albumItemStyles.albumArtists}>{this.props.artists.map(item => item.name).join(" / ")}</p>
    </div>
  }
}