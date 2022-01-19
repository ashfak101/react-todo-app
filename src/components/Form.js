import { Alert, AlertTitle, TextField } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react';
import Button from '@mui/material/Button';

export default function Form({handleSubmit,handleChange,handleDateChange,success,validDate,text,
    handleOnSubmit,handleOnChangeText,updateData,handleOnChangeDate,id
}) {
  return <div>
      
       {/* { id ? <Box>
        <h1>Update Your task</h1>
        <form onSubmit={handleOnSubmit}>
      
          <input className='text' type="text" defaultValue={ updateData.name} onChange={handleOnChangeText} required/>
          <input className='date' type="Date"min={validDate} defaultValue={updateData?.Date || ''}
            onChange={handleOnChangeDate} required/>
                
                <Button
                 type='sumbit'
                variant="contained"
                sx={{p:1.5,ml:4}}
            >Update</Button>
        </form>
        </Box>:
        <Box  sx={{m:4}}>
            <h1>Add your task</h1>
            <form onSubmit={handleSubmit}>
                <TextField type="text" name='tasks'  id='tasks' placeholder='Add your task'
                onChange={handleChange}
                value={text}
                required
                />
                <input className='date' type="Date" min={validDate} defaultValue={validDate} onChange={handleDateChange}  required/>
                
                <Button
                 type='sumbit'
                  variant="contained"
                  sx={{p:1.5,ml:4}}
                  >ADD+</Button>
            </form>
         
        </Box>} */}
        <Box>
          {id ? <h1>Update Your task</h1> : <h1>Add Your task</h1>} 
            <form onSubmit={id ? handleOnSubmit : handleSubmit}>
      
            <input className='text' type="text" defaultValue={id ? updateData.name : text} onChange={id ? handleOnChangeText : handleChange} required  placeholder={id ? 'Update Task':'Add Task'}/>
            <input className='date' type="Date"min={validDate} defaultValue={id ? updateData?.Date : validDate}
                onChange={id ? handleOnChangeDate:handleDateChange} required/>
                
                <Button
                 type='sumbit'
                variant="contained"
                sx={{p:1.5,ml:4}}
            >Submit</Button>
        </form>
        {success && <Alert severity="success">
                 <AlertTitle>Task Added successfully</AlertTitle>    
             </Alert>}
        </Box>
  </div>;
}
