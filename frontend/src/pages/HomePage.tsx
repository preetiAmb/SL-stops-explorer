import React from "react";
import { Container } from "@mui/material";
import BusStopsList from "../components/BusStopsList";
import { BusStop } from "../BusStopType";

const defaultTopCommonBusStops: BusStop[] = [
  { lineNumber: "304", stops: ["Ropsten"] },
  { lineNumber: "306", stops: ["Slussen"] },
];

const HomePage = () => {
  return (
    <Container maxWidth="md">
      <BusStopsList
        isLoading={true}
        topCommonBusStops={defaultTopCommonBusStops}
      />
    </Container>
  );
};

export default HomePage;
