app = module.parent.exports

app.get '/', (req, res)->
  res.sendfile("#{app.get('rootDir')}/public/index.html")
