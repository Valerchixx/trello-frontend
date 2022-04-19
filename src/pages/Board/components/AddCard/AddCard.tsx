import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {createCard} from '../../../../store/modules/board/action';
import {validator, regExp} from '../../../../common/validator/validator';
import styles from './addCard.module.css';
type Cards = {
	close: () => void,
	boardId: string,
	idList: number,
	posCard: number,

}
const AddCard = ({close, boardId, idList, posCard}: Cards) => {
	const dispatch = useDispatch();
	const [value, setValue] = useState({title: '', flag: true});
	function validateInp(event: ChangeEvent<HTMLInputElement>) {
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
			dispatch(createCard(value.title, posCard, idList, boardId));
			close?.();
		}
	}

	function keypress(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && value) {
			dispatch(createCard(value.title, posCard, idList, boardId));
			close?.();
		}
	}

	return (
		<div className={styles.wrap}>
			<input className={value.flag ? styles.input : `${styles.input} ${styles.wrong} `}
				onKeyPress={keypress} onChange={validateInp} type="text" placeholder="Enter card name"/>
			<button className={styles.btnAdd} onClick={addCard} type="button">AddCard</button>
			<button className={styles.cancel} onClick={close} type="button">Cancel</button>
		</div>
	);
};

export default AddCard;
