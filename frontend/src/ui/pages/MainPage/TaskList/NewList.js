import React, { useState } from 'react'
import './TaskList.scss'
import { addList } from '../../../../ducks/TodoApi'
// import { Text } from '../../../components'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'
import { Button, Text } from '../../../components'

const NewList = () => {

	const initialValues = {
		name: '',
		isShared: false,
		monster: Math.floor(Math.random() * 6),
		users: [useParams().userId]
	}

	const [errors, setErrors] = useState([])

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('List Name is required')
	})

    
	const handleSubmit = async (values, {resetForm}) => {
		const res = await addList(values)
		if (!res) {
			setErrors(['Server not available'])
		} else {
			if (res.status === 201) {
				console.log('todo added')
				resetForm()
			} else if (res.status === 500) {
				setErrors([res.data.message, ...errors])
			}
		}
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			<Form className='newtask-c'>
				<label>
					<Text size='xx-small'>TODO LIST:</Text>
					<Text className='task-field-box'>
						<Field id='name' className="task-field" type="name" name="name" />
						<ErrorMessage className='error-msg-task' name="name" component="div" />
					</Text>
				</label>
				{errors && errors.map(e => <div key={e} className='error-msg'>{e}</div>)}
				<Button type="submit">Add Task</Button>
			</Form>
		</Formik>
	)
}

export default NewList