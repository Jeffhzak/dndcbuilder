import { Divider, Typography } from '@mui/material'
import React from 'react'

export const FancyFeaturesDisplay = ({classFeatDescArray, raceFeatDescArray}) => {
    
    const classFeatures = classFeatDescArray?.map((arrayStep) => {
        const featuresText = arrayStep?.desc?.map((innerStep) => {
            return (
                <Typography key={`${innerStep}+wqxer`} variant="h7">{innerStep}</Typography>
            )
        })
        
        return (
            <>
            <Typography key={`${arrayStep?.name}+wxxer`} variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {featuresText}
            </>
        )
    })

    const raceFeatures = raceFeatDescArray?.map((arrayStep) => {
        const featuresText = arrayStep?.desc?.map((innerStep) => {
            return (
                <Typography key={`${innerStep}+wqxer`} variant="h7">{innerStep}</Typography>
            )
        })
        
        return (
            <>
            <Typography key={`${arrayStep?.name}+wxxer`} variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {featuresText}
            </>
        )
    })

    const classFeaturesRender = <>
    
    </>

    return (
        <>
           {classFeatures}
           {raceFeatures} 
        </>
    )
}
