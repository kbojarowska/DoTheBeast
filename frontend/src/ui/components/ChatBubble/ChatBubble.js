import React from 'react'
import Text from '../Text/Text'
import textArea from '../../assets/other/text-area.png' 
import PropTypes from 'prop-types'
import './ChatBubble.scss'
import purpleBeast from '../../assets/beasts/purpleBeast.png'

function ChatBubble({text, side}) {
	return (
		<div className={`chat-bubble ${side}`}>
			<img src={textArea} alt="Chat bubble"/>
			<div className='text-cont'>
				<Text className='text'>{text}</Text>
			</div>
			{side=='right' && 
            <img src={purpleBeast} alt="Pink Beast"  className='beast'/>}
		</div>
	)
}

export default ChatBubble

ChatBubble.propTypes = {
	text: PropTypes.string,
	side: PropTypes.string
}