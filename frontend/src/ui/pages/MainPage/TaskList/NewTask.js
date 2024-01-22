import React, { useState } from 'react'
import PropTypes from 'prop-types'
import './TaskList.scss'
import { addTask } from '../../../../ducks/TodoApi'
// import { Text } from '../../../components'
import * as Yup from 'yup'
import { ErrorMessage, Field, Form, Formik } from 'formik'
import { useParams } from 'react-router-dom'
import { Button, Text } from '../../../components'

const NewTask = ({todoId}) => {
	const initialValues = {
		name: '',
		category: 'Work',
		time: 1,
		difficulty: 1,
		priority: 1,
		isDone: false,
		todoListId: todoId,
		userId: useParams().userId
	}

	const [errors, setErrors] = useState([])

	const validationSchema = Yup.object().shape({
		name: Yup.string().required('Task Name is required'),
		category: Yup.string().required('Category is required'),
		time: Yup.number().min(1, 'Time must be at least 1').required('Time is required'),
		difficulty: Yup.number().min(1, 'Difficulty must be at least 1').max(5, 'Difficulty must be at most 5').required('Difficulty is required'),
		priority: Yup.number().required('Priority is required'),
	})

    
	const handleSubmit = async (values, {resetForm}) => {
		console.log(values)
		const res = await addTask(values)
		if (!res) {
			setErrors(['Server not available'])
		} else {
			if (res.status === 201) {
				console.log('task added')
				resetForm()
			} else if (res.status === 401) {
				setErrors([res.data.message, ...errors])
			}
		}
	}

	return (
		<Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={handleSubmit}>
			<Form className='newtask-c'>
				<label>
					<Text size='xx-small'>TASK:</Text>
					<Text className='task-field-box'>
						<Field id='name' className="task-field" type="name" name="name" />
						<ErrorMessage className='error-msg-task' name="name" component="div" />
					</Text>
				</label>
				<label>
					<Text size='xx-small'>category:</Text>
					<Text className='task-field-box'>
						<Field as="select" name="category" id='category' className="task-field" type="category" >
							{['Work', 'Personal', 'Health', 'Education', 'Entertainment', 'Family', 'Errands', 'Fitness', 'Projects', 'Mental well-being'].map(category => (
								<option key={category} value={category}>{category}</option>
							))}
						</Field>
						<ErrorMessage className='error-msg' name="category" component="div" />
					</Text>
				</label>
				<label>
					<Text size='xx-small'>time (minutes):</Text>
					<Text className='task-field-box'>
						<Field className="task-field" type="number" name="time" min="1" placeholder='TIME'/>
						<ErrorMessage name="time" component="div" className="error" />
					</Text>
				</label>
				<label>
					<Text size='xx-small'>difficulty (1-5):</Text>
					<Text className='task-field-box'>
						<Field className="task-field" type="number" name="difficulty" min="1" max="5" />
						<ErrorMessage name="difficulty" component="div" className="error" />
					</Text>
				</label>
				<label>
					<Text size='xx-small'>priority:</Text>
					<Text className='task-field-box'>
						<Field className="task-field" type="number" name="priority" />
						<ErrorMessage name="priority" component="div" className="error" />
					</Text>
				</label>
				{errors && errors.map(e => <div key={e} className='error-msg'>{e}</div>)}
				<Button type="submit">Add Task</Button>
			</Form>
		</Formik>
	)
}

export default NewTask

NewTask.propTypes = {
	todoId: PropTypes.string,
}