import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
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

    const gearProfs = starting_prof_array?.map((arrayStep) => {
        return (
        <Button key={`${arrayStep.name+"yhjkl"}`} color="success" variant="contained" sx={{m:"0.5em"}}>{arrayStep?.name}</Button>
        )
    })

    const profOptions = !!starting_proficiency_options ? <CreateChoiceSelection choiceObject={starting_proficiency_options}/> : undefined;
    
    return (
        <Box sx={colStyle}>
            <Typography variant="h6" mt="1em">Gear Proficiencies: </Typography>
            <Divider/>
            <Box sx={rowStyle}>
                {gearProfs === [] ? gearProfs : "None"}    
            </Box>
            <Typography variant="h6" mt="1em">Proficiency Options: </Typography>
            <Box sx={rowStyle}>
                {!!profOptions ? profOptions : "None"}    
            </Box>
        </Box>
    )
}
