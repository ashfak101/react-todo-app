import { TextField,Box } from '@mui/material'
import React, { useState } from 'react'
import Button from '@mui/material/Button';
import useData from './useData';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import moment from 'moment';
import Form from './Form';
export default function TodoForm() {
    const [text,setText] =useState('')
    const [date,setDate] =useState('')
    const [success, setSuccess] = useState(false)
    const [datas,setDatas]=useData();
    const today =new Date()
    const validDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    console.log(validDate);
    const handleChange=e=>{
        setText(e.target.value)
    }
    const handleDateChange=e=>{
        setDate(e.target.value)
    }
    
    // Validate Date ------//
    
    const handleSubmit=e=>{
        e.preventDefault();
       
        const given = moment(date, "YYYY-MM-DD");
        let current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays();
        setDatas([...datas,{ 
            id: Math.random()*50,    
            name:text,
            complete:false,
            Date:date || validDate,remainingDays }])
            
            setSuccess(true)
            setText('')
            setDate('')
            
           
    }
    setTimeout(() => {
        setSuccess(false)
      }, 2000);
    return (
        <>
        {/* <Box  sx={{m:4}}>
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
           {success && <Alert severity="success">
                 <AlertTitle>Task Added successfully</AlertTitle>    
             </Alert>}
        </Box> */}
                <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                success={success}
                validDate={validDate}
                text={text}
                ></Form>
        </>
    )
}
