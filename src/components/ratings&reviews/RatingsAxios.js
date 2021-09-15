import Axios from 'axios';
import API_key from '../../config';

function getReviews (pid, sortList, reviewCount) {
  return Axios({
    method: 'get',
    url:'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews?product_id=' + pid + '&sort=' + sortList + '&count=' + reviewCount,
    headers: {'Authorization': API_key}
  })
}

function getAllReviews (pid) {
  return Axios({
    method: 'get',
    url:'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews?product_id=' + pid,
    headers: {'Authorization': API_key}
  })
}

function getReviewsMeta (pid) {
  return Axios({
    method: 'get',
    url:'https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews/meta?product_id=' + pid,
    headers: {'Authorization': API_key}
  })
}

export {getReviews, getAllReviews, getReviewsMeta};

// example api request

//https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews?product_id=38322&page=1&count=2&sort=helpful