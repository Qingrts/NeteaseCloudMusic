import React from 'react';

import artistStyles from "../../../css/findmusic/artistStyles.scss";


import ArtistDetail from "./ArtistDetail.jsx";

export default class Artist extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      activeName: "推荐歌手",
      area: "",
      artistCategory: [
        {
          name: "推荐",
          type: "",
          tags: [
            {name: "推荐歌手", type: ""},
            {name: "入驻歌手", type: ""},
          ]
        },
        {
          name: "华语",
          area: 7,
          tags: [
            {name: "华语男歌手",type: 1,},
            {name: "华语女歌手",type: 2,},
            {name: "华语组合乐队",type: 3,}
          ]
        },
        {
          name: "欧美",
          area: 96,
          tags: [
            {name: "欧美男歌手",type: 1,},
            {name: "欧美女歌手",type: 2,},
            {name: "欧美组合乐队",type: 3,}
          ]
        },
        {
          name: "日本",
          area: 8,
          tags: [
            {name: "日本男歌手",type: 1,},
            {name: "日本女歌手",type: 2,},
            {name: "日本组合乐队",type: 3,}
          ]
        },
        {
          name: "韩国",
          area: 16,
          tags: [
            {name: "韩国男歌手",type: 1,},
            {name: "韩国女歌手",type: 2,},
            {name: "韩国组合乐队",type: 3,}
          ]
        },
        {
          name: "其他",
          area: 0,
          tags: [
            {name: "其他男歌手",type: 1,},
            {name: "其他女歌手",type: 2,},
            {name: "其他组合乐队",type: 3,}
          ]
        }

      ]
    };
    

  }
  componentDidMount(){
    
  }

  render() {
    return <div className={artistStyles.container}>
      <div className={artistStyles.left_container}>
        {this.state.artistCategory.map((item, index) => {
          return <div key={index}>
            <h2>{item.name}</h2>
            <ul>
              {item.tags.map((tag, index) => {
                return <li 
                key={index} 
                className={tag.name == this.state.activeName ? artistStyles.active : null}
                onClick={() => {
                  this.setState({
                    activeName: tag.name,
                    area: item.area,
                    type: tag.type
                  })
                }}>{tag.name}</li>
              })}
            </ul>
          </div>
        })}
        
      </div>
      <div className={artistStyles.right_container}>
        <ArtistDetail area={this.state.area} type={this.state.type} activeName={this.state.activeName}/>
      </div>
    </div>
  }
}