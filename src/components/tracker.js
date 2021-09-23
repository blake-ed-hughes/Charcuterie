import Axios from 'axios';

export default function trackClick (event, module, callback) {
  // console.log(event)
  let body = {
    element: event.target.parentNode.id,
    widget: module,
    time: event.timeStamp.toString()
  };


  Axios({
    method: 'post',
    url: '/api',
    params: {
      urlExt: `interactions`,
    },
    data: body,
    headers: {
      'x-no-compression': true
    }
  })
  .then((response) => {
    // console.log('successfully tracked click!');
  })
  .catch((err) => {console.log('Failed to post tracking info', err)})


  callback(event);
}