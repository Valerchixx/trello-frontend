import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateBoardTitle} from '../../../../store/modules/board/action';
import {validator, regExp} from '../../../../common/validator/validator';
import styles from './input.module.css';
type inputInfo = {
	value:string,
	close:() => void,
	id: string

}
const Input = ({value, close, id}: inputInfo) => {
	const [title, setTitle] = useState('');
	const [flag, setFlag] = useState(true);
	const dispatch = useDispatch();

	function validateInput(event:React.ChangeEvent<HTMLInputElement>): void {
		const data = event.target.value;
		const title = validator(regExp, data) ? data : '';
		const flag = Boolean(validator(regExp, data));
		setTitle(title);
		setFlag(flag);
	}

	function onEnter(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && title) {
			dispatch(updateBoardTitle(id, title.trim()));
			close?.();
		}
	}

	return (
		<div>
			<input
				className={flag ? styles.inputTitle
					: `${styles.inputTitle} ${styles.wrong}`}
				type="text" placeholder={value}
				onKeyPress={onEnter} onChange={validateInput}
				onBlur={close}/>
		</div>
	);
};

export default Input;
