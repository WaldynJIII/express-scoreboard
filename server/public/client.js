$(document).ready(onReady);

// this is called when the document is fully loaded
function onReady() {

    // listen for 'add player' button clicks
    $('#addPlayerButton').on('click', addPlayer);

    // listen for clicks on fight button
    $('#fightButton').on('click', doBattle);
    refreshPlayerDisplay();

    // refresh the battles table
    getBattles();
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
    let newPlayer = { name: playerInput.val() };

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
        { method: 'GET', url: '/players' }
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

function randomScore() {
    return Math.round(Math.random() * 750) + 250;

}

function doBattle() {

    // console.log('we are doing battle yay');
    // who is player 1
    let player1 = $('#player1').val();
    // player 1 score
    let playerOneScore = randomScore();

    // who is player 2
    let player2 = $('#player2').val();
    // player 2 score
    let playerTwoScore = randomScore();

    // compare the scores
    let winner = 'tie';
    if (playerOneScore > playerTwoScore) {
        winner = player1;
    }
    else if (playerTwoScore > playerOneScore) {
        winner = player2;
    }

    // create an object for this particular battle
    let thisBattle = {
        p1: player1,
        p2: player2,
        s1: playerOneScore,
        s2: playerTwoScore,
        w: winner
    };

    // post this battle object to the server
    $.ajax({
        type: 'POST',
        url: '/battle',
        data: thisBattle
    }).then(function () {
        console.log('post is good');
        getBattles()
    })
}

function getBattles() {

    $.ajax({
        type: 'GET',
        url: '/battle',
    }).then(function (response) {

        // empty the table
        $('#scoreboardTable').empty()
        response.forEach(function (battle) {
            
            // append each battle to the table
            $('#scoreboardTable').append(`
            <tr>
                <td>${battle.p1}</td>
                <td>${battle.s1} </td>
                <td>${battle.p2}</td>
                <td>${battle.s2} </td>
                <td>${battle.w}</td>
            </tr> 
            `)
        })
    })
}

