
import React, { useState, useEffect } from 'react'
import './Trophies.scss'
import PropTypes from 'prop-types'
import rack from '../../assets/other/rack.svg'
import rackMobile from '../../assets/other/rack-mobile.svg'
import { Text } from '../../components'
import groupByCount from '../../utils/groupByCount'
import { MdKeyboardDoubleArrowRight, MdKeyboardDoubleArrowLeft } from 'react-icons/md'



// eslint-disable-next-line no-undef
const monsters = require.context('../../assets/monsters', true)
const monsterPics = monsters.keys().map(image => monsters(image))

const Trophies = ({ monsterList }) => {
	const [currentPage, setCurrentPage] = useState(1)
	const [itemsPerPage, setItemsPerPage] = useState(window.innerWidth < 768 ? 4 : 20)

	const groupedMonsters = groupByCount(monsterList)

	const startIndex = (currentPage - 1) * itemsPerPage
	const endIndex = startIndex + itemsPerPage

	const totalPages = Math.ceil(groupedMonsters.length / itemsPerPage)

	const handlePrevPage = () => {
		console.log('Previous Page Clicked')
		setCurrentPage(prev => Math.max(prev - 1, 1))
	}

	const handleNextPage = () => {
		console.log('Next Page Clicked')
		setCurrentPage(prev => Math.min(prev + 1, totalPages))
	}

	useEffect(() => {
		const handleResize = () => {
			setItemsPerPage(window.innerWidth < 768 ? 4 : 20)
			setCurrentPage(1)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
		}
	}, []) 

	return (
		<div className='throphies-container'>
			<img className='trophies-background' src={rack} alt='Trophies background' />
			<img className='trophies-background-mobile' src={rackMobile} alt='Trophies background mobile' />
			<div className='trophies-shelfes'>
				{groupedMonsters.slice(startIndex, endIndex).map((element, idx) => (
					<div className='monster-element' key={idx}>
						<img className='monster-img' src={monsterPics[element.item - 1]} alt={`Monster ${element.item}`} />
						{element.count !== 1 && <Text size='x-small' className='monster-counter'>{element.count}</Text>}
					</div>
				))}
			</div>
			<div className='pagination-container'>
				{<button className='pagination-button' disabled={currentPage === 1} onClick={handlePrevPage}>
					<MdKeyboardDoubleArrowLeft className="pagination-icon" />
				</button>}
				<button className='pagination-button' disabled={currentPage >= totalPages} onClick={handleNextPage}>
					<MdKeyboardDoubleArrowRight className="pagination-icon" />
				</button>
			</div>
		</div>
	)
}

export default Trophies

Trophies.propTypes = {
	monsterList: PropTypes.array,
}