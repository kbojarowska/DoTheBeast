import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './pages/LandingPage/LandingPage'
import MainPage from './pages/MainPage.jsx/MainPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				{/* TODO: MainPage should also have the path "/". We need to implement AuthProvider to dynamically determine the page to display on the "/" path based on authentication status */}
				<Route path='/main' element={<MainPage />} />
			</Routes>
		</Router>
	)
}

export default App
