import axios from 'axios';
import { Store } from '../store';

const axiosBaseOptions = config => {
	const baseURL = process.env.REACT_APP_API_URL;
	return {
		baseURL,
		...config,
	};
};

axios.interceptors.request.use(req => {
	const token = Store.getState().auth.token;
	if (token) {
		req.headers['x-access-token'] = token;
		return req;
	}
	return req;
});

const request = config => axios.request(axiosBaseOptions(config));

const get = (url = '', config = {}) =>
	request({ url, ...config, method: 'GET' });

const post = (url = '', config) => request({ url, ...config, method: 'POST' });

const patch = (url = '', config = {}) =>
	request({ url, ...config, method: 'PATCH' });

const del = (url = '', config = {}) =>
	request({ url, ...config, method: 'DELETE' });

export { get, post, patch, del };
