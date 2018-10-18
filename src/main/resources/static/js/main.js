"use strict";

var stompClient = null;

function connect(event) {
    var socket = new SockJS("/ws");
    stompClient = Stomp.over(socket);

    stompClient.connect({}, onConnected, onError);
    event.preventDefault();
}

function onConnected() {
    stompClient.subscribe("/speed", updateHandler); // Listen for updates to game state
}

function onError(error) {
    // TODO: Take some action on connection error
}

function updateHandler(payload) {

    var gameState = JSON.parse(payload.body); // TODO: Should the server send the entire game state each time there is an update?

    // Do stuff?

    drawGameBoard(gameState);

}

function drawGameBoard(gameState) {
    // TODO: Draw gameboard's current state
}

function makeMove(event) {
    /*
        TODO: Decide on move encoding, capture onHover events?
           {card: Card, destination: Index}
    */

    var move = null; // Create valid move object
    if (move && stompClient) {
        var command = {
            sender: null,   // TODO: Need to identify players, use session ID?
            move: move,
            type: PLAY
        };
        stompClient.send("/rest/api/game.playCard", {}, JSON.stringify(command));
    }
    event.preventDefault();
}

function drawCard(event) {

    event.preventDefault()
}