import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CreateList} from '../../../../store/modules/board/action';
import {validator, regExp} from '../../../../common/validator/validator';
import styles from './addList.module.css';

function AddDesk(props:{close: () => void, position: () => number, id: string}) {
	const [titles, setTitle] = useState({title: ''});
	const [flag, setFlag] = useState({flag: true, input: titles.title});
	const dispatch = useDispatch();

	function Validate(event:ChangeEvent<HTMLInputElement>): void {
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

	function AddList() {
		const pos = props.position?.();
		if (titles) {
			dispatch(CreateList(titles.title, pos, props.id));
			props.close?.();
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
				<div className={styles.btnClose} onClick={props.close}>&times;</div>
			</div>
			<div className={styles.wrapForm}>
				<input
					className={ flag.flag ? styles.inputDesk
						: `${styles.inputDesk} ${styles.wrong}`} value={flag.input}
					onChange={Validate} placeholder="Enter list title" type="text" />
				<button type="button" onClick={AddList} className={styles.btnAdd}>Create list</button>
			</div>
		</div>
	);
}

export default AddDesk;
