const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')
const app = express()
const Pusher = require('pusher')
const dotenv = require('dotenv')

dotenv.load()

const pusher = new Pusher({
  appId: process.env.pusher_app_id,
  key: process.env.pusher_key,
  secret: process.env.pusher_secret,
  cluster: process.env.pusher_cluster,
  encrypted: true
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.post('/message/send', (req, res) => {
  // 'private' is prefixed to indicate that this is a private channel
  pusher.trigger('private-reactchat', 'messages', {
    message: req.body.message,
    username: req.body.username
  })
  res.sendStatus(200)
})

app.post('/pusher/auth', (req, res) => {
  const socketId = req.body.socket_id
  const channel = req.body.channel_name
  const auth = pusher.authenticate(socketId, channel)
  res.send(auth)
})

app.set('port', (process.env.PORT || 5000))

app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'))
})
