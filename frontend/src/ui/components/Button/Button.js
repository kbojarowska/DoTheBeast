import React from 'react'
import PropTypes from 'prop-types'
import './Button.scss'

const Button = ({ className, size, disabled, onClick, children, type }) => {
	return (
		<button
			className={`button ${size} ${className}`}
			onClick={onClick}
			disabled={disabled}
			type={type ? type : 'button'}
		>
			<div>
				{children}
			</div>
		</button>
	)
}

export default Button

Button.defaultProps = {
	disabled: false,
	size: 'medium',
	className: ''
}

Button.propTypes = {
	size: PropTypes.oneOf(['medium', 'large', 'x-large']),
	className: PropTypes.string,
	disabled: PropTypes.bool,
	onClick: PropTypes.func,
	children: PropTypes.any,
	type: PropTypes.string
}