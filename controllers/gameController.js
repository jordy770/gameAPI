var gameController = function (Game) {

    var post = function (req, res) {
        
        let game = new Game(req.body);
        game._links.self.href = 'http://' + req.headers.host + '/api/' + game._id;
        game._links.collection.href = 'http://' + req.headers.host + '/api/';

        if(!req.body.title||!req.body.developer||!req.body.genre){
            res.sendStatus(400)
            return
        } else {
            game.save(function(err){

                if(err){
                    res.send(err)
                }else{
                res.status(201).json(game);
                }               
            })}
    }

    var get = function (req, res) {

        var query = {};

        if (req.query.genre) {
            query.genre = req.query.genre;
        }
        Game.find(query, function (err, games) {
            if (err)
                res.status(500).send(err);
            else {
                
                let collection = {
                    items:  games,
                    _links: {
                        "self": {
                            "href": 'http://' + req.headers.host + '/api/'
                        }
                    },
                    pagination: {
                        "currentPage": 1,
                        "currentItems": 34,
                        "totalPages": 1,
                        "totalItems": 34,
                        "_links": {
                            "first": {
                                "page": 1,
                                "href": "https://docent.cmi.hro.nl/bootb/demo/notes/"
                            },
                            "last": {
                                "page": 1,
                                "href": "https://docent.cmi.hro.nl/bootb/demo/notes/"
                            },
                            "previous": {
                                "page": 1,
                                "href": "https://docent.cmi.hro.nl/bootb/demo/notes/"
                            },
                            "next": {
                                "page": 1,
                                "href": "https://docent.cmi.hro.nl/bootb/demo/notes/"
                            }
                        }
                    }
                }
            
            // var returnGames = games;
            // games.forEach(function (element, index, array) {
            //     var newGame = element.toJSON();
            //     newGame.links = {};
            //     newGame.links.self = 'http://' + req.headers.host + '/api/' + newGame._id
            //     returnGames.push(newGame);
            // });
            // res.json(returnGames);
            res.json(collection);
        };
        
    });
}



return {
    post: post,
    get: get
    }
}


module.exports = gameController;