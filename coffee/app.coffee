#!/usr/bin/env node

#
# Take arguments
#
commander = require 'commander'
commander
  .version('0.0.1')
  .option('-c, --cluster', 'Run as a cluster')
  .parse(process.argv)


#
# Worker process
#
workerProc = ->
  # Load Libraries
  redis = require 'redis'
  express = require 'express.io'
  mongoose = require 'mongoose'

  # Connect MongoDB
  mongoose.connect 'localhost', 'test'

  # Run HTTP and IO server
  app = module.exports = express()
  app.http().io()

  # Setup the redis store for scalable io.
  app.io.set 'store', new express.io.RedisStore
    redisPub: redis.createClient()
    redisSub: redis.createClient()
    redisClient: redis.createClient()

  
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


#
# Launching as a single process or a cluster?
#
if commander.cluster # cluster mode
  cluster = require 'cluster'

  if cluster.isMaster
    console.log 'Running as cluster mode.'

    for [1 .. require('os').cpus().length]
      cluster.fork()
  
    cluster.on 'exit', (worker, code, signal)->
      console.log "worker(#{worker.id}).exit #{worker.process.pid}"
  
    cluster.on 'online', (worker)->
      console.log "worker(#{worker.id}).online #{worker.process.pid}"
  
    cluster.on 'listening', (worker, address)->
      console.log "worker(#{worker.id}).listening #{address.address}:#{address.port}"
  else
    workerProc()

else # non-cluster mode
  console.log 'Running as single process mode.'
  workerProc()
