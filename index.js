var express = require('express'),
cors = require('cors'),
compression = require('compression'),
bodyParser = require('body-parser');

var app = express();

//Config views
app.set('view engine','html');
app.set('views','./dist/views');

app.set('port', (process.env.PORT || 5000));

//Cors and init json Middleware
app.use(bodyParser.json('application/json'));
app.use(cors());

//Static files
app.use(compression());
app.use(express.static('./dist'));

app.use(function(req, res){
  res.sendFile(__dirname+'/dist/views/index.html');
});

app.listen(app.get('port'), function() {
  console.log('start',"Node in "+app.settings.env+" mode at http://localhost:" +app.get('port'));
});
