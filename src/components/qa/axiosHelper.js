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

// function getQuestions (pid) {
//   return Axios({
//     method: 'get',
//     url: '/api',
//     params: {
//       urlExt: `qa/questions/?product_id=${pid}`
//     },
//     headers: {
//       'x-no-compression': true
//     }
//   })
// }

export {getQuestions};

