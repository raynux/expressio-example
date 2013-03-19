(function() {
  var cluster, express, redis, workerProc, _i, _ref;

  redis = require('redis');

  express = require('express.io');

  workerProc = function() {
    var app;
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

  cluster = require('cluster');

  if (cluster.isMaster) {
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

}).call(this);
