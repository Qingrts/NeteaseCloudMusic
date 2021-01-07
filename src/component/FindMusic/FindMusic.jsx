import React from 'react';
import { Route, Link, Switch, Redirect } from 'react-router-dom';

import Recommend from "./tagsComponents/Recommend.jsx";
import Toplist from "./tagsComponents/Toplist.jsx";
import Playlist from "./tagsComponents/Playlist.jsx";
import Djradio from "./tagsComponents/Djradio.jsx";
import Artist from "./tagsComponents/Artist.jsx";
import Album from "./tagsComponents/Album.jsx";

import PlaylistDetail from "./tagsComponents/PlaylistDetail.jsx";
import AlbumDetail from "./tagsComponents/AlbumDetail.jsx";
import DjradioProgramDetail from "./tagsComponents/DjradioProgramDetail.jsx";
import DjradioDetail from "./tagsComponents/DjradioDetail.jsx";
import SongDetail from "./tagsComponents/SongDetail.jsx";

import styles from "../../css/findmusic.scss";

export default class FindMusic extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      tags: [
        {value: "推荐", to: "/discover", component: Recommend},
        {value: "排行榜", to: "/discover/toplist", component: Toplist},
        {
          value: "歌单", 
          to: "/discover/playlist", 
          component: Playlist, 
          className: styles.copyright
        },
        {
          value: "主播电台",
          to: "/discover/djradio", 
          component: Djradio
        },
        {value: "歌手", to: "/discover/artist", component: Artist},
        {value: "新碟上架", to: "/discover/album", component: Album}
      ],
      active: "/discover"
    };
  }
  componentDidMount() {
    this.hashChange();
    window.onhashchange = this.hashChange;
  }

  hashChange = () => {
    let hash = window.location.hash.substr(1);
    hash= hash.indexOf("?") != -1 ? hash.substr(0, hash.indexOf("?")) : hash;
    this.setState({
      active: hash
    })
  }

  changeActive = (val) => {
    if(val == "/discover/djradio" && this.state.active == "/discover/djradio"){
      window.location.reload();
      return;
    }
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
              <Link to={item.to} onClick={this.changeActive.bind(this, item.to)} className={[this.state.active == item.to ? "cur" : null] + " " +item.className}>
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

        <Route exact path="/discover/playlistdetail" component={PlaylistDetail}></Route>
        <Route exact path="/discover/albumdetail" component={AlbumDetail}></Route>
        <Route exact path="/discover/djradioprogram" component={DjradioProgramDetail}></Route>
        <Route exact path="/discover/djradiodetail" component={DjradioDetail}></Route>
        <Route exact path="/discover/songdetail" component={SongDetail}></Route>
      </Switch>
      
    </div>
  }
}