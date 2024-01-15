import React, { useEffect, useState, createContext, useContext } from 'react'
import PropTypes from 'prop-types'
import * as userApi from './UserApi'
import Cookies from 'js-cookie'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
	const [user, setUser] = useState(null)

	useEffect(() => {
		const userCookie = Cookies.get('user')
		if (userCookie) {
			const userFromCookie = JSON.parse(userCookie)
			setUser(userFromCookie)
		}
	}, [])

	const login = async (values) => {
		try {
			const response = await userApi.login(values)
			const userData = response.data
	
			if (userData) {
				setUser(userData)
				Cookies.set('user', JSON.stringify(userData), { expires: 7 })
			} else {
				console.error('Login error: User data not found in the response')
			}
	
			return response
		} catch (error) {
			console.error('Login error:', error)
			return error.response || { error: 'Unknown error occurred during login' }
		}
	}

	const logout = async () => {
		try {
			setUser(null)
			Cookies.remove('user')
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
