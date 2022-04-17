/* eslint-disable no-useless-escape */
import React, {ChangeEvent, useState} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {Link} from 'react-router-dom';
import {useDispatch} from 'react-redux';
import {validator} from 'common/validator/validator';
import {Registration} from '../../store/modules/user/action';
import Spin from '../spin/Spin';
import styles from './signUp.module.css';

function SignUp() {
	const notify = () => toast.error('Пользователь уже существует', {
		autoClose: 3000,
		closeOnClick: true,
		pauseOnHover: true,
	});
	const dispatch = useDispatch();
	const [flag, setFlag] = useState({flagEmail: true, flagPass: true, flagRepeat: true});
	const [title, setTitle] = useState({titleEmail: '', titlePass: ''});
	const [color, setColor] = useState({red: false, orange: false, blue: false, green: false});

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

	function indicatorPassword(event:ChangeEvent<HTMLInputElement>) {
		const dataPass = event.target.value;
		setTitle({
			...title,
			titlePass: dataPass,
		});
		let protect = 0;
		if (dataPass.length < 8 && dataPass) {
			setColor({
				...color,
				red: true,
			});
		}

		const symbol = /([a-z]+)/;
		if (dataPass.match(symbol)) {
			protect += 1;
		}

		const bigSymbol = /([A-Z]+)/;
		if (dataPass.match(bigSymbol)) {
			protect += 1;
		}

		const num = /([0-9]+)/;
		if (dataPass.match(num)) {
			protect += 1;
		}

		if (dataPass.length >= 8) {
			protect += 1;
		}

		if (protect === 2) {
			setColor({
				...color,
				red: false,
				orange: true,
				blue: false,
				green: false,
			});
		} else if (protect === 0 || protect === 1) {
			setColor({
				...color,
				red: true,
				orange: false,
				blue: false,
				green: false,
			});
		} else if (protect === 3) {
			setColor({
				...color,
				blue: true,
				red: false,
				orange: false,
				green: false,
			});
		} else if (protect === 4) {
			setColor({
				...color,
				green: true,
				blue: false,
				orange: false,
				red: false,
			});
			setFlag({
				...flag,
				flagPass: true,
			});
		} else {
			setFlag({
				...flag,
				flagPass: false,
			});
		}
	}

	function comparePass(event: ChangeEvent<HTMLInputElement>) {
		const data = event.target.value;
		if (data !== title.titlePass) {
			setFlag({
				...flag,
				flagRepeat: false,
			});
		} else {
			setFlag({
				...flag,
				flagRepeat: true,
			});
		}
	}

	function errBorder() {
		setFlag({
			...flag,
			flagPass: false,
			flagEmail: false,
		});
	}

	function registration() {
		if (flag.flagRepeat && title.titleEmail && title.titlePass) {
			dispatch(Registration(title.titleEmail, title.titlePass, notify, errBorder));
		} else {
			setFlag({
				...flag,
				flagEmail: false,
				flagPass: false,
			});
		}
	}

	return (
		<div className={styles.modal}>
			<div className={styles.modalContent}>
				<h1>Регистрация</h1>
				<Spin />
				<ToastContainer />
				<form action="sumbit">
					<div className={styles.formWrap}>
						<label htmlFor="email">Email</label>
						<input className={flag.flagEmail ? styles.input : `${styles.input} ${styles.wrong}`} onChange={validateEmail} type="text" name="email" />
					</div>
					<div className={styles.formWrap}>
						<label htmlFor="password">Пароль</label>
						<input className={flag.flagPass ? styles.input : `${styles.input} ${styles.wrong}`} onChange={indicatorPassword} type="password" name="password" />
						<div className={styles.indicatorWrap}>
							<div className= {color.red ? `${styles.indicatorLine} ${styles.red}`
								: color.orange ? `${styles.indicatorLine} ${styles.orange}`
									: color.blue ? `${styles.indicatorLine} ${styles.blue}`
										: color.green ? `${styles.indicatorLine} ${styles.green}`
											: styles.indicatorLine}>
							</div>
							<div className={color.orange
								? `${styles.indicatorLine} ${styles.orange}`
								: color.blue ? `${styles.indicatorLine} ${styles.blue}`
									: color.green ? `${styles.indicatorLine} ${styles.green}`
										: styles.indicatorLine }>
							</div>
							<div className={color.blue ? `${styles.indicatorLine} ${styles.blue}`
								: color.green ? `${styles.indicatorLine} ${styles.green}`
									: styles.indicatorLine }>
							</div>
							<div className={color.green ? `${styles.indicatorLine} ${styles.green}`
								: styles.indicatorLine }>
							</div>
						</div>
					</div>
					<div className={styles.formWrap}>
						<label htmlFor="passwordRepeat">Повторите пароль</label>
						<input className={flag.flagRepeat ? styles.input : `${styles.input} ${styles.wrong}`} onChange={comparePass} type="password" name="passwordRepeat" />
					</div>
					<button className={styles.btn} onClick={registration} type="button">Регистрация</button>
				</form>
				<div className={styles.linkWrap}>
					<p>Уже есть аккаунт?</p>
					<Link className={styles.link} to="/login">Войти</Link>
				</div>
			</div>
		</div>
	);
}

export default SignUp;
