import { Box, Select, TextArea, FormField, Button } from 'grommet';
import React, { useState } from 'react';

export default function NewTask({ createTask }) {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');

  const handleConfirmCreateTask = () => {
    if (status && description) {
      createTask(status, description);
    } else {
      console.log('Invalid input.');
    }
  };

	return (
		<Box width={{max:"50%"}} align="center">
      <FormField label="Status">
          <Select value={status} onChange={({option}) => setStatus(option)} options={['To Do', 'In Progress', 'Done']}/>
      </FormField>
      <FormField label="Description">
					<TextArea value={description} onChange={event => setDescription(event.target.value)} placeholder="type here" />
      </FormField>
      <Button label="Create Task" onClick={handleConfirmCreateTask}/>
    </Box>
  );
}

