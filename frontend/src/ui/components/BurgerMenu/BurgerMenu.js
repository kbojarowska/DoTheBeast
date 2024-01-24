import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import PropTypes from 'prop-types'
import { styles } from './BurgerMenuStyles'
import { useNavigate } from 'react-router-dom'
import './BurgerMenu.scss'

const BurgerMenu = ({ links, logout }) => {
	const navigate = useNavigate()

	const handleItemClick = (href) => {
		navigate(href)
	}

	const handleLogout = () => {
		if (logout && typeof logout === 'function') {
			logout()
		}
		navigate('/')
	}

	return (
		<Menu styles={styles}>
			{links.map((link, index) => (
				<a key={index} onClick={() => handleItemClick(link.href)}>
					{link.text}
				</a>
			))}
			{logout && typeof logout === 'function' && ( // Only show the logout option if the logout prop is provided and is a function
				<a onClick={handleLogout} className='logout'>Logout</a>
			)}
		</Menu>
	)
}

BurgerMenu.propTypes = {
	links: PropTypes.arrayOf(
		PropTypes.shape({
			href: PropTypes.string.isRequired,
			text: PropTypes.string.isRequired,
		})
	).isRequired,
	logout: PropTypes.func,
}

export default BurgerMenu
