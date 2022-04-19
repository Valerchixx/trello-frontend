import {Users} from '../../types/types';

const initialState = {
	isAuthorized: false,
};

export default function reducer(state = initialState, action: {type: string}) {
	switch (action.type) {
		case Users.SIGN_UP:
			return {
				...state,
			};
		case Users.LOGIN:
			return {
				...state,
				isAuthorized: true,
			};
		case Users.LOGOUT:
			return {
				...state,
				isAuthorized: false,
			};
		default: {
			return {...state};
		}
	}
}
