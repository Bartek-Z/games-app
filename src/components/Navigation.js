import { NavLink } from 'react-router-dom';

import styles from '../cssModules/Navigation.module.css';

const list = [
	{ name: 'Start', path: '/' },
	{ name: 'FlyBall', path: '/flyball' },
	{ name: 'Memory', path: '/jumpball' },
	{ name: 'Snake', path: '/snake' },
];

function Navigation() {
	const menu = list.map((item, id) => (
		<li key={id}>
			<NavLink className={styles.link} to={item.path}>
				{item.name}
			</NavLink>
		</li>
	));

	return (
		<nav className={styles.nav}>
			<ul className={styles.list}>{menu}</ul>
		</nav>
	);
}

export default Navigation;
