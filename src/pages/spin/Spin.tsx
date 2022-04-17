import React from 'react';
import {useSelector} from 'react-redux';
import Loader from 'react-loader-spinner';
import {RootState} from 'store/reducer';
import styles from './spin.module.css';

function Spin() {
	const spinner = useSelector((state:RootState) => state.loaderReducer.loading);
	return (
		<div className={spinner ? styles.loaderStyle : `${styles.loaderStyle} ${styles.close}`}>
			<div className={styles.loaderWrap}>
				<Loader type="TailSpin" color="#00BFFF" height={100} width={100} visible={spinner}/>
			</div>
		</div>
	);
}

export default Spin;
