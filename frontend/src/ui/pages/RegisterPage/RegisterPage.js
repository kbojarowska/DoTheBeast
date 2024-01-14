import React, { useEffect, useState } from 'react'
import './RegisterPage.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from '../../components'
import { register, importAll } from '../../../ducks/UserApi'
import { useNavigate } from 'react-router'
import RegisterPopup from './RegisterPopup'
import { Link } from 'react-router-dom'
import arrow from '../../assets/other/arrow.png'

function RegisterPage() {

	const navigate = useNavigate()

	const [currentBody, setCurrentBody] = useState(0)
	const [currentHair, setCurrentHair] = useState(0)
	const [currentFit, setCurrentFit] = useState(0)
	const [toggle, setToggle] = useState(false)

	const [errors, setErrors] = useState([])
    
	const registerSchema = Yup.object().shape({
		password: Yup.string().required('Wait! What\'s your password?'),
		passwordConfirmation: Yup.string().required('Confirm your passowrd.').oneOf([Yup.ref('password'), null], 'Passwords don\'t match.'),
		username: Yup.string().required('Wait! What\'s your username?')
	})

	const handleSubmit = async (values) => {
		const avatar = {
			'body': /^([^.]+)/.exec(Object.keys(body)[currentBody])[1],
			'hair': /^([^.]+)/.exec(Object.keys(hair)[currentHair])[1],
			'fit': /^([^.]+)/.exec(Object.keys(fit)[currentFit])[1]
		}

		const user = {...values, hairId: parseInt(avatar.hair),  fitId: parseInt(avatar.fit), bodyId: parseInt(avatar.body)}

		const res = await register(user)
		if (!res) {
			setErrors(['Server not available'])
		} else {
			if (res.status === 201) {
				setToggle(true)
				setTimeout(() => {
					navigate('/login')
				}, 3000)
			} else if (res.status === 400) {
				setTimeout(() => {
					setErrors([])
				}, 4000)
				setErrors([res.data.message, ...errors])
			}
		}
	}
    
	// eslint-disable-next-line no-undef
	const body = importAll(require.context('../../assets/avatar_files/body', false, /\.(png|jpe?g|svg)$/))
	// eslint-disable-next-line no-undef
	const fit = importAll(require.context('../../assets/avatar_files/fit', false, /\.(png|jpe?g|svg)$/))
	// eslint-disable-next-line no-undef
	const hair = importAll(require.context('../../assets/avatar_files/hair', false, /\.(png|jpe?g|svg)$/))

	useEffect(() => {

	}, [currentBody, currentFit, currentHair])


	return (
		<div className={`register-page ${toggle && 'overlay'}`}> 
			<Link to='/'><img className='arrow' src={arrow} alt='arrow'/></Link>
			{(toggle) && 
				<RegisterPopup />
			}
			<div className='register-container'>
				<Formik
					initialValues={{ username: '', password: '' , passwordConfirmation: ''}}
					validationSchema={registerSchema}
					onSubmit={(values, { resetForm }) => {return (handleSubmit(values), resetForm())}}>
					{() => {
						return (
							<Form className='register-form'>
								<div className='avatar-form-c'>
									<div className='form-c'>
										<p className='header'>SIGNUP</p>
										<Text className='register-field-box'>
											<Field className="register-field" placeholder="USERNAME" type="username" name="username" />
											<ErrorMessage className='error-msg' name="username" component="div" />
										</Text>
										<Text className='register-field-box'>
											<Field className="register-field" placeholder="PASSWORD" type="password" name="password" />
											<ErrorMessage className='error-msg' name="password" component="div" />
										</Text>
										<Text className='register-field-box'>
											<Field className="register-field" placeholder="CONFIRM YOUR PASSWORD" type="password" name="passwordConfirmation" />
											<ErrorMessage className='error-msg' name="passwordConfirmation" component="div" />
											{errors && errors.map(e => <div key={e} className='error-msg'>{e}</div>)}
										</Text>
									</div>
									<div className="avatar-c">
										<div className="create-avatar">
											<div className="window">
												<img className='body' alt="body" src={body[Object.keys(body)[currentBody]]} />
												<img className='hair' alt="hair" src={hair[Object.keys(hair)[currentHair]]} />
												<img className='fit' alt="fit" src={fit[Object.keys(fit)[currentFit]]} />
											</div>
										</div>
										<div className="create-avatar">
											<div className="buttons">
												<div className="select">
													<p className='avatar-btn' onClick={() => { setCurrentBody((Object.keys(body).length + (currentBody - 1)) % Object.keys(body).length) }}><Text>&#8249;</Text></p>
													<Text>BODY</Text>
													<p className='avatar-btn' onClick={() => { setCurrentBody((currentBody + 1) % Object.keys(body).length) }}><Text>&#8250;</Text></p>
												</div>
												<div className="select">
													<p className='avatar-btn' onClick={() => { setCurrentHair((Object.keys(hair).length + (currentHair - 1)) % Object.keys(hair).length) }}><Text>&#8249;</Text></p>
													<Text>HAIR</Text>
													<p className='avatar-btn' onClick={() => { setCurrentHair((currentHair + 1) % Object.keys(hair).length) }}><Text>&#8250;</Text></p>
												</div>
												<div className="select">
													<p className='avatar-btn' onClick={() => { setCurrentFit((Object.keys(fit).length + (currentFit - 1)) % Object.keys(fit).length) }}><Text>&#8249;</Text></p>
													<Text>FIT</Text>
													<p className='avatar-btn' onClick={() => { setCurrentFit((currentFit + 1) % Object.keys(fit).length) }}><Text>&#8250;</Text></p>
												</div>
											</div>
										</div>
									</div>
								</div>
								<Button type='submit' className='register-btn'>CREATE MY ACCOUNT</Button>
								<Link className='link-login-reg' to='/login' >Already have an account? Log in.</Link>
							</Form>
						)
					}}
				</Formik>
			</div>
		</div>
	)
}

export default RegisterPage
