
import React, { useState } from 'react'
import moment from 'moment';
import Form from './Form';
import initializeAuthentication from './Firebase/firebase.init';
import { getDatabase, push, ref } from "firebase/database";
import useAuth from './Hooks/useAuth';
import { Typography } from '@mui/material';
initializeAuthentication()
export default function TodoForm() {
    const database=getDatabase();
    const [text,setText] =useState('')
    const [date,setDate] =useState('')
    const [success, setSuccess] = useState(false)
    const {user}=useAuth()
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
    console.log(date);
    //  Add data to firebase Realtime Database
    const handleSubmit=e=>{
        e.preventDefault();
        
        let given = moment(date, "YYYY-MM-DD");
        let current = moment().startOf('day');
        //Difference in number of days
        let remainingDays = moment.duration(given.diff(current)).asDays(); 
            push(ref(database, 'todos/'+user.uid), {
                  
                name:text,
                complete:false,
                email:user.email,
                Date:date || validDate,
                remainingDays: remainingDays || 0 ,
                uid:user.uid, 
                
              });
              console.log(user.uid);
              setSuccess(true)
              setText('')
    }
    // for add Task successfully
    setTimeout(() => {
        setSuccess(false)
      }, 2000);
      
    return (
        <>      

            {/* {
                user.emailVerified === false && <Typography sx={{
                    color:'red'
                }}>Please Verifiy Your Email</Typography>
            } */}
              { user.email && <Form
                handleSubmit={handleSubmit}
                handleChange={handleChange}
                handleDateChange={handleDateChange}
                success={success}
                validDate={validDate}
                text={text}
                ></Form>}
        </>
    )
}
