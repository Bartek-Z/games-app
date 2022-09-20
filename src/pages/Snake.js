import { useEffect, useState } from 'react';
import styled from 'styled-components';

const AREA__WIDTH = 500;
const AREA__HEIGHT = 500;

const getRandomFoodPosition = () => {
	let min = 1;
	let max = 98;
	let x = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
	let y = Math.floor((Math.random() * (max - min + 1) + min) / 4) * 4;
	return [x, y];
};

function Snake() {
	const [snake, setSnake] = useState([
		[0, 0],
		[0, 4],
	]);
	const [food, setFood] = useState(getRandomFoodPosition());
	const [direction, setDirection] = useState('RIGHT');
	const [alive, setAlive] = useState(false);
	const [speed, setSpeed] = useState(250);
	const [points, setPoints] = useState(0);

	useEffect(() => {
		document.onkeydown = onKeyDown;
		checkIfOutOfArea();
		checkIfEat();

		const start = setInterval(() => {
			move(alive);
		}, speed);
		return () => clearInterval(start);
	});

	function onKeyDown(e) {
		setAlive(true);
		switch (e.keyCode) {
			case 38:
				e.preventDefault();
				setDirection('UP');
				break;
			case 40:
				e.preventDefault();
				setDirection('DOWN');
				break;
			case 37:
				setDirection('LEFT');
				break;
			case 39:
				setDirection('RIGHT');
				break;
			default:
				break;
		}
	}

	function move(state) {
		if (state === true) {
			let snakeDots = [...snake];
			let head = snake[snake.length - 1];

			switch (direction) {
				case 'RIGHT':
					head = [head[0], head[1] + 4];
					break;
				case 'LEFT':
					head = [head[0], head[1] - 4];
					break;
				case 'DOWN':
					head = [head[0] + 4, head[1]];
					break;
				case 'UP':
					head = [head[0] - 4, head[1]];
					break;
				default:
					break;
			}
			snakeDots.push(head);
			snakeDots.shift();
			setSnake(snakeDots);
		}
	}

	function checkIfEat() {
		let head = snake[snake.length - 1];
		let foodDot = food;
		if (head[0] === foodDot[0] && head[1] === food[1]) {
			setFood(getRandomFoodPosition());
			snakeGrow();
			speeding();
			setPoints(points + 1);
		}
	}

	function checkIfOutOfArea() {
		let head = snake[snake.length - 1];
		if (head[0] >= 100 || head[1] >= 100 || head[0] < 0 || head[1] < 0) {
			gameOver();
		}
	}

	function snakeGrow() {
		let newSnake = [snake[snake.length - 1], ...snake];
		setSnake(newSnake);
	}

	function speeding() {
		if (speed > 50) {
			setSpeed(speed - 10);
		}
	}

	function gameOver() {
		setAlive(false);
		setSnake([
			[0, 0],
			[0, 4],
		]);
		setDirection('RIGHT');
		setFood(getRandomFoodPosition());
		setPoints(0);
		alert(`Game over :( your result : ${points}`);
	}

	const snakePosition = snake.map((snakeDot, index) => (
		<SnakeDot key={index} top={`${snakeDot[0]}%`} left={`${snakeDot[1]}%`} />
	));

	return (
		<>
			<Result>{points}</Result>
			<Container>
				<GameArea width={AREA__WIDTH} height={AREA__HEIGHT}>
					{snakePosition}
					<SnakeFood top={food[0]} left={food[1]} />
				</GameArea>
			</Container>
		</>
	);
}

export default Snake;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const GameArea = styled.div`
	position: relative;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	background-color: green;
	overflow: hidden;
`;

const SnakeDot = styled.div`
	position: absolute;
	width: 4%;
	height: 4%;
	top: ${(props) => props.top};
	left: ${(props) => props.left};
	background-color: black;
	z-index: 2;
`;

const SnakeFood = styled.div`
	position: absolute;
	width: 4%;
	height: 4%;
	top: ${(props) => props.top}%;
	left: ${(props) => props.left}%;
	background-color: red;
	z-index: 1;
`;

const Result = styled.p`
	padding: 10px;
	font-size: 40px;
	font-weight: bold;
`;
