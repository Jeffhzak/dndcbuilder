import React from 'react'
import { useState, useEffect } from 'react';
import { ModalUnstyled } from '@mui/core';
import { styled, Box } from '@mui/system';
import { Button, CircularProgress, LinearProgress, Tab, Tabs, Typography } from '@mui/material';
import { RaceDescripts } from './racemodal-components/RaceDescripts';
import { RaceFeatures } from './racemodal-components/RaceFeatures';
import { RaceOptions } from './racemodal-components/RaceOptions';
import { RaceSubmitBox } from './racemodal-components/RaceSubmitBox';


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
};

const rowStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  m: 1,
}

const url = "https://www.dnd5eapi.co";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function allyProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function RaceInfo({modalinfo}) {

  const [tabValue, setTabValue] = useState(0);
  const [fetchStatus, setFetchStatus] = useState("");
  const [choices, setChoices] = useState({})
  const [raceData, setRaceData] = useState({})
  const [submitOpen, setSubmitOpen] = useState(false);

    useEffect(() => {
        let isSubscribed = true;
        const fetchRaceData = async () => {
        try {
            setFetchStatus("pending");
            const response = await fetch(url+`/api/${modalinfo?.category}/${modalinfo.type}`)
            const data = await response.json();
            const features = [];
            
            for (const arrayStep of data.traits) {
                const response = await fetch(url+`${arrayStep.url}`)
                const data = await response.json();
                features.push(data);
            }
            const newRaceData = {...data, featdesc:features}
            isSubscribed ? setRaceData(newRaceData) : console.log("fetch cancelled because of component unmount");
            isSubscribed ? setChoices(x=> x={...x, [modalinfo?.category]:{...data}, racefeatdesc:features}) : console.log("fetch cancelled because of component unmount");
            setFetchStatus("complete");
            if (response.ok === false) {
            setFetchStatus("error");
            console.log("error situation - response.ok false");
            }
            } catch (error) {
                setFetchStatus("error");
                console.log(error);
            }      
        }
        fetchRaceData();
        return () => isSubscribed = false;
    }, [])

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSubmit = () => {
    setSubmitOpen(true);

  }

  const handleSubmitClose = () => {
    setSubmitOpen(false);
  }

  const raceName = fetchStatus === "complete" ?
  <h2 id="unstyled-modal-title">{raceData?.name}</h2>
  : <CircularProgress/>

  const raceDescRender = fetchStatus === "complete" ?
  <>
  <RaceDescripts raceData={raceData} choices={choices} setChoices={setChoices}/>
  </>

  : <LinearProgress/>

  const raceFeaturesRender = fetchStatus === "complete" ?
  <>
  <RaceFeatures raceData={raceData} choices={choices} setChoices={setChoices}/>
  </>

  : <LinearProgress/>

  const raceOptionsRender = fetchStatus === "complete" ?
  <>
  <RaceOptions raceData={raceData} choices={choices} setChoices={setChoices}/>
  </>
  : <LinearProgress/>

  return (
      <StyledModal
      aria-labelledby="unstyled-modal-title"
      aria-describedby="unstyled-modal-description"
      open={modalinfo?.open}
      onClose={modalinfo?.closeFn}
      BackdropComponent={Backdrop}
    >
      <Box sx={style}>
        {/* <h1 id="unstyled-modal-title">RaceInfo.jsx</h1>
        <Box sx={rowStyle}>
        <Button mt="2em" onClick={()=>console.log(modalinfo)}>modalinfo</Button>
        <Button mt="2em" onClick={()=>console.log(raceData)}>data</Button>
        <Button mt="2em" onClick={()=>console.log(choices)}>choices</Button>
        </Box> */}
        <Box sx={{...rowStyle, justifyContent:"space-between"}}>
          {raceName}
          <Button variant="contained" onClick={handleSubmit}>Choose this Race</Button>
        </Box>
        
        {/* //! Tabs */}
        {/* //? Tabs */}
        {/* //* Tabs */}
        
        <Box sx={{ width: '100%' }}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
              <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
              <Tab label="Description" {...allyProps(0)} />
              <Tab label="Features" {...allyProps(1)} />
              <Tab label="Race Options" {...allyProps(2)} />
              </Tabs>
          </Box>
          <TabPanel value={tabValue} index={0}>
            {raceDescRender}
          </TabPanel>
          <TabPanel value={tabValue} index={1}>
            {raceFeaturesRender}
          </TabPanel>
          <TabPanel value={tabValue} index={2}>
            {raceOptionsRender}
          </TabPanel>
        </Box>
        <RaceSubmitBox text="Have you completed your options selections?" open={submitOpen} handleClose={handleSubmitClose} choices={choices}/>
      </Box>
    </StyledModal>
  )
}
