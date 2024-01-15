// TODO: Fix hair
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './UserPage.scss'
import { Button, Loading, Modal, Text } from '../../components'
import { getUserById, updateUser } from '../../../ducks/UserApi'

function UserPage() {
	const [userData, setUserData] = useState(null)
	const [registrationDate, setRegistrationDate] = useState(null)
	const { userId } = useParams()
	const [currentBody, setCurrentBody] = useState(0)
	const [currentHair, setCurrentHair] = useState(0)
	const [currentFit, setCurrentFit] = useState(0)
	const [showCreateAvatar, setShowCreateAvatar] = useState(false)
	const [modalOpen, setModalOpen] = useState(false)
	const [modalContent, setModalContent] = useState('')
	const [newPassword, setNewPassword] = useState('')
	const [completedTasks, setCompletedTasks] = useState(0)
	const [completedToDoList, setCompletedToDoList] = useState(0)


	useEffect(() => {
		getUserById(userId)
			.then((data) => {
				setUserData(data)
				setRegistrationDate(new Date(data.registrationDate))
				setCurrentBody((data.bodyId || 0) - 1)
				setCurrentHair(data.hairId-2)
				setCurrentFit((data.fitId || 0) - 1)
				setCompletedTasks(data.todoLists.reduce((total, todoList) => {
					return total + (todoList.tasks ? todoList.tasks.filter(task => task.isCompleted).length : 0)
				}, 0))
				setCompletedToDoList(data.todoLists.reduce((total, todoList) => {
					if (todoList.tasks && todoList.tasks.length > 0) {
						let allTasksCompleted = true
						for (const task of todoList.tasks) {
							if (!task.isCompleted) {
								allTasksCompleted = false
								break
							}
						}
						if (allTasksCompleted) {
							total += 1
						}
					}
					return total
				}, 0))
			})
			.catch((error) => {
				console.error(error)
			})
	}, [userId])

	function importAll(r) {
		let images = {}
		r.keys().forEach((item) => { images[item.replace('./', '')] = r(item) })
		return images
	}
    
	const body = importAll(require.context('../../assets/avatar_files/body', false, /\.(png|jpe?g|svg)$/))
	const fit = importAll(require.context('../../assets/avatar_files/fit', false, /\.(png|jpe?g|svg)$/))
	const hair = importAll(require.context('../../assets/avatar_files/hair', false, /\.(png|jpe?g|svg)$/))

	useEffect(() => {

	}, [currentBody, currentFit, currentHair])

	const handleAvatarSubmit = () => {
		const newAvatarData = {
			hairId: parseInt(Object.keys(hair)[currentHair], 10),
			fitId: parseInt(Object.keys(fit)[currentFit], 10),
			bodyId: parseInt(Object.keys(body)[currentBody], 10),
		}
		updateUser(userId, newAvatarData)
			.then((response) => {
				console.log('Avatar updated successfully:', response)
				setShowCreateAvatar(false)
				setModalContent('Avatar updated successfully!')
				setModalOpen(true)
			})
			.catch((error) => {
				console.error('Error updating avatar:', error)
				setModalContent('Error updating avatar. Please try again.')
				setModalOpen(true)
			})
	}

	const handlePasswordChange = (event) => {
		setNewPassword(event.target.value)
	}
	
	
	const updatePassword = () => {
		updateUser(userId, {password:newPassword})
			.then((response) => {
				console.log('Password updated successfully:', response)
				setNewPassword('')
				setModalContent('Password updated successfully!')
				setModalOpen(true)
			})
			.catch((error) => {
				console.error('Error updating password:', error)
				setModalContent('Error updating password. Please try again.')
				setModalOpen(true)
			})
	}

	const closeModal = () => {
		setModalOpen(false)
	}
	

	return (
		<div>
			{userData ? (
				<div>
					<div className="hello-user">
						<Text className="hello-text">Hello {userData.username}!</Text>
					</div>
					<div className="statistic-update-container">
						<div className="statistic">
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Registration date:</Text>
								<Text size="small" className="statistic-value">{registrationDate.toLocaleDateString('en-US')}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total friends:</Text>
								<Text size="small" className="statistic-value">{userData.friends.length}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total completed tasks:</Text>
								<Text size="small" className="statistic-value">{completedTasks}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total completed to-do lists:</Text>
								<Text size="small" className="statistic-value">{completedToDoList}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total collected monsters:</Text>
								<Text size="small" className="statistic-value">{userData.monster.length}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total tasks:</Text>
								<Text size="small" className="statistic-value">{userData.totalTasks}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total to-do lists:</Text>
								<Text size="small" className="statistic-value">{userData.todoLists.length}</Text>
							</div>
							<div className="statistic-item">
								<Text size="small" className="statistic-label">Total shared lists:</Text>
								<Text size="small" className="statistic-value">{userData.todoLists.filter(todoList => todoList.isShared).length}</Text>
							</div>
						</div>
						<div className="update">
							<div className="avatar-register">
								<div className="create-avatar">
									<div className="window">
										<img className='avatar-img body' alt="body" src={body[Object.keys(body)[currentBody]]} />
										<img className='avatar-img hair' alt="hair" src={hair[Object.keys(hair)[currentHair]]} />
										<img className='avatar-img fit' alt="fit" src={fit[Object.keys(fit)[currentFit]]} />
									</div>
								</div>
								<div className="create-avatar">
									{showCreateAvatar && (
										<div className="buttons">
											<div className="select">
												<button onClick={() => { setCurrentBody((Object.keys(body).length + (currentBody - 1)) % Object.keys(body).length) }}><Text>&#8249;</Text></button>
												<Text>BODY</Text>
												<button onClick={() => { setCurrentBody((currentBody + 1) % Object.keys(body).length) }}><Text>&#8250;</Text></button>
											</div>
											<div className="select">
												<button onClick={() => { setCurrentHair((Object.keys(hair).length + (currentHair - 1)) % Object.keys(hair).length) }}><Text>&#8249;</Text></button>
												<Text>HAIR</Text>
												<button onClick={() => { setCurrentHair((currentHair + 1) % Object.keys(hair).length) }}><Text>&#8250;</Text></button>
											</div>
											<div className="select">
												<button onClick={() => { setCurrentFit((Object.keys(fit).length + (currentFit - 1)) % Object.keys(fit).length) }}><Text>&#8249;</Text></button>
												<Text>FIT</Text>
												<button onClick={() => { setCurrentFit((currentFit + 1) % Object.keys(fit).length) }}><Text>&#8250;</Text></button>
											</div>
										</div>
									)}
								</div>
							</div>
							{!showCreateAvatar ? 
								<Button className='change-avatar-btn' onClick={() => setShowCreateAvatar(!showCreateAvatar)}>{showCreateAvatar ? 'HIDE AVATAR' : 'CHANGE AVATAR'}</Button>
								:<Button className='change-avatar-btn'onClick={handleAvatarSubmit}>Submit</Button>
							}
						</div>
						<div className="password-update">
							<div className="update-password">
								<Text>Update password:</Text>
								<input
									type="password"
									placeholder="New Password"
									value={newPassword}
									onChange={handlePasswordChange}
								/>
								<Button onClick={updatePassword} className='update-button'>Update Password</Button>
							</div>
						</div>
					</div>
				</div>
			) : (
				<Loading/>
			)}
			<Modal isOpen={modalOpen} onClose={closeModal}>
				<div>
					<Text className="modal-txt">{modalContent}</Text>
					<Button onClick={closeModal}>OK</Button>
				</div>
			</Modal>
		</div>
	)
}

export default UserPage
