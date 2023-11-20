import React from 'react'
import { Button } from '../../components'
import './MainPage.scss'

const MainPage = () => {
	return (
		<div>
			<div className="menu-icon"/>
			<Button>START TO DO LIST</Button>
			<div className="main-content">
				<div className="todolist-container"/>
				<div className="throphies-container"/>
			</div>
		</div>
	)
}

export default MainPage