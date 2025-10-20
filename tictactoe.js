let turn = 'X';
let xScore = 0;
let oScore = 0;
let numTies = 0;
let gameOver = false;
let newGameBtn = document.getElementsByClassName("next-game-btn")[0];

//create 2d array from buttons:
grid = [new Array(3),new Array(3), new Array(3)]
for(let i = 0; i<9; i++)
{
    let col = i%3
    let row = Math.floor(i/3)

    grid[row][col] = document.getElementsByClassName("square")[i];
    grid[row][col].setAttribute("locked", false);
    grid[row][col].addEventListener('mouseenter', event => {hoverEffectOn(event.target)});
    grid[row][col].addEventListener('mouseleave', event => {hoverEffectOff(event.target)});

}

let defaultTextColor = grid[1][1].style.color;


function takeTurn(item)
{
    if(item.getAttribute("locked") === "false" && !gameOver)
    {
        hoverEffectOff(item); //hovereffectoff must be before innertext=turn because hovereffectoff resets innertext
        item.innerText = turn;
        item.setAttribute("locked", true);
        if(checkEndGame())
        {
            nextGame();
        }
        else
        {
            nextTurn();
        }
    }
}

function nextGame()
{
    newGameBtn.style.visibility = "visible";
}

function reset()
{
    //re-hide next game button
    newGameBtn.style.visibility = "hidden"

    //reset all boxes
    for(let row = 0; row < 3; row++)
    {
        for(let col = 0; col < 3; col++)
        {
            grid[row][col].innerText = "";
            grid[row][col].setAttribute("locked", false);
        }
    }

    //rest gameOver state
    gameOver = false;

}

function nextTurn()
{
    if(turn === "X")
    {
        turn = "O";
    }
    else
    {
        turn = "X";
    }
    let turnIndicator = document.getElementById("player-turn");
    turnIndicator.innerText = turn;
}

function checkEndGame()
{
    //check rows
    for(let row = 0; row < 3; row++)
    {
        let col1 = grid[row][0].innerText;
        let col2 = grid[row][1].innerText;
        let col3 = grid[row][2].innerText;

        if(col1 === col2 && col2 === col3 && col2 !== "")
        {
            gameOver = true;
            updateScore(turn);
        }
    }

    //check cols
    for(let col = 0; col < 3; col++)
    {
        let row1 = grid[0][col].innerText;
        let row2 = grid[1][col].innerText;
        let row3 = grid[2][col].innerText;

        if(row1 === row2 && row2 === row3 && row2 !== "")
        {
            gameOver = true;
            updateScore(turn);
        }
    }

    //check diagonals
    let box1 = grid[0][0].innerText
    let box2 = grid[1][1].innerText
    let box3 = grid[2][2].innerText
    if(box1 === box2 && box2 === box3 && box2 !== "")
    {
        gameOver = true;
        updateScore(turn);
    }

    box1 = grid[0][2].innerText
    box3 = grid[2][0].innerText
    if(box1 === box2 && box2 === box3 && box2 !== "")
    {
        gameOver = true;
        updateScore(turn);
    }

    //checkfor tie
    if(!gameOver)
    {
        let allBoxesFull = true
        for(let row = 0; row < 3; row++)
        {
            for(let col = 0; col < 3; col++)
            {
                if(grid[row][col].innerText === "")
                {
                    allBoxesFull = false;
                }
            }
        }
        if(allBoxesFull)
        {
            gameOver = true;
            updateScore("Tie");
        }

    }

    if(gameOver)
        {
            console.log("game over")
        }
    return gameOver;
}

function updateScore(winner)
{
    let xScoreField = document.getElementById("x-score");
    let oScoreField = document.getElementById("o-score");
    let tieField = document.getElementById("tie-score");

    if(winner === "X")
    {
        xScore++
        xScoreField.innerText = xScore;
    }
    if(winner === "O")
    {
        oScore++
        oScoreField.innerText = oScore;
    }
    if(winner === "Tie")
    {
        numTies++;
        tieField.innerText = numTies;
    }
}

function hoverEffectOn(item)
{
    console.log(`mouse entered ${item}`);
    if(item.getAttribute("locked") === "false")
    {
        item.innerText = turn;
        item.style.color = "#949494";
    }
}

function hoverEffectOff(item)
{
    if(item.style.color !== defaultTextColor)
    {
        item.innerText = "";
        item.style.color = defaultTextColor;
    }
}