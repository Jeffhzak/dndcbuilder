
import { ModalUnstyled } from '@mui/core'
import { Button, Divider, LinearProgress, Typography } from '@mui/material';
import { styled, Box } from '@mui/system';

import React from 'react'
import { useEffect, useState } from 'react';


const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow:scroll;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: "80%",
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
  display: "flex",
  flexDirection: "column",
};

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  m: 1,
}

const boxedContent = {
  border:"1px solid white", 
  margin:"0.5em", 
  padding: "0.2em",
  minWidth: "8em",
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  flexWrap: "wrap",

}

const url = "https://www.dnd5eapi.co/api";

export default function Classinfo({modalinfo}) {
  
  const [fetchStatus, setFetchStatus] = useState("pending");
  const [modalData, setModalData] = useState("");

  useEffect(() => {
    let isSubscribed = true;
    const fetchClassData = async () => {
      try {
        setFetchStatus("pending");
        const response = await fetch(url+`/${modalinfo?.category}/${modalinfo?.type}`)
        const data = await response.json();
        setFetchStatus("complete");
            isSubscribed ? setModalData(data) : console.log("fetch cancelled because of component unmount");
            if (response.ok === false) {
            setFetchStatus("error");
            console.log("error situation - response.ok false");
            }
        } catch (error) {
            setFetchStatus("error");
            console.log(error);
            history.replace("/");
        }      
      }
    fetchClassData();
    return () => isSubscribed = false; 
  },[])

  const classDataRender = fetchStatus === "complete" ?
  <>
    <h2 id="unstyled-modal-title">{modalData?.name}</h2>
    <Box sx={rowStyle}> 
    <Button mt="2em" onClick={()=>console.log(modalinfo)}>modalinfo</Button>
    <Button mt="2em" onClick={()=>console.log(modalData)}>data</Button>
    </Box>
    <Typography variant="h6" mt="1em">Hit Points (HP)</Typography>
    <Divider/>
    <Typography variant="h7">Hit Dice: 1d{modalData?.hit_die}</Typography>
    <Typography variant="h7">Hit Points at 1st Level: {modalData?.hit_die} + your Constitution modifier
    </Typography>
    <Typography variant="h7">Hit Points at Higher Levels: 1d{modalData?.hit_die} (or {Math.round(modalData?.hit_die / 2 + 0.5)}) + your Constitution modifier per {modalData?.name} level after 1st</Typography>
    <Typography variant="h6" mt="1em"> Gear Proficiencies</Typography>
    <Divider/>
    <Box sx={rowStyle}>
      {modalData?.proficiencies?.map((arrayStep) => {
        return (
        <Typography sx={boxedContent} variant="h7">{arrayStep?.name}</Typography>
        )
      })}
    </Box>
    <Box sx={rowStyle}>
      <Typography variant="h6">Skill Proficiencies</Typography>
      <Typography variant="h7" ml="1em" mt="0.3em">(Pick {modalData?.proficiency_choices?.[0]?.choose})</Typography>
    </Box>
    <Divider/>
    <Box sx={rowStyle}>
      {modalData?.proficiency_choices?.[0]?.from.map((arrayStep) => {
        return (
          <Button key={`${arrayStep?.name}+wsxer`} variant="outlined" color="primary" sx={{m:"0.5em", backgroundColor: "#065535"}}>{arrayStep?.name}</Button>
        )
      })}
    </Box>

    <Typography variant="h7"></Typography>
    <p id="unstyled-modal-description">Aliquid amet deserunt earum!</p>
  </>
  : <LinearProgress/>

  return (
    <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={modalinfo?.open}
      onClose={modalinfo?.closeFn}
      BackdropComponent={Backdrop}>

    <Box sx={style}>
        {classDataRender}
        </Box>
    </StyledModal>
  );
}
