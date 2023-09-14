import { createContext, useEffect, useState, useContext } from "react";

const BASE_URL = "http://localhost:9000";
const CitiesContext = createContext();

function CitiesProvider({ children }) {
  const [cities, setCities] = useState([]);
  const [currentCity, setCurrentCity] = useState({});
  const [recent, setRecent] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoading2, setIsLoading2] = useState(false);

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
    setIsLoading2(true);
    const res = await fetch(`${BASE_URL}/cities`);
    const data = await res.json();
    const curr = data.find((el) => el.id === parseInt(id));

    setCurrentCity(curr);
    setIsLoading2(false);
  }

  function handleRecent(id) {
    setRecent(id);
  }

  return (
    <CitiesContext.Provider
      value={{
        cities,
        isLoading,
        isLoading2,
        currentCity,
        getCurrentCity,
        recent,
        handleRecent,
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
