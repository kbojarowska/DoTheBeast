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

export const addList = async (values) => {
	try {
		const response = await apiClient.post('/todolists', values)
		return response
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

export const completeTask = async (taskId) => {
	try {
		const response = await apiClient.patch(`/tasks/${taskId}`, {isDone: true})
		return response.data
	} catch (error) {
		return error.response
	}
}

export const addTask = async (values) => {
	try {
		const response = await apiClient.post('/tasks', values)
		return response
	} catch (error) {
		return error.response
	}
}

export const deleteTask = async (taskId) => {
	try {
		const response = await apiClient.delete(`/tasks/${taskId}`)
		return response
	} catch (error) {
		return error.response
	}
}

