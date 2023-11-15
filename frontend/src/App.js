import React  from 'react'
import {
	BrowserRouter as Router,
	Routes,
	Route
} from 'react-router-dom'
import './App.scss'
import LandingPage from './pages/LandingPage/LandingPage'

function App() {
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
			</Routes>
		</Router>
	)
}

export default App
