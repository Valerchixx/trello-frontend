import {IBoard} from '../../../common/interfaces/IBoard';
import {Boards} from '../../types/types';

const initialState = {
	boards: [] as IBoard[],
};

export default function reducer(state = initialState, action: {type: string, payload?: []}) {
	switch (action.type) {
		case Boards.UPDATE_BOARDS:
			return {
				...state,
				boards: action.payload,
			};
		case Boards.ADD_BOARDS:
			return {
				...state,
			};

		default: {
			return {...state, ...action.payload};
		}
	}
}
