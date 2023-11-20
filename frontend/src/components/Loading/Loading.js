import React from 'react'
import './Loading.scss'
import { Text } from '../../components'

function Loading() {
	return (
		<div className="loading-overlay">
			<div className="loading">
				<Text>Loading</Text>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
				<span></span>
			</div>
		</div>
	)
}

export default Loading
