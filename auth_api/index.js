const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const status = require('./status/status.js')

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

app.use(function (req, res, next) {   //Midleware
    res.header("Access-Controle-Allow-Origin", "*")
    res.header("Access-Controle-Allow-Headers", "Origin, X-Requested-With-Content-Type, Accept")
    next()
})

module.exports = app
app.get('/',status.go)

let server = app.listen(5510, function () {
    let host = server.address().address
    let port = server.address().port
    console.log(`Running at ${host}:${port}`)

})

