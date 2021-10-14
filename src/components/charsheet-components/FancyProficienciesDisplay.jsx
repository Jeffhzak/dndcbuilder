import { Typography } from '@mui/material';
import React from 'react'
import { CreateDefaultBtns } from '../CreateDefaultBtns';

export const FancyProficienciesDisplay = ({allProficiencies, savingProficiencies}) => {
    
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
    const equipmentProfsRender = equipmentProfs?.length != 0 ? <>
    <Typography variant="h7">Equipment</Typography>
    <CreateDefaultBtns inputArray={equipmentProfs}/>
    </> : undefined;

    const skillProfsRender = skillProfs?.length != 0 ? <>
    <Typography variant="h7">Skills</Typography>
    <CreateDefaultBtns inputArray={skillProfs}/>
    </> : undefined;

    const otherProfsRender = otherProfs?.length != 0 ? <>
    <Typography variant="h7">Tools</Typography>
    <CreateDefaultBtns inputArray={otherProfs}/>
    </> : undefined;

    const savingProfsRender = savingProficiencies?.length != 0 && !!savingProficiencies ? <>
    <Typography variant="h7">Saving Throws</Typography>
    <CreateDefaultBtns inputArray={savingProficiencies}/>
    </> : undefined;
    return (
        <>
            {savingProfsRender}
            {equipmentProfsRender}
            {skillProfsRender}
            {otherProfsRender}
        </>
    )
}
