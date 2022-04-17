import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import styles from './modal.module.css';
import {CreateBoards} from '../../../../store/modules/boards/action';
import {validator, regExp} from '../../../../common/validator/validator';

function Modal(props:{handleModal?: () => void, open:boolean}) {
	const [title, setTitle] = useState({title: ''});
	const [flag, setFlag] = useState(true);
	const dispatch = useDispatch();

	if (props.open) {
		document.querySelector('body')?.classList.add('hidden');
	} else {
		document.querySelector('body')?.classList.remove('hidden');
	}

	function ValidateInput(event: ChangeEvent<HTMLInputElement>): void {
		const dataInput = event.target.value;
		const titles = validator(regExp, dataInput) ? dataInput : '';
		const flag = Boolean(validator(regExp, dataInput));
		setTitle({
			...title,
			title: titles,
		});
		setFlag(flag);
	}

	function AddBoard() {
		if (title && flag) {
			dispatch(CreateBoards(title.title.trim()));
			props.handleModal?.();
			setTitle({
				...title,
				title: '',
			});
		}
	}

	return (
		<div className={props.open ? `${styles.modal} ${styles.active}` : styles.modal} onClick={props.handleModal}>
			<div className={props.open ? `${styles.modalContent} ${styles.active}` : styles.modalContent} onClick={e => e.stopPropagation()}>
				<h1>Add new desk</h1>
				<input type="text" onChange={ValidateInput} placeholder="Enter desk title" className={flag ? styles.input : `${styles.input} ${styles.wrong}`} />
				<button type="button" onClick={AddBoard} className={styles.btn}>Create board</button>
			</div>
		</div>
	);
}

export default Modal;
