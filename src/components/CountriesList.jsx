import CountryItem from "./CountryItem";
import styles from "./CountriesList.module.css";
import Spinner from "./Spinner";
import Message from "./Message";
import { useCityFetch } from "../../context/CitiesProvider";

function CountriesList() {
  const { cities, isLoading } = useCityFetch();
  if (isLoading) return <Spinner />;
  if (!cities.length)
    return (
      <Message message="Add first city by clicking on a city on the map" />
    );

  const countryNames = cities
    .map((city) => ({
      country: city.country,
      emoji: city.emoji,
      id: city.id,
    }))
    .sort((a, b) => a.country.localeCompare(b.country));

  let countries = [countryNames[0]];

  for (const x in countryNames) {
    if (countryNames[x]["country"] !== countries[0]["country"]) {
      countries.unshift(countryNames[x]);
    }
  }

  // Jonas's much more concise solution
  // const countriesV2 = cities.reduce((arr, city) => {
  //   if (!arr.map((el) => el.country).includes(city.country))
  //     return [
  //       ...arr,
  //       { country: city.country, emoji: city.emoji, id: city.id },
  //     ];
  //   else return arr;
  // }, []);

  return (
    <ul className={styles.countryList}>
      {countries.map((country) => (
        <CountryItem country={country} key={country.id} />
      ))}
    </ul>
  );
}

export default CountriesList;
