import React, {useEffect, useState} from 'react';
import {Redirect} from 'react-router-dom';
import {Draggable} from 'react-beautiful-dnd';
import {list} from '../../../../common/interfaces/IBoardFetch';
import ModalCard from '../ModalCard/ModalCard';

import styles from './card.module.css';

function Card(props:
    {
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
}) {
	const [flag, setFlag] = useState(false);
	const urlCard = `/b/${props.boardId}/c/${props.id}`;
	const urlBoard = `/board/${props.boardId}/${props.boardTitle}`;

	function openModal() {
		setFlag(true);
	}

	useEffect(() => {
		if (props.id === Number(props.currentPostId)) {
			openModal();
		}
	}, []);

	return (
		<Draggable draggableId={String(props.id)} index={props.index}>
			{provided => (
				<div className={styles.cards} ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
					<ModalCard
						flag={flag}
						listArr={props.listArr}
						listTitle={props.listTitle}
						descr={props.descr}
						listId={props.listId}
						boardId={props.boardId}
						title={props.title}
						idCard={props.id}
						posCard={props.posCard}
						close={() => setFlag(false)}
					/>
					<div onClick={openModal} className={styles.cardDiv}><p>{props.title}</p></div>
					{flag ? <Redirect to={urlCard} /> : <Redirect to={urlBoard} /> }
				</div>

			)}

		</Draggable>
	);
}

export default Card;
