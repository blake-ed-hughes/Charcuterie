import React from 'react';
import { Button } from '@material-ui/core';
// import SearchBar from "material-ui-search-bar";



class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      productId: 38323
    });
  }

  render() {
    return (

      <div>
        here will be a search bar
      </div>

    );
  }
}

export default QnA;


//<SearchBar
// value={this.state.value}
// onChange={(newValue) => this.setState({ value: newValue })}
// onRequestSearch={() => doSomethingWith(this.state.value)}
// />