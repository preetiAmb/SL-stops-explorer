import React, { useContext } from "react";
import { SelectedBusStopContext } from "../context/SelectBusStopContext";
import {
  Typography,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  Paper,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { BusStopsListProps } from '../BusStopType';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: theme.spacing(2),
  backgroundColor: theme.palette.primary.light,
}));

const StyledListItem = styled(ListItem)(({ theme }) => ({
  marginBottom: theme.spacing(1),
  border: `1px solid ${theme.palette.primary.dark}`,
  borderRadius: theme.shape.borderRadius,
  padding: theme.spacing(2),
}));

const LoadingContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
}));

const NoDataContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  minHeight: "200px",
  color: theme.palette.text.secondary,
}));

const BusStopsList: React.FC<BusStopsListProps>= () => {
  const { topCommonBusStops, isLoading } = useContext(SelectedBusStopContext);

  if (isLoading) {
    return (
      <LoadingContainer>
        <CircularProgress data-testid="loading-spinner"/>
      </LoadingContainer>
    );
  }

  if (topCommonBusStops.length === 0) {
    return (
      <NoDataContainer>
        <Typography>No data available.</Typography>
      </NoDataContainer>
    );
  }

  return (
    <StyledPaper elevation={2} variant="outlined" style={{ padding: '1rem', marginTop: '1rem' }}>
      <Typography variant="h6" gutterBottom>
        Top Common Bus Stops
      </Typography>
      <List style={{ marginTop: '1rem' }}>
        {topCommonBusStops.map((busStop, index) => (
          <>
            <StyledListItem key={index}>
              <ListItemText
                primary={`Line Number: ${busStop?.lineNumber}`}
                secondary={`Stops: ${busStop?.stops.join(", ")}`}
              />
            </StyledListItem>
          </>
        ))}
      </List>
    </StyledPaper>
  );
};

export default BusStopsList;
