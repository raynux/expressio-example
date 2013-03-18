(function() {
  var app, express;

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

}).call(this);
