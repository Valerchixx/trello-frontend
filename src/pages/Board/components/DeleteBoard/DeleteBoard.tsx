import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteBoard} from '../../../../store/modules/board/action';
import styles from './deleteBoard.module.css';

function DelBoard(props:{id:string}) {
	const dispatch = useDispatch();

	function deleteboard() {
		dispatch(deleteBoard(props.id));
	}

	return (
		<button className={styles.btnDel} onClick={deleteboard} type="button">Del</button>
	);
}

export default DelBoard;
