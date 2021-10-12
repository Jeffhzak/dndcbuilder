import { Button, Divider, Link, List, ListItem, ListSubheader } from '@mui/material'
import { Box } from '@mui/system'
import { useState, useEffect, createContext, useContext } from 'react'
import {Link as RouterLink, Route} from "react-router-dom"
import CardSelect from '../components/CardSelect'
import CharStats from './CharStats'


export const charContext = createContext({});

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
            <Box sx={{display:"flex", gap:"0em, 1em", width:"100%"}}>
                
                {/*//! Sidebar*/}
                {/*//* Sidebar*/}
                {/*//? Sidebar*/}

                <List  sx={{ width: '100%', maxWidth: "15em", bgcolor: '', margin:"3em 0 0 0"}}
                component="nav" subheader={
                    <ListSubheader component="div" id="nested-list-subheader">
                    You can do these in any order.
                    </ListSubheader>}>

                    <ListItem>
                    <Link component={RouterLink} to="/create/choice/classes" underline="hover">Class
                    </Link>
                    </ListItem>

                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="/create/choice/backgrounds" underline="hover">
                        Background
                    </Link>
                    </ListItem>
                    
                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="/create/choice/races" underline="hover">
                        Race
                    </Link>
                    </ListItem>

                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="/create/ability-scores" underline="hover">
                        Ability Scores
                    </Link>
                    </ListItem>

                    <Divider></Divider>

                    <ListItem>
                    <Link component={RouterLink} to="LOL" underline="hover">
                        My Character so far
                    </Link>
                    
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
                {/*----------------------------------*/}
                {/*//! Content Paths */}
                {/*//* Content Paths */}
                {/*//? Content Paths */}
                

                <Box sx={{display:"flex", flexDirection:"column", gap:"0em, 1em", width:"80%"}}>
                    <h1>Create.jsx</h1>
                    <Button onClick={()=> {console.log(characterData)}} variant="contained">console log characterData</Button>
                    {/*//! useContext*/}
                    <charContext.Provider value={
                        {characterData,setCharacterData,
                        }
                    }>
                    <Route path="/create/choice/:apisearch">
                        <CardSelect/>
                    </Route>
                    <Route path="/create/ability-scores">
                        <CharStats/>
                    </Route>
                    </charContext.Provider>
                </Box>
            </Box>
    )
}
