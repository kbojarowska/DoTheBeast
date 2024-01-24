import React, { useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import * as userApi from './UserApi'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	const login = async (values) => {
		try {
			const response = await userApi.login(values)
			setUser(response.data)
			return response
		} catch (error) {
			console.error('Login error:', error)
			return error.response
		}
	}

	const logout = async () => {
		try {
			setUser(null)
		} catch (error) {
			console.error('Logout error:', error)
		}
	}

	return (
		<AuthContext.Provider value={{ user, login, logout }}>
			{children}
		</AuthContext.Provider>
	)
}

AuthProvider.propTypes = {
	children: PropTypes.node.isRequired,
}

export const useAuth = () => {
	return useContext(AuthContext)
}
