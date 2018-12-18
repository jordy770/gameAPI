let gameController = function (Game) {

    let post = function (req, res) {
        
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

    let get = function(req, res){
            const perPage =  10
            const page = req.params.start ||1
            const start = parseInt(req.query.start)
            const limit = parseInt(req.query.limit)

            Game.find({})

            .skip((perPage * page)- perPage)
            .limit(limit)

            .exec(function(err, games){
               Game.count().exec(function(err, count){
                    if(err) return next(err)

                    let maxPage = Math.ceil(count/limit)

                    let paginate = {
                    items: games,

                    _links:{ self: {href: 'http://' + req.headers.host + '/api/'}},

                    pagination: {
                        currentPage: page,
                        currentItems: limit || count ,
                        totalPages: maxPage,
                        totalItems: count,

                        _links: {
                            first: {
                                page: 1,
                                href: 'http://' + req.headers.host + '/api/?start=1$limit=' + limit
                            },
                            last: {
                                page: maxPage,
                                href: 'http://' + req.headers.host + '/api/?start='+ ((count-limit)+1) + "&limit=" + limit
                            },
                            previous: {
                                page: (page - 1) ,
                                href: 'http://' + req.headers.host + '/api/?start='+(start - limit) + "&limit=" + limit
                            },
                            next: {
                                page: (page + 1),
                                href: 'http://' + req.headers.host + '/api/?start='+(start + limit) + "&limit=" + limit
                            }
                        }
                    }
                }
                res.json(paginate)
            })
            })
    
        }

return {
    post: post,
    get: get
    }
}


module.exports = gameController;