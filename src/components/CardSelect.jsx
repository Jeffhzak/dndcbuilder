import { Card, CardContent, CardMedia, CircularProgress, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import BackgroundInfo from './modals/BackgroundInfo';
import ClassInfo from './modals/ClassInfo';
import RaceInfo from './modals/RaceInfo';




export default function CardSelect() {
    const {apisearch} = useParams();
    const history = useHistory();
    // console.log("apisearch", apisearch)


    const [cardArray, setCardArray] = useState([]);
    const [openModal, setOpenModal] = useState({
        open: false,
        category: "",
        type: "",
    });
    // const [cardArrayRender, setCardArrayRender] = useState([]);
    const [fetchStatus, setFetchStatus] = useState("");
    const url="https://www.dnd5eapi.co/api/"
    
    useEffect(() => {
        
        let isSubscribed = true;
        const fetchClasses = async () => {
            try {
                // setFetchStatus("pending");
                const response = await fetch(url+`${apisearch}`)
                const data = await response.json();
                setFetchStatus("complete");
                    isSubscribed ? setCardArray(data?.results) : console.log("fetch cancelled because of component unmount");
                    if (response.ok === false) {
                    setFetchStatus("error");
                    console.log("error situation");
                    history.replace("/");
                    }
                } catch (error) {
                    setFetchStatus("error");
                    console.log("error situation");
                    history.replace("/");
                }
            }
            
        fetchClasses();
        return () => isSubscribed = false;
    }, [apisearch]);
    
    // console.log("cardArray", cardArray);
    
    const generateModal = (category, type) => () => {
        console.log("generateModal fired.", category, type)
        const modalStatus = {
            open: true,
            category: category,
            type: type,
            closeFn: () => {
                setOpenModal({open:false})
            }
        } 
        setOpenModal(modalStatus)
        
    }

    const closeModal = () => {
        const modalStatus = {
            ...openModal,
            open: false,
        }
        setOpenModal(modalStatus);
    }


    const cardArrayRender = cardArray?.map((item, index) => {
        return (
            <Card onClick={generateModal(`${apisearch}`,`${item?.index}`)} key={`${item?.index}`} sx={{maxHeight: "10em"}}>
                <CardMedia component="img" height="100px" image={`https://randompicturegenerator.com/img/dragon-generator/g959999aceed1fc4b69c894f65f872bb6a31976a12a4e759b944ac30e5a1309ad0e2195559f7285e2562894daa076ee0a_640.jpg`} alt={`${item?.index}`} />
                <CardContent>
                    <Typography sx={{textAlign:"center"}}>{`${item?.name}`}</Typography>
                </CardContent>
            </Card>
        )
    })


    // console.log(cardArrayRender);

    return (
        <>
        {openModal.category === "classes" && (<ClassInfo modalinfo={openModal}/>)}
        {openModal.category === "backgrounds" && (<BackgroundInfo modalinfo={openModal}/>)}
        {openModal.category === "races" && (<RaceInfo modalinfo={openModal}/>)}
        <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"center", gap:"2em 2em"}}>
            {fetchStatus === "complete" ? cardArrayRender : <CircularProgress /> }
        
            <p>CardSelect.jsx</p>
        </Box>
        </>
    )
}
