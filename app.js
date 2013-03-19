(function() {
  var app, cluster, express;

  cluster = require('cluster');

  if (cluster.isMaster) {
    cluster.fork();
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
