/* eslint-disable indent */
import React from 'react'
import './LoginPage.scss'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import { Button, Text } from '../../components'
// import { login } from '../../operations/UserApi'

function LoginPage() {
	const loginSchema = Yup.object().shape({
		password: Yup.string().required('Wait! What\'s your password?'),
		username: Yup.string().required('Wait! What\'s your username?')
	})

	const handleSubmit = (values) => {
        // const res = await login(values)
        // if (res.status == 200) {
        //     window.location('/') // add main page redirect
        // }
        console.log(values)
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
