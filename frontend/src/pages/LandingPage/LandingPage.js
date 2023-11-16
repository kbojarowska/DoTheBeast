import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Text } from '../../components'
import './LandingPage.scss'
import { useNavigate } from 'react-router-dom/dist'


function LandingPage() {

	const navigate = useNavigate()

	return (
		<div>
			<div className='buttons-container'>
				<Button onClick={()=>navigate('/login')}>LOGIN</Button>
				<Button>SIGNUP</Button>
			</div>
			<div className='big-btn-container'>
				<div className='img'/>
				<Button size='large' className='btn-start'>
					<div className='text-container'>
						DO THE <div className='txt'>BEAST</div>
					</div>
				</Button>
			</div>
			<div className='info-container'>
				<Text className='info'>collect all the beasts</Text>
				<Text className='info'>by simply completing</Text>
				<Text className='info'>your daily tasks</Text>
				<Text><Link to='/about'>What is it all about?</Link></Text>
			</div>
		</div>
	)
}

export default LandingPage