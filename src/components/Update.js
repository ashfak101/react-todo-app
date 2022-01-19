
import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import useData from './useData';
import moment from 'moment';
import Form from './Form';
export default function Update() {
    const today =new Date()
    const validDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
     let navigate = useNavigate();
    let {id}=useParams()
    const [datas,setDatas]=useData({});
    const [updateData,setUpdate]= useState({})
    const [text,setText]=useState('');
    const [date,setDate]=useState('');
    console.log(datas);
    const handleOnChangeText=e=>{
        setText(e.target.value);
    }
    const handleOnChangeDate=e=>{
        setDate(e.target.value);
    }

   
     useEffect(() => {    
    const newData = datas.find((data)=> data.id==id)
        setUpdate(newData)
  }, [id])
    const handleOnSubmit= e =>{
        e.preventDefault();
        const given = moment(date, "YYYY-MM-DD");
        let current = moment().startOf('day');
        //Difference in number of days
        let updateDays = moment.duration(given.diff(current)).asDays();
        const singleTodo=[{
           ...updateData,
            name:text || updateData.name,
            Date: date || validDate|| updateData.Date,
            remainingDays:updateDays || updateData.remainingDays
        }]    
        const latestUpdate=datas.map(data=>singleTodo.find(todo=>todo.id===data.id)|| data)
       setDatas(latestUpdate)
       navigate('/')
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
