import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://do-the-beast.onrender.com',
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

export const getUsersByUsername = async (query) => {
	try {
		const response = await apiClient.get(`/users/search/${query}`)
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


export const addFriend = async (data) => {
	try {
		const response = await apiClient.post('/users/addFriend', data)
		return response.data
	} catch (error) {
		return error.response
	}
}


export const removeFriend = async (data) => {
	try {
		console.log(data)
		const response = await apiClient.delete('/users/friends/removeFriend', data)
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