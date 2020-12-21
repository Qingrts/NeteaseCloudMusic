import React from 'react';

export default class Playlist extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {};
  }

  componentDidMount() {
    // console.log(this.props.match.params.id);
    // console.log(this.props.location.query.id);
  }

  render() {
    return <div>
      playlist
      {/* {this.props.location.query.id} */}
    </div>
  }
}