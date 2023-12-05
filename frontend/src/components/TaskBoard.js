import { Box } from 'grommet';
import Task from './Task.js';

export default function TaskBoard({tasks, editTask, deleteTask, changeTaskStatus}) {
	if (!tasks)
		tasks = []
	const todoTasks = tasks.filter((task) => task.status === 'To Do')
	const progTasks = tasks.filter((task) => task.status === 'In Progress')
	const doneTasks = tasks.filter((task) => task.status === 'Done')

		return (
		<Box round="medium" direction="row" gap="medium" justify="around" fill>
        <Box fill gap="medium" round="medium" elevation="large">
          <h2>To Do</h2>
			{todoTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
				<Box fill gap="medium" round="medium" elevation="large">
          <h2>In Progress</h2>
						{progTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
				<Box fill gap="medium" round="medium" elevation="large">
          <h2>Done</h2>
						{doneTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
		</Box>
  );
}
