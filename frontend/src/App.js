import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './ui/pages/LandingPage/LandingPage'
import LoginPage from './ui/pages/LoginPage/LoginPage'
import RegisterPage from './ui/pages/RegisterPage/RegisterPage'
import AboutPage from './ui/pages/AboutPage/AboutPage'
import MainPage from './ui/pages/MainPage/MainPage'
import UserPage from './ui/pages/UserPage/UserPage'
import FriendsPage from './ui/pages/FriendsPage/FriendsPage'
import { BurgerMenu } from './ui/components'

function App() {
	const links = [
		{ href: '/', text: 'Home' },
		{ href: '/main', text: 'Main' },
		{ href: '/userpage', text: 'User Page' },
		{ href: '/friends', text: 'Friends' }
	]

	return (
		<Router>
			<BurgerMenu links={links} />
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
				{/* TODO: MainPage should also have the path "/". We need to implement AuthProvider to dynamically determine the page to display on the "/" path based on authentication status */}
				<Route path='/mainpage/:userId' element={<MainPage />} />
				<Route path='/userpage/:userId' element={<UserPage />} />
				<Route path='/friends/:userId' element={<FriendsPage />} />
			</Routes>
		</Router>
	)
}

export default App
