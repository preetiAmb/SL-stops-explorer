import React from "react";
import {
  Container,
  Typography,
  Paper,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import BusStopsList from "./components/BusStopsList";
import { SelectedBusStopProvider } from "../src/context/SelectBusStopContext";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      light: '#f5f5f5',
      main: '#eeeeee',
      dark: '#bdbdbd',
      contrastText: '#fff',
    }
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectedBusStopProvider>
        <Container maxWidth="md">
          <BusStopsList isLoading={true} />
        </Container>
      </SelectedBusStopProvider>
    </ThemeProvider>
  );
}

export default App;
