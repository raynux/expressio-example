(function() {
  var app;

  app = module.parent.exports;

  app.io.route('ready', function(req) {
    console.log(req.data);
    return app.io.broadcast('talk', {
      message: "Aw!"
    });
  });

}).call(this);
