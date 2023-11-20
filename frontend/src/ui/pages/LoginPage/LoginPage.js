/* eslint-disable react/jsx-key */
/* eslint-disable indent */
import React, { useState } from 'react'
import './LoginPage.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from '../../components'
import { login } from '../../../ducks/UserApi'

function LoginPage() {

	const loginSchema = Yup.object().shape({
		password: Yup.string().required('Wait! What\'s your password?'),
		username: Yup.string().required('Wait! What\'s your username?')
	})

    const [errors, setErrors] = useState([])

	const handleSubmit = async (values) => {
        const res = await login(values)
        if (!res) {
            setErrors(['Server not available'])
        } else {
            if (res.status === 201) {
                // history.push('/user_page')
            } else if (res.status === 400) {
                setErrors([res.data.message, ...errors])
            }
        }
	}

	return (
		<div>
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
                                    {errors ? errors.map(e => <div className='error-msg'>{e}</div>) : null}
                                </Text>
                                <Button className='login-btn'><button className='login-btn btn' type="submit">LET ME IN!</button></Button>
                            </Form>
                        )
                    }}
                </Formik>
            </div>
		</div>
	)
}

export default LoginPage