#!/usr/bin/env node
#
#
# Take arguments
#
commander = require 'commander'
commander
  .option('-c, --cluster', 'Run as a cluster')
  .parse(process.argv)


#
# Worker process
#
workerProc = ->
  # Load Libraries
  express = require 'express.io'
  app = module.exports = express()
  app.http().io()

  # Express configuration
  config = require('config')
  app.configure ->
    app.use express.static(__dirname + '/public')
    app.set 'rootDir', __dirname
    app.set 'config', config

  
  # Redis store for scalable io.
  redis = require 'redis'
  app.io.set 'store', new express.io.RedisStore
    redisPub: redis.createClient()
    redisSub: redis.createClient()
    redisClient: redis.createClient()

  # MongoDB
  mongoose = require 'mongoose'
  mongoose.connect config.mongo.server, config.mongo.database
  
  # Expres Routings
  require './routes/index'
  require './routes_io/ready'
  require './routes_io/commands'
      
  # Run HTTP and IO server
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
  
    ###
    cluster.on 'exit', (worker, code, signal)->
      console.log "worker(#{worker.id}).exit #{worker.process.pid}"
  
    cluster.on 'online', (worker)->
      console.log "worker(#{worker.id}).online #{worker.process.pid}"
    ###
  
    cluster.on 'listening', (worker, address)->
      console.log "worker(#{worker.id}).listening #{address.address}:#{address.port}"
  else
    workerProc()

else # non-cluster mode
  console.log 'Running as single process mode.'
  workerProc()
