express = require('express.io')

app = express()
app.http().io() # Run HTTP and IO server

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
    message: "Aw!"
    
# Listen
app.listen(process.env.PORT || 8080)
