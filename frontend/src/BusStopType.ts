export interface BusLine {
    lineNumber: string;
    numStops: number;
    stops: { name: string; zone: string }[];
  }
  
  export interface BusStop {
    lineNumber: string;
    stops: string[];
    name: string;
    frequency: number;
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
  }
  