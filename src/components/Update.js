
import React, { useState,useEffect } from 'react'
import Button from '@mui/material/Button';
import { useParams,useNavigate } from 'react-router-dom';
import useData from './useData';
import moment from 'moment';
import Form from './Form';
import initializeAuthentication from './Firebase/firebase.init';
import { child, getDatabase, onValue, push, ref, update } from 'firebase/database';
initializeAuthentication()

export default function Update() {
    const [todoList,setTodolist]=useState()
    const db = getDatabase();
    const today =new Date()
    const validDate = today.getFullYear() + '-' + ('0' + today.getMonth() + 1).slice(-2) + '-' + ('0' + today.getDate()).slice(-2);
    //  let navigate = useNavigate();
    let {id}=useParams()
    // const [datas,setDatas]=useData({});
    const [updateData,setUpdate]= useState({})
    const [text,setText]=useState('');
    const [date,setDate]=useState('');
    console.log(updateData);
    // console.log(datas);
    const handleOnChangeText=e=>{
        setText(e.target.value);
    }
    const handleOnChangeDate=e=>{
        setDate(e.target.value);
    }
     useEffect(() => {    
    const newData = todoList?.find((data)=> data.id==id)
        setUpdate(newData)
        
  }, [todoList,id])
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
        const latestUpdate=todoList?.map(data=>singleTodo.find(todo=>todo.id===data.id)|| data)
        const newPostKey = push(child(ref(db), '/todos')).data;
        const updates={};
        updates['/todos'+newPostKey]=latestUpdate;
        updates['/update/'+id+'/'+ newPostKey]=latestUpdate;
        return update(ref(db), updates);
      
    //    setDatas(latestUpdate)
    //    navigate('/')
    }


    useEffect(()=>{
        const starCountRef = ref(db, 'todos/');
        onValue(starCountRef, (snapshot) => {
        const datas = snapshot.val();
        const todoDatas=[]
          for( let data in datas){
            todoDatas.push(datas[data])
          }
          setTodolist(todoDatas)
        });
    },[db])
   console.log(todoList);
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
