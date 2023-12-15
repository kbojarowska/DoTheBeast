import React, { useEffect, useState } from 'react'
import { Button } from '../../components'
import './MainPage.scss'
import Trophies from './Trophies'
import axios from 'axios'

const MainPage = () => {
	const [userData, setUserData] = useState(null)

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get('https://do-the-beast.onrender.com/users/653d34e6ac6cea2a5c94a849')
				setUserData(response.data)
			} catch (error) {
				console.error('Error fetching data:', error)
			}
		}

		fetchData()
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
				<>
					{/* TODO: Here add a loader */}
					Loading...
				</>
			}
		</div>
	)
}

export default MainPage