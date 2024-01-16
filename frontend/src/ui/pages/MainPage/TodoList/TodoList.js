import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './TodoList.scss'
import { getTask, getTodoListById } from '../../../../ducks/TodoApi'
import Task from '../TaskList/Task'
import { Text } from '../../../components'

// eslint-disable-next-line no-undef
const monsters = require.context('../../../assets/monsters', true)
const monsterPics = monsters.keys().map(image => monsters(image))

const TodoList = ({todoId, zoomedIn}) => {
	const [todoList, setTodoList] = useState({})
	const [tasks, setTasks] = useState([])
	const [completedTasks, setCompletedTasks] = useState([])
	const [completionPercentage, setCompletionPercentage] = useState(0)

	
	useEffect(() => {
		getTodoListById(todoId)
			.then((data) => {
				setTodoList(data)
			})
			.catch((error) => {
				console.error(error)
			})
		todoList.tasks && todoList.tasks.forEach((taskId) => {
			getTask(taskId)
				.then((data) => {
					setTasks((prevTasks) => [data, ...prevTasks])
					if (data.isDone) {
						setCompletedTasks((prevCompletedTasks) => [data, ...prevCompletedTasks])
					}
					// setCompletionPercentage((completedTasks.length / tasks.length) * 100)
				})
				.catch((error) => {
					console.error(error)
				})
		})
	}, [])

	useEffect(() => {
		const newCompletionPercentage = (completedTasks.length / tasks.length) * 100
		setCompletionPercentage(newCompletionPercentage)
	}, [todoList, completedTasks, tasks])

	const renderTasks = todoList.tasks && todoList.tasks.map(task => (
		<div key={task} className="">
			<Task taskId={task}/>
		</div>
	))

	return (
		<div className={zoomedIn ? 'zoom-sticky-note' : 'sticky-note'}>
			{zoomedIn ? (
				<div>
					<Text className='todo' size='x-large'>{todoList.name}</Text>
					{/* TODO: podminić todoList.monster */}
					<img className='monster-img' src={monsterPics[0]} alt='monster' />
					<div className="progress-bar">
						<div className="progress-indicator" style={{ width: `${completionPercentage}%` }}></div>
					</div>
					<div>{renderTasks}</div>
					<div className="">
                            Add a new task
					</div>
				</div>
			) : (
				<div className="sticky-note">
					<Text size='x-small' className='todo-name'>{todoList.name}</Text>
					{/* TODO: podminić todoList.monster */}
					<img className='monster-todo' src={monsterPics[0]} alt='monster' />
					<div className="progress-bar">
						<div className="progress-indicator" style={{ width: `${completionPercentage}%` }}></div>
					</div>
				</div>
			)}
		</div>	
	)
}

export default TodoList

TodoList.propTypes = {
	todoId: PropTypes.string,
	zoomedIn: PropTypes.bool
}