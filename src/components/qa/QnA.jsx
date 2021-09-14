import React from 'react';
import { Button } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
// import SearchBar from "material-ui-search-bar";



class QnA extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      productId: 38322
    });
  }

  render() {
    return (
      <Grid container spacing={3}>
        <div>
          here will be a search bar
        </div>
      </Grid>
    );
  }
}

export default QnA;


//<SearchBar
// value={this.state.value}
// onChange={(newValue) => this.setState({ value: newValue })}
// onRequestSearch={() => doSomethingWith(this.state.value)}
// />