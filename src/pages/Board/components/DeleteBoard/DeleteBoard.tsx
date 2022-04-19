import React from 'react';
import {useDispatch} from 'react-redux';
import {deleteBoard} from '../../../../store/modules/board/action';
import styles from './deleteBoard.module.css';
type delBoard = {
	id:string

}
const DelBoard = ({id}: delBoard) => {
	const dispatch = useDispatch();

	function deleteboard() {
		dispatch(deleteBoard(id));
	}

	return (
		<button className={styles.btnDel} onClick={deleteboard} type="button">Del</button>
	);
};

export default DelBoard;
