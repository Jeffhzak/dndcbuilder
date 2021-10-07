import * as React from "react";
import { CssBaseline } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Route, Redirect, Switch } from "react-router-dom";
import HideAppBar from "./components/HideAppBar";
import Landing from "./pages/Landing";
import Create from "./pages/Create";

function App() {
  const theme = createTheme({
    palette: {mode:"dark"},
  });

  return (
    <ThemeProvider theme={theme}>
    <div className="App">
      <CssBaseline/>
      <HideAppBar/>
      <Box sx={{width:"80%", margin:"auto"}}>
        
        <Switch>

          <Route exact path="/">
            <Landing/>
          </Route>

          <Route path="/create">
            <Create/>
          </Route>

          <Route>
            <Redirect to="/"/>
          </Route>

        </Switch>
      </Box>
    </div>
    </ThemeProvider>
  )
}

export default App
