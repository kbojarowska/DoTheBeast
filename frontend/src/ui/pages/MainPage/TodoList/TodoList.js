/* eslint-disable no-mixed-spaces-and-tabs */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import './TodoList.scss'
import { getTask, getTodoListById } from '../../../../ducks/TodoApi'
import Task from '../TaskList/Task'
import { Text } from '../../../components'
import NewTask from '../TaskList/NewTask'

// eslint-disable-next-line no-undef
const monsters = require.context('../../../assets/monsters', true)
const monsterPics = monsters.keys().map(image => monsters(image))


const TodoList = ({todoId, zoomedIn}) => {

	const [todoList, setTodoList] = useState({})
	const [tasks, setTasks] = useState([])
	const [completedTasks, setCompletedTasks] = useState([])
	const [completionPercentage, setCompletionPercentage] = useState(0)
	const [newTask, setNewTask] = useState(false)

	useEffect(() => {
		console.log(newTask)
		const fetchData = async () => {
		  try {
				const todoListData = await getTodoListById(todoId)
				setTodoList(todoListData)
	  
				const tasksData = await Promise.all(todoListData.tasks.map(taskId => getTask(taskId)))
				const allTasks = tasksData.map(data => data)
	  
				setTasks(allTasks)
	  
				const completedTasksData = tasksData.filter(data => data.isDone)
				setCompletedTasks(completedTasksData)
	  
				const newCompletionPercentage = (completedTasksData.length / allTasks.length) * 100
				setCompletionPercentage(newCompletionPercentage)
		  } catch (error) {
				console.error(error)
		  }
		}
	  
		fetchData()
	  }, [todoId])
	  
	  useEffect(() => {
		console.log(completedTasks)
		if (tasks.length > 0) {
		  const newCompletionPercentage = (completedTasks.length / tasks.length) * 100
		  setCompletionPercentage(newCompletionPercentage)
		}
	  }, [tasks, completedTasks])

	const updateCompletedTasks = (tasks) => {
		setCompletedTasks(prevCompletedTasks => [tasks, ...prevCompletedTasks])
	}
	  
	
	const renderTasks = todoList.tasks && todoList.tasks.map(task => (
		<div key={task} className="">
			<Task taskId={task} updateCompletedTasks={updateCompletedTasks}/>
		</div>
	))


	return (
		<div className={zoomedIn ? 'zoom-sticky-note' : 'sticky-note'}>
			{zoomedIn ? (
				newTask ? (
					<NewTask />
				) : (
					<div>
						<Text className='todo' size='x-large'>{todoList.name}</Text>
						{/* TODO: podminić todoList.monster */}
						<img className='monster-img' src={monsterPics[0]} alt='monster' />
						<div className="progress-bar">
							<div className="progress-indicator" style={{ width: `${completionPercentage}%` }}></div>
						</div>
						<div className='tasks'>
							{renderTasks}
						</div>
						<div onClick={()=>setNewTask(true)} className="new-task">
							<Text size='x-small' className='task'>NEW TASK</Text>
						</div>
					</div>
				)
				
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
	zoomedIn: PropTypes.bool,
	newTask: PropTypes.bool
}