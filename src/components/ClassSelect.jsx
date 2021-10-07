import { Card, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState, useEffect } from 'react';



export default function ClassSelect() {

    const [classArray, setClassArray] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("");
    
    useEffect(() => {
        const url="https://www.dnd5eapi.co/api/"
        
        let isSubscribed = true;
        const fetchClasses = async () => {
            setFetchStatus("pending");
            const response = await fetch(url+"classes")
            const data = await response.json();
            setFetchStatus("complete");
            isSubscribed ? setClassArray(data?.results) : console.log("fetch cancelled because of component unmount");;
        }
        fetchClasses();
        return () => isSubscribed = false;
    }, []);
    
    console.log("classArray", classArray);

    const classArrayRender = classArray.map((item, index) => {
        return (
            <Card key={`${item.index}`} sxs={{maxHeight: "50px"}}>
                <CardMedia component="img" height="100px" image={`https://randompicturegenerator.com/img/dragon-generator/g959999aceed1fc4b69c894f65f872bb6a31976a12a4e759b944ac30e5a1309ad0e2195559f7285e2562894daa076ee0a_640.jpg`} alt={`${item?.index}`} />
                <CardContent>
                    <Typography sx={{textAlign:"center"}}>{`${item?.name}`}</Typography>
                </CardContent>
            </Card>
        )
    })
    console.log(classArrayRender);
    return (
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:"2em 2em"}}>
            {fetchStatus === "complete" ? classArrayRender : <CircularProgress />}
            <p>ClassSelect.jsx</p>
        </Box>
    )
}
