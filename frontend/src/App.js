import React, { useState, useEffect } from 'react';
import { Box, Heading, Grommet, DropButton } from 'grommet';
import TaskBoard from './components/TaskBoard.js';
import NewTask from './components/NewTask.js';
import { getTasks, deleteTask, editTask, changeTaskStatus, createTask } from './utils/api.js';
import './app.css';

function App() {
	
	const [tasks, setTasks] = useState([]);
	
	const handleEditTask = (task, description) => {
		editTask(task, description)
			.then(() => {handleGetTasks()})
			.catch(error => console.log(error));
	};
	
	const handleDeleteTask = (task) => {
		deleteTask(task)
		.then(() => {handleGetTasks()})
		.catch(error => console.log('error'));
	};

	const handleGetTasks = () => {
		getTasks()
		.then(data => {const updatedTasks = data || []; setTasks(updatedTasks)})
		.catch(error => console.log('error getting tasks', error))

	};

	const handleChangeTaskStatus = (task, status) => {
		changeTaskStatus(task, status)
			.then(() => handleGetTasks())
			.catch(error => console.log('error'))
	};

	const handleCreateTask = (task, description, tags) => {
		createTask(task, description, tags)
			.then(result => {setTasks([...tasks, result]);})
			.catch(error => console.log('error', error));
	};

	useEffect(() => {
		handleGetTasks();
  }, []);


  return (
    <div className="App">
			<Grommet
				theme={{ global: {
					font: { family: "Roboto"},
					},
				}}
			>
				<Box align="center" gap="medium">
				<Heading level="1"> Task Manager </Heading>
					<DropButton
						label="New Task"
						dropContent={<NewTask createTask={handleCreateTask}/>}
						dropAlign={{top: "bottom"}}
					/>
					<TaskBoard tasks={tasks} editTask={handleEditTask} deleteTask={handleDeleteTask} changeTaskStatus={handleChangeTaskStatus}/>
				</Box>	
		</Grommet>
    </div>
  );
}

export default App;
