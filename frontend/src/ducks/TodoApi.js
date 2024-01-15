import axios from 'axios'

const apiClient = axios.create({
	baseURL: 'https://do-the-beast-1r3q.onrender.com',
	withCredentials: false,
	headers: {
		Accept: 'application/json',
		'Content-Type': 'application/json'
	}
})

export const getTodoListById = async (todoId) => {
	try {
		const response = await apiClient.get(`/todolists/${todoId}`)
		return response.data
	} catch (error) {
		return error.response
	}
}

// export const getTasks = (taskIds) => {
// 	const tasks = []
// 	taskIds.map( async t => {
// 		try {
// 			const response = await apiClient.get(`/tasks/${t}`)
// 			tasks.push(response.data)
// 		} catch (error) {
// 			return error.response
// 		}
// 	})
// 	return tasks
// }

export const getTask = async (taskId) => {
	try {
		const response = await apiClient.get(`/tasks/${taskId}`)
		return response.data
	} catch (error) {
		return error.response
	}
}

