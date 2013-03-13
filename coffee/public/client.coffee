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

  render: =>
    $('#log').prepend "rendered<br/>"

  fire: ->
    $('#log').prepend "fired<br/>"
    @socket.emit 'ready',
      name: 'Ray'
      age: 32


$ ->
  fooView = new FooView()
