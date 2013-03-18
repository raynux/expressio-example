(function() {
  var FooView, _ref,
    __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
    __hasProp = {}.hasOwnProperty,
    __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

  FooView = (function(_super) {
    __extends(FooView, _super);

    function FooView() {
      this.render = __bind(this.render, this);      _ref = FooView.__super__.constructor.apply(this, arguments);
      return _ref;
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
      'click #fire': 'fire',
      'click #create': 'create',
      'click #update': 'update',
      'click #delete': 'delete'
    };

    FooView.prototype.render = function() {
      return $('#log').prepend("rendered<br/>");
    };

    FooView.prototype.create = function() {
      return this.socket.emit('commands:create', {
        command: 'create'
      });
    };

    FooView.prototype.update = function() {
      return this.socket.emit('commands:update', {
        command: 'update'
      });
    };

    FooView.prototype["delete"] = function() {
      return this.socket.emit('commands:delete', {
        command: 'delete'
      });
    };

    FooView.prototype.fire = function() {
      $('#log').prepend("fired<br/>");
      return this.socket.emit('ready', {
        foo: 'bar',
        buz: 42
      });
    };

    return FooView;

  })(Backbone.View);

  $(function() {
    var fooView;

    return fooView = new FooView();
  });

}).call(this);
