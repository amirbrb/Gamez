var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var bodyParser = require('body-parser');
var path = require('path');
var ejs = require('ejs');
var cookieParser = require('./utils/cookieParser');
var session = require('client-sessions');
var responseModel = require('./models/response');

var clients = {};
var games = {
    shithead: {
        waiters: []
    }
}

io.on('connection', function(socket) {
    var connectedClient = {
        id: socket.id,
        ip: socket.request.connection.remoteAddress
    };

    clients[socket.id] = connectedClient;

    socket.emit('Hi', {
        id: socket.id
    });

    socket.on('shithead-waiters', function() {
        var waiters = games.shithead.waiters;
        var response = new responseModel(true, {
            waiters: waiters
        });

        socket.emit('shithead-waiters-response', response);
    });

    socket.on('shithead-wait', function(data) {
        var sessionId = socket.id;
        var indexOfSession = games.shithead.waiters.indexOf(sessionId);
        if (indexOfSession == -1) {
            games.shithead.waiters.push(sessionId);
        }
    })

    socket.on('shithead-start', function(data) {
        var shithead = require('./games/shithead');
        var users = data.users;
        var game = new shithead(users);
        game.shuffle();

        var gameData = game.data;
        var firstPlayer = gameData.players[0];
        var myHand;
        var players = [];

        gameData.players.forEach(function(user) {
            players.push({
                id: user.id,
                topThree: user.topThree,
                bottomThree: user.bottomThree,
                currentCards: user.hand
            })
        })

        var response = new responseModel(true, {
            activePlayer: {
                name: firstPlayer.name,
                id: firstPlayer.id
            },
            players: players,
            deck: gameData.deck,
            cardsOnTable: gameData.cardsOnTable
        });

        io.sockets.emit('shithead-start-response', response);
    });

    socket.on('disconnect', function() {
        delete clients[socket.id];
        var index = games.shithead.waiters.indexOf(socket.id);
        if (index > -1)
            games.shithead.waiters.splice(index, 1);
    });
});

var publicsPath = path.join(__dirname, '../app/static');
app.use(express.static(publicsPath));

var componentsPath = path.join(__dirname, '../app/src/components');
app.use(express.static(componentsPath));

app.set('views', path.join(__dirname, '../app/views'));
app.engine('html', ejs.renderFile);
app.set('view engine', 'ejs');

app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(session({
    cookieName: 'session',
    secret: 'gfY',
    duration: 30 * 60 * 1000,
    activeDuration: 5 * 60 * 1000,
}));

app.get('/', function(req, res) {
    res.render('index.html');
});

app.get('/shithead', function(req, res) {
    res.render('shithead/index.html');
});

http.listen(8080, function() {
    console.log('listening on *:8080');
});
