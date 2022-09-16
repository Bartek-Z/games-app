import { useState } from 'react';
import styled, { keyframes } from 'styled-components';

const AREA__WIDTH = 500;
const AREA__HEIGHT = 500;

function Memory() {
	const [colors, setColors] = useState(
		[
			{ id: 1, color: 'red', stat: '' },
			{ id: 1, color: 'red', stat: '' },
			{ id: 2, color: 'blue', stat: '' },
			{ id: 2, color: 'blue', stat: '' },
			{ id: 3, color: 'green', stat: '' },
			{ id: 3, color: 'green', stat: '' },
			{ id: 4, color: 'yellow', stat: '' },
			{ id: 4, color: 'yellow', stat: '' },
			{ id: 5, color: 'orange', stat: '' },
			{ id: 5, color: 'orange', stat: '' },
			{ id: 6, color: 'indigo', stat: '' },
			{ id: 6, color: 'indigo', stat: '' },
			{ id: 7, color: 'lime', stat: '' },
			{ id: 7, color: 'lime', stat: '' },
			{ id: 8, color: 'purple', stat: '' },
			{ id: 8, color: 'purple', stat: '' },
			{ id: 9, color: 'aqua', stat: '' },
			{ id: 9, color: 'aqua', stat: '' },
			{ id: 10, color: 'deeppink', stat: '' },
			{ id: 10, color: 'deeppink', stat: '' },
		].sort(() => Math.random() - 0.5)
	);

	const [lastCardId, setLastCardId] = useState(-1);

	function check(id) {
		if (colors[id].id === colors[lastCardId].id) {
			colors[id].stat = 'correct';
			colors[lastCardId].stat = 'correct';
			setColors([...colors]);
			setLastCardId(-1);
		} else {
			colors[id].stat = 'wrong';
			colors[lastCardId].stat = 'wrong';
			setColors([...colors]);
			setTimeout(() => {
				colors[id].stat = '';
				colors[lastCardId].stat = '';
				setColors([...colors]);
				setLastCardId(-1);
			}, 300);
		}
	}

	function handleClick(id) {
		if (lastCardId === -1) {
			colors[id].stat = 'active';
			setColors([...colors]);
			setLastCardId(id);
		} else {
			check(id);
		}
	}

	const cards = colors.map((card, index) => (
		<Card key={index} onClick={card.stat ? null : () => handleClick(index)}>
			<ColorCard className={card.stat ? card.stat : ''} color={card.color} />
		</Card>
	));

	return (
		<Container>
			<GameArea width={AREA__WIDTH} height={AREA__HEIGHT}>
				{cards}
			</GameArea>
		</Container>
	);
}

export default Memory;

const hideColor = keyframes`
0%,
	75% {
		transform: scale(1)
	}

	100% {
		transform: scale(0)
	}
`;

const Container = styled.div`
	display: flex;
	justify-content: center;
`;

const GameArea = styled.div`
	width: ${(props) => props.width}px;
	height: ${(props) => props.height}px;
	display: grid;
	grid-template-columns: repeat(5, 1fr);
	grid-template-rows: repeat(4, 1fr);
	gap: 5px;
`;

const Card = styled.div`
	display: flex;
	justify-content: center;
	align-items: center;
	background-color: black;
`;

const ColorCard = styled.div`
	width: 80%;
	height: 80%;
	background-color: ${(props) => props.color};
	transform: scale(0);
	animation: ${hideColor} 2.5s linear;
`;
