import { Button, Divider, LinearProgress, Typography } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useEffect, useState} from 'react'

const colStyle = {
    display:"flex",
    flexDirection:"column",
    justifyContent:"space-around"
}
const url = "https://www.dnd5eapi.co"

export const ClassFeatures = ({modalData}) => {
    
    const [levelData, setLevelData] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("");

    useEffect(() => {
        let isSubscribed = true;
        const fetchLevelData = async () => {
        try {
            setFetchStatus("pending");
            const response = await fetch(url+`${modalData?.class_levels}/1`)
            const data = await response.json();
            const features = [];
            
            for (const arrayStep of data.features) {
                const response = await fetch(url+`${arrayStep.url}`)
                const data = await response.json();
                features.push(data);
            }
            isSubscribed ? setLevelData(features) : console.log("fetch cancelled because of component unmount");
            setFetchStatus("complete");
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
        fetchLevelData();
        return () => isSubscribed = false;
    }, [])
    //!
    const featureData = levelData?.map((arrayStep) => {
        const description = arrayStep.desc.map((arrayStep) => {
            return (
                <Typography variant="h7">{arrayStep}</Typography>
            )
        })
        return (
            <>
            <Typography variant="h6" mt="1em">{arrayStep?.name}</Typography>
            <Divider/>
            {description}
            </>
        )
    })

    const classFeaturesRender = fetchStatus === "complete" ?
    <Box style={colStyle}>
        {/* <Button onClick={()=>{console.log(levelData)}}>levelData</Button> */}
        <Typography variant="h5" mt="1em">Features at Level 1:</Typography>
        <Typography variant="h6" mt="1em">Hit Points (HP)</Typography>
        <Divider/>
        <Typography variant="h7">Hit Dice: 1d{modalData?.hit_die}</Typography>
        <Typography variant="h7">Hit Points at 1st Level: {modalData?.hit_die} + your Constitution modifier
        </Typography>
        <Typography variant="h7">Hit Points at Higher Levels: 1d{modalData?.hit_die} (or {Math.round(modalData?.hit_die / 2 + 0.5)}) + your Constitution modifier per {modalData?.name} level after 1st
        </Typography>
        {featureData}
    </Box>
    : <LinearProgress/>

    return (
        <>
        {classFeaturesRender}
        </>
    )
}
