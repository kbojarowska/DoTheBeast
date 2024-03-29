import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './TaskList.scss'
import { completeTask, deleteTask, getTask } from '../../../../ducks/TodoApi'
import { Text } from '../../../components'
import { FaRegTrashAlt } from 'react-icons/fa'

const Task = ({taskId, updateCompletedTasks}) => {
	const [task, setTask] = useState({})
	const [completed, setCompleted] = useState(false)

	useEffect(() => {
		getTask(taskId)
			.then((data) => {
				setTask(data)
			})
			.catch((error) => {
				console.error(error)
			})
		setCompleted(task.isDone)
	}, [task])

	const checkTask = () => {
		completeTask(taskId)
			.then((data) => {
				console.log('Task updated successfully:', data)
				updateCompletedTasks(task)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const removeTask = () => {
		deleteTask(taskId)
			.then((data) => {
				console.log('Task removed successfully.', data)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	return (
		<div className="task-checkbox">
			<input type="checkbox" checked={completed} disabled={completed} onChange={checkTask} />
			<label className={completed ? 'completed' : ''}><Text className='task' size='x-small'>{task.name}</Text></label>
			<div className='delete-task' onClick={removeTask}><FaRegTrashAlt /></div>
		</div>
	)
}

export default Task

Task.propTypes = {
	taskId: PropTypes.string,
	updateCompletedTasks: PropTypes.func
}