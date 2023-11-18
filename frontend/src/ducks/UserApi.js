import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'http://do-the-beast.onrender.com',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export const login = async (values) => {
	return await apiClient.post('/users/login', values)
		.then((response) => {
			return response
		}).catch((error) => {
			return error.response
		})
}

export const register = async (values) => {
	return await apiClient.post('/users/register', values)
		.then((response) => {
			return response
		}).catch((error) => {
			return error.response
		})
}
