import Axios from 'axios';

import API_key from '../../config';


// function getQuestions(pid) {
//   return Axios({
//     method: 'get',
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/?product_id=${pid}`,
//     headers: {'Authorization': API_key}
//   })
// }
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

//Answers List
// function getAnswers(pid) {
//   return Axios({
//     method: 'get',
//     url: `https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/qa/questions/?product_id=${pid}/answers`,
//     headers: {'Authorization': API_key}
//   })
// }

export {getQuestions};

