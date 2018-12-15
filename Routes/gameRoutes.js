var express = require('express');

var routes = function (Game) {
    var gameRouter = express.Router();

    var gameController = require('../controllers/gameController')(Game)
    gameRouter.route('/')
        .post(gameController.post)
        .get(gameController.get);

    gameRouter.use('/:gameId', function(req,res,next){
        Game.findById(req.params.gameId, function (err, game) {
            if (err)
                res.status(500).send(err);
            else if(game)
            {
                req.game = game;
                next();
            }
            else
            {
                res.status(404).send('no game found');
            }
        });
    });
    gameRouter.route('/:gameId')
        .get(function (req, res) {

            var returnGame = req.game.toJSON();

            returnGame.links = {};
            returnGame.links.toHome= 'http://' + req.headers.host + '/api/games/';
            res.json(returnGame);
            
        })

        .put(function(req, res){    
            req.game.title = req.body.title;
            req.game.author = req.body.author;
            req.game.genre = req.body.genre;
            req.game.read = req.body.read;
            req.game.save(function(err){
                if (err)
                res.status(500).send(err);
                else{
                    res.json(req.game);
                }
            });
        })

        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(var p in req.body)
            {
                req.game[p] = req.body[p];
            }

            req.game.save(function(err){
                if (err)
                    res.status(500).send(err);
                else{
                    res.json(req.game);
                }
            });
        })
        .delete(function(req,res){
            req.game.remove(function(err){
                if(err)
                    res.status(500).send(err);
                else{
                    res.status(204).send('Removed');
                }
            })
        })
        
    return gameRouter;
};

module.exports = routes;
