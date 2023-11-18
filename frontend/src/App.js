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

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/login' element={<LoginPage />} />
				<Route path='/register' element={<RegisterPage />} />
			</Routes>
		</Router>
	)
}

export default App
