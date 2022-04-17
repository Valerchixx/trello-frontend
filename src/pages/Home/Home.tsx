import React from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Boarding from './components/Board/Boarding';
import {getBoards} from '../../store/modules/boards/action';
import {IBoard} from '../../common/interfaces/IBoard';
import {Logout} from '../../store/modules/user/action';
import Modal from './components/Modal/Modal';
import styles from './home.module.css';
import Spin from '../spin/Spin';

type propsType = {
    boards: IBoard[],
    getBoards: () => Promise<void>,
    Logout: () => Promise<void>

}

type stateType = {showModal: boolean}

class Home extends React.Component<propsType, stateType> {
	constructor(props: any) {
		super(props);
		this.state = {
			showModal: false,
		};
	}

	async componentDidMount() {
		await this.props.getBoards();
	}

	handleModal = () => {
		this.setState({showModal: !this.state.showModal});
	};

	logOut = () => {
		this.props.Logout();
	};

	render() {
		return (
			<div className="Home">
				<div className={styles.headWrap}>
					<div><button className={styles.logout} type="button" onClick={this.logOut}>Выйти</button></div>
					<div><h1 className={styles.title}>Мои доски</h1></div>
				</div>
				<Spin />
				<div className={styles.boardsWrap}>
					{this.props.boards.map(item =>
						<Link className={styles.link} to={`/board/${item.id}/${item.title}`} key={item.id}>
							<Boarding key={item.id} title={item.title} />
						</Link>,
					)}
					<button type="button"className={styles.newDesk} onClick={this.handleModal}>+ Add desk</button>
					<Modal open={this.state.showModal} handleModal={this.handleModal} />
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state:{
  boards: IBoard[],
}) => ({
	...state.boards,
});

export default connect(mapStateToProps, {getBoards, Logout})(Home);
