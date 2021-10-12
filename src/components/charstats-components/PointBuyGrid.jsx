import React from 'react'
import { useEffect, useState } from 'react';
import {  Button, Grid, Typography } from '@mui/material'
import StatDesc from './StatDesc';
import { Box } from '@mui/system';


export default function PointBuyGrid({objectStep, statDescriptions, stats, setStats, pbScore, setPbScore}) {


    const [currentCost, setCurrentCost] = useState(1);
    
    useEffect(() => {
        setCurrentCost(stats[objectStep] < 13 ? 1 : 2);
    }, [stats[objectStep]])
    

    const pointBuyLogic = (plusOrMinus) => {
        let newValue = 0;

        
        switch (plusOrMinus) {
            case "+":
                setPbScore(x => x - currentCost);
                newValue = stats[objectStep]+1;
                setStats(x => x={...stats, [objectStep]:newValue})
                break;
            case "-":
                setPbScore(x => x + ( stats[objectStep] === 13? 1 : currentCost));
                newValue = stats[objectStep]-1;
             setStats(x => x={...stats, [objectStep]:newValue})
                break;
        
            default:
                console.log("pblogic error")
                break;
        }
    }

    const handlePlus = () => {
        if(stats[objectStep] <15 && pbScore >= currentCost) {
            pointBuyLogic("+")
        }
    }

    const handleMinus = () => {
        if(stats[objectStep] > 8) {
            pointBuyLogic("-")
        }
    }
    return (
        <Grid container spacing={1} alignItems="center" key={`${objectStep+"wewewe"}`} mt="1em">
        <Grid item xs={2} s={2} md={1} lg={1}>
            <StatDesc stat={objectStep} statDesc={statDescriptions}/>
        </Grid>
        <Grid item xs={2} s={2} md={2} lg={1}>
            <Typography variant="h5" >{statDescriptions[objectStep]?.name} </Typography>
        </Grid>
        <Grid item xs={2} s={2} md={1} lg={1}>
            <Typography variant="h5" >: </Typography>
        </Grid>
        <Grid item xs={9} s={9} md={5} lg={4}>
            <Box display="flex" flexDirection="row">
                <Button variant="contained" onClick={handleMinus}>-</Button>
                <Typography variant="h5" margin="0 1em 0 1em">{stats[objectStep]}</Typography>
                <Button variant="contained" onClick={handlePlus}>+</Button>
            </Box>
        </Grid>
        <Grid item xs={3} s={3} md={3} lg={2}>
            <Typography variant="h6" margin="0 1em 0 1em">Cost: {currentCost}</Typography>
        </Grid>
    </Grid>
    )
}
