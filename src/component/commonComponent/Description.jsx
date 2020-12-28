import React from 'react';

import descriptionSyles from "../../css/commonComponentStyles/descriptionStyles.scss";

export default class Description extends React.Component{
  constructor(props)　{
    super(props);

    console.log(this.props);
    this.state = {
      descriptionToggle: false,
      description: this.props.desc
    };
  }

  render() {
    if(this.props.type == "album"){
      return <div style={{position: "relative", marginBottom: 50}} >
        {
        (this.state.descriptionToggle == false && this.state.description.length >= 150)
        ? 
        <div className={descriptionSyles.description} style={{fontSize: 12, lineHeight: 2.4, color: "#666", textIndent: "2em"}} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.description.replace(/\n+/g, "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;").substr(0, 150) + "..."}}>
        </div>
        :
        <div className={descriptionSyles.description} style={{fontSize: 12, lineHeight: 2.4, color: "#666", textIndent: "2em"}} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.description.replace(/\n+/g, "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")}}></div>
        }
        {
        this.state.description.length > 150 
        ? 
        <a href="#" onClick={(e) => {
          e.preventDefault();
          this.setState({
            descriptionToggle: !this.state.descriptionToggle
          })
        }} className={descriptionSyles.toggle}>{this.state.descriptionToggle == false ? "展开" : "收起"} <i></i></a> 
        : 
        null}
      </div>
        



      return <div style={{fontSize: 12, lineHeight: 2.4, color: "#666", textIndent: "2em"}} dangerouslySetInnerHTML={{
        __html: this.state.description.replace(/\n+/g, "<br />&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;")
      }}></div>
    }
    return <div>
      {
      (this.state.descriptionToggle == false && this.state.description.length >= 150)
      ? 
      <div className={descriptionSyles.description} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.description.replace(/\n/g, "<br />").substr(0, 150) + "..."}}>
      </div>
      :
      <div className={descriptionSyles.description} dangerouslySetInnerHTML={{__html: "介绍 : " + this.state.description.replace(/\n/g, "<br />")}}></div>
      }
      {
      this.state.description.length > 150 
      ? 
      <a href="#" onClick={(e) => {
        e.preventDefault();
        this.setState({
          descriptionToggle: !this.state.descriptionToggle
        })
      }} className={descriptionSyles.toggle}>{this.state.descriptionToggle == false ? "展开" : "收起"} <i></i></a> 
      : 
      null}
    </div>
  }
}