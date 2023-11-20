import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './pages/LandingPage/LandingPage'
import MainPage from './pages/MainPage/MainPage'
import UserPage from './pages/UserPage/UserPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				{/* TODO: MainPage should also have the path "/". We need to implement AuthProvider to dynamically determine the page to display on the "/" path based on authentication status */}
				<Route path='/main' element={<MainPage />} />
				<Route path='/userpage/:userId' element={<UserPage />} />
			</Routes>
		</Router>
	)
}

export default App
