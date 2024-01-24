import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.scss'
import { AuthProvider } from './ducks/AuthProvider'
import App from './App'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<AuthProvider>
			<App/>
		</AuthProvider>
	</React.StrictMode>
)
