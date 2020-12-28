import React from 'react';

import descriptionSyles from "../../css/commonComponentStyles/descriptionStyles.scss";

export default class Description extends React.Component{
  constructor(props)　{
    super(props);

    console.log(this.props);
    this.state = {
      descriptionToggle: false,
      description: this.props.desc,
      startStr: this.props.startStr || ""
    };
  }

  render() {
    if(this.props.type == "album"){
      return <div style={{position: "relative", marginBottom: 50}} >
        {
        (this.state.descriptionToggle == false && this.state.description.length >= 150)
        ? 
        <div className={descriptionSyles.description} style={{fontSize: 12, lineHeight: 2.4, color: "#666", paddingLeft: 25}} dangerouslySetInnerHTML={{__html: this.state.startStr + this.state.description.replace(/\n+/g, "<br />").substr(0, 150) + "..."}}>
        </div>
        :
        <div className={descriptionSyles.description} style={{fontSize: 12, lineHeight: 2.4, color: "#666", paddingLeft: 25}} dangerouslySetInnerHTML={{__html: this.state.startStr + this.state.description.replace(/\n+/g, "<br />")}}></div>
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
    return <div style={{position: "relative"}}>
      {
      (this.state.descriptionToggle == false && this.state.description.length >= 150)
      ? 
      <div className={descriptionSyles.description} dangerouslySetInnerHTML={{__html: this.state.startStr + this.state.description.replace(/\n+/g, "<br />").substr(0, 150) + "..."}}>
      </div>
      :
      <div className={descriptionSyles.description} dangerouslySetInnerHTML={{__html: this.state.startStr + this.state.description.replace(/\n+/g, "<br />")}}></div>
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