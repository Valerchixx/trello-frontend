import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {list} from '../../../../common/interfaces/IBoardFetch';
import {moveCard} from '../../../../store/modules/board/action';
import styles from './modalMove.module.css';
type moveModal = {
	close:() => void,
    closeMove:() => void,
    listArr:list[],
    posCard:number,
    listId:number,
    boardId:string,
    cardId:number
}
const MoveModal = (
	{
		close,
		closeMove,
		listArr,
		posCard,
		listId,
		boardId,
		cardId,
	}: moveModal) => {
	const [value, setValue] = useState(posCard);
	const [valueList, setValueList] = useState(listId);
	const dispatch = useDispatch();

	function moves() {
		dispatch(moveCard(listId, boardId, cardId, posCard, value, valueList));
		close?.();
	}

	return (
		<div className={styles.modalMove} onClick={e => e.stopPropagation()}>
			<div className={styles.modalMoveContent}>
				<div className={styles.headerMove}>
					<div> <h3 >Move card</h3></div>
					<div onClick={closeMove} className={styles.close}>&#215;</div>
				</div>
				<div className={styles.wrapForm}>
					<p className={styles.label}>Position</p>
					<select className={styles.select} value={value} onChange={e => setValue(Number(e.target.value) - 1)}>
						{Object.values(listArr[valueList].cards).length > 0 ? Object.values(listArr[valueList].cards).map((item, index) =>
							<option key={item.id}>{index + 1}</option>) : <option value={0}>1</option>}
					</select>
					<p className={styles.label}>Desk</p>
					<select className={styles.select} value={valueList} onChange={e => setValueList(Number(e.target.value))}>
						{ Object.values(listArr).map(item =>
							<option key={item.id} value={item.id}>{item.title}</option>)}
					</select>
					<button className={styles.moveBtn} onClick={moves} type="button">Move card</button>
				</div>
			</div>
		</div>
	);
};

export default MoveModal;
