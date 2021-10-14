import { Button, Modal, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import {useContext} from "react"
import { Link } from 'react-router-dom'
import { charContext } from '../../../pages/Create'

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };

export const RaceSubmitBox = ({text, open, handleClose, choices}) => {

    const {characterData, setCharacterData} = useContext(charContext);

    const handleSubmit = () => {
        //* does it exist in choices? if not don't even define it.
        const newEquipmentProfs = !!choices.races.starting_proficiencies ? choices?.races?.starting_proficiencies : undefined;
        
        const existingEquipmentProfs = characterData?.proficiencies?.equipment;
        
        //* was newEquipmentProfs defined? if it wasn't, just preserve old equipmentProfs and don't interact with newEquipmentProfs.
        const combinedEquipmentProfs = !!newEquipmentProfs ? [...existingEquipmentProfs, ...newEquipmentProfs] 
        : [...existingEquipmentProfs]
        
        //* does it exist in choices? if not don't even define it.
        const newOtherProfs = !!choices?.proficiencies ?
        choices?.proficiencies
        : undefined;
        
        const existingOtherProfs = characterData?.proficiencies?.others

        //* was newOtherProfs defined? if it wasn't, just preserve old equipmentProfs and don't interact with newEquipmentProfs.
        const combinedOtherProfs = !!newOtherProfs ? [...existingOtherProfs, ...newOtherProfs] : [...existingOtherProfs]
        
        const combinedProfs = {equipment:combinedEquipmentProfs, others:combinedOtherProfs} 
        
        const newIncomingData = {...choices, proficiencies:combinedProfs}

        const newCharacterData = {...characterData, ...newIncomingData}
        
        setCharacterData(newCharacterData);
        alert("submitted!")
    }
    
    return (
        <>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        {text}
                    </Typography>
                    <Link to="/create">
                    <Button onClick={handleSubmit}>Yes!</Button>
                    </Link>
                    <Button onClick={handleClose}>No, take me back.</Button>
                    <Button variant="contained" onClick={()=>{
                        console.log("choices", choices);
                        console.log("characterData", characterData);
                        }}>log choices</Button>
                </Box>
            </Modal>            
        </>
    )
}
