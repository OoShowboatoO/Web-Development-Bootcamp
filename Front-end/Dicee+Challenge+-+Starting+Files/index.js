let randomNumber1 = Math.floor(Math.random() * 6) + 1;
let randomNumber2 = Math.floor(Math.random() * 6) + 1;

let img1Path = "./images/dice" + randomNumber1 + ".png";
let img2Path = "./images/dice" + randomNumber2 + ".png";

document.querySelector(".img1").setAttribute("src", img1Path);
document.querySelector(".img2").setAttribute("src", img2Path);


let result;
if (randomNumber1 > randomNumber2) {
    result = "Player 1 Wins!";
} else if (randomNumber1 < randomNumber2) {
    result = "Player 2 Wins!";
} else {
    result = "Draw!";
}


document.querySelector("h1").innerHTML = result;