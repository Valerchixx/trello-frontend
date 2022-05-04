import React from 'react';
import {
	HashRouter as Router,
	Switch,
	Route,
	Redirect,
} from 'react-router-dom';
import {RootState} from 'store/reducer';
import Login from 'pages/Login/Login';
import SignUp from 'pages/SignUp/SignUp';
import Board from './pages/Board/Board';
import Home from './pages/Home/Home';
import './App.css';
import {useSelector} from 'react-redux';

export default function App() {
	const error = useSelector((state:RootState) => state.errorReducer.error);
	const token = localStorage.getItem('token');

	return (

		<div className="App">
			<div className="containerBody">
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
		</div>
	);
}
