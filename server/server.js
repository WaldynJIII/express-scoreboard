let PORT = 5000;

let players = [
    {name: 'Luke'},
    {name: 'Shelly'},
    {name: 'Vader'}
];

let battles = [];

// ref our packages
let express = require('express');
let bodyParser = require('body-parser');

// Create an express app instance & ref it with 'app'
let app = express();

// Listen for requests
app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
})

// Use the stuff in server/public as the default route '/' (or something like that)
app.use(express.static('server/public'));

// This line performs black magic and is very important. don't delete or move it.
app.use(bodyParser.urlencoded({extended: true}));

// route to send player info to client
app.get('/players', (req, res) => {

    res.send(players);
})

// route to add new battle data from client
app.post('/battle', (req, res) => {
    battles.push(req.body);
    console.log('we got data through /battle:', req.body);
    res.sendStatus(200);
})

// route to add new player from client
app.post('/new-player', (req, res) => {

    console.log('server has recieved new player ' + req.body.name);
    

    // the data being sent to this route SHOULD
    // be the player object, so we can just push that
    // right into the array of players.
    players.push(req.body);

    res.sendStatus(201);
})

app.get('/battle', (req,res) => {
    res.send(battles)
});