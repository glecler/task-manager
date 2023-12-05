const BASE_URL = 'http://localhost:80'

const changeTaskStatus = (task, status) => {

	const newTask = { status };

	fetch(BASE_URL + '/itemsstatus/' + task.id.toString(), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newTask),
	})
		.then(response => response)
		.catch(error => console.error('Error updating task:', error));
};

const editTask = ( task, description ) => {

	const newTask = { description };

	fetch(BASE_URL + '/items/' + task.id.toString(), {
		method: 'PUT',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(newTask),
	})
		.then(response => response)
		.catch(error => console.error('Error updating task:', error));
};

const deleteTask = (task) => {
	fetch(BASE_URL + '/items/'+task.id.toString(), {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
		},
	})
		.then(response => response)
		.catch(error => console.error('Error deleting task:', error));
};

const createTask = (status, description) => {

	if (status && description) {

		const newTask = { status, description };

		return(fetch(BASE_URL + '/items', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(newTask),
		})
			.then(response => response.json())
			.catch(error => console.error('Error creating task:', error))
		);
	} else {
		console.log('Task creation canceled or invalid input.');
	}
};

const getTasks = () => {
	return(fetch(BASE_URL + '/items')
		.then(response => response.json())
		.catch(error => console.error('Error fetching items:', error))
	);
};

export { getTasks, createTask, editTask, deleteTask, changeTaskStatus}
