import './App.css';
import React, { useState, useEffect } from 'react';
import { Box, PageHeader, Grommet, DropButton } from 'grommet';
import TaskBoard from './components/TaskBoard.js';
import NewTask from './components/NewTask.js';

function App() {
	
	const [tasks, setTasks] = useState(null);


		const changeTaskStatus = (task, status) => {
			const newTask = { status };
			
			fetch('http://localhost:8080/itemsstatus/' + task.id.toString(), {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				})
				.then(response => response)
        .catch(error => console.error('Error updating task:', error));
	
			getTasks();
		};

		const handleEditTask = ( task, description ) => {
			
			const newTask = { description };
			
			fetch('http://localhost:8080/items/' + task.id.toString(), {
					method: 'PUT',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				})
				.then(response => response)
        .catch(error => console.error('Error updating task:', error));
	
			getTasks();
		};

	const deleteTask = (task) => {
		fetch('http://localhost:8080/items/'+task.id.toString(), {
					method: 'DELETE',
					headers: {
						'Content-Type': 'application/json',
					},
				})
				.then(response => response)
        .catch(error => console.error('Error deleting task:', error));
	};
	
	const handleCreateTask = (status, description) => {

			if (status && description) {
      
				const newTask = { status, description };
      
				fetch('http://localhost:8080/items', {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json',
					},
					body: JSON.stringify(newTask),
				})
				.then(response => response.json())
        .then(data => {
          setTasks([...tasks, data]);
        })
        .catch(error => console.error('Error creating task:', error));
    } else {
      console.log('Task creation canceled or invalid input.');
    }
  };

	const getTasks = () => {
		fetch('http://localhost:8080/items')
			.then(response => response.json())
			.then(data => setTasks(data))
			.catch(error => console.error('Error fetching items:', error));
	};

	useEffect(() => {
		getTasks();
  }, [tasks]);

  return (
    <div className="App">
			<Grommet>
				<PageHeader title="Task Manager"/>
				<Box margin="medium" gap="medium">
					<DropButton
						alignSelf="center"
						label="New Task"
						dropContent={<NewTask onCreateTask={handleCreateTask}/>}
					/>
					<TaskBoard tasks={tasks} editTask={handleEditTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
				</Box>	
		</Grommet>
    </div>
  );
}

export default App;
