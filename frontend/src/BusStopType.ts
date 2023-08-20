export interface BusLine {
    lineNumber: string;
    numStops: number;
    stops: { name: string; zone: string }[];
  }
  
  export interface BusStop {
    lineNumber: string;
    stops: string[];
  }
  
  export interface Stop {
    StopPointNumber: string;
    StopPointName: string;
    LocationNorthingCoordinate: string;
    LocationEastingCoordinate: string;
    ZoneShortName: string;
    StopAreaTypeCode: string;
    LastModifiedUtcDateTime: string;
    ExistsFromDate: string;
    LineNumbers: string[];
  }

  export interface BusStopsListProps {
    isLoading: boolean;
    topCommonBusStops: BusStop[];
  }
  