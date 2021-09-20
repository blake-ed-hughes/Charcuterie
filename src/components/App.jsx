import React from 'react';
import Overview from './ProductOverview.jsx';
import Questions from './qa/QnA.jsx';
import Ratings from './ratings&reviews/RatingsAndReviews.jsx';
import Grid from '@material-ui/core/Grid';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      productId: 38322
    });
  }

  render() {
    return (
      <main>
        <Grid container justifyContent="space-evenly" spacing={3} padding={3} direction="column">
          <Grid item xs container>
            <Overview productId={this.state.productId}/>
          </Grid>
          <Grid item xs container>
            <Questions productId={this.state.productId}/>
          </Grid>
          <Grid item xs container>
            <span id='ratings'></span>
            <Ratings productId={this.state.productId}/>
          </Grid>
        </Grid>
      </main>
    );
  }
}

export default App;