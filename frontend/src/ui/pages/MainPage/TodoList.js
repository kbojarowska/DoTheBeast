import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './Board.scss'
import { getTodoListById } from '../../../ducks/TodoApi'
import TaskList from './TaskList'

// eslint-disable-next-line no-undef
const monsters = require.context('../../assets/monsters', true)
const monsterPics = monsters.keys().map(image => monsters(image))

const TodoList = ({todoId}) => {
	const [todoList, setTodoList] = useState({})
	// const [tasks, setTasks] = useState([])

	useEffect(() => {
		getTodoListById(todoId)
			.then((data) => {
				setTodoList(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	const renderTasks = todoList.tasks.map(task => (
		<div key={task} className="">
			<TaskList taskId={task}/>
		</div>
	))

	return (
		<div className=''>
			<div className="">
				{todoList.name}
				{/* TODO: podminić todoList.monster */}
				<img className='monster-img' src={monsterPics[0]} alt='monster' />
				{(todoList.tasks.length>0) && renderTasks}
				<input type="checkbox" checked='true' />
				<div className="">
					Add a new task
				</div>
			</div>
		</div>
	)
}

export default TodoList

TodoList.propTypes = {
	todoId: PropTypes.string,
}