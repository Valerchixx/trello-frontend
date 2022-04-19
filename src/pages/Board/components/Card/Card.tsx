import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Draggable} from 'react-beautiful-dnd';
import {list} from '../../../../common/interfaces/IBoardFetch';
import ModalCard from '../ModalCard/ModalCard';

import styles from './card.module.css';
type card = {
	currentPostId: string | undefined,
    listArr:list[],
    title:string,
    descr:string,
    posCard:number,
    id:number,
    boardId:string,
    listId:number,
    listTitle:string,
    boardTitle:string,
    index: number
}
const Card = (
	{
		currentPostId,
		listArr,
		title,
		descr,
		posCard,
		id,
		boardId,
		listId,
		listTitle,
		boardTitle,
		index,
	}: card) => {
	const [flag, setFlag] = useState(false);
	const urlCard = `/b/${boardId}/c/${id}`;
	const urlBoard = `/board/${boardId}/${boardTitle}`;

	function openModal() {
		setFlag(true);
	}

	useEffect(() => {
		if (id === Number(currentPostId)) {
			openModal();
		}
	}, []);

	return (
		<Draggable draggableId={String(id)} index={index}>
			{provided => (
				<div className={styles.cards} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<ModalCard
						flagBody={flag}
						listArr={listArr}
						listTitle={listTitle}
						descr={descr}
						listId={listId}
						boardId={boardId}
						title={title}
						idCard={id}
						posCard={posCard}
						close={() => setFlag(false)}
					/>
					<div onClick={openModal} className={styles.cardDiv}><p>{title}</p></div>
					{flag ? <Redirect to={urlCard} /> : <Redirect to={urlBoard} /> }
				</div>

			)}

		</Draggable>
	);
};

export default Card;
