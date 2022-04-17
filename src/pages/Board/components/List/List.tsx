import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {Droppable} from 'react-beautiful-dnd';
import {list} from '../../../../common/interfaces/IBoardFetch';
import ICard from '../../../../common/interfaces/ICard';
import styles from './list.module.css';
import {deleteList} from '../../../../store/modules/board/action';
import Card from '../Card/Card';
import AddCard from '../AddCard/AddCard';
import InputCard from '../InputCard/InputCard';

function List(props: {
  currentPostId: string | undefined,
  listArr:list[],
  title: string,
  cards: ICard[],
  id: number,
  boardid: string,
  poscard:number;
  poslist:number,
  boardTitle:string,
}) {
	const [open, setOpen] = useState({open: false, openInput: false});

	const dispatch = useDispatch();
	function delList() {
		dispatch(deleteList(Number(props.id), props.boardid));
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
		<Droppable droppableId={String(props.id)}>
			{provided => (
				<div {...provided.droppableProps} ref={provided.innerRef} className={styles.list}>
					<div className={styles.wrapper}>
						<div onClick={opensInput}>
							<h3>
								{open.openInput
									? <InputCard
										listId={props.id}
										title={props.title}
										poslist={props.poslist}
										boardId={props.boardid}
										close={() => setOpen({...open, openInput: false})}
									/>
									: props.title}
							</h3>
						</div>
						<div className={styles.close} onClick={delList}>&#215;</div>
					</div>
					{Object.keys(props?.cards).length !== 0 && Object.values(props.cards).sort((a, b) => a.position - 1 - b.position).map((item, index) => (
						<Card
							currentPostId={props.currentPostId}
							key={item.id}
							id={item.id}
							boardId={props.boardid}
							boardTitle={props.boardTitle}
							title={item.title}
							descr={item.description}
							listTitle={props.title}
							listId={props.id}
							listArr={props.listArr}
							posCard={props.poscard}
							index={index}
						/>
					))}
					{provided.placeholder}
					<div className={styles.addCard}> {open.open
						? <AddCard
							idList={props.id} posCard={props.poscard}
							boardId={props.boardid}
							close={() => setOpen({...open, open: false})}/>
						: <button type="button" className={styles.btn} onClick={openCard}>+ Add card</button>}
					</div>
				</div>

			)}

		</Droppable>
	);
}

export default List;
