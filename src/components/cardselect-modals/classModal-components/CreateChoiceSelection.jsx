import { Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import SelectToggleButton from '../../SelectToggleButton'


const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
  }


export const CreateChoiceSelection = ({choiceObject, choices, setChoices}) => {
    // console.log(choiceObject)
    const [selectedCount, setSelectedCount] = useState(0);


    return (
        <Box>
            <Typography variant="h7" sx={{m:"1em"}}>(Pick {choiceObject?.choose})</Typography>
            <Box sx={rowStyle}>
            {choiceObject?.from.map((arrayStep) => {
                return (
                <SelectToggleButton key={`${arrayStep?.name}+wsxer`} data={arrayStep} selectedCount={selectedCount} setSelectedCount={setSelectedCount} limitCap={choiceObject?.choose} type={choiceObject?.type} choices={choices} setChoices={setChoices}/>
                )
            })}
            </Box>
        </Box>
    )
}
