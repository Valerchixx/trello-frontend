import React, {ChangeEvent, useState} from 'react';
import {useDispatch} from 'react-redux';
import {updateDescr, deleteCard, updateCard} from '../../../../store/modules/board/action';
import {list} from '../../../../common/interfaces/IBoardFetch';
import {validator, regExp} from '../../../../common/validator/validator';
import MoveModal from '../MoveBoardModal/MoveModal';
import styles from './modalCard.module.css';
type modalCard = {
    flagBody:boolean,
    posCard:number,
    descr:string,
    listId:number,
    boardId:string,
    title:string,
    idCard:number,
    close:()=> void,
    listTitle:string,
    listArr:list[]

}
function ModalCard(
	{flagBody,
		posCard,
		descr,
		listId,
		boardId,
		title,
		idCard,
		close,
		listTitle,
		listArr,
	}: modalCard) {
	const [value, setValue] = useState({valueInput: descr, dataTitle: '', move: false});
	const [flag, setFlag] = useState({flag1: false, flag2: true});
	const dispatch = useDispatch();

	function AdDesc(event:ChangeEvent<HTMLInputElement>) {
		const data = event.currentTarget.value;
		setValue({
			...value,
			valueInput: data,
		});
	}

	if (flagBody) {
		document.querySelector('html')?.classList.add('hidden');
	} else {
		document.querySelector('html')?.classList.remove('hidden');
	}

	function addTitle(event:ChangeEvent<HTMLInputElement>) {
		const titleData = event.currentTarget.value;
		const isValid = validator(regExp, titleData);
		setValue({
			...value,
			dataTitle: isValid ? titleData : '',
		});
		setFlag({
			...flag,
			flag2: isValid,
		});
	}

	function onClose() {
		close?.();
	}

	function keyEnter(event:React.KeyboardEvent<HTMLInputElement>) {
		if (event.key === 'Enter' && value) {
			dispatch(updateDescr(idCard, boardId, value.valueInput));
		}
	}

	function delCard() {
		dispatch(deleteCard(idCard, boardId));
		close?.();
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
			dispatch(updateCard(listId, boardId, idCard, value.dataTitle));
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
		<div className={ flagBody ? `${styles.modalCard}  ${styles.active}` : styles.modalCard } onClick={onClose}>
			<div className={flagBody ? `${styles.modalCardContent} ${styles.active}` : styles.modalCardContent } onClick={e => e.stopPropagation()}>
				<div className={styles.wrapHeader}>
					<div className={styles.wrapH}>
						<div>{ flag.flag1
							? <input type="text" placeholder={title}
								onKeyPress={Updatecard}
								onBlur={closeInput}
								onChange={addTitle}
								className={flag.flag2 ? styles.inputTitle : `${styles.inputTitle} ${styles.wrong}`} />
							: <div onClick={openInput}><h3>{title}</h3></div>}
						</div>
					</div>
					<div className={styles.wrapP}>
						<p>{`list: ${listTitle}`}</p>
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
									close={close}
									closeMove={() => setValue({...value, move: false})}
									posCard={posCard} listId={listId}
									boardId={boardId} cardId={idCard}
									listArr={listArr} />}
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ModalCard;
