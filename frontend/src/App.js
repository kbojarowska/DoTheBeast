import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { useAuth } from './ducks/AuthProvider'
import { PrivateRoute } from './ducks/PrivateRoute'
import { BurgerMenu } from './ui/components'
import LandingPage from './ui/pages/LandingPage/LandingPage'
import LoginPage from './ui/pages/LoginPage/LoginPage'
import RegisterPage from './ui/pages/RegisterPage/RegisterPage'
import AboutPage from './ui/pages/AboutPage/AboutPage'
import MainPage from './ui/pages/MainPage/MainPage'
import UserPage from './ui/pages/UserPage/UserPage'
import FriendsPage from './ui/pages/FriendsPage/FriendsPage'
import './App.scss'


function App() {
	const auth = useAuth()
	const links = [
		{ href: '/', text: 'Home' },
		{ href: '/main', text: 'Main' },
		{ href: `/userpage/${auth.user?._id}`, text: 'User Page' },
		{ href: `/friends/${auth.user?._id}`, text: 'Friends' },
	]

	return (
		<Router>
			{auth.user ? <BurgerMenu links={links} logout={auth.logout}/>: null}
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/register" element={<RegisterPage />} />
				<Route path='/about' element={<AboutPage />} />
				<Route path="/main" element={<PrivateRoute><MainPage /></PrivateRoute>} />
				<Route path="/userpage/:userId" element={<PrivateRoute><UserPage /></PrivateRoute>} />
				<Route path="/friends/:userId" element={<PrivateRoute><FriendsPage /></PrivateRoute>} />
			</Routes>
		</Router>
	)
}

export default App
