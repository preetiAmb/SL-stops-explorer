import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { BusLine } from '../BusLine';

interface SelectedBusLineContextType {
  selectedBusLine: BusLine | null;
  setSelectedBusLine: React.Dispatch<React.SetStateAction<BusLine | null>>;
  isLoading: boolean;
}

export const SelectedBusLineContext = createContext<
  SelectedBusLineContextType | undefined
>(undefined);

interface SelectedBusLineProviderProps {
  children: ReactNode;
}

export const useSelectedBusLineContext = () => {
  const context = useContext(SelectedBusLineContext);
  if (!context) {
    throw new Error(
      "useSelectedBusLineContext must be used within a SelectedBusLineProvider"
    );
  }
  return context;
};
export const SelectedBusLineProvider: React.FC<SelectedBusLineProviderProps> = ({
  children,
}) => {
  const [selectedBusLine, setSelectedBusLine] = useState<BusLine | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const fetchBusLineData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("http://localhost:8000/top-bus-lines");
      const data = await response.json();
      setSelectedBusLine(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBusLineData();
  }, []);

  return (
    <SelectedBusLineContext.Provider
      value={{ selectedBusLine, setSelectedBusLine, isLoading }}
    >
      {children}
    </SelectedBusLineContext.Provider>
  );
};

export default SelectedBusLineProvider;
