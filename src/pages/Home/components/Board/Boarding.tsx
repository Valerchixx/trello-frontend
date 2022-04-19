import React from 'react';
import styles from './boarding.module.css';
type desk = {
	title:string
}
const Boarding = ({title}: desk) => (
	<div className={styles.boards}>
		<h3>{title}</h3>
	</div>
);

export default Boarding;
