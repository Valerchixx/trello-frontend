import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {UpdateDescr, deleteCard, UpdateCard} from '../../../../store/modules/board/action';
import {list} from '../../../../common/interfaces/IBoardFetch';
import {validator, regExp} from '../../../../common/validator/validator';
import MoveModal from '../MoveBoardModal/MoveModal';
import styles from './modalCard.module.css';

function ModalCard(props:
    {flag:boolean,
    posCard:number,
    descr:string,
    listId:number,
    boardId:string,
    title:string,
    idCard:number,
    close:()=> void,
    listTitle:string,
    listArr:list[]
}) {
	const [value, setValue] = useState({valueInput: props.descr, dataTitle: '', move: false});
	const [flag, setFlag] = useState({flag1: false, flag2: true});
	const dispatch = useDispatch();

	function AdDesc(event:ChangeEvent<HTMLInputElement>) {
		const data = event.currentTarget.value;
		setValue({
			...value,
			valueInput: data,
		});
	}

	if (props.flag) {
		document.querySelector('html')?.classList.add('hidden');
	} else {
		document.querySelector('html')?.classList.remove('hidden');
	}

	function AddTitle(event:ChangeEvent<HTMLInputElement>) {
		const titleData = event.currentTarget.value;
		if (validator(regExp, titleData)) {
			setValue({
				...value,
				dataTitle: titleData,
			});
			setFlag({
				...flag,
				flag2: true,
			});
		} else {
			setValue({
				...value,
				dataTitle: '',
			});
			setFlag({
				...flag,
				flag2: false,
			});
		}
	}

	function onClose() {
		props.close?.();
	}

	function keyEnter(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && value) {
			dispatch(UpdateDescr(props.idCard, props.boardId, value.valueInput));
		}
	}

	function delCard() {
		dispatch(deleteCard(props.idCard, props.boardId));
		props.close?.();
	}

	function openInput() {
		setFlag({
			...flag,
			flag1: true,
		});
	}

	function closeInput() {
		setFlag({
			...flag,
			flag1: false,
		});
	}

	function Updatecard(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && value.dataTitle) {
			dispatch(UpdateCard(props.listId, props.boardId, props.idCard, value.dataTitle));
			setFlag({
				...flag,
				flag1: false,
			});
		}

		if (event.key === 'Enter' && !value.dataTitle) {
			setFlag({
				...flag,
				flag2: false,
			});
		}
	}

	function openMoves() {
		setValue({
			...value,
			move: true,
		});
	}

	return (
		<div className={ props.flag ? `${styles.modalCard}  ${styles.active}` : styles.modalCard } onClick={onClose}>
			<div className={props.flag ? `${styles.modalCardContent} ${styles.active}` : styles.modalCardContent } onClick={e => e.stopPropagation()}>
				<div className={styles.wrapHeader}>
					<div className={styles.wrapH}>
						<div>{ flag.flag1
							? <input type="text" placeholder={props.title}
								onKeyPress={Updatecard}
								onBlur={closeInput}
								onChange={AddTitle}
								className={flag.flag2 ? styles.inputTitle : `${styles.inputTitle} ${styles.wrong}`} />
							: <div onClick={openInput}><h3>{props.title}</h3></div>}
						</div>
					</div>
					<div className={styles.wrapP}>
						<p>{`list: ${props.listTitle}`}</p>
					</div>
				</div>
				<div className={styles.wrapper}>
					<div className={styles.description}>
						<p>Add description</p>
						<input type="text"
							value={value.valueInput}
							onKeyPress={keyEnter}
							placeholder="Enter a description"
							onChange={AdDesc}
							className={styles.input} />
					</div>
					<div className={styles.btns}>
						<h3>Actions:</h3>
						<div className={styles.wrapBtns}>
							<div className={styles.wrapDelBtn}>
								<button className={ `${styles.deleteBtn} ${styles.btn} `} onClick={delCard} type="button">delete card</button>
							</div>
							<div className={ `${styles.wrapMoveBtn} `}>
								<button className={`${styles.movebtn} ${styles.btn}`} onClick={openMoves} type="button">Move card</button>
								{value.move && <MoveModal
									close={props.close}
									closeMove={() => setValue({...value, move: false})}
									posCard={props.posCard} listId={props.listId}
									boardId={props.boardId} cardId={props.idCard}
									listArr={props.listArr} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalCard;
