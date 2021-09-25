import Axios from 'axios';

import API_key from '../../config';



function getQuestions (pid) {
  return Axios({
    method: 'get',
    url: '/api',
    params: {
      urlExt: `qa/questions/?product_id=${pid}`
    },
    headers: {
      'x-no-compression': true
    }
  })
}

function postQuestion (obj) {
  console.log(obj);
  return Axios({
    method: 'post',
    url: '/api',
    params: {
      urlExt: `qa/questions`
    },
    data: obj,
    headers: {
      'x-no-compression': true
    }
  })
}

function postAnswer (obj, pid) {
  console.log(obj);
  return Axios({
    method: 'post',
    url: '/api',
    params: {
      urlExt: `qa/questions/${pid}/answers`,
    },
    data: obj,
    headers: {
      'x-no-compression': true
    }
  })
}

export {getQuestions, postQuestion, postAnswer};

