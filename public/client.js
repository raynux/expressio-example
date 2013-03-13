(function() {
  var FooView,
    _this = this,
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FooView = (function(_super) {

    __extends(FooView, _super);

    function FooView() {
      var _this = this;
      this.render = function() {
        return FooView.prototype.render.apply(_this, arguments);
      };
      return FooView.__super__.constructor.apply(this, arguments);
    }

    FooView.prototype.el = 'body';

    FooView.prototype.initialize = function() {
      this.socket = window.io.connect();
      this.socket.on('talk', function(data) {
        $('#log').prepend("" + data.message + "<br/>");
        return console.log(data);
      });
      return this.render();
    };

    FooView.prototype.events = {
      'click #fire': 'fire'
    };

    FooView.prototype.render = function() {
      return $('#log').prepend("rendered<br/>");
    };

    FooView.prototype.fire = function() {
      $('#log').prepend("fired<br/>");
      return this.socket.emit('ready', {
        name: 'Ray',
        age: 32
      });
    };

    return FooView;

  })(Backbone.View);

  $(function() {
    var fooView;
    return fooView = new FooView();
  });

}).call(this);
