(function() {
  var app;

  app = module.parent.exports;

  app.get('/', function(req, res) {
    return res.sendfile("" + (app.set('rootDir')) + "/public/index.html");
  });

}).call(this);
