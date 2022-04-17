import {ERROR_ACTION_TYPE} from '../../types/types';

const initialState = {
	error: null,
};

export default function errorReducer(state = initialState, action: {type: string, payload:never}) {
	switch (action.type) {
		case ERROR_ACTION_TYPE:
			return {
				...state,
				error: action.payload,
			};
		default: {
			return state;
		}
	}
}
