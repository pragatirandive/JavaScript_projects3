let userCount = 0;
let compCount = 0;

let choices = document.querySelectorAll(".choice");
let msg = document.querySelector("#msg");
let userScore = document.querySelector("#user-score");
let compScore = document.querySelector("#comp-score");
let resetBtn = document.querySelector("#reset");
let hides = document.querySelectorAll(".new");

//----------------------------------------------------generate copmuter choice-----------------------------
const genCompChoice = ()=>{
    let options = ["rock", "paper", "scissors"];
    let randomIdx = Math.floor(Math.random() * 3) ;               //random() - generate random no  and * 3 = web get lass than one value (means 2 we get)
    return( options[randomIdx] );
}

//----------------------------------------------------generate user choice-----------------------------
 choices.forEach(choice => {
    choice.addEventListener("click",()=>{
        //generate user choice
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

//---------------------------------------------incresse score -----------------------------------------
const showWinner =(userWin,userChoice,compChoice)=>{
    if(userWin){
        userCount++;
        userScore.innerText = userCount;
        msg.innerText = `You win !! Your ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    }
    else{
        compCount++;
        compScore.innerText = compCount;
        msg.innerText = `You Lost..${compChoice} beats your ${userChoice} `;
        msg.style.backgroundColor = "red";

    }
}

//----------------------------------------------play game ----------------------------------------------------------
const playGame = (userChoice)=>{

        let compChoice = genCompChoice();
            if(userChoice === compChoice ){
                    msg.innerText = "The game was Draw , Play again";
                    msg.style.backgroundColor = "#081b31";
            }  
            else{
                let userWin = true;      
             if(userChoice === "rock"){
                userWin = (compChoice === "scissors")? true : false;       //paper > rock = true  && paper > scirrors = false
            }
            else if(userChoice === "paper"){                                 //scirrors > paper = true &&  scirrors > rock = false
              userWin =(compChoice === "rock") ? true : false;
            }
            else{
                userWin = (compChoice === "paper") ? true : false;           // rock > scissors && rock > paper = false
            }
          showWinner(userWin, userChoice, compChoice);
        }
     }


//---------------------------------------------reset button----------------------------------------------
let msgChange = () => {
    msg.innerText = "Play your move";
    msg.style.backgroundColor = "#081b31"
}
const changeScore = ()=>{
    for(let score of hides){
        score.innerText = 0;
        userCount = 0;
        compCount = 0;
    }
    msgChange();
}
let resetGame = ()=>{
    changeScore();
}

resetBtn.addEventListener("click" , resetGame);
