import React  from 'react'
import './AboutPage.scss'
import textArea from '../../assets/other/text-area.png' 
import purpleBeast from '../../assets/beasts/purpleBeast.png'
import { Button, Text } from '../../components'
import { useNavigate } from 'react-router-dom'

function Page3() {

	const navigate = useNavigate()

	return (
		<div className="chat-container">
			<div className="chat-bubble left">
				<img src={textArea} alt="Chat bubble"/>
				<div className='text-cont'>
					<Text className='text'>This sounds like an</Text>
					<Text className='text'>epic adventure!</Text>
				</div>
			</div>
			<div className="chat-bubble right">
				<img src={textArea} alt="Chat bubble" />
				<div id='p-3' className='text-cont'>
					<Text className='text'>Indeed, it is! Welcome to DoTheBeast, where productivity</Text>
					<Text className='text'>becomes a thrilling game. Your adventure awaits!</Text>
				</div>
				<img src={purpleBeast} alt="Purple Beast"  className='beast'/>
			</div>
			<div className='buttons-container-about'>
				<Button onClick={() => navigate('/login')}>LOGIN</Button>
				<Button onClick={() => navigate('/register')}>SIGNUP</Button>
			</div>
		</div>
	)
}

export default Page3