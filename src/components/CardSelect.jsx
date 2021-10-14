import { Card, CardContent, CardMedia, CircularProgress, Modal, Typography } from '@mui/material';
import { Box } from '@mui/system';
import React from 'react'
import { useState, useEffect } from 'react';
import { useParams, useHistory } from 'react-router';
import ModalForm from './cardselect-modals/ModalForm';

import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';




export default function CardSelect() {
    const {apisearch} = useParams();
    const history = useHistory();


    const [cardArray, setCardArray] = useState([]);
    const [openModal, setOpenModal] = useState({
        open: false,
        category: "",
        type: "",
    });
    const [fetchStatus, setFetchStatus] = useState("");
    const [expanded, setExpanded] = useState(false);


    const url="https://www.dnd5eapi.co/api/"
    
    useEffect(() => {
        
        let isSubscribed = true;
        const fetchClasses = async () => {
            try {
                setFetchStatus("pending");
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

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
      };
    
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
            <h1>CardSelect.jsx</h1>
            <Accordion sx={{mb:"1em"}} expanded={expanded === 'panel1'} onChange={handleChange('panel1')}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography variant="h5" sx={{ width: '33%', flexShrink: 0 }}>
                {apisearch === "classes" && "Classes"}
                {apisearch === "races" && "Races"}
                {apisearch === "backgrounds" && "Backgrounds"}
                </Typography>
                <Typography variant="h6" sx={{ color: 'text.secondary' }}>Open me to learn more</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    {apisearch === "classes" && (<Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography>
                        Adventurers are extraordinary people, driven by a thirst for excitement into a life that others would never dare lead. They are heroes, compelled to explore the dark places of the world and take on the challenges that lesser women and men can't stand against.
                        </Typography>
                        <br/>
                        <Typography>
                        Class is the primary definition of what your character can do. It's more than a profession; it's your character's calling. Class shapes the way you think about the world and interact with it and your relationship with other people and powers in the multiverse. A fighter, for example, might view the world in pragmatic terms of strategy and maneuvering, and see herself as just a pawn in a much larger game. A cleric, by contrast, might see himself as a willing servant in a god's unfolding plan or a conflict brewing among various deities. While the fighter has contacts in a mercenary company or army, the cleric might know a number of priests, paladins, and devotees who share his faith.
                        </Typography>
                        <br/>
                        <Typography>
                        Your class gives you a variety of special features, such as a fighter's mastery of weapons and armor, and a wizard's spells. At low levels, your class gives you only two or three features, but as you advance in level you gain more and your existing features often improve.
                        </Typography>
                    </Box>)}
                    {apisearch === "races" && (<Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography>
                        A visit to one of the great cities in the worlds of Dungeons & Dragons—Waterdeep, the Free City of Greyhawk, or even uncanny Sigil, the City of Doors overwhelms the senses. Voices chatter in countless different languages. The smells of cooking in dozens of different cuisines mingle with the odors of crowded streets and poor sanitation. Buildings in myriad architectural styles display the diverse origins of their inhabitants.
                        </Typography>
                        <br/>
                        <Typography>
                        And the people themselves—people of varying size, shape, and color, dressed in a dazzling spectrum of styles and hues—represent many different races, from diminutive halflings and stout dwarves to majestically beautiful elves, mingling among a variety of human ethnicities.
                        </Typography>
                        <br/>
                        <Typography>
                        Scattered among the members of these more common races are the true exotics: a hulking dragonborn here, pushing his way through the crowd, and a sly tiefling there, lurking in the shadows with mischief in her eyes. A group of gnomes laughs as one of them activates a clever wooden toy that moves of its own accord. Half-elves and half-orcs live and work alongside humans, without fully belonging to the races of either of their parents. And there, well out of the sunlight, is a lone drow—a fugitive from the subterranean expanse of the Underdark, trying to make his way in a world that fears his kind. 
                        </Typography>
                    </Box>)}
                    {apisearch === "backgrounds" && (<Box sx={{display: "flex", flexDirection: "column"}}>
                        <Typography>
                        Every story has a beginning. Your character's background reveals where you came from, how you became an adventurer, and your place in the world. Your fighter might have been a courageous knight or a grizzled soldier. Your wizard could have been a sage or an artisan. Your rogue might have gotten by as a guild thief or commanded audiences as a jester.
                        </Typography>
                        <br/>
                        <Typography>
                        Choosing a background provides you with important story cues about your character's identity. The most important question to ask about your background is what changed? Why did you stop doing whatever your background describes and start adventuring? Where did you get the money to purchase your starting gear, or, if you come from a wealthy background, why don't you have more money? How did you learn the skills of your class? What sets you apart from ordinary people who share your background?
                        </Typography>
                    </Box>)}
                </AccordionDetails>
            </Accordion>
            <ModalForm modalinfo={openModal}/>

            <Box sx={{display:"flex", flexDirection:"row", flexWrap:"wrap", justifyContent:"flex-start", gap:"2em 2em"}}>
                {fetchStatus === "complete" ? cardArrayRender : <CircularProgress /> }
            
            </Box>
        </>
    )
}
