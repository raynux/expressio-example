port = 4567
express = require('express.io')

app = express()
app.http().io()

# Static files
app.configure ->
  app.use(express.static(__dirname + '/public'))

# HTTP Server
app.get '/', (req, res)->
  res.sendfile(__dirname + '/public/index.html')


# Socket.IO Server
app.io.route 'ready', (req)->
  console.log req.data
  #req.io.emit 'talk',
  #req.io.broadcast 'talk',
  app.io.broadcast 'talk',
    message: 'io event from an io route on the server'


# Listen
app.listen port
