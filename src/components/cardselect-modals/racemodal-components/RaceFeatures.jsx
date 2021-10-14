import { Button, Divider, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { CreateChoiceSelection } from '../classModal-components/CreateChoiceSelection'
import { CreateStatChoice } from './CreateStatChoice'


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

export const RaceFeatures = ({raceData, choices, setChoices}) => {

    const featDescriptionArray = raceData?.featdesc;
    const abilityBonusArray = raceData?.ability_bonuses;
    const abilityBonusOptions = raceData?.ability_bonus_options;
    const speed = raceData.speed;
    
    const featuresRender = featDescriptionArray?.map((arrayStep) => {
        const featuresText = arrayStep?.desc?.map((innerStep) => {
            return (
                <Typography key={`${innerStep}+wqxer`} variant="h7">{innerStep}</Typography>
            )
        })
        const currentTraitSelectableOptions = arrayStep?.trait_specific?.subtrait_options
        const featureSpecific = <CreateChoiceSelection choiceObject={currentTraitSelectableOptions} choices={choices} setChoices={setChoices}/>
        return (
            <>
            <Typography key={`${arrayStep?.name}+wxxer`} variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {featuresText}
            {featureSpecific}
            </>
        )
    })
    const abilityBonusRender = abilityBonusArray?.map((arrayStep) => {

        return (
            <Button key={`${arrayStep.ability_score.url}qwedc`} variant="contained" color="success" sx={{m:"0.5em"}}>{arrayStep.ability_score.name} + {arrayStep.bonus}</Button>
        )
    });

    const abilityBonusOptionsRender = !!abilityBonusOptions ? <>
    <Typography variant="h6" mt="1em">
        Ability Score bonus options
    </Typography>
    <Typography variant="h7">This race gets an option to choose which stat to increase.</Typography>
    <Divider/>
    <CreateStatChoice choiceObject={abilityBonusOptions} choices={choices} setChoices={setChoices}/>
    </>
    : undefined;
    

    return (
        <Box sx={colStyle}>
            <Typography variant="h6" mt="1em">
                Ability Score Bonuses
            </Typography>
            <Box sx={rowStyle}>
                {abilityBonusRender}
            </Box>
            {abilityBonusOptionsRender}
            <Typography variant="h6" mt="1em">
                Speed
            </Typography>
            <Divider/>
            <Typography variant="h7">
                Your Speed is {speed}.
            </Typography>
            {featuresRender}
        </Box>
    )
}
