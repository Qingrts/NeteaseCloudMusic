import React from 'react';

export default class Store extends React.Component{
  constructor(props)　{
    super(props);

    this.state = {
      current: 3,
    };
  }


  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
  };

  render() {
    return <div>
      Store
    </div>
  }
}