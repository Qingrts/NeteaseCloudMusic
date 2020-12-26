import React from 'react';

import CommentsListStyles from "../../css/commonComponentStyles/commentsListStyles.scss";
import format from "../../utils/format.js";

import { Pagination } from "antd";

export default class CommentsList extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      comments: [],
      commentTotal: 0,
      commentCurrentPage: 1,
      playlist_id: 5388470916
    }
  }

  componentDidMount() {
    this.getCommentList(this.state.playlist_id, 0);
  }


  // 获取评论列表
  getCommentList = (id, offset) => {
    fetch("http://localhost:3000/comment/playlist?limit=20&id=" + id + "&offset=" + offset)
    .then(response => {
      return response.json();
    })
    .then(data => {
      console.log(data);
      this.setState({
        comments: data.comments,
        commentTotal: data.total
      })
      console.log(this.state.comments);
    })
    .catch(err => {
      console.log(err);
    })
  }

  // 评论分页
  onChange = page => {
    this.getCommentList(this.state.playlist_id, (page - 1) * 20);
    // this.getCommentList(this.props.location.state.id, (page - 1) * 20);
    this.setState({
      commentCurrentPage: page,
    });
  };

  render() {
    return <div className={CommentsListStyles.playList}>
      <div className={CommentsListStyles.title}>
        <h3>评论</h3>
        <span>共{this.state.commentCount}条评论</span>
      </div>
      <div className={CommentsListStyles.postComment}>
        <img src={"http://s4.music.126.net/style/web2/img/default/default_avatar.jpg?param=50y50"} alt=""/>
        <div style={{flex: "1"}}>
          <div style={{width: "100%", position: "relative"}}>
            <textarea placeholder="评论"></textarea>
            <span className={CommentsListStyles.trigon}></span>
          </div>
          <div className={CommentsListStyles.commentButton}>
            <i></i>
            <i></i>
            <div>
              <span>140</span>
              <a href="">评论</a>
            </div>
          </div>
        </div>
      </div>
      <div className={CommentsListStyles.commentList}>
        <h4 className={CommentsListStyles.subtitle}>最新评论({this.state.commentCount})</h4>
        {/* 渲染评论列表 */}
        <ul>
          {this.state.comments.map((item, index) => {
            return <li key={index}>
              <div className={CommentsListStyles.commentItem} >
                <img src={item.user.avatarUrl} style={{width: 50, height: 50}} alt=""/>
                <div style={{flex: "1",paddingLeft: "10px"}}>
                  <div className={CommentsListStyles.commentNickname}>
                    <a href="#" className={CommentsListStyles.nickname}>{item.user.nickname}</a>&nbsp;
                    {item.user.vipRights ? <img style={{width: 35, height: 12, position: "relative", top: -2}} src="//p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4213922817/9124/a83c/7eb7/6d7d81b608bfb56d7fb286bd8eb72346.png"/> : ""}
                    ：{item.content}
                  </div>
                  {item.beReplied.length > 0 && item.beReplied.map((replied, index) => {
                      return <div className={CommentsListStyles.replied} key={index}>
                        <a href="#" className={CommentsListStyles.nickname}>{replied.user.nickname}</a>&nbsp;&nbsp; :
                        {replied.content}
                      </div>
                  })}
                  <div className={CommentsListStyles.commentContent}>
                    <span className={CommentsListStyles.commentDate}>{format.commentDateFormat(item.time)}</span>
                    <div className={CommentsListStyles.commentLikeAndReply}>
                      <a href="" className={CommentsListStyles.likeCount}><i></i>&nbsp;
                        {item.likedCount && item.likedCount >= 0 ? "(" + item.likedCount + ")" : ""}
                      </a>
                      <a href="" className={CommentsListStyles.commentReply}>回复</a>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          })}
        </ul>
        {this.state.commentTotal > 20 
        ? 
        <Pagination 
        style={{textAlign: "center"}} 
        current={this.state.commentCurrentPage} 
        onChange={this.onChange} 
        showSizeChanger={false} 
        total={(this.state.commentTotal + 1) * 10 / 20} /> : null}
      </div>
    </div>
  }
}