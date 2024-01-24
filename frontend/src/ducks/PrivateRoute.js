import React from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useAuth } from '../ducks/AuthProvider'

export const PrivateRoute = ({ children }) => {
	const auth = useAuth()
	if(!auth.user) {
		return <Navigate to='/login' />
	}
	return children
}

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
}