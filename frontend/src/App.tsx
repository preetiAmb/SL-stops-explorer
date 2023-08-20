import React from "react";
import {
  Container,
  createTheme,
  ThemeProvider,
} from "@mui/material";
import BusStopsList from "./components/BusStopsList";
import { BusStop } from "./BusStopType";
import { SelectedBusStopProvider } from "../src/context/SelectBusStopContext";

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

const defaultTopCommonBusStops: BusStop[] = [
  { lineNumber: "304", stops: ["Ropsten"] },
  { lineNumber: "306", stops: ["Slussen"] },
];

function App() {
  return (
    <ThemeProvider theme={theme}>
      <SelectedBusStopProvider>
        <Container maxWidth="md">
          <BusStopsList isLoading={true} topCommonBusStops={defaultTopCommonBusStops}/>
        </Container>
      </SelectedBusStopProvider>
    </ThemeProvider>
  );
}

export default App;
