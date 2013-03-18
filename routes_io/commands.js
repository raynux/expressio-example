(function() {
  var app;

  app = module.parent.exports;

  app.io.route('commands', {
    create: function(req) {
      return console.log('create!');
    },
    update: function(req) {
      return console.log('update!');
    },
    "delete": function(req) {
      return console.log('delete!');
    }
  });

}).call(this);
