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
    const pHand = document.querySelector(".player-hand");
    const cHand = document.querySelector(".computer-hand");

    //computer options
    const computerOptions = ["rock", "paper", "scissors"];

    options.forEach((option) => {
      option.addEventListener("click", function () {
        //Computer Choice
        const computerNumber = Math.floor(Math.random() * 3);
        const computerChoice = computerOptions[computerNumber];
        const playerChoice = this.innerText;

        //We will call compareHands
        console.log("Player:", playerChoice);
        console.log("Computer:", computerChoice);
        compareHands(playerChoice, computerChoice);
      });
    });
  };

  const compareHands = (playerChoice, computerChoice) => {
    const winner = document.querySelector(".winner");

    //checks for a tie
    if (playerChoice === computerChoice) {
      winner.textContent = "It's a tie!";
      return;
    }

    //checks for rock
    if (playerChoice === "rock") {
      if (computerChoice === "paper") {
        winner.textContent = "Computer Wins!";
        return;
      } else {
        winner.textContent = "Player Wins!";
        return;
      }
    }

    if (playerChoice === "paper") {
      if (computerChoice === "rock") {
        winner.textContent = "Player Wins!";
        return;
      } else {
        winner.textContent = "Computer Wins!";
        return;
      }
    }

    if (playerChoice === "scissors") {
      if (computerChoice === "rock") {
        winner.textContent = "Player Wins!";
        return;
      } else {
        winner.textContent = "Computer Wins!";
        return;
      }
    }
  };

  startGame();
  playMatch();
};

game();
