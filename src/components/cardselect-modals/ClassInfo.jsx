
import { ModalUnstyled } from '@mui/core'
import { Button, Divider, LinearProgress, Typography } from '@mui/material';
import { styled, Box } from '@mui/system';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import React from 'react'
import { useEffect, useState } from 'react';
import { CreateChoiceSelection } from './classModal-components/CreateChoiceSelection';
import { SubmitDialogBox } from './classModal-components/SubmitDialogBox';
import { ClassFeatures } from './classModal-components/ClassFeatures';
import ClassDescripts from './classModal-components/ClassDescripts';
import { CreateDefaultBtns } from '../CreateDefaultBtns';


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


const url = "https://www.dnd5eapi.co/api";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
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

export default function Classinfo({modalinfo}) {
  
  const [fetchStatus, setFetchStatus] = useState("pending");
  const [modalData, setModalData] = useState("");
  const [tabValue, setTabValue] = useState(0);
  const [choices, setChoices] = useState({})
  const [submitOpen, setSubmitOpen] = useState(false)

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const handleSubmitClick = () => {
    setSubmitOpen(true);
  }

  const handleSubmitClose = () => {
    setSubmitOpen(false);
  }

  useEffect(() => {
    let isSubscribed = true;
    const fetchClassData = async () => {
      try {
        setFetchStatus("pending");
        const response = await fetch(url+`/${modalinfo?.category}/${modalinfo?.type}`)
        const data = await response.json();
        setFetchStatus("complete");
            isSubscribed ? setModalData(data) : console.log("fetch cancelled because of component unmount");
            isSubscribed ? setChoices(x=> x={...x, [modalinfo?.category]:{...data}}) : console.log("fetch cancelled because of component unmount");
            if (response.ok === false) {
            setFetchStatus("error");
            console.log("error situation - response.ok false");
            }
        } catch (error) {
            setFetchStatus("error");
            console.log(error);
        }      
      }
    fetchClassData();
    return () => isSubscribed = false; 
  },[])

  const classDescRender = fetchStatus === "complete" ?
  <>
  <ClassDescripts className={modalinfo.type}/>
  </>
  : <LinearProgress/>

  const classFeatureRender = fetchStatus === "complete" ?
    <ClassFeatures modalData={modalData}/>
  : <LinearProgress/>

  const classOptionRender = fetchStatus === "complete" ?
  <>
    <Typography variant="h6" mt="1em"> Gear Proficiencies</Typography>
    <Divider/>
    <CreateDefaultBtns inputArray={modalData?.proficiencies}/>
      <Typography variant="h6" mt="1em">Proficiency Choices:</Typography>
      <Divider/>
    <Box sx={rowStyle}>
      {modalData?.proficiency_choices?.map((arrayStep, index) => {
        return (
          <CreateChoiceSelection key={`${index}+ygbgh`} choiceObject={arrayStep} choices={choices} setChoices={setChoices}/>
        )
      })}
    </Box>
    <Divider/>
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
        <h1>ClassInfo.jsx</h1> 
      {/* <Box sx={rowStyle}>
        <Button mt="2em" onClick={()=>console.log(modalinfo)}>modalinfo</Button>
        <Button mt="2em" onClick={()=>console.log(modalData)}>data</Button>
        <Button mt="2em" onClick={()=>console.log(choices)}>choices</Button>
      </Box> */}
      <Box sx={{...rowStyle, justifyContent:"space-between"}}>
      <h2 id="unstyled-modal-title">{modalData?.name}</h2>
      <Button onClick={tabValue === 2 ? handleSubmitClick : undefined} variant={tabValue === 2 ? "contained" : "outlined"}>{tabValue === 2 ? "Apply this class!" : "Select your Class Options first!"}</Button>
      </Box>

      {/* //! Tabs */}
      {/* //? Tabs */}
      {/* //* Tabs */}
      
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={tabValue} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Description" {...allyProps(0)} />
            <Tab label="Features" {...allyProps(1)} />
            <Tab label="Class Options" {...allyProps(2)} />
            </Tabs>
        </Box>
        <TabPanel value={tabValue} index={0}>
          {classDescRender}
        </TabPanel>
        <TabPanel value={tabValue} index={1}>
          {classFeatureRender}
        </TabPanel>
        <TabPanel value={tabValue} index={2}>
        {classOptionRender}
        </TabPanel>
      </Box>
      <SubmitDialogBox text="Are you sure you want to submit these Class options?" open={submitOpen} handleClose={handleSubmitClose} choices={choices}/>
    </Box>
    </StyledModal>
  );
}
