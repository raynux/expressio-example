class FooView extends Backbone.View
  el: 'body'

  initialize: ->
    @socket = window.io.connect()
    @socket.on 'talk', (data)->
      $('#log').prepend "#{data.message}<br/>"
      console.log data

    @render()

  events:
    'click #fire': 'fire'
    'click #create': 'create'
    'click #update': 'update'
    'click #delete': 'delete'

  render: =>
    $('#log').prepend "rendered<br/>"

  create: ->
    @socket.emit 'commands:create',
      command: 'create'

  update: ->
    @socket.emit 'commands:update',
      command: 'update'

  delete: ->
    @socket.emit 'commands:delete',
      command: 'delete'

  fire: ->
    $('#log').prepend "fired<br/>"
    @socket.emit 'ready',
      foo: 'bar'
      buz: 42


$ ->
  fooView = new FooView()
