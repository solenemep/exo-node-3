const { calc } = require('./calc')
const express = require('express')

const app = express()

const IP_LOCAL = 'localhost' // my local ip on my network
const PORT = 3333

app.get('/calc/:op/:nb1/:nb2', (req, res) => {
  try {
    const op = req.params.op
    const nb1 = Number(req.params.nb1)
    const nb2 = Number(req.params.nb2)
    const calcul = Number(calc(op, nb1, nb2))
    const result = { op: op, nb1: nb1, nb2: nb2, result: calcul }
    res.type('application/json')
    res.send(JSON.stringify(result, null, 4))
  } catch (e) {
    const op = req.params.op
    const nb1 = Number(req.params.nb1)
    const nb2 = Number(req.params.nb2)
    const error = { op: op, nb1: nb1, nb2: nb2, error: e.message }
    res.type('application/json')
    res.send(JSON.stringify(error, null, 4))
  }
})

// start the server
app.listen(PORT, IP_LOCAL, () => {
  console.log(`Example app listening at http://${IP_LOCAL}:${PORT}`)
})