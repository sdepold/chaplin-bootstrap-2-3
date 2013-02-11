
/**
 * Module dependencies.
 */

var express = require('express')
  , routes = require('./routes')
  , user = require('./routes/user')
  , http = require('http')
  , path = require('path')
  , Sequelize = require('sequelize')
  , admin     = require('sequelize-admin')

var sequelize = new Sequelize('sequelize_test', 'root')

var User = sequelize.define('User', {
  username: Sequelize.STRING
})

var Project = sequelize.define('Project', {
  title: Sequelize.STRING
})

var app = express();

app.configure(function(){
  app.set('port', process.env.PORT || 3000);
  app.set('views', __dirname + '/views');
  app.set('view engine', 'jade');
  app.use(express.favicon());
  app.use(express.logger('dev'));
  app.use(express.bodyParser());
  app.use(express.methodOverride());
  app.use(admin(sequelize))
  app.use(app.router);
  app.use(express.static(path.join(__dirname, 'public')));
});

app.configure('development', function(){
  app.use(express.errorHandler());
});

app.get('/', function(req, res, next) {
  res.redirect('/admin')
});

sequelize.sync({ force: true }).success(function() {
  http.createServer(app).listen(app.get('port'), function(){
    console.log("Express server listening on port " + app.get('port'));
  })
})
