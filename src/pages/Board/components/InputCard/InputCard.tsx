import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {validator, regExp} from 'common/validator/validator';
import {updateList} from '../../../../store/modules/board/action';
import styles from './inputCard.module.css';

type cardInput = {
	listId: number,
	boardId:string,
	titleInput:string,
	poslist: number,
	close: () => void
}

const InputCard = ({listId, boardId, titleInput, poslist, close}: cardInput) => {
	const dispatch = useDispatch();
	const [title, setTitle] = useState({title: ''});
	const [flag, setFlag] = useState(true);

	function validate(event:ChangeEvent<HTMLInputElement>) {
		const dataInput = event.currentTarget.value;
		const titles = validator(regExp, dataInput) ? dataInput : '';
		const flag = Boolean(validator(regExp, dataInput));
		setTitle({
			...title,
			title: titles,
		});
		setFlag(flag);
	}

	function updateDescrList(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && title && flag) {
			dispatch(updateList(listId, boardId, poslist, title.title));
			close?.();
		}
	}

	return (
		<input
			className={flag ? styles.input : `${styles.input} ${styles.wrong}`}
			onChange={validate}
			onKeyPress={updateDescrList}
			type="text" placeholder={titleInput}
			onBlur={close}
		/>
	);
};

export default InputCard;
