import React, { useState } from 'react'
import './LoginPage.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from '../../components'
import { useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../ducks/AuthProvider'
import arrow from '../../assets/other/arrow.png'

function LoginPage() {
	const navigate = useNavigate()

	const loginSchema = Yup.object().shape({
		password: Yup.string().required('Wait! What\'s your password?'),
		username: Yup.string().required('Wait! What\'s your username?')
	})

	const [errors, setErrors] = useState([])
	const auth = useAuth()
	const handleSubmit = async (values) => {
		try {
			const res = await auth.login(values)
			if (res.status === 200) {
				navigate('/', { replace: true })
			} else if (res.status === 401) {
				setErrors([res.data?.message || 'Unauthorized', ...errors])
			}
		} catch (error) {
			console.error('Error during login:', error)
			setErrors(['Server not available', ...errors])
		}
	}

	return (
		<div>
			<Link to='/'><img className='arrow' src={arrow} alt='arrow'/></Link>
			<div className='login-container'>
				<Formik
					initialValues={{ username: '', password: '' }}
					validationSchema={loginSchema}
					onSubmit={(values, { resetForm }) => {return (handleSubmit(values), resetForm())}}>
					{() => {
						return (
							<Form className='login-form'>
								<p className='header'>LOGIN</p>
								<Text className='login-field-box'>
									<Field id='username' className="login-field" placeholder="USERNAME" type="username" name="username" />
									<ErrorMessage className='error-msg' name="username" component="div" />
								</Text>
								<Text className='login-field-box'>
									<Field id='password' className="login-field" placeholder="PASSWORD" type="password" name="password" />
									<ErrorMessage className='error-msg' name="password" component="div" />
									{errors && errors.map(e => <div key={e} className='error-msg'>{e}</div>)}
								</Text>
								<Button type='submit' className='login-btn'>LET ME IN!</Button>
								<Link className='link-login-reg' to='/register'>Don&apos;t have an account? Sign up.</Link>
							</Form>
						)
					}}
				</Formik>
			</div>
		</div>
	)
}

export default LoginPage
