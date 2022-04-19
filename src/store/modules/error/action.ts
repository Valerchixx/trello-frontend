import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TAppState} from '../../store';
import {Error} from '../../types/types';

export const errorType = (payload: string) => (dispatch:ThunkDispatch<TAppState, void, AnyAction>) => {
	dispatch({
		type: Error.ERROR_ACTION_TYPE,
		payload,
	});
};

