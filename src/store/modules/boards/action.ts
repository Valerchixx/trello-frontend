/* eslint-disable no-unused-vars */
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import {IBoard} from '../../../common/interfaces/IBoard';
import {TAppState} from '../../store';
import {loaderOn, loaderOff} from '../loader/action';
import api from '../../../api/request';
import {errorType} from '../error/action';
import {ADD_BOARDS, UPDATE_BOARDS} from '../../types/types';

export const getBoards = () => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		dispatch(loaderOn());
		const data: {
            boards: IBoard[]
        } = await api.get('/board');
		setTimeout(() => {
			dispatch({type: UPDATE_BOARDS, payload: data.boards});
			dispatch(loaderOff());
		}, 400);
	} catch (e) {
		dispatch(errorType('Error loading boards'));
	}
};

export const CreateBoards = (inputText:string) => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		await api.post('/board', {title: inputText});
		dispatch({type: ADD_BOARDS});
		await dispatch(getBoards());
	} catch (e) {
		dispatch(errorType('Error adding board'));
	}
};

