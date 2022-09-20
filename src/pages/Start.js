import styled from 'styled-components';

function Start() {
	return (
		<>
			<Name>Welcome !!</Name>
			<BoldText>On my mini games website</BoldText>
			<Paragraph>
				<BoldText>Flyball</BoldText>
				It consists in avoiding the appearing obstacles by clicking on the game
				area. The ball scores points after each passing obstacles.
			</Paragraph>
			<Paragraph>
				<BoldText>Memory</BoldText>
				Remember where are cards of the same color and finds pairs. If cards
				light up green the pair is correct, if it is red light the pair is
				wrong.
			</Paragraph>
			<Paragraph>
				<BoldText>Snake</BoldText>
				To start the game click either the down or right arrow. Guide snake with
				the arrows and collect as many red squares as possible. Snake gets
				faster with each point earned.
			</Paragraph>
		</>
	);
}

export default Start;

const Paragraph = styled.p`
	padding: 20px 10px;
	line-height: 170%;
`;

const BoldText = styled.p`
	padding: 10px;
	font-weight: bold;
	text-transform: uppercase;
`;

const Name = styled.h1`
	font-size: 2rem;
	color: red;
	text-transform: uppercase;
	letter-spacing: 2px;
`;
