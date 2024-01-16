import React from 'react'
import PropTypes from 'prop-types'
import './Text.scss'

export default function Text({size, className='', children}) {
	const classes = `${size} ${className}`
	return (
		<p className={classes}>{children}</p>
	)
}

Text.defaultProps = {
	size: 'medium'
}

Text.propTypes = {
	size: PropTypes.oneOf(['xx-small','x-small', 'small', 'medium', 'large']),
	className: PropTypes.string,
	children: PropTypes.any
}