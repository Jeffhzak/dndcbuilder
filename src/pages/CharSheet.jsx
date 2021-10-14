import { Accordion, Button, Divider, TextField, Typography } from '@mui/material';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import React from 'react'
import { useContext, useState } from 'react'
import { charContext } from './Create'
import { FancyStatDisplay } from '../components/charsheet-components/FancyStatDisplay';
import { Box } from '@mui/system';
import { FancyProficienciesDisplay } from '../components/charsheet-components/FancyProficienciesDisplay';

const rowStyle = {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    m: 1,
}

const colStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"
}

export default function CharSheet() {

    const {characterData, setCharacterData} = useContext(charContext);

    const playerName = characterData?.name;
    const playerHPAtLevel1 = characterData?.classes?.hit_die;
    const className = characterData?.classes?.name;
    const raceName = characterData?.races?.name;
    const charStats = characterData?.stats;
    const allProficiencies = characterData?.proficiencies;
    const savingProficiencies = characterData?.classes?.saving_throws;
    const raceStatBonus = !!characterData?.races?.ability_bonuses 
    ? characterData?.races?.ability_bonuses 
    : undefined;

    const extraStatBonus = !!characterData
    ?.ability_bonus ? characterData?.ability_bonus 
    : undefined;

    const [expanded, setExpanded] = useState(false);
    
    
    const tempCharTextDump = JSON.stringify(characterData)

    const handleAccordianChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const handleTextFieldChange = (event) => {
        const updatedName = event.target.value;
        setCharacterData({...characterData, name:updatedName})
    }

    return (
        <>
            <h1>CharSheet.jsx</h1>
            <Typography variant="h4">{playerName}</Typography>
            <Typography variant="h5">Level 1 {raceName} {className}</Typography>
            <Box sx={{...rowStyle, alignItems:"flex-end"}}>
                <Typography variant="h7">HP at Level 1:</Typography>
                <Divider sx={{m:"0 1em 0 1em"}} orientation="vertical"/>
                <Typography sx={{color:"lightgreen"}} variant="h5">{playerHPAtLevel1}</Typography>
                <Divider sx={{m:"0 1em 0 1em"}} orientation="vertical"/>
                <Typography variant="h7">+ your CON modifier</Typography>
            </Box>
            <Accordion sx={{ width: '25em', mt:"1em", mb:"1em"}} expanded={expanded === 'panel1'} onChange={handleAccordianChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography variant="h5" sx={{ width: '100%', flexShrink: 0 }}>
                Edit Name
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <TextField
                    id="outlined-name"
                    label="Name"
                    value={playerName}
                    onChange={handleTextFieldChange}
                    />
                </AccordionDetails>
            </Accordion>
            <Divider/>
            <div>
            <Button sx={{m:"1em"}} variant="outlined">Stats gained from Racial Bonuses</Button>
            </div>
            <Box sx={rowStyle}>
                <FancyStatDisplay charStats={charStats} raceStatBonus={raceStatBonus} extraStatBonus={extraStatBonus}/>
            </Box>
            <Divider/>
            <Box sx={{m:"1em"}}>
                <Typography variant="h5">Proficiencies</Typography>
                <FancyProficienciesDisplay allProficiencies={allProficiencies} savingProficiencies={savingProficiencies}/>
            </Box>
            <Divider/>
            <Box sx={{m:"1em"}}>
                <Typography variant="h5">Features</Typography>
            </Box>
            {/* <h3>{tempCharTextDump}</h3> */}
        </>
    )
}
