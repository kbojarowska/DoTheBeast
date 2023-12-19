import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components'
import './MainPage.scss'
import Trophies from './Trophies'
import { getUserById } from '../../../ducks/UserApi'
import { Loading } from '../../components'

const MainPage = () => {
	const [userData, setUserData] = useState(null)
	const { userId } = useParams()

	useEffect(() => {
		getUserById(userId)
			.then((data) => {
				setUserData(data)
			})
			.catch((error) => {
				console.error(error)
			})
	}, [])

	return (
		<div>
			<div className="menu-icon"/>
			<Button className="create-list-button">START TO DO LIST</Button>
			{userData ? 
				(<div className="main-content">
					<div className="todolist-container"/>
					<Trophies monsterList={userData.monster}/>
				</div>) : 
				(
					<Loading/>
				)
			}
		</div>
	)
}

export default MainPage