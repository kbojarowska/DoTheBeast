import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Board.scss'
import { getTask } from '../../../ducks/TodoApi'

const TaskList = ({taskId}) => {
	const [task, setTask] = useState({})
	// const [tasks, setTasks] = useState([])

	useEffect(() => {
		getTask(taskId)
			.then((data) => {
				setTask(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	return (
		<div className=''>
			<div className="">
				{task.name}
			</div>
		</div>
	)
}

export default TaskList

TaskList.propTypes = {
	taskId: PropTypes.string,
}