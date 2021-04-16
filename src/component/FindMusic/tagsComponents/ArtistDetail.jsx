import React from 'react';

import artistDetailStyles from "../../../css/findmusic/artistDetailStyles.scss";

export default class ArtistDetail extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      area: null,
      hotArtistList: [],
      active: "热门"
    };
    
  }
  componentWillReceiveProps(nextProps) {
    if(nextProps.area && nextProps.type){
      if(nextProps.activeName != this.state.activeName){
        this.setState({
          area: nextProps.area || null,
          active: "热门"
        })
      }
      this.setState({
        area: nextProps.area || null,
        activeName: nextProps.activeName || null,
        type: nextProps.type || null
      })
      this.getArtistListByCharCode({
        type: nextProps.type,
        area: nextProps.area,
        limit: 100
      });
    }else{
      this.setState({
        area: nextProps.area || null
      })
      this.getHotArtistList();
    }
  }
  componentDidMount() {
    this.getHotArtistList();
  }

  getHotArtistList = () => {
    fetch(window.baseUrl + "/top/artists?limit=100")
    .then(res => res.json())
    .then(data => {
      this.setState({
        hotArtistList: data.artists
      })
    })
    .catch(err => err);
  }

  getAZ(){
    var arr = [];
    for(var i = 65; i < 91; i++){
        arr.push(String.fromCharCode(i));
    }
    arr.push("其他");
    arr.unshift("热门");
    return arr;
  }

  getArtistListByCharCode = (obj) => {
    let arr = [];
    for (const key in obj) {
      if(obj[key]){
        arr.push(`${key}=${obj[key]}`)
      }
    }
    fetch(`${window.baseUrl}/artist/list?${arr.join("&")}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        hotArtistList: data.artists
      })
    })
    .catch(err => err);
  }

  render() {
    if(this.state.area == null){
        return <div>
        <h3 className={artistDetailStyles.title}>
          入驻歌手
          <a href="" className={artistDetailStyles.more}>更多&nbsp;&gt;</a>
        </h3>
        <div style={{height: 200, paddingTop: 20}}>
          接口未找到
        </div>
        <h3 className={artistDetailStyles.title}>热门歌手</h3>
        <ul className={artistDetailStyles.artistList}>
          {this.state.hotArtistList.slice(0, 10).map((item) => {
            return <li style={{marginTop: 20}} key={item.id} className={artistDetailStyles.artistItem}>
              <div  className={artistDetailStyles.mark}>
                <img src={item.img1v1Url} alt=""/>
                <a href=""></a>
              </div>
              <p><span>{item.name}</span><i></i></p>
            </li>
          })}
        </ul>
        <ul className={artistDetailStyles.artistListDesc}>
          {this.state.hotArtistList.slice(10, 100).map((item, index) => {
            return <li key={index}>
              <p><span>{item.name}</span><i></i></p>
            </li>
          })}
        </ul>
      </div>
    }else{
      return <div>
        <h3 className={artistDetailStyles.title}>{this.state.activeName}</h3>
        <ul className={artistDetailStyles.orderLetter}>
          {this.getAZ().map((item, index) => {
            return <li key={index}>
              <a href="#" className={this.state.active==item ? artistDetailStyles.active : ""} onClick={() => {
                event.preventDefault();
                if(item == "其他"){
                  return;
                }
                this.setState({
                  active: item
                });
                if(item.match(/[A-Z]/g)){
                  this.getArtistListByCharCode({
                    type: this.state.type,
                    area: this.state.area,
                    initial: item,
                    limit: 100
                  });
                }else if(item == "热门"){
                  this.getArtistListByCharCode({
                    type: this.state.type,
                    area: this.state.area,
                    limit: 100
                  });
                }
              }}>{item}</a> 
            </li>
          })}
        </ul>
        <ul className={artistDetailStyles.artistList}>
          {this.state.hotArtistList.slice(0, 10).map((item) => {
            return <li style={{marginTop: 20}} key={item.id} className={artistDetailStyles.artistItem}>
              <div  className={artistDetailStyles.mark}>
                <img src={item.img1v1Url} alt=""/>
                <a href=""></a>
              </div>
              <p><span>{item.name}</span><i></i></p>
            </li>
          })}
        </ul>
        <ul className={artistDetailStyles.artistListDesc}>
          {this.state.hotArtistList.slice(10, 100).map((item, index) => {
            return <li key={index}>
              <p><span>{item.name}</span><i></i></p>
            </li>
          })}
        </ul>
      </div>
    }
  }
}