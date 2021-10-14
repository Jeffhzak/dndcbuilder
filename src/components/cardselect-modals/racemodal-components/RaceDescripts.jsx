import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'


const colStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"
}

export const RaceDescripts = ({raceData}) => {
    return (
        <Box sx={colStyle}>
            <Typography variant="h6" mt="1em">Size: {raceData?.size}</Typography>
            <Divider/>
            <Typography variant="h7">{raceData?.size_description}</Typography>
            <Typography variant="h6" mt="1em">Age</Typography>
            <Divider/>
            <Typography variant="h7">{raceData?.age}</Typography>
            <Typography variant="h6" mt="1em">Alignment</Typography>
            <Divider/>
            <Typography variant="h7">{raceData?.alignment}</Typography>
            <Typography variant="h6" mt="1em">Languages</Typography>
            <Divider/>
            <Typography variant="h7">{raceData?.language_desc}</Typography>
        </Box>
    )
}
