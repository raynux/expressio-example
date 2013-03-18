app = module.parent.exports

# Socket.IO Server
app.io.route 'ready', (req)->
  console.log req.data

  #req.io.emit 'talk',
  #req.io.broadcast 'talk',
  app.io.broadcast 'talk',
    message: "Aw!"
