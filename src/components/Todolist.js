import React, {useEffect, useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import useData from './useData';
import List from './List';
import { Box,  } from '@mui/material';
import Button from '@mui/material/Button';
import initializeAuthentication from './Firebase/firebase.init';
import { getDatabase, ref,child,get, update } from 'firebase/database';
import useAuth from './Hooks/useAuth';

initializeAuthentication()
export default function Todolist() {
    const db = getDatabase();
    const voidArr =[]
    const [isComplete,setIsComplete]=useState(false)
    const [todoList,setTodolist]=useData();
    const {user}=useAuth();
    const [display, setDisplay]=useState()
    console.log(todoList);
  
   
   const handleCheckBoxChange=e=>{
       
     if(e.target.checked){
       const checkedItem= todoList.find(todo=> todo.id=== e.target.value)
       voidArr.push(checkedItem)
     }
     if (!e.target.checked) {
      const unChecked = voidArr.find(a => a.id === e.target.value)
      voidArr.splice(voidArr.indexOf(unChecked), 1)
  }
  console.log(voidArr);
   }
      const handleOnclick= ()=>{
        const dbRef = ref(db);
        voidArr.forEach(element => {
          get(child(dbRef, `/todos/${user.uid}/`)).then((snapshot) => {
              setIsComplete(false);
              if (snapshot.exists()) {
                  // const task = snapshot.val();
                  console.log(snapshot.val());
                  const deletes = {};
                  deletes[`/todos/${user.uid}/${element.id}/`] = null;
                 
                
                  setIsComplete(true);
                  return update(ref(db), deletes);
              } 
          }).catch((error) => {
              console.error(error);
          });
      });
      }
// Firebase data load for specific user
      useEffect(()=>{
        const dbRef = ref(db);
        if(user.uid){
            get(child(dbRef,`todos/${user.uid}`)).then((snapshot)=>{
              // console.log(snapshot);
              if(snapshot.exists()){
                const todos=snapshot.val();
                const Datas=[];
                for(let id in todos){
                  Datas.push({id,...todos[id]})
                }
                setTodolist(Datas)
                setDisplay(Datas)
              }
              else{
               
                setDisplay([])
              }
            })
        }
        
      },[db,user.email, isComplete,user,setTodolist,])


  // for complete and Incomplete
  const checkComplete=id=>{
    if(isComplete){
      setIsComplete(false)
    }
    console.log(id)
    const dbRef = ref(db);
    get(child(dbRef, `/todos/${user.uid}/${id}/complete`)).then((snapshot)=>{
      if(snapshot.exists){
            const complete = snapshot.val();
            const updates={};
            updates[`/todos/${user.uid}/${id}/complete`]=!complete;
            setIsComplete(true)
            return update(ref(db),updates)
          }})
 }
 const deleteToDo =id=>{
  if(isComplete){
    setIsComplete(false)
  }
  const dbRef = ref(db);
    get(child(dbRef,`todos/${user.uid}/`)).then((snapshot)=>{
      if(snapshot.exists()){
        
        const deletes={};
        deletes[`/todos/${user.uid}/${id}`]=null; 

        setIsComplete(true)
        return update(ref(db), deletes);
      }
      
    })
  
}
    const handleSearch=e=>{
      const searchText=e.target.value
      const searchTodos = todoList.filter(todo=>todo.name.toLowerCase().includes(searchText.toLowerCase()))
      setDisplay(searchTodos)
     
    }
    return (
        <Box>
          <Box>
            <input className='search' type="text" onChange={handleSearch} placeholder='Search Your Task'/>
          </Box>
          <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell></TableCell>
            <TableCell>Number</TableCell>
            <TableCell >Task</TableCell>
            <TableCell align="right">Date</TableCell>
            <TableCell align="right">update</TableCell>
           
              <TableCell align="right">Delete</TableCell>
            
            <TableCell align="right">Status</TableCell>
            <TableCell align="right">Remaining Day</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {display?.map((data,index)=>(
              <List
              key={data.id}
              data={data}
              index={index+1}
              id={index}
              checkComplete={checkComplete}
              handleCheckBoxChange={handleCheckBoxChange}
              deleteToDo={deleteToDo}
              ></List>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
            <Box sx={{m:4}}>
             
              
               <Button variant='contained' onClick={handleOnclick}>Delete</Button>
            </Box>
        </Box>
    )
}
