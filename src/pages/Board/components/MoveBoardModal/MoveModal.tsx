import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {list} from '../../../../common/interfaces/IBoardFetch';
import {MoveCard} from '../../../../store/modules/board/action';
import styles from './modalMove.module.css';

function MoveModal(props:
    {
    close:() => void,
    closeMove:() => void,
    listArr:list[],
    posCard:number,
    listId:number,
    boardId:string,
    cardId:number
}) {
	const [value, setValue] = useState(props.posCard);
	const [valueList, setValueList] = useState(props.listId);
	const dispatch = useDispatch();

	function moves() {
		dispatch(MoveCard(props.listId, props.boardId, props.cardId, props.posCard, value, valueList));
		props.close?.();
	}

	return (
		<div className={styles.modalMove} onClick={e => e.stopPropagation()}>
			<div className={styles.modalMoveContent}>
				<div className={styles.headerMove}>
					<div> <h3 >Move card</h3></div>
					<div onClick={props.closeMove} className={styles.close}>&#215;</div>
				</div>
				<div className={styles.wrapForm}>
					<p className={styles.label}>Position</p>
					<select className={styles.select} value={value} onChange={e => setValue(Number(e.target.value) - 1)}>
						{Object.values(props.listArr[valueList].cards).length > 0 ? Object.values(props.listArr[valueList].cards).map((item, index) =>
							<option key={item.id}>{index + 1}</option>) : <option value={0}>1</option>}
					</select>
					<p className={styles.label}>Desk</p>
					<select className={styles.select} value={valueList} onChange={e => setValueList(Number(e.target.value))}>
						{ Object.values(props.listArr).map(item =>
							<option key={item.id} value={item.id}>{item.title}</option>)}
					</select>
					<button className={styles.moveBtn} onClick={moves} type="button">Move card</button>
				</div>
			</div>
		</div>
	);
}

export default MoveModal;
