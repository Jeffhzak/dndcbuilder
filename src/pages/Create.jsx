import { Button, Divider, Link, List, ListItem, ListSubheader } from '@mui/material'
import { Box } from '@mui/system'
import React from 'react'
import { useState, useEffect, useContext } from 'react'
import {Link as RouterLink, Route} from "react-router-dom"
import CardSelect from '../components/CardSelect'

export default function Create() {

    const [characterData, setCharacterData] = useState({
        name: "",
        race: {
            name: "",
            features: [],
        },
        class: {
            name: "",
            features: [],
        },
        hit_die: 0,
        stats: {
            str: 0,
            dex: 0,
            con: 0,
            int: 0,
            wis: 0,
            cha: 0,
        },
        proficiencies: {
            equipment: [],
            skills:[],
            saving_throws:[],
        },
        starting_equipment: [],        
    });

    return (
        <>
            <Box sx={{display:"flex", gap:"0em, 1em"}}>
                <List  sx={{ width: '100%', maxWidth: "15em", bgcolor: '', margin:"3em 0 0 0"}}
                component="nav" subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    You can do these in any order.
                    </ListSubheader>}>

                    <ListItem>
                    <Link component={RouterLink} to="/create/classes" underline="none">Class
                    </Link>
                    </ListItem>

                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="/create/backgrounds" underline="hover">
                        Background
                    </Link>
                    </ListItem>
                    
                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="/create/races" underline="hover">
                        Race
                    </Link>
                    </ListItem>

                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="LOL" underline="always">
                        {'CHA'}
                    </Link>
                    {/* <Button onClick={handleClick}>{"(?)"}</Button>
                    <Popover id={id} open={open} anchorEl={anchorElement} onClose={handleClose} anchorOrigin={{vertical:"bottom", horizontal: "right"}}>
                    <Typography sx={{ p: 2 }}>"Charisma measures your ability to interact effectively with others. It includes such factors as confidence and eloquence, and it can represent a charming or commanding personality."
                    </Typography>
                    <Typography sx={{ p: 2 }}>"A Charisma check might arise when you try to influence or entertain others, when you try to make an impression or tell a convincing lie, or when you are navigating a tricky social situation. The Deception, Intimidation, Performance, and Persuasion skills reflect aptitude in certain kinds of Charisma checks."</Typography>
                    <div style={{width:"100%", display:"flex", flexDirection:"row-reverse", margin: "2px"}}>
                        <Button variant="contained" sx={{margin:"10px"}} onClick={handleClose}>OK</Button> 
                    </div>
                    </Popover> 
                    */}
                    </ListItem>
                    
                    <Divider></Divider>

                    <ListItem>
                        <Button variant="contained"
                        color="primary"
                    component={RouterLink}
                    to="/inner">ButtonTest</Button>
                    </ListItem>

                    <ListItem>
                    TEST
                    </ListItem>
                </List>

                {/*//! After the sidebar*/}
                {/*//* After the sidebar*/}
                {/*//? After the sidebar*/}

                <Box sx={{display:"flex", flexDirection:"column", gap:"0em, 1em", maxWidth:"60%"}}>
                    <h1>Create.jsx</h1>
                    <Route path="/create/:apisearch">
                        <CardSelect/>
                    </Route>
                </Box>
            </Box>
        </>
    )
}
