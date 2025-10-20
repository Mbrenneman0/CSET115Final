let turn = 'X';
let xScore = 0;
let oScore = 0;
let numTies = 0;
let gameOver = false;
let newGameBtn = document.getElementsByClassName("next-game-btn")[0];
let highlight = "#00dc00"

//create 2d array from buttons and initialize DOM with locked attribute and event listeners:
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

let defaultTextColor = grid[0][0].style.color;


function takeTurn(item)
{
    //this is the main logic for the game, called when a square is clicked

    if(item.getAttribute("locked") === "false")
    {
        hoverEffectOff(item); //hovereffectoff must be before innertext=turn because hovereffectoff resets innertext
        item.innerText = turn; //set content to x or o
        item.setAttribute("locked", true);

        if(checkEndGame()) //evaluates endgame condition and calls endgame logic
        {
            nextGame(); //shows next game button
        }
        else
        {
            nextTurn(); //updates player turn
        }
    }
}

function nextGame()
{
    //shows the next game button
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
            grid[row][col].style.border = "solid 4px white";
        }
    }

    //reset turn text
    document.getElementsByClassName("turn-indicator")[0].innerHTML =
        `<p>Player: <span id="player-turn">${turn}</span></p>`;

    //reset gameOver state
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

            //highlight winning row
            grid[row][0].style.border = `solid 4px ${highlight}`;
            grid[row][1].style.border = `solid 4px ${highlight}`;
            grid[row][2].style.border = `solid 4px ${highlight}`;
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

            //highlight winning column
            grid[0][col].style.border = `solid 4px ${highlight}`;
            grid[1][col].style.border = `solid 4px ${highlight}`;
            grid[2][col].style.border = `solid 4px ${highlight}`;
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

        //highlight winning diagonal
        grid[0][0].style.border = `solid 4px ${highlight}`;
        grid[1][1].style.border = `solid 4px ${highlight}`;
        grid[2][2].style.border = `solid 4px ${highlight}`;
    }

    box1 = grid[0][2].innerText
    box3 = grid[2][0].innerText
    if(box1 === box2 && box2 === box3 && box2 !== "")
    {
        gameOver = true;
        updateScore(turn);

        //highlight winning diagonal
        grid[0][2].style.border = `solid 4px ${highlight}`;
        grid[1][1].style.border = `solid 4px ${highlight}`;
        grid[2][0].style.border = `solid 4px ${highlight}`;
    }

    //checkfor tie
    if(!gameOver)
    {
        let allBoxesFull = true //temporary value

        //check if all squares are full
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
            //lock all squares on gameOver
            for(let row = 0; row < 3; row++)
            {
                for(let col = 0; col < 3; col++)
                {
                    grid[row][col].setAttribute("locked", true);
                }
            }
        }
    return gameOver;
}

function updateScore(winner)
{
    //updates internal score, score display and shows win text.
    let xScoreField = document.getElementById("x-score");
    let oScoreField = document.getElementById("o-score");
    let tieField = document.getElementById("tie-score");
    let winText = document.getElementsByClassName("turn-indicator")[0];

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
    winText.innerHTML = `<span>Player ${winner} Wins!</span>`;

    if(winner === "Tie")
    {
        numTies++;
        tieField.innerText = numTies;
        winText.innerHTML = "<span>It's a Tie!</span>";
    }
}

function hoverEffectOn(item)
{
    //shows ghosted X or O on hover
    if(item.getAttribute("locked") === "false")
    {
        item.innerText = turn;
        item.style.color = "#a4a4c4";
    }
}

function hoverEffectOff(item)
{
    if(item.style.color !== defaultTextColor) //only execute if item is not already in default state
    {
        item.innerText = "";
        item.style.color = defaultTextColor;
    }
}