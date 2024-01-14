import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button, Loading, Text } from '../../components'
import { Tooltip } from 'react-tooltip'
import { getUserById, getUsersByUsername } from '../../../ducks/UserApi'
import PropTypes from 'prop-types'
import './FriendsPage.scss'

function FriendsPage() {
	const { userId } = useParams()
	const [userData, setUserData] = useState(null)
	const [friendsData, setFriendsData] = useState(null)
	const [currentIndex, setCurrentIndex] = useState(0)
	const [searchQuery, setSearchQuery] = useState('')

	const showFriends = friendsData?.slice(currentIndex, currentIndex + 4) 

	useEffect(() => {
		if (searchQuery.trim() !== '') {
			getUsersByUsername(searchQuery)
				.then((data) => {
					console.log(userData._id)
					console.log(data.map(user => user._id))
					setFriendsData(data.map(user => user._id).filter(id => id !== userData._id))
				})
				.catch((error) => {
					console.error(error)
				})
		} else {
			getUserById(userId)
				.then((data) => {
					setUserData(data)
					setFriendsData(data.friends)
				})
				.catch((error) => {
					console.error(error)
				})
		}
	}, [userId, searchQuery])

	function importAll(r) {
		let images = {}
		r.keys().forEach((item) => { images[item.replace('./', '')] = r(item) })
		return images
	}

	const body = importAll(require.context('../../assets/avatar_files/body', false, /\.(png|jpe?g|svg)$/))
	const fit = importAll(require.context('../../assets/avatar_files/fit', false, /\.(png|jpe?g|svg)$/))
	const hair = importAll(require.context('../../assets/avatar_files/hair', false, /\.(png|jpe?g|svg)$/))

	const itemsPerPageMobile = 1
	const itemsPerPageDesktop = 4

	const handleNext = () => setCurrentIndex((prevIndex) => Math.min(prevIndex + getItemsPerPage(), friendsData.length - getItemsPerPage()))
	const handlePrev = () => setCurrentIndex((prevIndex) => Math.max(prevIndex - getItemsPerPage(), 0))

	function getItemsPerPage() {
		return window.innerWidth <= 768 ? itemsPerPageMobile : itemsPerPageDesktop
	}

	function FriendAvatar({ friendId }) {
		const [friendData, setFriendData] = useState(null)
		const [completedTasks, setCompletedTasks] = useState(0)
		const [completedToDoList, setCompletedToDoList] = useState(0)

		useEffect(() => {
			const fetchFriendData = async () => {
				try {
					const data = await getUserById(friendId)
					setFriendData(data)
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
				} catch (error) {
					console.error(error)
				}
			}
	
			fetchFriendData()
		}, [friendId])

		const tooltipId = `tooltip-${friendId}`
	
		return (
			<div className="friend-avatar" data-tooltip-id={tooltipId}>
				{friendData ? (
					<div className="avatar-register">
						<div className="create-avatar">
							<div className="window">
								<img
									className="avatar-img body"
									alt="body"
									src={body[Object.keys(body)[friendData.outfitBottomID-1]]}
								/>
								<img className="avatar-img hair" alt="hair" src={hair[Object.keys(hair)[friendData.hairID-1]]} />
								<img
									className="avatar-img fit"
									alt="fit"
									src={fit[Object.keys(fit)[friendData.outfitTopID-1]]}
								/>
							</div>
						</div>
						<Tooltip id={tooltipId}>
							<p>username: {friendData.username}</p>
							<p>registration date: {new Date(friendData.registrationDate).toLocaleDateString('en-US')}</p>
							<p>completed tasks: {completedTasks}</p>
							<p>completed to do list: {completedToDoList}</p>
						</Tooltip>
					</div>				) : (
					<p>Loading...</p>
				)}
			</div>
		)
	}

	FriendAvatar.propTypes = {
		friendId: PropTypes.string.isRequired,
	}

	function FriendsList({ friends, onNext, onPrev }) {
		return (
			<div className="friends-list-container">
				<div className="arrow-buttons">
					<button onClick={onPrev} disabled={currentIndex === 0}>
						{'<'}
					</button>
				</div>
				<div className="friends-list">
					{showFriends.map((friendId, index) => (
						<div key={index}>
							<FriendAvatar friendId={friendId} />
							{(userData.friends.includes(friendId)) ? <Button className="delete-btn" >Usuń znajomego</Button> : <Button className="add-btn">Dodaj znajomego</Button>}
						</div>
					))}
				</div>
				<div className="arrow-buttons">
					<button onClick={onNext} disabled={currentIndex + getItemsPerPage() >= friends.length}>
						{'>'}
					</button>
				</div>
			</div>
		)
	}

	FriendsList.propTypes = {
		friends: PropTypes.array.isRequired,
		onNext: PropTypes.func.isRequired,
		onPrev: PropTypes.func.isRequired,
	}

	return (
		<div>
			{userData ? (
				<div className='friends-page-container'>
					<div className="hello-user">
						<Text className="hello-text">{userData.username} friends</Text>
					</div>	
					<input type="text"
						className='text-field'
						placeholder='Search for users'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)} />
					<div className="friends-container">
						<div className="avatar-register">
							<div className="create-avatar">
								<div className="window">
									<img
										className="avatar-img body"
										alt="body"
										src={body[Object.keys(body)[userData.outfitBottomID-1]]}
									/>
									<img className="avatar-img hair" alt="hair" src={hair[Object.keys(hair)[userData.hairID-1]]} />
									<img
										className="avatar-img fit"
										alt="fit"
										src={fit[Object.keys(fit)[userData.outfitTopID-1]]}
									/>
								</div>
							</div>
						</div>
						<div>
							{friendsData.length === 0 ? (
								<Text className="no-friends">No friends</Text>
							) : (
								<FriendsList friends={friendsData} onNext={handleNext} onPrev={handlePrev} />
							)}
						</div>
					</div>
				</div>
			) : (
				<Loading />
			)}
		</div>
	)
}

export default FriendsPage
