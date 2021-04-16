import React from 'react';
import {Link} from "react-router-dom";

import styles from "../../../css/findmusic/recommend.scss";

import Banners from "../../commonComponent/Banners.jsx";
import PlayListItem from "../../commonComponent/PlayListItem.jsx";
import NewAlbumList from "../../commonComponent/NewAlbumList.jsx";

import { Spin, Modal } from "antd";

export default class Recommmend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // 标签列表
      tags: [],
      // 热门推荐部分 歌单列表
      recommendList: [],
      singerList: [],
      // 热门主播列表
      anchorList: [],
      // 最新专辑列表
      albumList: [],
      // 榜单列表(多个)
      topList: [{songs: []},{songs: []},{songs: []}],
      isModalVisible: false
    };
  }
  

  componentDidMount() {
    this.getTags();           // 获取热门歌曲标签
    this.getRecommendList();  // 获取推荐歌曲和电台
    this.getSingerlist();     // 获取入驻歌手
    this.getanchorList();     // 获取热门主播 
    this.getToplist();        // 获取榜单
  }

  // 获取热门歌曲标签
  getTags = () => {
    fetch(window.baseUrl + "/playlist/hot").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({
        tags: data.tags.splice(0, 5)
      })
    }).catch(err => {
      console.log(err);
    })
  }

  getRecommendList = () => { // 获取热门推荐歌曲
    fetch(window.baseUrl + "/personalized?limit=8").then((response) => {
      return response.json();
    }).then(data => {
      // 请求成功之后获取5首歌曲,再请求 获取3个热门推荐电台
      let recommendList = data.result.slice(0, 4)
      recommendList = recommendList.concat(data.result.slice(7))
      // 获取热门推荐电台
      fetch(window.baseUrl + "/personalized/djprogram").then((response) => {
        return response.json();
      }).then(data => {
        this.setState({
          recommendList: recommendList.concat(data.result.splice(0, 3))
        })
      }).catch(err => {
        console.log(err);
      })
    }).catch(err => {
      console.log(err);
    })
  }

  // 获取歌手列表 (数据是错误的,接口未找到) 待修改
  getSingerlist = () => {
    fetch(window.baseUrl + "/artist/list?type=-1&area=-1&limit=6").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({singerList: data.artists})
    }).catch(err => {
      console.log(err);
    })
  }

  // 获取主播电台列表 (数据是错误的,接口未找到) 待修改
  getanchorList = () => {
    fetch(window.baseUrl + "/dj/toplist/popular?limit=6").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({anchorList: data.data.list})
    }).catch(err => {
      console.log(err);
    })
  }

  // 人数格式化 n/n万/n亿
  numberFormat = (num) => {
    if (num > 10000) {
      return parseInt(num / 10000) + "万"
    } else {
      return num;
    }
  }

  // 获取榜单
  getToplist = () => {
    fetch(window.baseUrl + "/toplist").then(response => {
      return response.json();
    }).then(data => {
      let toplist = data.list.splice(0, 3);
      this.getData(toplist, 0);
      this.getData(toplist, 1);
      this.getData(toplist, 2);
    }).catch(err => {
      console.log(err);
    })
  }

  // 封装获取每个榜单前10首歌的方法
  getData = (toplist, index) => {
    fetch(window.baseUrl + "/playlist/detail?id=" + toplist[index].id)
    .then(response => {
      return response.json();
    })
    .then((data) => {
      let ids = data.playlist.trackIds.splice(0, 10).map(item => item.id).join(",");
      fetch(window.baseUrl + "/song/detail?ids=" + ids).then(res => {
        return res.json();
      }).then(songs => {
        toplist[index].songs = songs.songs
        this.setState({
          topList: toplist,
        });
      }).catch(error => {
        console.log(error);
      })
    })
    .catch((err) => {
      console.log(err);
    })
  }


  // 点击登录时,模态窗口显示
  showModal = () => {
    this.setState({
      isModalVisible: true
    })
  };
  // 点击登录,验证信息
  login = () => {
    
  }


  enter = () => {
    this.setState({
      email: event.target.value
    })
  }
  enterPassword = () => {
    this.setState({
      password: event.target.value
    })
  }

  login = () => {
    fetch(window.baseUrl + "/login?email=xxx@163.com&password=yyy")
    .then(res => res.json())
    .then(data => {
      console.log(data);
    })
  }

  render() { 
    return <div>
      <Banners/>
      <div className={
        styles.container
      }>
        <div className={styles.container_left}>
          <div className="outbox"
            style={{marginBottom: "40px"}}>
            <div className={
              styles.recommend
            }>
              <a href="#">热门推荐</a>
              <ul className={styles.tags}>
                {this.state.tags.map((item, index) => {
                  return <li key={index}>
                    <Link to={
                      {pathname: "/discover/playlistdetail",state: {category: item.category}}
                    }>
                      {
                      item.name
                    }</Link>
                  </li>
                })
                } 
              </ul>
              <Link to={{pathname: "/discover/playlist"}} className={
                styles.more
              }>更多</Link>
            </div>
            {this.state.recommendList.length == 0 ? <Spin tip="加载中..."/> :
            <ul className={styles.recommendList + " playitemStyle"}>
              {this.state.recommendList.map((item, index) => {
                if(item.type == 0){
                  return <Link key={index} to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}>
                    <PlayListItem {...item} />
                  </Link>
                }else{
                  return <Link key={index} to={{pathname: "/discover/djradioprogram", state: {id: item.id}}}>
                    <PlayListItem {...item} />
                  </Link>
                }
                
                })
              } 
            </ul>
            }
          </div>
          <div className="outbox">
            <div className={
              styles.recommend
            }>
              <a href="#">新碟上架</a>
              <span className={
                styles.tags
              }></span>
              <Link to={{pathname: "/discover/album"}} className={
                styles.more
              }>更多</Link>
            </div>
            {this.state.recommendList.length == 0 ? <Spin tip="加载中..."/> : <NewAlbumList /> }
          </div>
          <div className="outbox">
            <div className={
              styles.recommend
            }>
              <a href="#">榜单</a>
              <span className={
                styles.tags
              }></span>
              <Link to={{pathname: "/discover/toplist"}} className={
                styles.more
              }>更多</Link>
            </div>
            {this.state.topList.length == 0 ? <Spin tip="加载中..."/> : 
            <div className={
              styles.toplist
            }>
              {this.state.topList.map((item, index) => {
                return <dl className={styles.surge} key={index}>
                  <dt>
                    <img src={item.coverImgUrl} alt=""/>
                    <div>
                      <h2>{item.name}</h2>
                      <p>
                        <a className={styles.play} href=""><i></i></a>
                        <a className={styles.collect} href=""><i></i></a>
                      </p>
                    </div>
                  </dt>
                  { this.state.topList[index]["songs"] !== undefined ? this.state.topList[index]['songs'].map((s, i) => {
                    return <dd key={i} className="musicItem">
                      <span>{i + 1}</span>
                      <Link to={{pathname: "/discover/songdetail", state: {id: s.id}}} className={styles.musicName + " " + "musicName"}>{s.name}</Link>
                      <div className={styles.iconGroup + " " + "iconGroup"}>
                        <a href="#" className={styles.playMusic} title="播放"></a>
                        <a href="#" className={styles.addToList} title="添加到播放列表"></a>
                        <a href="#" className={styles.collectMusic} title="收藏"></a>
                      </div>
                    </dd>;
                  }) : null}
                  <dd className="musicItem">
                    <Link to={{pathname: "/discover/toplist", state: {index: index}}} style={{float: "right", textAlign: "right"}} className={styles.musicName} href="#">查看全部&gt;</Link>
                  </dd>
                </dl>
              })}
            </div>
            }
          </div>
        </div>
        <div className={
          styles.container_right
        }>
          <div className={
            styles.login
          }>
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <button onClick={this.showModal}>用户登录</button>
            <Modal title="邮箱登录" visible={this.state.isModalVisible} onOk={this.login}>
              邮箱:<input style={{border: "1px solid #f00"}} onChange={this.enterEmail} type="text" name="email" id=""/>
              <br /><br />
              密码:<input style={{border: "1px solid #f00"}} onChange={this.enterPassword} type="password" name="password" id=""/>
            </Modal>
          </div>
          <div className={
            styles.singer
          }>
            <h3>入驻歌手<a href="#">查看更多 &gt;</a>
            </h3>
            <ul style={
              {
                width: "100%",
                overflow: "hidden"
              }
            }>
              {
              this.state.singerList.map((item, index) => {
                return <li key={index}
                  className={
                    styles.songerItem
                }>
                  <img src={
                      item.picUrl
                    }
                    alt=""/>
                  <div>
                    <h3>{
                      item.name
                    }</h3>
                    <p>{
                      item.name
                    }</p>
                  </div>
                </li>
            })
            } </ul>
            <a href="#"
              className={
                styles.applyFor
            }>
              申请成为网易音乐人
              <i></i>
            </a>
          </div>
          <div className={styles.singer + " " + styles.anchor}>
            <h3>热门主播</h3>
            <ul style={{width: "100%",overflow: "hidden"}}>
              {this.state.anchorList.map((item, index) => {
                return <li key={index}className={styles.songerItem + " " + styles.anchorItem}>
                  <img src={item.avatarUrl}alt=""/>
                  <div>
                    <h3>{item.nickName}</h3>
                    <p>{item.nickName}</p>
                  </div>
                </li>
                })
              } 
            </ul>
          </div>
        </div>
      </div>
    </div>
  }
}
