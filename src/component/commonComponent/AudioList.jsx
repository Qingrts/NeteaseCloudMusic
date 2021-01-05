import React from 'react';

import audioListStyles from "../../css/commonComponentStyles/audioListStyles.scss";

import format from "../../utils/format";

export default class AudioList extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      song_id: this.props.id || 437605385,
      audioUrl: "",
      songdetail: {
        al: {
          picUrl: ""
        },
        ar: []
      },
      currentTime: 0,
      duration: 0
    };
  }
  componentDidMount() {
    if(this.state.song_id){
      this.getSongURL(this.state.song_id);
      this.getPlaylistDetail(this.state.song_id);
    }

    // 将自己的方法传递给父组件
    this.props.onRef(this);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.id != null){
      this.getSongURL(nextProps.id);
      this.getPlaylistDetail(nextProps.id);
    }
  }


  getPlaylistDetail = (id) => {
    fetch("http://localhost:3000/song/detail?ids=" + id)
    .then(response => response.json())
    .then(data => {
      this.setState({
        songdetail: data.songs[0]
      })
    })
    .catch(err => {
      console.log(err);
    })
  }
  getSongURL = (id) => {
    fetch("http://localhost:3000/song/url?id=" + id)
    .then(res => res.json())
    .then(data => {
      this.setState({
        audioUrl: data.data[0].url
      })
    })
    .catch(err => err);
  }

  volumeMoveChange = () => {
    console.log(event.target.clientX);
  }

  render() {
    return <div className={audioListStyles.audio}>
      <div style={{width: 980, margin: "0 auto", position: "relative", zIndex: 5}}>
        <audio src={this.state.audioUrl} ref="audio" onLoadedMetadata={() => {
          this.setState({
            duration: event.target.duration
          })
        }} onTimeUpdate={() => {
          let timeBuffer = event.target.buffered;
          let duration = event.target.duration;
          if(timeBuffer.length != 0){
            if(timeBuffer.end(timeBuffer.length - 1) != duration){
              this.refs.buffered.style.width = timeBuffer.end(timeBuffer.length - 1) / duration * 100 + "%";
            }else{
              this.refs.buffered.style.width = "100%";
            }
          }
          this.cur.style.width = (event.target.currentTime / duration) * 100 + "%";
          this.setState({
            currentTime: event.target.currentTime
          })
          if(event.target.currentTime == duration){
            this.setState({
              play: false
            });
            this.cur.style.width = "0%";
          }
        }}/>
        <a href="" className={audioListStyles.prevSong}></a>
        <a href="" onClick={(e) => {
          e.preventDefault();
          this.setState({
            play: !this.state.play
          });
          !this.state.play ? this.refs.audio.play() : this.refs.audio.pause();
        }}
        className={audioListStyles.pause + " " + (this.state.play == true && audioListStyles.play)}></a>
        <a href="" className={audioListStyles.nextSong}></a>
        <div  className={audioListStyles.coverImg}>
          <img src={this.state.songdetail.al.picUrl} alt=""/>
          <span></span>
        </div>
        <div className={audioListStyles.duration}>
          <p>
            <span>{this.state.songdetail.name}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            {this.state.songdetail.ar.map((item, index) => {
                return this.state.songdetail.ar.length == index + 1 
                  ? <a href="" key={index}>{item.name}</a>
                  : <span key={index}><a href="">{item.name}</a>&nbsp;/&nbsp;</span>;
                })
              }
          </p>
          <div className={audioListStyles.process} ref="process" onClick={() => {
            let offsetLeft = this.refs.process.getBoundingClientRect().left;
            let currentTime = (event.clientX - offsetLeft) / this.refs.process.offsetWidth;
            this.cur.style.width = currentTime * 100 + "%";
            this.refs.audio.currentTime = currentTime * this.refs.audio.duration;
          }}>
              <div className={audioListStyles.cur} ref={cur => {this.cur = cur}}>
                <span onMouseDown={() => {
                  let startX = this.cur.getBoundingClientRect().left;
                  document.onmousemove= () => {
                    if(event.clientX - startX > this.refs.process.offsetWidth){
                      return false;
                    }
                    let movePercent = (event.clientX - startX) / this.refs.process.offsetWidth;
                    this.cur.style.width = movePercent * 100 + "%";
                    this.setState({
                      currentTime: this.state.duration * movePercent
                    })
                  }
                  event.target.onmouseup = () => {
                    document.onmousemove = null;
                  }
                }}>
                </span>
              </div>
              <div className={audioListStyles.buffered} ref="buffered"></div>
              <div className={audioListStyles.currentTime}>
                <span>{format.durationFormat(this.state.currentTime*1000)}</span>&nbsp;/&nbsp;
                <span>{format.durationFormat(this.state.duration*1000)}</span>
              </div>
          </div>
          
        </div>
        <div className={audioListStyles.audioControls}>
          <span className={audioListStyles.collectSong}></span>
          <span className={audioListStyles.shareSong}></span>
        </div>
        <div className={audioListStyles.controls}>
          <div className={audioListStyles.volumeChange} style={{display: "none"}} ref={volumeBox => {this.volumeBox = volumeBox}}>
            <div className={audioListStyles.volumeProcess} ref={
              volumeSize => {this.volumeSize = volumeSize}} 
              onClick={() => {
                let currentPosition = (this.volumeSize.getBoundingClientRect().top + this.volumeSize.offsetHeight - event.clientY) / this.volumeSize.offsetHeight;
                currentPosition = currentPosition > 1 ? 1 : currentPosition;
                this.refs.audio.volume = currentPosition;
                this.currentVolume.style.height = currentPosition * 100 + "%";
              }}>
              <div className={audioListStyles.currentVolume} ref={currentVolume => {this.currentVolume = currentVolume}}>
                <i className={audioListStyles.volumeAlpha} 
                onMouseDown={() => {
                  let startY = event.clientY;
                  document.onmousemove= () => {
                    let currentPosition = (this.volumeSize.getBoundingClientRect().top + this.volumeSize.offsetHeight - event.clientY) / this.volumeSize.offsetHeight;
                    if(currentPosition > 1 || currentPosition < 0){
                      return false;
                    }
                    this.currentVolume.style.height = currentPosition * 100 + "%";
                    this.refs.audio.volume = currentPosition;
                  }
                  document.onmouseup = () => {
                    document.onmousemove = null;
                  }
                }}></i>
              </div>
            </div>
          </div>
          <span className={audioListStyles.volume} onClick={() => {
            let show = this.volumeBox.style.display;
            this.volumeBox.style.display = show == "none" ? "block" : "none";
          }}>
          </span>
          <span className={audioListStyles.loop}></span>
          <span className={audioListStyles.playSonglist}>
            <span>1</span>
          </span>
        </div>
      </div>
      <div className={audioListStyles.lock}>
        <span className={"nolock" + (this.state.lock ? " lock" : "")} onClick={() => {
          this.setState({
            lock: !this.state.lock
          })
        }}></span>
      </div>
      <div className={audioListStyles.bg}></div>
    </div>
  }
}