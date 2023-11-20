// TODO: Add statistics for completed tasks, todolists, colected monsters
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './UserPage.scss'
import { Loading, Text } from '../../components'
import { getUserById } from '../../ducks/UserApi'

function UserPage() {
	const [userData, setUserData] = useState(null)
	const [registrationDate, setRegistrationDate] = useState(null)
	const { userId } = useParams()

	useEffect(() => {
		getUserById(userId)
			.then((data) => {
				setUserData(data)
				setRegistrationDate(new Date(data.registrationDate))
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
						<div className="statistic">
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Registration date:</Text>
								<Text size="small" className="statistic-value">{registrationDate.toLocaleDateString('en-US')}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total friends:</Text>
								<Text size="small" className="statistic-value">{userData.totalFriends}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total completed tasks:</Text>
								<Text size="small" className="statistic-value">0</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total completed to-do lists:</Text>
								<Text size="small" className="statistic-value">0</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total collected monsters:</Text>
								<Text size="small" className="statistic-value">0</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total tasks:</Text>
								<Text size="small" className="statistic-value">{userData.totalTasks}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total to-do lists:</Text>
								<Text size="small" className="statistic-value">{userData.totalTodoLists}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total shared lists:</Text>
								<Text size="small" className="statistic-value">{userData.totalSharedLists}</Text>
							</div>
						</div>
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
