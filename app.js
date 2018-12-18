let express = require('express'),
    mongoose = require('mongoose'),
    bodyParser = require('body-parser');

let db = mongoose.connect('mongodb://localhost/gameapi');

let Game = require('./models/gameModel');

let app = express();

let port = process.env.PORT || 8000;

app.options("/api", function(req, res, next){
    res.header('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
    res.header('Allow', 'GET,POST,OPTIONS')
    res.send(200);
  });

  app.options("/api/:gameId", function(req, res, next){
    res.header('Access-Control-Allow-Methods', 'GET,PUT,DELETE,OPTIONS');
    res.header('Allow', 'GET,PUT,DELETE,OPTIONS')
    res.send(200);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function(req,res,next){
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Accept, Authorization, Content-Length, X-Requested-With');
    if(req.accepts('json')){
        next()
        return;
    }
    res.sendStatus(404)
})

gameRouter = require('./Routes/gameRoutes')(Game);


app.use('/api', gameRouter);


app.get('/', function(req, res){
    res.send('welcome to my API')
});

app.listen(port, function(){
    console.log('Gulp is running on Port:' + port);
});

