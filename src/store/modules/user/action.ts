/* eslint-disable no-unused-vars */
import {AnyAction} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import api from '../../../api/request';
import {TAppState} from '../../store';
import history from '../../../common/history/history';
import {loaderOn, loaderOff} from '../loader/action';
import {Users} from '../../types/types';

export const auth = (em: string, pass: string, errNote?: () => void, errBorder?: () => void) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		dispatch(loaderOn());
		const data = await api.post<unknown, { token: string }>('/login', {email: em, password: pass});
		dispatch({type: Users.LOGIN});
		setTimeout(() => {
			dispatch(loaderOff());
			window.location.reload();
		}, 200);
		localStorage.setItem('token', data.token);
		history.push('/');
	} catch (e) {
		dispatch(loaderOff());
		if (errNote && errBorder) {
			errNote();
			errBorder();
		}
	}
};

export const registration = (em: string, pass: string, errNote?: () => void, errBorder?: () => void) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		dispatch(loaderOn());
		await api.post('/user', {email: em, password: pass});
		setTimeout(async () => {
			dispatch({type: Users.SIGN_UP});
			await dispatch(auth(em, pass));
			dispatch(loaderOff());
		}, 300);
	} catch (e) {
		dispatch(loaderOff());
		if (errBorder && errNote) {
			errBorder();
			errNote();
		}
	}
};

export const logout = () => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	localStorage.removeItem('token');
	dispatch(loaderOn());
	dispatch({type: Users.LOGOUT});
	history.push('/login');
	setTimeout(() => {
		window.location.reload();
	}, 400);
};
