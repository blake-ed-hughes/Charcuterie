import React from 'react';
import Overview from './ProductOverview.jsx';
import Questions from './qa/QnA.jsx';
import Ratings from './RatingsnReviews.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state =({
      productId: 38323
    });
  }

  render(){
    return (
    <main>
      <Overview productId={this.state.productId}/>
      <Questions productId={this.state.productId}/>
      {/* <Ratings productId={this.state.productId}/> */}
    </main>
      );
  }
}

export default App;