/* eslint-disable no-unused-vars */

import React, {ChangeEvent, useContext, useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './modal.module.css';
import {createBoards} from '../../../../store/modules/boards/action';
import {validator, regExp} from '../../../../common/validator/validator';

type modal = {
	handleModal?: () => void,
	open:boolean
}
const Modal = ({handleModal, open}: modal) => {
	const [title, setTitle] = useState({title: ''});
	const [flag, setFlag] = useState(true);
	const dispatch = useDispatch();
	function validateInput(event: ChangeEvent<HTMLInputElement>): void {
		const dataInput = event.target.value;
		const titles = validator(regExp, dataInput) ? dataInput : '';
		const flag = Boolean(validator(regExp, dataInput));
		setTitle({
			...title,
			title: titles,
		});
		setFlag(flag);
	}

	function addBoard() {
		if (title && flag) {
			dispatch(createBoards(title.title.trim()));
			handleModal?.();
			setTitle({
				...title,
				title: '',
			});
		}
	}

	if (open) {
		document.querySelector('body')?.classList.add('hidden');
	} else {
		document.querySelector('body')?.classList.remove('hidden');
	}

	return (
		<div className={open ? `${styles.modal} ${styles.active}` : styles.modal} onClick={handleModal}>
			<div className={open ? `${styles.modalContent} ${styles.active}` : styles.modalContent} onClick={e => e.stopPropagation()}>
				<h1>Add new desk</h1>
				<input type="text" onChange={validateInput} placeholder="Enter desk title" className={flag ? styles.input : `${styles.input} ${styles.wrong}`} />
				<button type="button" onClick={addBoard} className={styles.btn}>Create board</button>
			</div>
		</div>
	);
};

export default Modal;
