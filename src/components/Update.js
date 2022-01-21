
import React, { useState } from 'react'

import { useParams,useNavigate } from 'react-router-dom';
import useData from './useData';
import moment from 'moment';
import Form from './Form';
import initializeAuthentication from './Firebase/firebase.init';
import {  getDatabase,   ref, update } from 'firebase/database';
import useAuth from './Hooks/useAuth';
initializeAuthentication()

export default function Update() {
  const{user}=useAuth()
    const [todoList]=useData();
    const db = getDatabase();
    const today =new Date()
    const validDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
     let navigate = useNavigate();
    let {id}=useParams()
    console.log(id);
  
    
    const [text,setText]=useState('');
    const [date,setDate]=useState('');
  
    // console.log(datas);
    const handleOnChangeText=e=>{
        setText(e.target.value);
    }
    const handleOnChangeDate=e=>{
        setDate(e.target.value);
    }   
    const updateData = todoList?.find((data)=> data.id===id)
       
  


    const handleOnSubmit= e =>{
        e.preventDefault();
        const given = moment(date, "YYYY-MM-DD");
        let current = moment().startOf('day');
        //Difference in number of days
        let updateDays = moment.duration(given.diff(current)).asDays();
        const singleTodo={
           ...updateData,
            name:text || updateData.name,
            Date: date || validDate|| updateData.Date,
            remainingDays:updateDays || updateData.remainingDays
        }  
        console.log(singleTodo);
        console.log(`/todos/${user.uid}/${id}/name`);
        const updates={};
        updates[`/todos/${user.uid}/${id}/name`] = singleTodo.name;
        updates[`/todos/${user.uid}/${id}/Date`] = singleTodo.Date;
        updates[`/todos/${user.uid}/${id}/remainingDays`] = singleTodo.remainingDays;
        navigate('/')
        return update(ref(db),updates)
       
    }
    return (
       <>
        {/* <h1>{id}</h1>
        <form onSubmit={handleOnSubmit}>
      
          <input className='text' type="text" defaultValue={updateData.name} onChange={handleOnChangeText} required/>
          <input className='date' type="Date" defaultValue={updateData?.Date || ''}
            onChange={handleOnChangeDate} required/>
                
                <Button
                 type='sumbit'
                variant="contained"
                sx={{p:1.5,ml:4}}
            >Update</Button>
        </form> */}
        <Form
            handleOnSubmit={handleOnSubmit}
            handleOnChangeText={handleOnChangeText}
            updateData={updateData}
            handleOnChangeDate={handleOnChangeDate}
            id={id}
            validDate={validDate}
        ></Form>
       </>
    )
}
