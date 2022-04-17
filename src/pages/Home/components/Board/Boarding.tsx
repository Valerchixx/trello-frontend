import React from 'react';
import styles from './boarding.module.css';

function Boarding(props:{title:string}) {
	return (
		<div className={styles.boards}>
			<h3>{props.title}</h3>
		</div>
	);
}

export default Boarding;
