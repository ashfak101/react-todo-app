import React, { createContext, useState } from 'react'

export const DataContext = createContext();
export default function ContextProvider(props) {
    const [todoList,setTodolist]=useState(
        {})
    return (
        <DataContext.Provider value={[todoList,setTodolist]}>
            {props.children}
        </DataContext.Provider>
    )
}
