import { Box, Heading } from 'grommet';
import Task from './Task.js';

export default function TaskBoard({tasks, editTask, deleteTask, changeTaskStatus}) {
	if (!tasks)
		tasks = []
	const todoTasks = tasks.filter((task) => task.status === 'To Do')
	const progTasks = tasks.filter((task) => task.status === 'In Progress')
	const doneTasks = tasks.filter((task) => task.status === 'Done')

		return (
		<Box round="medium" direction="row" gap="medium" justify="around" fill>
        <Box fill align="center" gap="medium" round="medium" elevation="large">
          <Heading level="2">To Do</Heading>
			{todoTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
				<Box fill align="center" gap="medium" round="medium" elevation="large">
          <Heading level="2">In Progress</Heading>
						{progTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
				<Box fill align="center" gap="medium" round="medium" elevation="large">
          <Heading level="2">Done</Heading>
						{doneTasks.map(task => (
              <Task task={task} editTask={editTask} deleteTask={deleteTask} changeTaskStatus={changeTaskStatus}/>
            ))}
        </Box>
		</Box>
  );
}
