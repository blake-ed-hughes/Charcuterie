import Axios from 'axios';
import API_key from '../config';

function getProduct (pid) {
  return Axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${pid}`,
    headers: {'Authorization': API_key}
  })
}

function getProductStyles (pid) {
  return Axios({
    method: 'get',
    url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/products/${pid}/styles`,
    headers: {'Authorization': API_key}
  })
}

export {getProduct, getProductStyles};