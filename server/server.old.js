var express = require('express'),
    app = express(),
    ejs = require('ejs'),
    path = require("path"),
    Guid = require("guid"),
    io = require('socket.io'),
    bodyParser = require('body-parser');

var ioServer = io.listen(8081),
    clients = [];

var publicsPath = path.join(__dirname, '../app/static');
app.use(express.static(publicsPath));

var componentsPath = path.join(__dirname, '../app/src/components');
app.use(express.static(componentsPath));

app.set('views', path.join(__dirname, '../app/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
    extended: false
}))

// parse application/json 
app.use(bodyParser.json())

var games = {
    'shithead': []
};
app.get('/', function(req, res) {
    res.render('../index.html');
    ioServer.on('connection', function(socket) {
        console.info('New client connected (id=' + socket.id + ').');

        var ip = socket.remoteAddress;
        clients.push(socket);

        socket.emit('news', {
            hello: 'world'
        });

        // When socket disconnects, remove it from the list:
        socket.on('disconnect', function() {
            var index = clients.indexOf(socket);
            if (index != -1) {
                clients.splice(index, 1);
                console.info('Client gone (id=' + socket.id + ').');
            }
        });
    });
})

app.get('/shithead', function(req, res) {
    res.render('shithead/index.html');
})

app.get('/shithead/start', function(req, res) {
    var ip = req.headers['x-forwarded-for'] ||
        req.connection.remoteAddress;

    var data = req.query;

    var shithead = require('./Games/Shithead');
    var users = data.users;

    var game = new shithead(users);
    game.shuffle();
    games.shithead[game.guid] = game;
})


app.listen(8080);
console.log('8080 is the magic port');
