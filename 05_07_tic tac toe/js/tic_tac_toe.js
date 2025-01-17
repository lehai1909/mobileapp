"use strict";

let flag = "pen-flag";
let counter = 9;

//
const squares = document.getElementsByClassName("square");

const squareArray = Array.from(squares);
const a_1 = document.getElementById("a_1");
const a_2 = document.getElementById("a_2");
const a_3 = document.getElementById("a_3");
const b_1 = document.getElementById("b_1");
const b_2 = document.getElementById("b_2");
const b_3 = document.getElementById("b_3");
const c_1 = document.getElementById("c_1");
const c_2 = document.getElementById("c_2");
const c_3 = document.getElementById("c_3");
//new game
const newgamebtn_display = document.getElementById("newgame-btn");
const newgamebtn = document.getElementById("btn90");
//win or lose 
const line1 = JudgLine(squareArray, ["a_1", "a_2", "a_3"]);
const line2 = JudgLine(squareArray, ["b_1", "b_2", "b_3"]);
const line3 = JudgLine(squareArray, ["c_1", "c_2", "c_3"]);
const line4 = JudgLine(squareArray, ["a_1", "b_1", "c_1"]);
const line5 = JudgLine(squareArray, ["a_2", "b_2", "c_2"]);
const line6 = JudgLine(squareArray, ["a_3", "b_3", "c_3"]);
const line7 = JudgLine(squareArray, ["a_1", "b_2", "c_3"]);
const line8 = JudgLine(squareArray, ["a_3", "b_2", "c_1"]);
const lineArray = [line1, line2, line3, line4, line5, line6, line7, line8];
let winningLine = null;

const msgtxt1 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text">penguins Attack!</p>';
const msgtxt2 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text">whitebear Attack!</p>';
const msgtxt3 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInRight">Penguins Win!!</p>';
const msgtxt4 = '<p class="image"><img src="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__animated animate__lightSpeedInLeft">WhiteBear Win!!</p>';
const msgtxt5 = '<p class="image"><img src="img/penguins.jpg" width=61px height=61px><img src ="img/whitebear.jpg" width=61px height=61px></p><p class="text animate__bounceIn">Draw!</p>';

//sound
let gameSound = ["sound/click_sound1.mp3","sound/click_sound2.mp3","sound/penwin_sound.mp3","sound/bearwin_sound.mp3","sound/draw_sound.mp3"];

window.addEventListener("DOMContentLoaded", () => {
    setMessage("pen-turn");
});

a_1.addEventListener("click", () => isSelect(a_1));
a_2.addEventListener("click", () => isSelect(a_2));
a_3.addEventListener("click", () => isSelect(a_3));
b_1.addEventListener("click", () => isSelect(b_1));
b_2.addEventListener("click", () => isSelect(b_2));
b_3.addEventListener("click", () => isSelect(b_3));
c_1.addEventListener("click", () => isSelect(c_1));
c_2.addEventListener("click", () => isSelect(c_2));
c_3.addEventListener("click", () => isSelect(c_3));

function JudgLine(targetArray, idArray) {
    return targetArray.filter(function (e) {
        return (e.id === idArray[0] || e.id === idArray[1] || e.id === idArray[2]);
    });
}

function isSelect(selectSquare) {
    if (flag === "pen-flag") {
        let music = new Audio(gameSound[0]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-pen-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("penguins")) {
            setMessage("pen-win");
            gameOver("penguins");
            return;
        }
        setMessage("bear-turn");
        flag = "bear-flag";
    } else {
        let music = new Audio(gameSound[1]);
        music.currentTime = 0;
        music.play();

        selectSquare.classList.add("js-bear-checked");
        selectSquare.classList.add("js-unclickable");
        if (isWinner("bear")) {
            setMessage("bear-win");
            gameOver("bear");
            return;
        }
        setMessage("pen-turn");
        flag = "pen-flag";
    }
    counter--;
    if (counter === 0) {
        setMessage("draw");
        gameOver("draw");
    }
    // console.log(selectSquare.classList); // Kiểm tra class đã được thêm chưa
}

function isWinner(symbol) {
    const result = lineArray.some(function (line) {
        const subResult = line.every(function (square) {
            if (symbol === "penguins") {
                return square.classList.contains("js-pen-checked");
            }
            if (symbol === "bear") {
                return square.classList.contains("js-bear-checked");
            }
        });
        if (subResult) {
            winningLine = line;
        }
        return subResult;
    });
    return result;
}

function setMessage(id) {
    switch (id) {
        case "pen-turn":
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
        case "bear-turn":
            document.getElementById("msgtext").innerHTML = msgtxt2;
            break;
        case "pen-win":
            document.getElementById("msgtext").innerHTML = msgtxt3;
            break;
        case "bear-win":
            document.getElementById("msgtext").innerHTML = msgtxt4;
            break;
        case "draw":
            document.getElementById("msgtext").innerHTML = msgtxt5;
            break;
        default:
            document.getElementById("msgtext").innerHTML = msgtxt1;
            break;
    }
}
function gameOver(status) {

    let w_sound
    switch(status){
        case "penguins":
            w_sound = gameSound[2];
            break;
        case "bear":
            w_sound = gameSound[3];
            break;
        case "draw":
            w_sound = gameSound[4];
            break; 
    }
    let music = new Audio(w_sound);
    music.currentTime = 0;
    music.play();
    squareArray.forEach(function (square) {
        square.classList.add("js-unclickable");
    });
//display button new game
newgamebtn_display.classList.remove("js-hidden");
//
    if (status === "penguins") {
        winningLine.forEach(function (square) {
            square.classList.add("js-pen_highLight");
        });
        $(document).snowfall({
            flakeColor: "rgb(255,240,245)",
            maxSpeed: 3,
            minSpeed: 1,
            maxSize: 20,
            minSize: 10,
            round: true
        });
    }

else if (status === "bear") {
    if (winningLine) {
        winningLine.forEach(function (square) {
            square.classList.add("js-bear_highLight");
        });
    }
    $(document).snowfall({
        flakeColor: "rgb(175,238,238)",
        maxSpeed: 3,
        minSpeed: 1,
        maxSize: 20,
        minSize: 10,
        round: true
        });
    }
}
newgamebtn.addEventListener("click", function(){
    //peguins turn
    flag = "pen-flag";
    //turn left
    counter = 9;
    winningLine = null;
    squareArray.forEach(function (square){
        square.classList.remove("js-pen-checked");
        square.classList.remove("js-bear-checked");
        square.classList.remove("js-unclickable");
        square.classList.remove("js-pen_highLight");
        square.classList.remove("js-bear_highLight");
    });
    setMessage("pen-turn");
    newgamebtn_display.classList.add("js-hidden");
    //snowfall stop
    $(document).snowfall("clear");
});