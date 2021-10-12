import React from 'react'
import HelpIcon from '@mui/icons-material/Help';
import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';


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

export default function StatDesc({stat, statDesc}) {
    console.log("stat from statDesc:", stat)
    console.log("statDesc from statDesc:", statDesc[stat])

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const statExplanation = statDesc[stat]?.desc.map((arrayStep, index) => {
        return <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {arrayStep}
        </Typography>
    })

    const assocSkills = statDesc[stat]?.skills.length > 0 ?
    statDesc[stat]?.skills.map((arrayStep, index) => {
        return <li>{arrayStep.name}</li>
    })
    : <li>None</li>

    return (
        <>
           <HelpIcon onClick={handleOpen}/>
           <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
            <Box sx={style}>
                <Typography id="modal-modal-title" variant="h6" component="h2">
                    {statDesc[stat]?.full_name}
                </Typography>
                {statExplanation}
                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                Skills associated with {statDesc[stat]?.full_name}:
                </Typography>
                {assocSkills}
            </Box>
        </Modal>
           
        </>
    )
}
