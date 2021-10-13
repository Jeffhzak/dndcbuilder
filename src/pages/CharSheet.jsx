import React from 'react'
import { useContext } from 'react'
import { charContext } from './Create'


export default function CharSheet() {

    const charData = useContext(charContext);
    console.log(charData);
    const tempCharTextDump = JSON.stringify(charData?.characterData)
    return (
        <>
            <h1>CharSheet.jsx</h1>
            <h3>{tempCharTextDump}</h3>
        </>
    )
}
