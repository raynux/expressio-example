cluster = require 'cluster'

if cluster.isMaster
  for cpuNum in [0 .. require('os').cpus().length]
    cluster.fork()

  cluster.on 'exit', (worker, code, signal)->
    console.log "worker(#{worker.id}).exit #{worker.process.pid}"

  cluster.on 'online', (worker)->
    console.log "worker(#{worker.id}).online #{worker.process.pid}"

  cluster.on 'listening', (worker, address)->
    console.log "worker(#{worker.id}).listening #{address.address}:#{address.port}"

else
  express = require 'express.io'
  app = module.exports = express()
  
  app.http().io() # Run HTTP and IO server
  
  # Static files
  app.configure ->
    app.use(express.static(__dirname + '/public'))
    app.set 'rootDir', __dirname
  
  
  # HTTP routings
  require './routes/index'
  require './routes_io/ready'
  require './routes_io/commands'
      
  # Listen
  app.listen(process.env.PORT || 8080)
