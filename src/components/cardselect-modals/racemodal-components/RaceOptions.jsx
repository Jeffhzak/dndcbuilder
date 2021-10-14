import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { CreateDefaultBtns } from '../../CreateDefaultBtns'
import { CreateChoiceSelection } from '../classModal-components/CreateChoiceSelection'


const colStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"
}
const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
  }

export const RaceOptions = ({raceData, choices, setChoices}) => {

    const starting_prof_array = raceData?.starting_proficiencies;
    const starting_proficiency_options = raceData?.starting_proficiency_options;

    const gearProfs = starting_prof_array?.length != 0 ? <CreateDefaultBtns inputArray={starting_prof_array}/>
    : undefined;

    const profOptions = !!starting_proficiency_options ? <CreateChoiceSelection choiceObject={starting_proficiency_options} choices={choices} setChoices={setChoices}/> : undefined;
    
    return (
        <Box sx={colStyle}>
            <Typography variant="h6" mt="1em">Gear Proficiencies: </Typography>
            <Divider/>
            {!!gearProfs ? gearProfs : "None"}  
            <Typography variant="h6" mt="1em">Proficiency Options: </Typography>
            <Divider/>
            <Box sx={rowStyle}>
                {!!profOptions ? profOptions : "None"}    
            </Box>
        </Box>
    )
}
