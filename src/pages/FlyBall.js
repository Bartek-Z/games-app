import { useState, useEffect } from 'react';
import styled from 'styled-components';

const AREA__WIDTH = 500;
const AREA__HEIGHT = 500;
const BORDER__WIDTH = 5;
const BALL__SIZE = 20;
const GRAVITY = 5;
const JUMP = 80;
const BLOCKADE__WIDTH = 40;
const GAP = 200;

function FlyBall() {
	const [ballPosition, setBallPosition] = useState(250);
	const [startGame, setStartGame] = useState(false);
	const [blockadeHeight, setBlockadeHeight] = useState(50);
	const [blockadeLeft, setBlockadeLeft] = useState(
		AREA__WIDTH - BLOCKADE__WIDTH - BORDER__WIDTH * 2
	);
	const [points, setPoints] = useState(0);

	const bottomBlockade = AREA__HEIGHT - GAP - blockadeHeight;

	useEffect(() => {
		let id;
		if (startGame && ballPosition < AREA__HEIGHT - BALL__SIZE) {
			id = setInterval(() => {
				setBallPosition((ballPosition) => ballPosition + GRAVITY);
			}, 15);
		}

		return () => {
			clearInterval(id);
		};
	}, [ballPosition, startGame]);

	useEffect(() => {
		let id;
		if (startGame && blockadeLeft >= -BLOCKADE__WIDTH) {
			id = setInterval(() => {
				setBlockadeLeft((blockadeLeft) => blockadeLeft - 5);
			}, 15);

			return () => {
				clearInterval(id);
			};
		} else {
			if (blockadeLeft < 0) {
				setPoints((points) => points + 1);
			}
			setBlockadeLeft(AREA__WIDTH - BLOCKADE__WIDTH);
			setBlockadeHeight(Math.floor(Math.random() * (AREA__HEIGHT - GAP)));
		}
	}, [startGame, blockadeLeft]);

	useEffect(() => {
		const collidenTop = ballPosition >= 0 && ballPosition < blockadeHeight;
		const collidenBottom =
			ballPosition <= AREA__HEIGHT &&
			ballPosition >= AREA__HEIGHT - bottomBlockade;

		if (
			(blockadeLeft >= 0 &&
				blockadeLeft <= BLOCKADE__WIDTH &&
				(collidenTop || collidenBottom)) ||
			ballPosition === AREA__HEIGHT - BALL__SIZE
		) {
			setStartGame(false);
			setPoints(0);
			setBallPosition(250);
		}
	}, [ballPosition, blockadeHeight, bottomBlockade, blockadeLeft]);

	const handleClick = () => {
		let newPosition = ballPosition - JUMP;
		if (!startGame) {
			setStartGame(true);
		} else if (newPosition < 0) {
			setBallPosition(BORDER__WIDTH);
		} else {
			setBallPosition(newPosition);
		}
	};

	return (
		<Div>
			<GameArea onClick={handleClick} width={AREA__WIDTH} height={AREA__HEIGHT}>
				<Ball size={BALL__SIZE} position={ballPosition} />
				<Blockade
					top={0}
					left={blockadeLeft}
					width={BLOCKADE__WIDTH}
					height={blockadeHeight}
				/>
				<Blockade
					top={blockadeHeight + GAP}
					left={blockadeLeft}
					width={BLOCKADE__WIDTH}
					height={bottomBlockade}
				/>
			</GameArea>
			<span>{points}</span>
		</Div>
	);
}

export default FlyBall;

const Div = styled.div`
	display: flex;
	justify-content: center;
	& span {
		font-size: 50px;
		position: absolute;
		margin-top: 10px;
		text-weight: bold;
	}
`;

const GameArea = styled.div`
	position: relative;
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	border: ${BORDER__WIDTH}px solid black;
	background-color: white;
	overflow: hidden;
`;

const Ball = styled.div.attrs((props) => ({
	style: {
		width: props.size,
		height: props.size,
		top: props.position,
	},
}))`
	position: absolute;
	background-color: green;
	left: 50px;
	transform: translateY(-50%);
	border-radius: 50%;
`;

const Blockade = styled.div.attrs((props) => ({
	style: {
		top: props.top,
		left: props.left,
		width: props.width,
		height: props.height,
	},
}))`
	position: absolute;
	background-color: black;
`;
