const game = () => {
  let pScore = 0;
  let cScore = 0;

  const startGame = () => {
    const playButton = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playButton.addEventListener("click", () => {
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  //Play Match
  const playMatch = () => {
    const options = document.querySelectorAll(".options button");
    const hands = document.querySelectorAll(".hands img");
    const player = document.querySelector(".player-hand");
    const computer = document.querySelector(".computer-hand");

    hands.forEach((hand) => {
      hand.addEventListener("animationend", function () {
        this.style.animation = "";
      });
    });

    //computer options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        const playerChoice = this.innerText;
        //We will call compareHands
        setTimeout(() => {
          compareHands(playerChoice, computerChoice);
          updateScore();
        }, 2000);

        player.style.animation = "shakePlayer 2s ease";
        computer.style.animation = "shakeComputer 2s ease";
      });
    });
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    //Calls a function to change the image
    changeHandImage(playerChoice, computerChoice);

    //checks for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie!";
      return;
    }

    //checks for rock
    if (playerChoice === "rock") {
      if (computerChoice === "paper") {
        winner.textContent = "Computer Wins!";
        cScore++;
        return;
      } else {
        winner.textContent = "Player Wins!";
        pScore++;
        return;
      }
    }

    //checks for paper
    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        winner.textContent = "Player Wins!";
        pScore++;
        return;
      } else {
        winner.textContent = "Computer Wins!";
        cScore++;
        return;
      }
    }

    //checks for scissors
    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Player Wins!";
        pScore++;
        return;
      } else {
        winner.textContent = "Computer Wins!";
        cScore++;
        return;
      }
    }

    //Call function to update Score
  };

  const changeHandImage = (playerHand, computerHand) => {
    const player = document.querySelector(".player-hand");
    const computer = document.querySelector(".computer-hand");
    computer.src = `./assets/${computerHand}.png`;
    player.src = `./assets/${playerHand}.png`;
  };

  const updateScore = () => {
    console.log("Player Score: ", pScore);
    console.log("Computer Score: ", cScore);
    const playerScore = document.querySelector(".player-score p");
    const computerScore = document.querySelector(".computer-score p");
    playerScore.innerText = pScore;
    computerScore.innerText = cScore;
  };

  startGame();
  playMatch();
};

game();
