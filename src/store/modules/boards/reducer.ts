import {IBoard} from '../../../common/interfaces/IBoard';

const initialState = {
	boards: [] as IBoard[],
};

export default function reducer(state = initialState, action: {type: string, payload?: []}) {
	switch (action.type) {
		case 'UPDATE_BOARDS':
			return {
				...state,
				boards: action.payload,
			};
		case 'ADD_BOARDS':
			return {
				...state,
			};

		default: {
			return {...state, ...action.payload};
		}
	}
}
