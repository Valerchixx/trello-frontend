import {IBoardFetch} from '../../../common/interfaces/IBoardFetch';
import {GET_BOARD, UPDATE_BOARDS, ADD_LIST, ADD_CARD, UPDATE_LIST, UPDATE_DESCRIPTION, UPDATE_CARD, DRAG_HAPPENED} from '../../types/types';
import {MoveCard} from './action';

const initialState = {
	board: {} as IBoardFetch,
	boardTitle: '',
};

export default function reducer(state = initialState, action: {type: string, payload:any}) {
	switch (action.type) {
		case GET_BOARD:
			return {
				...state,
				board: action.payload,
			};
		case UPDATE_BOARDS:
			return {
				...state,
				boardTitle: action.payload,
			};
		case ADD_LIST:
			return {
				...state,
			};
		case ADD_CARD:
			return {
				...state,
			};
		case UPDATE_LIST:
			return {
				...state,
			};
		case UPDATE_DESCRIPTION:
			return {
				...state,
			};
		case UPDATE_CARD:
			return {
				...state,
			};
		case DRAG_HAPPENED:
			const {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId} = action.payload;
			if (droppableIdStart === droppableIdEnd) {
				MoveCard(droppableIdStart, String(1646474913842), draggableId, droppableIndexStart, droppableIndexEnd, droppableIdEnd);
			}

			return {
				...state,
			};

		default: {
			return {...state, ...action.payload};
		}
	}
}
