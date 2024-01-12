import React from 'react'
import { slide as Menu } from 'react-burger-menu'
import PropTypes from 'prop-types'
import { styles } from './BurgerMenuStyles'
import { useNavigate } from 'react-router-dom'
import './BurgerMenu.scss'

const BurgerMenu = ({ links }) => {
	const navigate = useNavigate()

	const handleItemClick = (href) => {
		navigate(href)
	}

	return (
		<Menu styles={styles}>
			{links.map((link, index) => (
				<a key={index} onClick={() => handleItemClick(link.href)}>
					{link.text}
				</a>
			))}
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
}

export default BurgerMenu
