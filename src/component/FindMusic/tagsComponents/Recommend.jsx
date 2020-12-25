import React from 'react';
import {Link} from "react-router-dom";

import styles from "../../../css/findmusic/recommend.scss";

import {Carousel} from "antd";

export default class Recommmend extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      // banners图列表
      banners: [],
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
      topList: [{songs: []},{songs: []},{songs: []}]
    };
  }

  componentDidMount() {
    this.getBanners();        // 获取首页banner图
    this.getTags();           // 获取热门歌曲标签
    this.getRecommendList();  // 获取推荐歌曲和电台
    this.getSingerlist();     // 获取入驻歌手
    this.getanchorList();     // 获取热门主播 
    this.getAlbumlist();      // 获取最新专辑
    this.getToplist();        // 获取榜单
  }

  // 获取 banners 图
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

  // 获取热门歌曲标签
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

  getRecommendList = () => { // 获取热门推荐歌曲
    fetch("http://localhost:3000/personalized?limit=8").then((response) => {
      return response.json();
    }).then(data => {
      // 请求成功之后获取5首歌曲,再请求 获取3个热门推荐电台
      let recommendList = data.result.slice(0, 4)
      recommendList = recommendList.concat(data.result.slice(7))
      // 获取热门推荐电台
      fetch("http://localhost:3000/personalized/djprogram").then((response) => {
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
    fetch("http://localhost:3000/artist/list?type=-1&area=-1&limit=6").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({singerList: data.artists})
    }).catch(err => {
      console.log(err);
    })
  }

  // 获取主播电台列表 (数据是错误的,接口未找到) 待修改
  getanchorList = () => {
    fetch("http://localhost:3000/dj/toplist/popular?limit=6").then((response) => {
      return response.json();
    }).then(data => {
      this.setState({anchorList: data.data.list})
    }).catch(err => {
      console.log(err);
    })
  }

  // banner图 部分 点击上一页,下一页
  prev() {
    this.carousel.prev();
  }
  next() {
    this.carousel.next();
  }

  // 新碟上架部分,上一页,下一页
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

  // 人数格式化 n/n万/n亿
  numberFormat = (num) => {
    if (num > 10000) {
      return parseInt(num / 10000) + "万"
    } else {
      return num;
    }
  }

  getToplist = () => {
    fetch("http://localhost:3000/toplist").then(response => {
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
    fetch("http://localhost:3000/playlist/detail?id=" + toplist[index].id)
    .then(response => {
      return response.json();
    })
    .then((data) => {
      let ids = data.playlist.trackIds.splice(0, 10).map(item => item.id).join(",");
      fetch("http://localhost:3000/song/detail?ids=" + ids).then(res => {
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

  render() { // 新碟上架部分 跑马灯 配置
    const settings = {
      dots: false,
      infinite: true,
      speed: 1000,
      slidesToShow: 5,
      slidesToScroll: 5,
      initialSlide: 0
    };


    return <div>
      <div ref="bg_img">
        <div className={styles.container} style={{height: "285px",display: "flex",position: "relative"}}>
          <Carousel effect="fade" autoplay dotPosition="bottom"
            beforeChange={
              (function (current, nextSlide) {
                this.refs.bg_img.style = "background: url(" + this.state.banners[nextSlide].pic + ") no-repeat center center;background-size: 6000px;";
              }).bind(this)
            } ref={carousel => {this.carousel = carousel;}} style={{width: "730px",height: "285px",cursor: "pointer"}}>
              {
              this.state.banners.map((item, index) => {
                return <h3 key={index}className={styles.contentStyle}>
                  <img src={item.pic}alt="Image"/>
                </h3>
              })} 
            </Carousel>
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
      <div className={
        styles.container
      }>
        <div className={styles.container_left}>
          <div className={styles.outbox}
            style={{marginBottom: "40px"}}>
            <div className={
              styles.recommend
            }>
              <a href="#">热门推荐</a>
              <ul className={
                styles.tags
              }>
                {
                this.state.tags.map((item, index) => {
                  return <li key={index}>
                    <Link to={
                      {pathname: "/discover/playlistdetail",query: {cat: item.name}}
                    }>
                      {
                      item.name
                    }</Link>
                  </li>
              })
              } </ul>
              <Link to={{pathname: "/discover/playlist"}} className={
                styles.more
              }>更多</Link>
            </div>
            <ul className={
              styles.recommendList
            }>
              {
              this.state.recommendList.map((item, index) => {
                return <li key={index} style={{position: "relative"}}>
                      { 
                      item.type != 1 ? 
                      <Link className={styles.router} to={{pathname: "/discover/playlistdetail", state: {id: item.id}}}/> 
                      : 
                      <Link className={styles.router} to={{pathname: "/discover/djradio", state: {id: item.id}}}/>
                      }
                      <div style={{ paddingTop: "10px",marginTop: "10px", position: "relative"}}>
                        <img src={item.picUrl} alt="" style={{width: 140,height: 140}}/>
                        <span className={styles.cloak}></span>
                        <div className={styles.bottom}>
                          <span className={styles.listenIcon}></span>
                          {
                          item.type == 1 
                          ? 
                          <span>{this.numberFormat(item.program.adjustedPlayCount)}</span> 
                          : 
                          <span>{this.numberFormat(item.playCount)}</span>
                          }
                          <span className={ styles.playIcon}></span>
                        </div>
                      </div>
                      <div style={{margin: "5px 0 30px", lineHeight: "1.2"}}>
                        {item.type == 1 ? <i className={styles.djprogram}></i> : null}
                        <span className={styles.link} style={{color: "#000"}}>{item.name}</span>
                      </div>
                  </li>
            })
            } </ul>
          </div>
          <div className={styles.outbox}>
            <div className={
              styles.recommend
            }>
              <a href="#">新碟上架</a>
              <span className={
                styles.tags
              }></span>
              <span className={
                styles.more
              }>更多</span>
            </div>
            <div className={
              styles.newalbum
            }>
              <button className={
                  styles.leftArrow
                }
                onClick={
                  this.listprev.bind(this)
              }></button>
              <button className={
                  styles.rightArrow
                }
                onClick={
                  this.listnext.bind(this)
              }></button>
              <Carousel className={
                  styles.carouselBox
                }
                {...settings}
                ref={
                  newList => {
                    this.newList = newList;
                  }
              }>
                {
                this.state.albumList.map((item, index) => {
                  return <div key={index} className={styles.albumItem}>
                    <Link to={{pathname: "/discover/albumdetail", state: {id: item.id}}}>
                      <p className={styles.picUrl}><img src={item.picUrl}alt=""/></p>
                      <p className={styles.albumName}>{item.name}</p>
                    </Link>
                    <p className={styles.albumArtists}>{item.artists.map(item => item.name).join(" / ")}</p>
                  </div>
              })
              } </Carousel>
            </div>
          </div>
          <div className={
            styles.outbox
          }>
            <div className={
              styles.recommend
            }>
              <a href="#">榜单</a>
              <span className={
                styles.tags
              }></span>
              <span className={
                styles.more
              }>更多</span>
            </div>
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
                      <a className={styles.musicName + " " + "musicName"} href="#">{s.name}</a>
                      <div className={styles.iconGroup + " " + "iconGroup"}>
                        <a href="#" className={styles.playMusic} title="播放"></a>
                        <a href="#" className={styles.addToList} title="添加到播放列表"></a>
                        <a href="#" className={styles.collectMusic} title="收藏"></a>
                      </div>
                    </dd>;
                  }) : null}
                  <dd className="musicItem">
                    <a style={{float: "right", textAlign: "right"}} className={styles.musicName} href="#">查看全部&gt;</a>
                  </dd>
                </dl>
              })}
            </div>
          </div>
        </div>
        <div className={
          styles.container_right
        }>
          <div className={
            styles.login
          }>
            <p>登录网易云音乐，可以享受无限收藏的乐趣，并且无限同步到手机</p>
            <button>用户登录</button>
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
