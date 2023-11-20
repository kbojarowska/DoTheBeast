import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './UserPage.scss'
import { Loading, Text } from '../../components'
import { getUserById } from '../../ducks/UserApi'

function UserPage() {
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
	}, [userId])

	return (
		<div>
			{userData ? (
				<div>
					<div className="hello-user">
						<Text className="hello-text">Hello {userData.username}</Text>
					</div>
					<div className="statistic-update-container">
						<div className="statistic"></div>
						<div className="update"></div>
					</div>
				</div>
			) : (
				<Loading/>
			)}
		</div>
	)
}

export default UserPage
