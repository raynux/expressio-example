(function() {
  var app, express;

  express = require('express.io');

  app = express();

  app.http().io();

  app.configure(function() {
    return app.use(express["static"](__dirname + '/public'));
  });

  app.get('/', function(req, res) {
    return res.sendfile(__dirname + '/public/index.html');
  });

  app.io.route('ready', function(req) {
    console.log(req.data);
    return app.io.broadcast('talk', {
      message: "Aw!"
    });
  });

  app.listen(process.env.PORT || 8080);

}).call(this);
