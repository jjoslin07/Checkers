/**
 * Game State Data
 */

const board = [
    null, 0, null, 1, null, 2, null, 3, 
    4, null, 5, null, 6, null, 7, null, 
    null, 8, null, 9, null, 10, null, 11, 
    null, null, null, null, null, null, null, null, 
    null, null, null, null, null, null, null, null, 
    12, null, 13, null, 14, null, 15, null, 
    null, 16, null, 17, null, 18, null, 19, 
    20, null, 21, null, 22, null, 23, null 
]

/**
 * Cached Variables 
 * Parses pieceId's and returns the index of that piece's place on the baord
 */

let findPiece = function (pieceId) {
    let parsed = parseInt(pieceId);
    return board.indexOf(parsed);
};

/**
 * DOM references
 */

const cells = document.querySelectorAll("td");
let redPieces = document.querySelectorAll("p");
let blackPieces = document.querySelectorAll("span");
const redTurnText = document.querySelectorAll("red-turn-text");
const blackTurnText = document.querySelectorAll("black-turn-text");
const divider = document.querySelector("#divider");

/**
 * Player Properties
 */

let turn = true;
let redScore = 12;
let blackScore = 12;
let playerPieces;


let selectedPiece  = {
    pieceId: -1,
    indexOfBoardPiece: -1,
    isKing: false,
    seventhSpace: false,
    ninthSpace: false,
    fourteenthSpace: false,
    eighteenthSpace: false,
    minusSeventhSpace: false,
    minusNinthSpace: false,
    minusFourteenthSpace: false,
    minusEighteenthSpace: false
}

/**
 * Initialize event listeners on pieces
 */

function givePiecesEventListeners() {
    if (turn) {
        for (let i = 0; i < redPieces.length; i++) {
            redPieces[i].addEventListener("click", getPlayerPieces);
        }
    } else {
        for (let i = 0; i < blackPieces.length; i++) {
            blackPieces[i].addEventListener("click", getPlayerPieces);
        }
    }
}

/**
 * Hold the length of the players piece count
 */

function getPlayerPieces() {
    if (turn) {
        playerPieces = redPieces;
    } else {
        playerPieces = blackPieces;
    }
    removeCellonclick();
    resetBoarders();
}

/**
 * Removes the attribute onlick
 */

function removeCellonclick() {
    for (let i = 0; i < cells.length; i++) {
        cells[i].removeAttribute("onclick");
    }
}

/**
 * Resets borders to default
 */

function resetBoarders() {
    for (let i = 0; i < playerPieces.length; i++) {
        playerPieces[i].style.border = "1px double white";
    }
    resetSelectedPieceProperties();
    getSelectedPiece();
}

/**
 * Reset selected piece properties
 */

function resetSelectedPieceProperties() {
    selectedPiece.pieceId = -1;
    selectedPiece.pieceId = -1;
    selectedPiece.isKing = false;
    selectedPiece.seventhSpace = false;
    selectedPiece.ninthSpace = false;
    selectedPiece.fourteenthSpace = false;
    selectedPiece.eighteenthSpace = false;
    selectedPiece.minusSeventhSpace = false;
    selectedPiece.minusNinthSpace = false;
    selectedPiece.minusFourteenthSpace = false;
    selectedPiece.minusEighteenthSpace = false;
}

/**
 * Gets ID and index of the board cell its on
 */

function getPlayerPieces() {
    selectedPiece.pieceId = parseInt(event.target.id);
    selectedPiece.indexOfBoardPiece = findPiece(selectedPiece.pieceId);
    isPieceKing();
}

/**
 * Checks if selected piece is a king
 */

function isPieceKing() {
    if (document.getElementById(selectedPiece.pieceId).classList.contains("king")) {
        selectedPiece.isKing = true;
    } else {
        selectedPiece.isKing = false;
    }
    getAvailableSpaces();
}