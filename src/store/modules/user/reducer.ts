import {SIGN_UP, LOGIN, LOGOUT} from '../../types/types';

const initialState = {
	isAuthorized: false,
};

export default function reducer(state = initialState, action: {type: string}) {
	switch (action.type) {
		case SIGN_UP:
			return {
				...state,
			};
		case LOGIN:
			return {
				...state,
				isAuthorized: true,
			};
		case LOGOUT:
			return {
				...state,
				isAuthorized: false,
			};
		default: {
			return {...state};
		}
	}
}
