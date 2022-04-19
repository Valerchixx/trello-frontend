import {Loader} from '../../types/types';

const initialState = {
	loading: false,
};

export default function loaderReducer(state = initialState, action: {type: string, payload?: {loading:boolean}}) {
	switch (action.type) {
		case Loader.LOADER_DISPLAY_ON:
			return {
				...state,
				loading: true,
			};
		case Loader.LOADER_DISPLAY_OFF:
			return {
				...state,
				loading: false,
			};
		default: {
			return state;
		}
	}
}
