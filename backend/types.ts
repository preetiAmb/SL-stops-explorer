export interface Stop {
    StopPointNumber: string;
    StopPointName: string;
    LocationNorthingCoordinate: string;
    LocationEastingCoordinate: string;
    ZoneShortName: string;
    StopAreaTypeCode: string;
    LastModifiedUtcDateTime: string;
    ExistsFromDate: string;
  }
  
export interface Line {
    LineNumber: string;
    TransportMode: string;
    DefaultTransportMode: string;
    TransportModeCode: string;
    LineTypeId: number;
    NumStops: number;
    Stops: Stop[];
    TransportAuthorityName: string;
    GeometryRevisionId: number;
    LastModifiedUtcDateTime: string;
    ExistsFromDate: string;
  }