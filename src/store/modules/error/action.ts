import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {TAppState} from '../../store';
import {ERROR_ACTION_TYPE} from '../../types/types';

export const errorType = (payload: string) => (dispatch:ThunkDispatch<TAppState, void, AnyAction>) => {
	dispatch({
		type: ERROR_ACTION_TYPE,
		payload,
	});
};

