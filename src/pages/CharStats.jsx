import React from 'react'
import { useContext } from 'react'
import { charContext } from './Create'

export default function CharStats() {
    const charData = useContext(charContext)
    console.log(charData);
    return (
        <div>
            <h1>CharStats.jsx</h1>
        </div>
    )
}
