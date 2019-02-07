class Player {
    constructor(name) {
        this.name = name;
    }
}

let players = [
    new Player('Greg'),
    new Player('Luke'),
    new Player('Vader'),
    new Player('Leia')
];

$(document).ready(onReady);

// this is called when the document is fully loaded
function onReady() {

    // listen for 'add player' button clicks
    $('#addPlayerButton').on('click', addPlayer);

}

// Uses the input field in the player creator div
// to add a new player object
function addPlayer() {

    let playerInput = $('#playerInput');

    // alert the user if no name was entered
    if (playerInput.val() == '') {
        window.alert('Please enter a player name!');
        return;
    }

    // create a new player using the input field, add it to the list of players
    let newPlayer = new Player(playerInput.val());
    players.push(newPlayer);

    // clear the input field
    playerInput.val('');
}

function refreshPlayerDisplay() {
    // TODO the things
}

