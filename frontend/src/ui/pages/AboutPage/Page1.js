import React  from 'react'
import './AboutPage.scss'
import textArea from '../../assets/other/text-area.png' 
import purpleBeast from '../../assets/beasts/purpleBeast.png'
import { Text } from '../../components'

function Page1() {

	return (
		<div className="chat-container">
			<div className="chat-bubble left">
				<img src={textArea} alt="Chat bubble"/>
				<div className='text-cont'>
					<Text className='text'>Hey there, what&apos;s</Text>
					<Text className='text'>Do The Be(a)st all about?</Text>
				</div>
			</div>
			<div className="chat-bubble right">
				<img src={textArea} alt="Chat bubble" />
				<div className='text-cont'>
					<Text className='text'>Greetings, adventurer!</Text>
					<Text className='text'>In Do The Beast, we turn your to-do list into</Text>
					<Text className='text'>epic quests. Create lists and our AI will prioritize</Text>
					<Text className='text'>tasks and serve you one monstrous challenge at a time.</Text>
				</div>
				<img src={purpleBeast} alt="Pink Beast"  className='beast'/>
			</div>
			<div className="chat-bubble left">
				<img src={textArea} alt="Chat bubble"/>
				<div className='text-cont'>
					<Text className='text'>How do I</Text>
					<Text className='text'>defeat these monsters?</Text>
				</div>
			</div>
			<div className="chat-bubble right">
				<img src={textArea} alt="Chat bubble" />
				<div className='text-cont'>
					<Text className='text'>It&apos;s simple! Your tasks represent epic battles.</Text>
					<Text className='text'>The monsters have HP, and your tasks are your weapons.</Text>
					<Text className='text'>When you complete a task, it chips away at</Text>
					<Text className='text'>the monster&apos;s health. Defeat monsters and earn trophies.</Text>
				</div>
				<img src={purpleBeast} alt="Pink Beast" className='beast' />
			</div>
		</div>
	)
}

export default Page1