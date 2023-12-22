import React, { useState } from 'react'
import './AboutPage.scss'
import { Link, useNavigate } from 'react-router-dom'
import arrow from '../../assets/other/arrow.png'
import ChatBubble from '../../components/ChatBubble/ChatBubble'
import { Button } from '../../components'

function AboutPage() {
	const [currentPage, setCurrentPage] = useState(1)

	const handlePageChange = (pageNumber) => {
		setCurrentPage(pageNumber)
	}

	const navigate = useNavigate()

	const renderChatBubbles = () => {
		switch (currentPage) {
		case 1:
			return (
				<div className='chat-container'>
					<ChatBubble text={'Hey there, what\'s \nDo The Be(a)st all about?'}/>
					<ChatBubble side='right' text={'Greetings, adventurer! \nIn Do The Beast, we turn your to-do list into \nepic quests. Create lists and our AI will prioritize \ntasks and serve you one monstrous challenge at a time.'} />
					<ChatBubble text={'How do I \ndefeat these monsters?'}/>
					<ChatBubble side='right' text={'It\'s simple! Your tasks represent epic battles. \nThe monsters have HP, and your tasks are your weapons. \nWhen you complete a task, it chips away at \nthe monster\'s health. Defeat monsters and earn trophies.'}/>
				</div>
			)
		case 2:
			return (
				<div className='chat-container'>
					<ChatBubble text={'Trophies, you say?'}/>
					<ChatBubble side='right' text={'\nIndeed! Conquer a monster, and it will add its trophy \nto your collection. Display them proudly \nin your virtual trophy room.'} />
					<ChatBubble text={'Can I team up with others?'}/>
					<ChatBubble side='right' text={'\nOf course! Join the DoTheBeast community, where you can \nshare your conquests, \nstrategize, and embark on group quests with \nfellow adventurers.'}/>
				</div>
			)
		case 3:
			return (
				<div className="chat-container">
					<ChatBubble text={'This sounds like an \nepic adventure!'}/>
					<ChatBubble side='right' text={'\nIndeed, it is! Welcome to DoTheBeast, where productivity \nbecomes a thrilling game. Your adventure awaits!'} />
					<div className='buttons-container-about'>
						<Button onClick={() => navigate('/login')}>LOGIN</Button>
						<Button onClick={() => navigate('/register')}>SIGNUP</Button>
					</div>
				</div>
			)
		}
	}

	return (
		<div>
			{renderChatBubbles()}
			<div className="navigation-dots">
				<div className='nav-arrow' onClick={() => currentPage!=1 && handlePageChange(currentPage-1)}>&lt;</div>
				<div id={currentPage==1 && 'active'} className='dot' onClick={() => handlePageChange(1)}></div>
				<div id={currentPage==2 && 'active'} className='dot' onClick={() => handlePageChange(2)}></div>
				<div id={currentPage==3 && 'active'} className='dot' onClick={() => handlePageChange(3)}></div>
				<div className='nav-arrow' onClick={() => currentPage!=3 && handlePageChange(currentPage+1)}>&gt;</div>
			</div>
			<Link to='/'><img className='arrow' src={arrow} alt='arrow'/></Link>
		</div>
	)
}

export default AboutPage
