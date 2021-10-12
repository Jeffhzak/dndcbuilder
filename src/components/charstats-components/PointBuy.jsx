import { Button, Typography, Box, Modal } from '@mui/material';
import React from 'react'
import {useContext, useState} from "react"
import { charContext } from '../../pages/Create'
import PointBuyGrid from './PointBuyGrid';
import ConditionalLink from "../ConditionalLink"
import { Link } from 'react-router-dom';

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

export default function PointBuy({stats, setStats, statDescriptions, pbScore, setPbScore}) {

    const {characterData, setCharacterData} = useContext(charContext);


    const statGrid = []; 
    const [open, setOpen] = useState(false);
    const [openComplete, setOpenComplete] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleOpenComplete = () => setOpenComplete(true);
    const handleCloseComplete = () => setOpenComplete(false);

    const handleClick = () => {
        if (pbScore > 0) return handleOpen();
        if (pbScore === 0) return handleOpenComplete();
        console.log("handleclick error with pbScore value");      
        console.log(pbScore);
    }

    const handleSubmit = () => {
        setCharacterData(x => x = {...x, stats:stats})
        alert("submitted!")
    }

    for (const objectStep in stats) {
        //renders grid of stats
        statGrid.push(<PointBuyGrid key={`${objectStep}` + "wasdad"} objectStep={objectStep} statDescriptions={statDescriptions} stats={stats} setStats={setStats} pbScore={pbScore} setPbScore={setPbScore}/>);
    }

    return (
        <>
            <Button onClick={()=>console.log(stats)}>log stats</Button>
            <h3>pointbuy.jsx</h3>
            <Typography variant="h5">Points remaining: {pbScore}</Typography>

            {statGrid}

            <Button onClick={handleClick} variant="contained" sx={{mt: "2em"}}>Submit</Button>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        You still have unspent points! Are you sure you want to submit these stats?
                    </Typography>
                    <Link to="/create">
                    <Button onClick={handleSubmit}>Yes!</Button>
                    </Link>
                    <Button onClick={handleClose}>No, take me back.</Button>
                </Box>
        </Modal>
        <Modal
            open={openComplete}
            onClose={handleCloseComplete}
            aria-labelledby="modal-modal-title2"
            aria-describedby="modal-modal-description2">
                <Box sx={style}>
                    <Typography id="modal-modal-description2" sx={{ mt: 2 }}>
                        Are you sure you want submit these stats?
                    </Typography>

                    <Link to="/create">
                    <Button onClick={handleSubmit}>Yes!</Button>
                    </Link>
                    <Button onClick={handleCloseComplete}>No, take me back.</Button>
                </Box>
        </Modal>
        </>
    )
}
