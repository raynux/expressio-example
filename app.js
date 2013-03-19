(function() {
  var app, cluster, cpuNum, express, redis, _i, _ref;

  cluster = require('cluster');

  redis = require('redis');

  if (cluster.isMaster) {
    for (cpuNum = _i = 0, _ref = require('os').cpus().length; 0 <= _ref ? _i <= _ref : _i >= _ref; cpuNum = 0 <= _ref ? ++_i : --_i) {
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
    express = require('express.io');
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
    app.listen(process.env.PORT || 8080);
  }

}).call(this);
