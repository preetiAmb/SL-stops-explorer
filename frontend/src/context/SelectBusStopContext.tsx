import React, {
    createContext,
    useState,
    useEffect,
    ReactNode,
  } from 'react';
  import { BusLine, BusStop } from '../BusStopType';
  
  interface SelectedBusStopContextType {
    selectedBusStop: BusLine | null;
    setSelectedBusStop: React.Dispatch<React.SetStateAction<BusLine | null>>;
    isLoading: boolean;
    topCommonBusStops: BusStop[];
  }
  
  export const SelectedBusStopContext = createContext<SelectedBusStopContextType>({
    selectedBusStop: null,
    setSelectedBusStop: () => {},
    isLoading: false,
    topCommonBusStops: [],
  });
  
  interface SelectedBusStopProviderProps {
    children: ReactNode;
  }
  
  export const SelectedBusStopProvider: React.FC<SelectedBusStopProviderProps> = ({ children }) => {
    const [selectedBusStop, setSelectedBusStop] = useState<BusLine | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [topCommonBusStops, setTopCommonBusStops] = useState<BusStop[]>([]);
  
    const fetchBusLineData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch('http://localhost:8000/top-bus-lines');
        const data = await response.json();
        console.log(data)
        setTopCommonBusStops(data);
        localStorage.setItem('busStopData', JSON.stringify(data));
      } catch (error) {
        console.error('Error fetching data:', error);
        const storedData = localStorage.getItem('busStopData');
        if (storedData) {
            setTopCommonBusStops(JSON.parse(storedData));
        }
      } finally {
        setIsLoading(false);
      }
    };
  
    useEffect(() => {
      fetchBusLineData();
    }, []);
  
    return (
      <SelectedBusStopContext.Provider
        value={{ selectedBusStop, setSelectedBusStop, topCommonBusStops, isLoading }}
      >
        {children}
      </SelectedBusStopContext.Provider>
    );
  };
  