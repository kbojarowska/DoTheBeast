import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './pages/LandingPage/LandingPage'
<<<<<<< HEAD
import MainPage from './pages/MainPage/MainPage'
=======
>>>>>>> d99a7acb99e38962ea4c79bd55fba00a2dcff61e
import UserPage from './pages/UserPage/UserPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
<<<<<<< HEAD
				{/* TODO: MainPage should also have the path "/". We need to implement AuthProvider to dynamically determine the page to display on the "/" path based on authentication status */}
				<Route path='/main' element={<MainPage />} />
=======
>>>>>>> d99a7acb99e38962ea4c79bd55fba00a2dcff61e
				<Route path='/userpage/:userId' element={<UserPage />} />
			</Routes>
		</Router>
	)
}

export default App
