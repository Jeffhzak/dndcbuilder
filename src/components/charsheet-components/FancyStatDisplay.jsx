import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'

const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
}

const colStyle = {
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    padding: "1em"
}
const colBorderStyle = {
    display:"flex",
    flexDirection:"column",
    alignItems: "center",
    border: "1px solid white",
    padding: "1em"
}
const findRaceStat = (statName, raceStatBonus) => {
    if (raceStatBonus === undefined) return 0;
    
    const statFound = raceStatBonus.find((arrayStep) => {
        if (statName === arrayStep.ability_score.index) { return true; 
        } else return false;
    })
    if (!!statFound?.bonus) return statFound.bonus;
    else return 0;
}

const findExtraStat = (statName, extraStatBonus) => {
    if (extraStatBonus === undefined) return 0;

    const statFound = extraStatBonus.find((arrayStep)=> {
        if (statName === arrayStep.info.ability_score.index) {
            return true;
        } else return false;
    })
    if (!!statFound?.info?.bonus) return statFound?.info?.bonus;
    else return 0;
}
export const FancyStatDisplay = ({charStats, raceStatBonus, extraStatBonus}) => {

    const statDisplayArray = [];

    for (const objectStep in charStats) {
        
        const statName = objectStep.toUpperCase();
        const StatBonuses = findRaceStat(objectStep, raceStatBonus) + findExtraStat(objectStep, extraStatBonus);
        const statValue = charStats[objectStep] + StatBonuses;
        const statModifier = Math.round((statValue - 10.1) / 2);
        const displayStatModifier = statModifier < 0 ?
        statModifier : "+"+statModifier;

        statDisplayArray.push(

        <Box sx={colStyle}>
                <Typography variant="h6">
                    {statName}
                </Typography>
            <Box sx={colBorderStyle}>
                <Button variant="outlined" color="success">
                    <Typography variant="h5">
                    {displayStatModifier}
                    </Typography>
                </Button>
                <Typography variant="h7" sx={{mt:"0.5em"}}>
                    {statValue}
                </Typography>
            </Box>
            {StatBonuses > 0 ? <Button variant="outlined" sx={{mt:"0.5em"}}>+{StatBonuses}</Button> : undefined}
        </Box>
        )
    }
    return (
        <>
        {statDisplayArray}
        </>
    )
}
