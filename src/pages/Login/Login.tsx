/* eslint-disable no-useless-escape */
import React, {ChangeEvent, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import {validator} from 'common/validator/validator';
import {Auth} from '../../store/modules/user/action';
import Spin from '../spin/Spin';
import styles from './login.module.css';

function Login() {
	const notify = () => toast.error('Неверный логин или пароль', {
		autoClose: 3000,
		closeOnClick: true,
		pauseOnHover: true,
	});
	const dispatch = useDispatch();
	const [flag, setFlag] = useState({flagEmail: true, flagPass: true});
	const [title, setTitle] = useState({titleEmail: '', titlePass: ''});

	function validateEmail(event:ChangeEvent<HTMLInputElement>) {
		const data = event.target.value;
		const regExp = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
		if (validator(regExp, data)) {
			setTitle({
				...title,
				titleEmail: data,
			});
			setFlag({
				...flag,
				flagEmail: true,
			});
		} else {
			setTitle({
				...title,
				titleEmail: '',
			});
			setFlag({
				...flag,
				flagEmail: false,
			});
		}
	}

	function validatePass(event:ChangeEvent<HTMLInputElement>) {
		const data = event.target.value;
		const regExp = /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}/;
		if (validator(regExp, data)) {
			setTitle({
				...title,
				titlePass: data,
			});
			setFlag({
				...flag,
				flagPass: true,
			});
		} else {
			setTitle({
				...title,
				titlePass: '',
			});
			setFlag({
				...flag,
				flagPass: false,
			});
		}
	}

	function errors() {
		setFlag({
			...flag,
			flagPass: false,
			flagEmail: false,
		});
	}

	async function login() {
		if (title.titlePass && title.titleEmail) {
			dispatch(Auth(title.titleEmail, title.titlePass, notify, errors));
		} else {
			setFlag({
				...flag,
				flagPass: false,
				flagEmail: false,
			});
		}
	}

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<h1>Вход</h1>
				<form action="sumbit">
					<div className={styles.formWrap}>
						<label htmlFor="email">Email</label>
						<input className={flag.flagEmail
							? styles.input : `${styles.input} ${styles.wrong}` }
						onChange={validateEmail} type="text" name="email" />
					</div>
					<Spin />
					<div className={styles.formWrap}>
						<label htmlFor="password">Пароль</label>
						<input className={flag.flagPass ? styles.input
							: `${styles.input} ${styles.wrong}`} onChange={validatePass}
						type="password" name="password" />
					</div>
					<ToastContainer />
					<button className={styles.btn} onClick={login} type="button">Войти</button>
				</form>
				<div className={styles.linkWrap}>
					<p>Впервые у нас?</p>
					<Link className={styles.link} to="/signUp">Зарегестрироваться</Link>
				</div>
			</div>
		</div>
	);
}

export default Login;
