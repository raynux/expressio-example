app = module.parent.exports

app.get '/', (req, res)->
  res.sendfile("#{app.set('rootDir')}/public/index.html")
