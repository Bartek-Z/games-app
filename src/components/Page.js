import { Route, Routes } from 'react-router-dom';

import Start from '../pages/Start';
import FlyBall from '../pages/FlyBall';
import Memory from '../pages/Memory';
import Snake from '../pages/Snake';

function Page() {
	return (
		<Routes>
			<Route path="/" element={<Start />} />
			<Route path="/flyball" element={<FlyBall />} />
			<Route path="/memory" element={<Memory />} />
			<Route path="/snake" element={<Snake />} />
		</Routes>
	);
}

export default Page;
