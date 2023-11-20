import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './pages/LandingPage/LandingPage'
import UserPage from './pages/UserPage/UserPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/userpage/:userId' element={<UserPage />} />
			</Routes>
		</Router>
	)
}

export default App
