import { Box, Button, TextField } from '@mui/material';
import React, { useState } from 'react';
import useAuth from '../components/Hooks/useAuth'
export default function Login() {
        const [loginUser,setLoginUser]=useState()
        const  [toggle,setToggle]=useState(false)
        const { user,registerWithEmailPass,loginWithEmail} = useAuth()

        const toggleUser=e=>{
            setToggle(e.target.checked)
        }
        const handleOnBlur=e=>{
            const value=e.target.value;
            const field=e.target.name;
            const newData={...loginUser};
            newData[field]=value;
            setLoginUser(newData)
            console.log(loginUser);
        }
        const handleSubmit=e=>{
            e.preventDefault()
            
            if(!toggle){
                loginWithEmail(loginUser.email,loginUser.password)
            }
            else{
                registerWithEmailPass(loginUser.email,loginUser.password,loginUser.name)
            }
        }

  return <>
  
    <Box>
            <form onSubmit={handleSubmit}>
            {
                toggle && <TextField
                id="outlined-name"
                type='text'
                label="Name"
                name='name'
                 onChange={handleOnBlur}
             />
            }
            <TextField
                id="outlined-name"
                type='email'
                label="Email"
                name='email'
                 onChange={handleOnBlur}
             />
            <TextField
                id="outlined-name"
                type='password'
                label="Password"
                name='password'
                onChange={handleOnBlur}
             />
             <Button type='submit' >{toggle ? 'Register':'Login'}</Button>
            </form>

            <Box sx={{m:4}}>
                <input onChange={toggleUser} type='checkbox'/>
                <label >New User ?</label>
                {user.email && <span>Hello</span>}
            </Box>
    </Box>
  
  
  
  
  
  
  </>;
}
