import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://do-the-beast-1r3q.onrender.com',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export const getUserById = async (userId) => {
	try {
		const response = await apiClient.get(`/users/${userId}`)
		return response.data
	} catch (error) {
		return error.response
	}
}
