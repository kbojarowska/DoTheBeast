import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://do-the-beast-1r3q.onrender.com',
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

export const getUserById = async (userId) => {
	try {
		const response = await apiClient.get(`/users/${userId}`)
		return response.data
	} catch (error) {
		return error.response
	}
}

export const updateUser = async (userId, newData) => {
	try {
		const response = await apiClient.patch(`/users/${userId}`, newData)
		return response.data
	} catch (error) {
		return error.response
	}
}

export const importAll = (r)  => {
	let images = {}
	r.keys().forEach((item) => { images[item.replace('./', '')] = r(item) })
	return images
}