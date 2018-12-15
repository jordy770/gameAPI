var express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

var db = mongoose.connect('mongodb://localhost/gameapi');

var Game = require('./models/gameModel');

var app = express();

var port = process.env.PORT || 8000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

gameRouter = require('./Routes/gameRoutes')(Game);


app.use('/api/games', gameRouter);


app.get('/', function(req, res){
    res.send('welcome to my API')
});

app.listen(port, function(){
    console.log('Gulp is running on Port:' + port);
});

