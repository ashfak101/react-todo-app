import React, { createContext, useState } from 'react'

export const DataContext = createContext();
export default function ContextProvider(props) {
    const [datas,setDatas]=useState(
        [])
    return (
        <DataContext.Provider value={[datas,setDatas]}>
            {props.children}
        </DataContext.Provider>
    )
}
