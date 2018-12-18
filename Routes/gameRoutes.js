let express = require('express');

let routes = function (Game) {
    let gameRouter = express.Router();

    let gameController = require('../controllers/gameController')(Game)
    gameRouter.route('/')
        
        .post(gameController.post)
        .get(gameController.get)

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
            res.json(req.game);
        })

        .put(function(req, res){    
            Game.findById(req.params.gameId,function(err,game){
                if(!req.body.title || !req.body.developer || !req.body.genre){
                     res.sendStatus(400)
                     return
     
                   } else{
                    game.title = req.body.title
                    game.developer = req.body.developer
                    game.genre = req.body.genre
                    game.save(function(err){
                         if(err)
                             res.status(500).send(err)
                         else{
                             res.json(req.game)
                         }
     
                     });
            }})
        })

        .patch(function(req,res){
            if(req.body._id)
                delete req.body._id;

            for(let p in req.body)
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
