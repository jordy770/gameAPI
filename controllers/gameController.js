var gameController = function (Game) {

    var post = function (req, res) {
        var game = new Game(req.body);

        game.save();
        res.status(201).send(game);
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

            var returnGames = [];
            games.forEach(function (element, index, array) {
                var newGame = element.toJSON();
                newGame.links = {};
                newGame.links.self = 'http://' + req.headers.host + '/api/games/' + newGame._id
                returnGames.push(newGame);
            });
            res.json(returnGames);
        };
    });
}

return {
    post: post,
    get: get
    }
}


module.exports = gameController;