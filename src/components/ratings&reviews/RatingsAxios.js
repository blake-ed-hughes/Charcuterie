import Axios from 'axios';

function getReviews(pid, sortList, reviewCount) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: 'reviews?product_id=' + pid + '&sort=' + sortList + '&count=' + reviewCount
    },
    headers: { 'x-no-compression': true }
  })
}

function getAllReviews(pid, sortList, totalReviewsCount) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: 'reviews?product_id=' + pid + '&sort=' + sortList + '&count=' + totalReviewsCount
    },
    headers: { 'x-no-compression': true }
  })
}

function getReviewsMeta(pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: 'reviews/meta?product_id=' + pid
    },
    headers: { 'x-no-compression': true }
  })
}


export { getReviews, getAllReviews, getReviewsMeta };

//                  -----------------example api request--------------
//https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/reviews?product_id=38322&page=1&count=2&sort=helpful
