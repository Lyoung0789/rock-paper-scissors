const game = () => {
  let pScore = 0;
  let cScore = 0;
  let totalCount = 0;

  const startGame = () => {
    const playButton = document.querySelector(".intro button");
    const introScreen = document.querySelector(".intro");
    const match = document.querySelector(".match");

    playButton.addEventListener("click", () => {
      console.log("Button pressed");
      introScreen.classList.add("fadeOut");
      match.classList.add("fadeIn");
    });
  };

  const seeHighScore = () => {
    const scoreButton = document.querySelector(".see-score button");
    const introScreen = document.querySelector(".intro");
    const seeScorePage = document.querySelector(".score-page");
    const seeScore = document.querySelector(".score");

    scoreButton.addEventListener("click", () => {
      console.log("High Score");
      introScreen.classList.add("fadeOut");
      seeScore.classList.add("fadeOut");
      seeScorePage.classList.add("fadeIn");
      getScores();
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
        totalCount++;
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
    const totalGames = document.querySelector("#total-count");
    totalGames.innerText = totalCount;
    playerScore.innerText = pScore;
    computerScore.innerText = cScore;

    if (totalCount === 3) {
      console.log("this is it");
      gameOver();
    }
  };

  const getScores = () => {
    fetch("http://localhost:3000/scores")
      .then((response) => response.json())
      .then((data) => {
        populateScore(data);
      });
  };

  const populateScore = (data) => {
    const highScore = document.querySelector("#score-list");

    console.log(highScore);
    console.log("score are: ", data);
    console.log(highScore);
    // let element = document.createElement("ul");
    data.forEach((score) => {
      let li = document.createElement("li");
      li.innerHTML = `Name: ${score.name} Score: ${score.score}`;
      console.log(li);
      highScore.appendChild(li);
      console.log("Name:" + score.name + " Score: " + score.score);
    });
    // highScore.appendChild(element);
  };

  const goBackToGame = () => {
    const playButton = document.querySelector(".score-page button");
    const match = document.querySelector(".match");
    const highScore = document.querySelector(".score-page");
    const seeScore = document.querySelector(".score");
    playButton.addEventListener("click", () => {
      match.classList.add("fadeIn");
      seeScore.className = "score fadeIn";
      highScore.className = "see-score fadeOut";
    });
  };

  const gameOver = () => {
    const endScreen = document.querySelector(".end");
    const match = document.querySelector(".match");
    const submit = document.querySelector(".end .submit");
    const name = document.querySelector("#pName");
    endScreen.className = "end fadeIn";
    match.className = "match fadeOut";
    submit.addEventListener("click", (event) => {
      // event.preventDefault();
      console.log("submitting to the DB");
      console.log(name.value);
      fetch("http://localhost:3000/scores", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({ name: name.value, score: pScore }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data));
    });
  };

  startGame();
  playMatch();
  seeHighScore();
  goBackToGame();
};

game();
