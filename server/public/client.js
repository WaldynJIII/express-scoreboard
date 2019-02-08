$(document).ready(onReady);

// this is called when the document is fully loaded
function onReady() {

    // listen for 'add player' button clicks
    $('#addPlayerButton').on('click', addPlayer);

    refreshPlayerDisplay();
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
    
    console.log('refreshing player display');
    
    // fetch the data from the server
    $.ajax( 
        { method: 'GET', url: '/players'}
    ).then(rebuildPlayerList);
}

function rebuildPlayerList(playerArray) {

    // clear old stuff from the list
    let playerList = $('#playerList');
    playerList.empty();
    // refresh the dropdowns
    let dropdowns = $('.playerDropdown');
    dropdowns.empty();

    // add new player info into the list at the top
    for (player of playerArray) {

        // add players to playerlist
        playerList.append( 
            `<div class="player">${player.name}</div>`);

        // add players to dropdowns
        dropdowns.append(`
        <option value="${player.name}">${player.name}</option>`);
    }




}

