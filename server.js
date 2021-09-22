const express = require('express');
const axios = require('axios');
const API_key = require('./config.js');
const app = express();
const Port = 3000;
const compression = require('compression');
const auth = axios.create({
  headers: {'Authorization': API_key}
})
app.use(express.json());
app.use(compression({ filter: shouldCompress }))

function shouldCompress (req, res) {
  if (req.headers['x-no-compression']) {
    // don't compress responses with this request header
    return false
  }

  // fallback to standard filter function
  return compression.filter(req, res)
}
app.use(express.static('dist'));


app.get('/api', (req,res) => {
  auth.get(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/${req.query.urlExt}`)
  .then((response) => {
    res.status(response.status).send(response.data);
  })
  .catch((err) => {
    res.status(500).end()
  })
})

app.post('/api', (req,res) => {
  auth.post(`https://app-hrsei-api.herokuapp.com/api/fec2/hr-atx/${req.query.urlExt}`, req.body)
  .then((response) => {
    res.status(response.status).send(response.data)
  })
  .catch((err) => {
    res.status(500).end()
  })
})

app.listen(Port, () => {
  console.log('listening on port', Port);
});

