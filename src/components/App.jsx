import React from 'react';
import Overview from './ProductOverview.jsx';
import Questions from './qa/QnA.jsx';
import Ratings from './ratings&reviews/RatingsAndReviews.jsx';
import Header from './Header.jsx';
import Grid from '@material-ui/core/Grid';
import Axios from 'axios';
import API_key from '../config';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = ({
      productId: 38322
    });
    this.onSearch = this.onSearch.bind(this);
  }

  onSearch(pid) {
    Axios({
      method: 'get',
      url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${pid}`,
      headers: {'Authorization': API_key}
    })
    .then((response) => {
      if(response.data) {
        console.log(response.data)
        this.setState({
          productId: pid
        })
      } else {
        throw err;
      }
    })
    .catch((err)=>{alert('invalid Product Id')})
  }

  render() {
    return (
      <div>
        <Header onSearch={this.onSearch}/>
        <Grid container justifyContent="space-evenly" alignItems="center" spacing={3} padding={3} direction="column">
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
      </div>
    );
  }
}

export default App;