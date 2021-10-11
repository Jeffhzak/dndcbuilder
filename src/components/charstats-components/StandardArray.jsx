import { Button, FormControl, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import {useEffect, useState} from "react"


export default function StandardArray({stats, setStats, statDescriptions, standardArray, setStandardArray}) {
    
    const handleChange = (currStat) => (event) => {
        const newValue = event.target.value;
        setStats({...stats, [currStat]:newValue})
        const standardArrayModified = standardArray.filter(x => x === newValue ? false : true)
        // console.log(standardArrayModified)
        setStandardArray(standardArrayModified);
        console.log(event);
        
    }
    
    const statGrid = []; 
    
    for (const objectStep in stats) {
        
        //creates drop down menu options
            const selectValues = standardArray.map((item) => {
            return (
                <MenuItem value={item} key={`${item}`+"weqeqwr"}>{item}</MenuItem>
            )
        })
    
        //renders grid of stats
        statGrid.push(
            <Grid container spacing={2} alignItems="center" >
                <Grid item xs={2}>
                    <Typography variant="h5" >{statDescriptions[objectStep].name} </Typography>
                </Grid>
                <Grid item xs={1}>
                    <Typography variant="h5" >: </Typography>
                </Grid>
                <Grid item xs={2}>
                    <Typography variant="h5">{stats[objectStep]}</Typography>
                </Grid>
                <Grid item xs={6}>
                    <FormControl sx={{minWidth: "10em"}}>
                        <InputLabel>Choose One</InputLabel>
                        <Select onChange={handleChange(objectStep)} label={objectStep} value="">
                            {selectValues}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={1}>
                    <Button>X</Button>
                </Grid>
            </Grid>
        )
    }


    return (
        <>
            <h3>StandardArray.jsx</h3>
            {statGrid}
        </>
    )
}
