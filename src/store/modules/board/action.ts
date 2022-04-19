/* eslint-disable no-unused-vars */
import {AnyAction, Dispatch} from 'redux';
import {ThunkDispatch} from 'redux-thunk';
import api from '../../../api/request';
import {asyncDispatch as storeDispatch, TAppState} from '../../store';
import history from '../../../common/history/history';
import {loaderOn, loaderOff} from '../loader/action';
import {errorType} from '../error/action';
import {
	Board,
	Boards,
	List,
	Card,
	DragDrop,
} from '../../types/types';

export const getBoard = (id:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		dispatch(loaderOn());
		const data = await api.get(`/board/${id}`);
		setTimeout(() => {
			dispatch({type: Board.GET_BOARD, payload: data});
			dispatch(loaderOff());
		}, 200);
	} catch (e) {
		dispatch(errorType('Error loading board'));
	}
};

export const updateBoardTitle = (id:string, newTitle:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		await api.put(`/board/${id}`, {title: newTitle});
		dispatch({type: Boards.UPDATE_BOARDS});
		await dispatch(getBoard(id));
	} catch (e) {
		dispatch(errorType('Error  update board title'));
	}
};

export const editBoardTitle = (title: string): void => {
	storeDispatch({type: Board.BOARD_TITLE_CHANGE, payload: title});
};

export const createList = (text: string, pos: number, id:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		await api.post(`/board/${id}/list`, {title: text, position: pos});
		dispatch({type: List.ADD_LIST});
		await dispatch(getBoard(id));
	} catch (e) {
		dispatch(errorType('Error adding list'));
	}
};

export const deleteBoard = (id:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		await api.delete(`/board/${id}`);
		dispatch({type: Board.DELETE_BOARD});
		history.push('/');
		window.location.reload();
	} catch (e) {
		dispatch(errorType('Failied to delete board'));
	}
};

export const deleteList = (id:number, boardId:string) => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		dispatch(loaderOn());
		await api.delete(`/board/${boardId}/list/${id}`);
		dispatch({type: List.DELETE_LIST});
		dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Failied to delete list'));
	}
};

export const createCard = (text: string, pos: number, id:number, boardId:string) => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		dispatch(loaderOn());
		await api.post(`/board/${boardId}/card`, {title: text, list_id: id, position: pos});
		dispatch({type: Card.ADD_CARD});
		await dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Error adding card'));
	}
};

export const updateList = (idList:number, boardId:string, pos:number, text:string) => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		await api.put(`/board/${boardId}/list/${idList}`, {title: text, position: pos});
		dispatch({type: List.UPDATE_LIST});
		await dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Error  update list title'));
	}
};

export const updateDescr = (idCard:number, boardId:string, descr:string) => async (dispatch: ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		await api.put(`/board/${boardId}/card/${idCard}`, {description: descr});
		dispatch({type: Card.UPDATE_DESCRIPTION});
		await dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Error  update description'));
	}
};

export const deleteCard = (cardId:number, boardId:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>): Promise<void> => {
	try {
		dispatch(loaderOn());
		await api.delete(`/board/${boardId}/card/${cardId}`);
		dispatch({type: Card.DELETE_CARD});
		dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Failied to delete card'));
	}
};

export const updateCard = (listId:number, boardId:string, cardId:number, text:string) => async (dispatch:ThunkDispatch<TAppState, void, AnyAction>) => {
	try {
		await api.put(`/board/${boardId}/card/${cardId}`, {title: text, list_id: listId});
		dispatch({type: Card.UPDATE_CARD});
		await dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Error  update card title'));
	}
};

export const moveCard = (listId:number, boardId:string, cardId:number, pos:number, currPos:number, curListId:number) => async (dispatch: Dispatch<any>) => {
	try {
		await api.put(`/board/${boardId}/card`, [{id: cardId, position: pos, list_id: listId}, {id: cardId, position: currPos, list_id: curListId}]);
		dispatch({type: Card.MOVE_CARD});
		await dispatch(getBoard(boardId));
	} catch (e) {
		dispatch(errorType('Error move card'));
	}
};

// Drag & drop

export const sort = (droppableIdStart:any, droppableIdEnd:any, droppableIndexStart:any, droppableIndexEnd:any, draggableId:any) => async (dispatch:Dispatch<{ type: string; payload: any; } | { type: string; payload?: [] | undefined; } | { type: string; } | { type: string; payload?: { loading: boolean; } | undefined; } | { type: string; payload: never; }>) => {
	dispatch({type: DragDrop.DRAG_HAPPENED, payload: {droppableIdStart, droppableIdEnd, droppableIndexStart, droppableIndexEnd, draggableId}});
};
