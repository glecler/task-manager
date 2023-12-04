import { FormField, Select, TextArea, Button, Box, DropButton, Card, CardHeader, CardBody, CardFooter } from 'grommet';
import { MoreVertical } from 'grommet-icons';
import { useState , useEffect } from 'react';

export default function Task ( {task, editTask, deleteTask, changeTaskStatus} ) {

	const [newDescription, setNewDescription] = useState('');
	const [newStatus, setNewStatus] = useState('');

	const onClickChangeStatus = () => {
		if (newStatus) {
			changeTaskStatus(task, newStatus);
		}
		else {
			console.log('Missing status.');
		}
	};

	const onClickEditTask = () => {
		if (newDescription) {
			editTask(task, newDescription);
		}
		else
			console.log('Missing description')
	};

  const onClickDeleteTask = () => {
		deleteTask(task);
	};

	return (
		<Card gap="medium" elevation="large">
			<CardBody> {task.description} </CardBody>
			<CardFooter>
				    <DropButton
							icon={<MoreVertical/>}
							dropContent={
								<Box>
									<DropButton
										label='Move to'
										dropContent={
											<FormField label='New Status'>
												<Select value={newStatus} onChange={({option}) => setNewStatus(option)} options={['To Do', 'In Progress', 'Done']}/>
												<Button label='Confirm' onClick={onClickChangeStatus}/>
											</FormField>
										}
									/>
									<DropButton
										label='Edit'
										dropContent={
											<FormField label='New Description'>
											<TextArea
												placeholder='Enter new description'
												value={newDescription}
												onChange={event => setNewDescription(event.target.value)}
											/>
											<Button label='confirm' onClick={onClickEditTask}/>
											</FormField>
										}
									/>
									<Button label='Delete' onClick={onClickDeleteTask}/>
								</Box>}
						/>
			</CardFooter>
		</Card>
	);
}
