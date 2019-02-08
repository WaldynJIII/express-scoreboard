let PORT = 5000;

let players = [
    {name: 'Luke'},
    {name: 'Shelly'},
    {name: 'Vader'}
];

// ref the express package
let express = require('express');

// Create an express app instance & ref it with 'app'
let app = express();

// Listen for requests
app.listen(PORT, () => {
    console.log('Running on port ' + PORT);
})

// Use the stuff in server/public as the default route '/' (or something like that)
app.use(express.static('server/public'));

// route to send player info to client
app.get('/players', (req, res) => {

    res.send(players);
})

// route to add new player from client
app.post('/new-player', (req, res) => {

    // the data being sent to this route SHOULD
    // be the player object, so we can just push that
    // right into the array of players.
    players.push(req.body);
})
