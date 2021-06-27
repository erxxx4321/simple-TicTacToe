const GameBoard = (() => {
	const Players = (name, mark) => {
		return { name, mark };
	};

	let player1 = Players("player1", "o");
	let player2 = Players("player2", "x");

	let gameBoard = ["", "", "", "", "", "", "", "", ""];
	let count = 0;

	const boxes = document.querySelectorAll(".box");
	const replayBtn = document.querySelector(".replay");
	const gameResult = document.querySelector(".gameResult");

	boxes.forEach((box) => {
		box.addEventListener("click", () => {
			if (gameBoard[box.id] != "") {
				return;
			}

			if (count % 2 === 0) {
				box.textContent = player1.mark;
				gameBoard[box.id] = player1.mark;
			} else {
				box.textContent = player2.mark;
				gameBoard[box.id] = player2.mark;
			}
			checkGameStatus(count);
			count += 1;

			replayBtn.addEventListener("click", () => {
				box.textContent = "";
				gameBoard[box.id] = "";
				gameResult.textContent = "";
				count = 0;
			});
		});
	});

	function checkGameStatus(count) {
		let winCondition = [
			[0, 1, 2],
			[0, 3, 6],
			[3, 4, 5],
			[6, 7, 8],
			[1, 4, 7],
			[2, 4, 6],
			[2, 5, 8],
			[0, 4, 8],
		];

		for (let i = 0; i < winCondition.length; i++) {
			let firstStatus = winCondition[i][0];
			let secondStatus = winCondition[i][1];
			let thirdStatus = winCondition[i][2];

			if (
				count >= 4 &&
				gameBoard[secondStatus] != "" &&
				gameBoard[firstStatus] === gameBoard[secondStatus] &&
				gameBoard[secondStatus] === gameBoard[thirdStatus]
			) {
				gameResult.textContent = "Win";
				i = winCondition.length;
			}

			if (
				count >= 7 &&
				gameBoard[firstStatus] != gameBoard[secondStatus] &&
				gameBoard[secondStatus] != gameBoard[thirdStatus]
			) {
				gameResult.textContent = "Tie";
				i = winCondition.length;
			}
		}
	}
})();
