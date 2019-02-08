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
    let newPlayer = {name: playerInput.val()};

    $.ajax(
        {
            method: 'POST',
            url: '/new-player',
            data: newPlayer
        }
    ).then(refreshPlayerDisplay);

    // clear the input field
    playerInput.val('');
}

function refreshPlayerDisplay() {
    // TODO the things
    console.log('refreshing player data, theoretically');
    
}

