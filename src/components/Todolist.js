import React, {useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import useData from './useData';
import List from './List';
import { Box,  } from '@mui/material';
import Button from '@mui/material/Button';


export default function Todolist() {
    const [isClick,setIsClick]=useState(false)
   const [datas,setDatas]= useData();
    const [searchData,setSearchData]= useState(datas)
    const [checkAll,setCheckAll]=useState(false)
  
   console.log(searchData);

   const checkComplete=id=>{
        const newData=[...datas]
        newData.forEach((data,index)=>{
            if(index===id){
                data.complete = !data.complete
            } 
        })
        setDatas(newData);
        setIsClick(true)
   }
   
  
    const handleSearch=e=>{
      const search=e.target.value
      const searchedTodo =datas.filter(data=>data.name.toLowerCase().includes(search.toLowerCase()))
      setSearchData(searchedTodo)
      
    }
   const handleCheckBoxChange=(id)=>{
     const newData = datas.map(data=>{
        if(data.id===id){
         return {...data,complete:!data.complete}
        }
        return data;
     })
     setDatas(newData);
   }
  const  handleAllCheck=()=>{
      const newData = [...datas]
        newData.forEach(data=> 
          {
            data.complete= !checkAll
          }
        )
        setDatas(newData)
        setCheckAll(!checkAll)
  }
      const handleOnclick= ()=>{
        const newData= datas.filter(data=>{
            return data.complete === false 
        })
        setDatas(newData)
        setCheckAll(false)
      }
    return (
        <Box>
          <Box>
            <input className='search' type="text" onChange={handleSearch}/>
            
              
           
          </Box>
          <TableContainer component={Paper} >
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> <Checkbox onClick={handleAllCheck}></Checkbox></TableCell>
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
          {searchData.map((data,index)=>(
              <List
              key={data.id}
              data={data}
              index={index+1}
              id={index}
              checkComplete={checkComplete}
              handleCheckBoxChange={handleCheckBoxChange}
              isClick={isClick}></List>
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
