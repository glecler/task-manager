import React, { useState, useEffect } from 'react';
import { Box, PageHeader, Grommet, DropButton } from 'grommet';
import TaskBoard from './components/TaskBoard.js';
import NewTask from './components/NewTask.js';
import { getTasks, deleteTask, editTask, changeTaskStatus, createTask } from './utils/api.js';

function App() {
	
	const [tasks, setTasks] = useState(null);

	const handleCreateTask = (task, description) => {
		createTask(task, description)
			.then(result => {setTasks([...tasks, result]);})
			.catch(error => console.log('error', error));
	};

	useEffect(() => {
		getTasks()
		.then(data => setTasks(data))
		.catch(error => console.log('error getting tasks', error))
  }, [tasks]);

  return (
    <div className="App">
			<Grommet>
				<PageHeader title="Task Manager"/>
				<Box margin="medium" gap="medium">
					<DropButton
						alignSelf="center"
						label="New Task"
						dropContent={<NewTask createTask={handleCreateTask}/>}
					/>
					<TaskBoard tasks={tasks} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
				</Box>	
		</Grommet>
    </div>
  );
}

export default App;
