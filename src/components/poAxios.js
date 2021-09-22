import Axios from 'axios';
import API_key from '../config';

function getProduct (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `products/${pid}`
    },
    headers: {
      'x-no-compression': true
    }
  })
}

function getProductStyles (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `products/${pid}/styles`
    },
    headers: {
      'x-no-compression': true
    }
  })
}

function postItemToCart (sku) {
  return Axios({
    method: 'post',
    url: '/api',
    params: {
      urlExt: `cart`,
    },
    data: {sku_id: sku},
    headers: {
      'x-no-compression': true
    }
  })
}

function getRating (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `reviews/meta?product_id=${pid}`
    },
    headers: {
      'x-no-compression': true
    }
  })
}

export {getProduct, getProductStyles, postItemToCart, getRating};