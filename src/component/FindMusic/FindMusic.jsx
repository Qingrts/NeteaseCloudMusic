import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import Recommend from "./tagsComponents/Recommend.jsx";
import Toplist from "./tagsComponents/Toplist.jsx";
import Playlist from "./tagsComponents/Playlist.jsx";
import Djradio from "./tagsComponents/Djradio.jsx";
import Artist from "./tagsComponents/Toplist.jsx";
import Album from "./tagsComponents/Album.jsx";

import styles from "../../css/findmusic.scss";

export default class FindMusic extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      tags: [
        {value: "推荐", to: "/discover", component: Recommend},
        {value: "排行榜", to: "/discover/toplist", component: Toplist},
        {value: "歌单", to: "/discover/playlist", component: Playlist, className: styles.copyright},
        {value: "主播电台", to: "/discover/djradio", component: Djradio},
        {value: "歌手", to: "/discover/artist", component: Artist},
        {value: "新碟上架", to: "/discover/album", component: Album}
      ],
      active: "推荐"
    };
  }
  componentDidMount() {
  }

  changeActive = (val) => {
    this.setState({
      active: val
    })
  }
  render() {
    return <div style={{position: "relative",paddingTop: "34px"}}>
      <div className={styles.tags}>
        <ul className="container">
          { this.state.tags.map((item, index) => {
            return <li key={index}>
              <Link 
              to={item.to} 
              onClick={this.changeActive.bind(this, item.value)} 
              className={
                [this.state.active == item.value ? "cur" : null] + " " +
                item.className
                }>
                {item.value}
              </Link>
            </li>
          })}
        </ul>
      </div>
      <Switch>
        {this.state.tags.map((item, index) => {
          return <Route exact key={index} path={item.to} component={item.component}></Route>
        })}
      </Switch>
    </div>
  }
}