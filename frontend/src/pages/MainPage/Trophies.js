/* eslint-disable no-unused-vars */
/* eslint-disable indent */
import React from 'react'
import './Trophies.scss'
import PropTypes from 'prop-types'
import rack from '../../assets/rack.svg'
import rackMobile from '../../assets/rack-mobile.svg'
import { Text } from '../../components'
import groupByCount from '../../utils/groupByCount'

// eslint-disable-next-line no-undef
const monsters = require.context('../../assets/monsters', true)
const monsterPics = monsters.keys().map(image => monsters(image))

// console.log(monsterList)

const Trophies = ({ monsterList }) => {

	{/* MOCK DATA */}
	const mockMonsterList = [1, 1, 2, 1]

	return (
		<div className='throphies-container'>
			<img className='trophies-background' src={rack}/>
      <img className='trophies-background-mobile' src={rackMobile}/>
			<div className='trophies-shelfes'>
				{groupByCount(mockMonsterList).map((element, idx) =>
					<div className="monsterElement" key={idx}>
						<img className='monsterImg' src={monsterPics[element.item - 1]}/>
						{(element.count !== 1) && <Text size="x-small" className='monsterCounter'>{element.count}</Text>}
					</div>)}
			</div>
		</div>
	)
}

export default Trophies

Trophies.propTypes = {
	monsterList: PropTypes.array,
}