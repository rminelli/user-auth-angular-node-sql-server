const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const status = require('./status/status.js')
const login_service = require('./login-service/login-service.js')

app.use(bodyParser.json({ limit: '100mb' }))
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }))

app.use(function (req, res, next) {   //Midleware
    res.header("Access-Control-Allow-Origin", "*")
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
    next()
})

module.exports = app
app.get('/',status.go)
app.post('/do-login',login_service.getLoginData)

let server = app.listen(5510, function () {
    let host = server.address().address
    let port = server.address().port
    console.log(`App listening on ${host}:${port}`)

})

