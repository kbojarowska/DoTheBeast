import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Text } from '../../components'
import './LandingPage.scss'
import { useNavigate } from 'react-router-dom/dist'
import blueBeast from '../../assets/beasts/blueBeast.png'
import bubbleBeast from '../../assets/beasts/bubbleBeast.png'
import greenBeast from '../../assets/beasts/greenBeast.png'
import groovyBeast from '../../assets/beasts/groovyBeast.png'
import pinkBeast from '../../assets/beasts/pinkBeast.png'



function LandingPage() {

	const navigate = useNavigate()

	return (
		<div>
			<div className='buttons-container'>
				<img className='groovy-beast' src={groovyBeast} alt='groovy beast'/>
				<Button onClick={()=>navigate('/login')}>LOGIN</Button>
				<Button onClick={()=>navigate('/register')}>SIGNUP</Button>
				<img className='pink-beast' src={pinkBeast} alt='pink beast'/>
			</div>
			<div className='big-btn-container'>
				<img className='blue-beast' src={blueBeast} alt='blue beast'/>
				<div className='btn-beast'>
					<Button size='x-large' className='btn-start'>
						<div className='text-container'>
							DO THE <div className='txt'>BEAST</div>
						</div>
					</Button>
					<div>
						<img height='100' className='green-beast' src={greenBeast} alt='green beast'/>
					</div>
				</div>
			</div>
			<div className='info-container'>
				<Text className='info'>collect all the beasts</Text>
				<Text className='info'>by simply completing</Text>
				<Text className='info'>your daily tasks</Text>
				<Text className='info'><Link to='/about'>What is it all about?</Link></Text>
			</div>
			<img className='bubble-beast' src={bubbleBeast} alt='bubble beast'/>
		</div>
	)
}

export default LandingPage