import React from 'react'
import PropTypes from 'prop-types'
import './Modal.scss'

const Modal = ({ isOpen, onClose, children }) => {
	return (
		isOpen && (
			<div className="pixel-modal-overlay" onClick={onClose}>
				<div className="pixel-modal" onClick={(e) => e.stopPropagation()}>
					<div className="pixel-modal-content">{children}</div>
				</div>
			</div>
		)
	)
}

Modal.defaultProps = {
	isOpen: false,
	onClose: () => {},
	children: null,
}

Modal.propTypes = {
	isOpen: PropTypes.bool,
	onClose: PropTypes.func,
	children: PropTypes.node,
}

export default Modal
