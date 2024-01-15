import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '../../components'
import './MainPage.scss'
import Trophies from './Trophies'
import { getUserById } from '../../../ducks/UserApi'
import { Loading } from '../../components'
import Board from './Board'

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
			<Button className="create-list-button">START TO DO LIST</Button>
			{userData ? 
				(<div className="main-content">
					<Board todoLists={userData.todoLists}/>
					<Trophies monsterList={userData.monster}/>
				</div>) : <Loading/>
			}
		</div>
	)
}

export default MainPage