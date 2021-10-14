import { Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

export default function Landing() {
    return (
        <Box sx={{width:"80%", margin:"auto"}}>
            <Box sx={{mt:"2em", mb:"2em"}}>
            <Typography variant="h3">Welcome to DnDCBuilder!</Typography>
            <Divider sx={{mt:"1em", mb:"1em"}}/>
            <Typography variant="h5">Click on "Create a Character" to get started!</Typography>
            </Box>
        </Box>
    )
}
