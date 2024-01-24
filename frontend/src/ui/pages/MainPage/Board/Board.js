import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'
import './Board.scss'
import TodoList from '../TodoList/TodoList'
import { Text } from '../../../components'

const Board = ({todoLists}) => {
	const [zoomedIn, setZoomedIn] = useState(false)
	const [zoomedList, setZoomedList] = useState(null)

	const todosPerPage = 9
	const [currentPage, setCurrentPage] = useState(1)

	const totalPages = Math.ceil(todoLists.length / todosPerPage)

	const handlePrevPage = () => {
		setCurrentPage(prev => Math.max(prev - 1, 1))
	}

	const handleNextPage = () => {
		setCurrentPage(prev => Math.min(prev + 1, totalPages))
	}

	const renderTodos = todoLists.map(todo => (
		<div key={todo} className="todo-item"  onClick={() => handleZoomIn(todo)}>
			<TodoList todoId={todo} zommedIn={zoomedIn}/>
		</div>
	))

	const handleZoomIn = (todoId) => {
		setZoomedIn(true)
		setZoomedList(todoId)
	}
	
	const handleZoomOut = () => {
		setZoomedIn(false)
		setZoomedList(null)
	}

	return (
		<div className='board'>
			{zoomedIn ? (
				<div className="todolist-container">
					<div onClick={handleZoomOut}><Text className='exit'>x</Text></div>
					<TodoList todoId={zoomedList} zoomedIn={zoomedIn}/>
				</div>
			) : (
				<>
					<div className="todolist-container">
						{renderTodos}
						<div className="todo-item">
							<Text className='todo-name new-list' size='x-small'>NEW LIST</Text>
							<Text className='add'>+</Text>
						</div>
					</div>
					<div className='pagination-container'>
						{<button className='pagination-button' disabled={currentPage === 1} onClick={handlePrevPage}>
							<MdKeyboardDoubleArrowLeft className="pagination-icon" />
						</button>}
						<button className='pagination-button' disabled={currentPage >= totalPages} onClick={handleNextPage}>
							<MdKeyboardDoubleArrowRight className="pagination-icon" />
						</button>
					</div>
				</>
			)}
		</div>
	)
}

export default Board

Board.propTypes = {
	todoLists: PropTypes.array,
}