import { Typography } from '@mui/material';
import React from 'react'
import { CreateDefaultBtns } from '../CreateDefaultBtns';

export const FancyProficienciesDisplay = ({allProficiencies}) => {
    
    const equipmentProfs = allProficiencies?.equipment;
    
    const skillProfs = allProficiencies?.others?.filter((arrayStep) => {
        if (arrayStep?.name?.includes("Skill: ")) return true;
        else return false;
    });
    // console.log("skillProfs",skillProfs)
    
    const otherProfs = allProficiencies?.others?.filter((arrayStep) => {
        if (!arrayStep?.name?.includes("Skill: ")) return true;
        else return false;
    });
    // console.log("otherProfs", otherProfs);

    const equipmentProfsRender = !!equipmentProfs ? <>
    <Typography variant="h7">Equipment</Typography>
    <CreateDefaultBtns inputArray={equipmentProfs}/>
    </> : undefined;

    const skillProfsRender = !!skillProfs ? <>
    <Typography variant="h7">Skills</Typography>
    <CreateDefaultBtns inputArray={skillProfs}/>
    </> : undefined;

    const otherProfsRender = !!otherProfs ? <>
    <Typography variant="h7">Tools</Typography>
    <CreateDefaultBtns inputArray={otherProfs}/>
    </> : undefined;
    return (
        <>
            {equipmentProfsRender}
            {skillProfsRender}
            {otherProfsRender}
        </>
    )
}
