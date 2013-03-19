(function() {
  var cluster, commander, workerProc, _i, _ref;

  commander = require('commander');

  commander.version('0.0.1').option('-c, --cluster', 'Run as a cluster').parse(process.argv);

  workerProc = function() {
    var app, express, mongoose, redis;
    redis = require('redis');
    express = require('express.io');
    mongoose = require('mongoose');
    mongoose.connect('localhost', 'test');
    app = module.exports = express();
    app.http().io();
    app.io.set('store', new express.io.RedisStore({
      redisPub: redis.createClient(),
      redisSub: redis.createClient(),
      redisClient: redis.createClient()
    }));
    app.configure(function() {
      app.use(express["static"](__dirname + '/public'));
      return app.set('rootDir', __dirname);
    });
    require('./routes/index');
    require('./routes_io/ready');
    require('./routes_io/commands');
    return app.listen(process.env.PORT || 8080);
  };

  if (commander.cluster) {
    cluster = require('cluster');
    if (cluster.isMaster) {
      console.log('Running as cluster mode.');
      for (_i = 1, _ref = require('os').cpus().length; 1 <= _ref ? _i <= _ref : _i >= _ref; 1 <= _ref ? _i++ : _i--) {
        cluster.fork();
      }
      cluster.on('exit', function(worker, code, signal) {
        return console.log("worker(" + worker.id + ").exit " + worker.process.pid);
      });
      cluster.on('online', function(worker) {
        return console.log("worker(" + worker.id + ").online " + worker.process.pid);
      });
      cluster.on('listening', function(worker, address) {
        return console.log("worker(" + worker.id + ").listening " + address.address + ":" + address.port);
      });
    } else {
      workerProc();
    }
  } else {
    console.log('Running as single process mode.');
    workerProc();
  }

}).call(this);
