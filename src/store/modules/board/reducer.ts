import {IBoardFetch} from '../../../common/interfaces/IBoardFetch';
import {DragDrop, Card, List, Board, Boards} from '../../types/types';
import {moveCard} from './action';

const initialState = {
	board: {} as IBoardFetch,
	boardTitle: '',
};

export default function reducer(state = initialState, action: {type: string, payload:any}) {
	switch (action.type) {
		case Board.GET_BOARD:
			return {
				...state,
				board: action.payload,
			};
		case Boards.UPDATE_BOARDS:
			return {
				...state,
				boardTitle: action.payload,
			};
		case List.ADD_LIST:
			return {
				...state,
			};
		case Card.ADD_CARD:
			return {
				...state,
			};
		case List.UPDATE_LIST:
			return {
				...state,
			};
		case Card.UPDATE_DESCRIPTION:
			return {
				...state,
			};
		case Card.UPDATE_CARD:
			return {
				...state,
			};
		case DragDrop.DRAG_HAPPENED:
			const {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId} = action.payload;
			if (droppableIdStart === droppableIdEnd) {
				moveCard(droppableIdStart, String(1646474913842), draggableId, droppableIndexStart, droppableIndexEnd, droppableIdEnd);
			}

			return {
				...state,
			};

		default: {
			return {...state, ...action.payload};
		}
	}
}
