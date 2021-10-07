import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import Slide from '@mui/material/Slide';
import { Button, Divider } from '@mui/material';
import { AccessibilityNew, DirectionsRun, FamilyRestroom } from '@mui/icons-material';
import {Link as RouterLink} from "react-router-dom"

function HideOnScroll(props) {
  const { children, window } = props;
  const trigger = useScrollTrigger({
    target: window ? window() : undefined,
  });
  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}


export default function HideAppBar(props) {
  return (
    <>
      <HideOnScroll {...props}>
        <AppBar>
          <Toolbar sx={{gap:"0em 1em"}}>
            {/* <Typography variant="h6" component="div">
              Scroll to Hide App Bar
            </Typography> */}
            <Button component={RouterLink} to="/create"><AccessibilityNew/>{"Create a Character!"}</Button>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Button component={RouterLink} to="/import"><DirectionsRun/>{"Import a Character"}</Button>
            <Divider orientation="vertical" variant="middle" flexItem/>
            <Button component={RouterLink} to="/savedchars"><FamilyRestroom/>{"Saved Characters"}</Button>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
    </>
  );
}
