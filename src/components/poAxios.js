import Axios from 'axios';
import API_key from '../config';

function getProduct (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `products/${pid}`
    }
  })
}

function getProductStyles (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `products/${pid}/styles`
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
    data: {sku_id: sku}
  })

}

function getRating (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `reviews/meta?product_id=${pid}`
    }
  })
}

export {getProduct, getProductStyles, postItemToCart, getRating};