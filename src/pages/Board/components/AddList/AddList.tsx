import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {createList} from '../../../../store/modules/board/action';
import {validator, regExp} from '../../../../common/validator/validator';
import styles from './addList.module.css';
type Desks = {
	close: () => void,
	position: () => number,
	id: string
}
const AddDesk = ({close, position, id}: Desks) => {
	const [titles, setTitle] = useState({title: ''});
	const [flag, setFlag] = useState({flag: true, input: titles.title});
	const dispatch = useDispatch();

	function validate(event:ChangeEvent<HTMLInputElement>): void {
		const InputValue = event.currentTarget.value;
		const title = validator(regExp, InputValue) ? InputValue : '';
		const bool = Boolean(validator(regExp, InputValue));
		setTitle({
			...titles,
			title,
		});
		setFlag({
			...flag,
			flag: bool,
			input: InputValue,
		});
	}

	function addList() {
		const pos = position?.();
		if (titles) {
			dispatch(createList(titles.title, pos, id));
			close?.();
		} else {
			setFlag({
				...flag,
				input: '',
			});
		}
	}

	return (
		<div className={styles.wrapper}>
			<div className={styles.wrapList}>
				<h3 className={styles.H3}>Add list</h3>
				<div className={styles.btnClose} onClick={close}>&times;</div>
			</div>
			<div className={styles.wrapForm}>
				<input
					className={ flag.flag ? styles.inputDesk
						: `${styles.inputDesk} ${styles.wrong}`} value={flag.input}
					onChange={validate} placeholder="Enter list title" type="text" />
				<button type="button" onClick={addList} className={styles.btnAdd}>Create list</button>
			</div>
		</div>
	);
};

export default AddDesk;
