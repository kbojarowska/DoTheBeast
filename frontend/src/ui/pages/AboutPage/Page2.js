import React  from 'react'
import './AboutPage.scss'
import textArea from '../../assets/other/text-area.png' 
import purpleBeast from '../../assets/beasts/purpleBeast.png'
import { Text } from '../../components'

function Page2() {

	return (
		<div className="chat-container">
			<div className="chat-bubble left">
				<img src={textArea} alt="Chat bubble"/>
				<div className='text-cont'>
					<Text></Text>
					<Text className='text'>Trophies, you say?</Text>
				</div>
			</div>
			<div className="chat-bubble right">
				<img src={textArea} alt="Chat bubble" />
				<div className='text-cont'>
					<Text></Text>
					<Text></Text>
					<Text className='text'>Indeed! Conquer a monster, and it will add its trophy</Text>
					<Text className='text'>to your collection. Display them proudly</Text>
					<Text className='text'>in your virtual trophy room.</Text>
				</div>
				<img src={purpleBeast} alt="Purple Beast"  className='beast'/>
			</div>
			<div className="chat-bubble left">
				<img src={textArea} alt="Chat bubble"/>
				<div className='text-cont'>
					<Text></Text>
					<Text></Text>
					<Text className='text'>Can I team up with others?</Text>
				</div>
			</div>
			<div className="chat-bubble right">
				<img src={textArea} alt="Chat bubble" />
				<div className='text-cont'>
					<Text className='text'>Of course! Join the DoTheBeast community, where you can</Text>
					<Text className='text'> share your conquests,</Text>
					<Text className='text'>strategize, and embark on group quests with</Text>
					<Text className='text'>fellow adventurers.</Text>
				</div>
				<img src={purpleBeast} alt="Purple Beast" className='beast' />
			</div>
		</div>
	)
}

export default Page2