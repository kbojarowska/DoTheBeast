import React, { useState } from 'react'
import './AboutPage.scss'
import Page1 from './Page1'
import Page2 from './Page2'
import Page3 from './Page3'
import { Link } from 'react-router-dom'
import arrow from '../../assets/other/arrow.png'

function AboutPage() {
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const renderChatBubbles = () => {
		switch (currentPage) {
		case 1:
			return (
				<div>
					<Page1 />
				</div>
			)
		case 2:
			return (
				<div>
					<Page2 />
				</div>
			)
		case 3:
			return (
				<div>
					<Page3 />
				</div>
			)
		default:
			return null
		}
	}

	return (
		<div>
			<div>
				{renderChatBubbles()}
			</div>

			<div className="navigation-dots">
				<div className="dot" onClick={() => handlePageChange(1)}></div>
				<div className="dot" onClick={() => handlePageChange(2)}></div>
				<div className="dot" onClick={() => handlePageChange(3)}></div>
			</div>
			<Link to='/'><img className='arrow' src={arrow} alt='arrow'/></Link>
		</div>
	)
}

export default AboutPage
