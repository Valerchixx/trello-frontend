import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import {RootState} from 'store/reducer';
import {useDispatch, useSelector} from 'react-redux';
import {DragDropContext} from 'react-beautiful-dnd';
import {sort, MoveCard} from 'store/modules/board/action';
import Login from 'pages/Login/Login';
import SignUp from 'pages/SignUp/SignUp';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import './App.css';

export default function App() {
	const dispatch = useDispatch();
	const error = useSelector((state:RootState) => state.errorReducer.error);
	const token = localStorage.getItem('token');

	const onDragEnd = (result: any) => {
		const {destination, source, draggableId} = result;

		if (!destination) {
			return;
		}

		dispatch(sort(source.droppableId, destination.droppableId, source.index, destination.index, draggableId));
		if (source.droppableId === destination.droppableId) {
			dispatch(MoveCard(source.droppableId, String(1646474913842), draggableId, source.index, destination.index, destination.droppableId));
		} else if (source.droppableId !== destination.droppableId) {
			dispatch(MoveCard(source.droppableId, String(1646474913842), draggableId, source.index, destination.index, destination.droppableId));
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<div className="App">
				<Router>
					<div>
						<Switch>
							{error && <> <div className="showError"><div className="errorContent"><h2 className="errorH2">Oops!</h2><p className="errorP">{error}</p></div></div> </>}
							<Route exact path="/">{!token ? <Redirect to="/login" /> : <Home boards={[]} /> } </Route>
							{error && <> <div className="showError"><div className="errorContent"><p className="errorP">{error}</p></div></div> </>}
							<Route exact path="/board/:boardId/:name" component={Board} />
							<Route exact path="/b/:boardId/c/:id" component={Board} />
							<Route exact path="/login" component={Login} />
							<Route exact path="/signUp" component={SignUp} />
						</Switch>
					</div>
				</Router>
			</div>
		</DragDropContext>
	);
}
