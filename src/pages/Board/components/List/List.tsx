import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {list} from '../../../../common/interfaces/IBoardFetch';
import ICard from '../../../../common/interfaces/ICard';
import styles from './list.module.css';
import {deleteList} from '../../../../store/modules/board/action';
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';
import InputCard from '../InputCard/InputCard';
type listInfo = {
  currentPostId: string | undefined,
  listArr:list[],
  title: string,
  cards: ICard[],
  id: number,
  boardid: string,
  poscard:number;
  poslist:number,
  boardTitle:string,
}
const List = ({currentPostId, listArr, title, cards, id, boardid, poscard, poslist, boardTitle}: listInfo) => {
	const [open, setOpen] = useState({open: false, openInput: false});

	const dispatch = useDispatch();
	function delList() {
		dispatch(deleteList(Number(id), boardid));
	}

	function openCard() {
		setOpen({
			...open,
			open: true,
		});
	}

	function opensInput() {
		setOpen({
			...open,
			openInput: true,
		});
	}

	return (

		<div className={styles.list}>
			<div className={styles.wrapper}>
				<div onClick={opensInput}>
					<h3>
						{open.openInput
							? <InputCard
								listId={id}
								titleInput={title}
								poslist={poslist}
								boardId={boardid}
								close={() => setOpen({...open, openInput: false})}
							/>
							: title}
					</h3>
				</div>
				<div className={styles.close} onClick={delList}>&#215;</div>
			</div>
			{Object.keys(cards).length !== 0 && Object.values(cards).sort((a, b) => a.position - 1 - b.position).map((item, index) => (
				<Card
					currentPostId={currentPostId}
					key={item.id}
					id={item.id}
					boardId={boardid}
					boardTitle={boardTitle}
					title={title}
					descr={item.description}
					listTitle={title}
					listId={id}
					listArr={listArr}
					posCard={poscard}
					index={index}
				/>
			))}

			<div className={styles.addCard}> {open.open
				? <AddCard
					idList={id} posCard={poscard}
					boardId={boardid}
					close={() => setOpen({...open, open: false})}/>
				: <button type="button" className={styles.btn} onClick={openCard}>+ Add card</button>}
			</div>
		</div>

	);
};

export default List;
