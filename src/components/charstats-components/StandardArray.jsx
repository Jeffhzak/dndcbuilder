import { Button, FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, Typography } from '@mui/material'
import React from 'react'
import {useEffect, useState, useContext} from "react"
import ConditionalLink from "../ConditionalLink"
import { charContext } from '../../pages/Create'
import StatDesc from './StatDesc';


export default function StandardArray({stats, setStats, statDescriptions, standardArray, setStandardArray}) {

    const {characterData, setCharacterData} = useContext(charContext)
    
    const handleChange = (currStat) => (event) => {
        const newValue = event.target.value;
        setStats(x => x = {...stats, [currStat]:newValue})
        const standardArrayModified = standardArray.filter(x => x === newValue ? false : true)
        // console.log(standardArrayModified)
        setStandardArray(standardArrayModified);
        // console.log(stats)
        
    }
    
    const handleCancel = (currStat) => () => {
        if(stats[currStat] > 0) {
            const newSA = [...standardArray, stats[currStat]];
            const sortedNewSA = newSA.sort((a, b) => b-a);
            setStandardArray(sortedNewSA);
            setStats(x => x = {...stats, [currStat]:0})
        }
    }

    const handleSubmit = () => {
        if (standardArray.length > 0) return alert("You haven't filled out your stats!")
        setCharacterData(x => x = {...x, stats:stats})
        console.log(characterData);
        alert("submitted!")
    }

    const statGrid = []; 
    
    //creates drop down menu options
        const selectValues = standardArray.map((item) => {
        return (
            <MenuItem value={item} key={`${item}`+"weqeqwr"}>{item}</MenuItem>
        )
    })

    for (const objectStep in stats) {
        
    
        //renders grid of stats
        statGrid.push(
            <Grid container spacing={1} alignItems="center" key={`${objectStep+"wewewe"}`} mt="1em">
                <Grid item xs={2} s={2} md={1} lg={1}>
                    <StatDesc stat={objectStep} statDesc={statDescriptions}/>
                </Grid>
                <Grid item xs={2} s={2} md={2} lg={1}>
                    <Typography variant="h5" >{statDescriptions[objectStep].name} </Typography>
                </Grid>
                <Grid item xs={2} s={2} md={1}>
                    <Typography variant="h5" >: </Typography>
                </Grid>
                <Grid item xs={2} s={2} md={1}>
                    <Typography variant="h5">{stats[objectStep]}</Typography>
                </Grid>
                <Grid item xs={2} s={2} md={2}>
                    <Button onClick={handleCancel(objectStep)}>X</Button>
                </Grid>
                <Grid item xs={12} s={12} md={1}>
                    <FormControl sx={{minWidth: "10em"}}>
                        <InputLabel>{objectStep}</InputLabel>
                        <Select disabled={stats[objectStep] > 0 ? true : false} key={objectStep} onChange={handleChange(objectStep)} label={objectStep} id={"id"+objectStep} value="" sx={stats[objectStep] > 0 ? {border: '1px solid #5ac18e'} : {}}> 
                            {selectValues}
                        </Select>
                        <FormHelperText>Choose One</FormHelperText>
                    </FormControl>
                </Grid>
            </Grid>
        )
    }


    return (
        <>
            <h3>StandardArray.jsx</h3>
            {statGrid}
            <ConditionalLink to="/create" condition={standardArray.length === 0}>
            <Button onClick={handleSubmit} variant="contained" sx={{mt: "2em"}}>Submit</Button>
            <Button onClick={()=>{console.log(statDescriptions)}}>consolelog statdesc</Button>
            </ConditionalLink>
        </>
    )
}
