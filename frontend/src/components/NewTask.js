import { Box, Select, TextArea, FormField, Button } from 'grommet';
import React, { useState } from 'react';

export default function NewTask({ createTask }) {
  const [status, setStatus] = useState('');
  const [description, setDescription] = useState('');
  const [tags, setTags] = useState('');

  const handleConfirmCreateTask = () => {
		console.log("tags", tags);
    if (status && description && tags) {
      createTask(status, description, tags);
    } else {
      console.log('Invalid input.');
    }
  };

	return (
		<Box align="center">
      <FormField label="Status">
          <Select value={status} onChange={({option}) => setStatus(option)} options={['To Do', 'In Progress', 'Done']}/>
      </FormField>
      <FormField fill label="Description">
					<TextArea value={description} onChange={event => setDescription(event.target.value)} placeholder="type here" />
      </FormField>
      <FormField fill label="Tags">
					<TextArea value={tags} onChange={event => setTags(event.target.value)} placeholder="add tags here" />
      </FormField>
      <Button label="Create Task" onClick={handleConfirmCreateTask}/>
    </Box>
  );
}

