import React from 'react'
import { useContext,useEffect, useState } from 'react'
import { charContext } from './Create'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import PointBuy from '../components/charstats-components/PointBuy';
import StandardArray from '../components/charstats-components/StandardArray';
import { Button, LinearProgress } from '@mui/material';




const url = `https://www.dnd5eapi.co`;

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

export default function CharStats() {
    const charData = useContext(charContext)
    const [value, setValue] = useState(0);
    const [statsObjPB, setStatsObjPB] = useState({
        str: 8,
        dex: 8,
        con: 8,
        int: 8,
        wis: 8,
        cha: 8,
    });
    const [statsObjSA, setStatsObjSA] = useState({
        str: 0,
        dex: 0,
        con: 0,
        int: 0,
        wis: 0,
        cha: 0,
    });
    const [fetchStatus, setFetchStatus] = useState("");
    const [statDescriptions, setStatDescriptions] = useState({});

    const [standardArray, setStandardArray] = useState([15, 14, 13, 12, 10, 8])

    const [pbScore, setPbScore] = useState(27);

    useEffect(() => {
        let isSubscribed = true;
        const fetchStatData =  async () => {
            try {
                setFetchStatus("pending")
                const response = await fetch("https://www.dnd5eapi.co/api/ability-scores")
                const data = await response.json();
                const statDescriptions = {};
                
                for (const arrayStep of data.results) {
                    const response = await fetch(url+`${arrayStep.url}`)
                    const data = await response.json();
                    statDescriptions[`${data.index}`] = data;
                }
                isSubscribed ? setStatDescriptions(statDescriptions) : console.log("fetch cancelled because of component unmount")
                setFetchStatus("complete")
                
            } catch (error) {
                console.log("charStats.jsx fetch error")
            }
    }

    fetchStatData();

    return () => isSubscribed = false;
}, [])

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <div>
            <h1>CharStats.jsx</h1>
            <Typography>Pick a method to determine your stats:</Typography>
            <Button onClick={()=>{console.log(statDescriptions)}}>test</Button>
            {fetchStatus === "complete" ? (
            <Box sx={{ width: '100%' }}>
            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
                <Tab label="Standard Array" {...allyProps(0)} />
                <Tab label="Point-Buy" {...allyProps(1)} />
                </Tabs>
            </Box>
            <TabPanel value={value} index={0}>
                <StandardArray stats={statsObjSA} setStats={setStatsObjSA} statDescriptions={statDescriptions} standardArray={standardArray} setStandardArray={setStandardArray}/>
            </TabPanel>
            <TabPanel value={value} index={1}>
                <PointBuy stats={statsObjPB} setStats={setStatsObjPB} statDescriptions={statDescriptions} pbScore={pbScore} setPbScore={setPbScore}/>
            </TabPanel>
            </Box>
            ) : (
            <LinearProgress sx={{width:"50%"}}/>
            )}
        </div>
    )
}
