import { createContext, useEffect, useState, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function () {
    async function fetchCities() {
      try {
        setIsLoading(true);
        const res = await fetch(`${BASE_URL}/cities`);
        const data = await res.json();
        setCities(data);
      } catch {
        alert("There was a problem loading data");
      } finally {
        setIsLoading(false);
      }
    }
    fetchCities();
  }, []);

  async function getCurrentCity(id) {
    try {
      setIsLoading(true);
      const res = await fetch(`${BASE_URL}/cities/${id}`);
      const data = await res.json();

      setCurrentCity(data);
    } catch {
      alert("There was an error loading data...");
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        currentCity,
        getCurrentCity,
      }}
    >
      {children}
    </CitiesContext.Provider>
  );
}

function useCityFetch() {
  const context = useContext(CitiesContext);
  if (context === undefined)
    throw new Error(
      "CitiesContext being used outside of the CitiesContext.Provider"
    );
  return context;
}
export { CitiesProvider, useCityFetch };
