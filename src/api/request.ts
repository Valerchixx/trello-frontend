import axios from 'axios';
const token = localStorage.getItem('token');
const instance = axios.create({
	baseURL: 'https://trello-back.shpp.me/vproshachenko/api/v1',
	headers: {
		'Content-Type': 'application/json',
		Authorization: `Bearer ${token}`,
	},
});

instance.interceptors.response.use(res => res.data);

export default instance;

