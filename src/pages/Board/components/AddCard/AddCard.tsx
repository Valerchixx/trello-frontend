import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {CreateCard} from '../../../../store/modules/board/action';
import {validator, regExp} from '../../../../common/validator/validator';
import styles from './addCard.module.css';

function AddCard(props:{close: () => void, boardId: string, idList: number, posCard: number}) {
	const dispatch = useDispatch();
	const [value, setValue] = useState({title: '', flag: true});
	function ValidateInp(event: ChangeEvent<HTMLInputElement>) {
		const data = event.currentTarget.value;
		const title = validator(regExp, data) ? data : '';
		const flag = Boolean(validator(regExp, data));
		setValue({
			...value,
			title,
			flag,
		});
	}

	function addCard() {
		if (value && value.flag) {
			dispatch(CreateCard(value.title, props.posCard, props.idList, props.boardId));
			props.close?.();
		}
	}

	function keypress(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && value) {
			dispatch(CreateCard(value.title, props.posCard, props.idList, props.boardId));
			props.close?.();
		}
	}

	return (
		<div className={styles.wrap}>
			<input className={value.flag ? styles.input : `${styles.input} ${styles.wrong} `}
				onKeyPress={keypress} onChange={ValidateInp} type="text" placeholder="Enter card name"/>
			<button className={styles.btnAdd} onClick={addCard} type="button">AddCard</button>
			<button className={styles.cancel} onClick={props.close} type="button">Cancel</button>
		</div>
	);
}

export default AddCard;
