app = module.parent.exports

# Socket.IO Server
app.io.route 'commands',
  create: (req)->
    console.log 'create!'
  update: (req)->
    console.log 'update!'
  delete: (req)->
    console.log 'delete!'
