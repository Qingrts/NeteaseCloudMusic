import React from 'react';

import format from "../../utils/format.js";
import playlistItemStyles from "../../css/commonComponentStyles/playlistItemStyles.scss";

export default class PlayListItem extends React.Component{
  constructor(props)　{
    super(props);
    this.state = {};
  }
  render() {
    return <div className={playlistItemStyles.playItem}>
        <div className={playlistItemStyles.playCount}>
          {this.props.type != 1 && <img src={this.props.picUrl || this.props.coverImgUrl} alt=""/> }
          {this.props.type == 1 && <img src={this.props.coverImgUrl || this.props.picUrl} alt=""/>}
          <span className={playlistItemStyles.cloak}></span>
          <div className={playlistItemStyles.bottom}>
            <span className={playlistItemStyles.listenIcon}></span>
            {
            this.props.type == 1 
            ? 
            <span>{format.numberFormat(this.props.program.adjustedPlayCount)}</span> 
            : 
            <span>{format.numberFormat(this.props.playCount)}</span>
            }
            <span className={playlistItemStyles.playIcon}></span>
          </div>
        </div>
        <div className="playlistInfo">
          {this.props.type == 1 ? <i className={playlistItemStyles.djprogram}></i> : null}
          <span className={playlistItemStyles.link} style={{color: "#000"}}>{this.props.name}</span>
        </div>
    </div>
  }
}