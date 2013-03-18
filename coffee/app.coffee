express = require('express.io')
app = module.exports = express()

app.http().io() # Run HTTP and IO server

# Static files
app.configure ->
  app.use(express.static(__dirname + '/public'))
  app.set 'rootDir', __dirname


# HTTP routings
require './routes/index'
require './routes_io/ready'
require './routes_io/commands'
    
# Listen
app.listen(process.env.PORT || 8080)
