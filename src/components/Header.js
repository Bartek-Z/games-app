import bg1 from '../images/bg1.jpg';
import bg2 from '../images/bg2.png';
import bg3 from '../images/bg3.png';

import styles from '../cssModules/Header.module.css';

function Header() {
	const backgrounds = [bg1, bg2, bg3];
	const index = Math.floor(Math.random() * 3);

	const bg = backgrounds[index];

	return (
		<div className={styles.header}>
			<h1 className={styles.title}>Games</h1>
			<img className={styles.bg} src={bg} alt="random background" />
		</div>
	);
}

export default Header;
