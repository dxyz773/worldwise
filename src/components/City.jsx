import { useParams } from "react-router-dom";
import styles from "./City.module.css";
import Spinner from "./Spinner";
import Button from "./Button";
import { useCityFetch } from "../../context/CitiesProvider";
import { useNavigate } from "react-router-dom";
// useSearchParams
const formatDate = (date) =>
  new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(date));

function City() {
  // // TEMP DATA
  // const tempcurrentCity = {
  //   cityName: "Lisbon",
  //   emoji: "🇵🇹",
  //   date: "2027-10-31T15:59:59.138Z",
  //   notes: "My favorite city so far!",
  // };
  const navigate = useNavigate();
  const { isLoading2, currentCity, handleRecent } = useCityFetch();
  const { id } = useParams();
  // const [searchParams, setSearchParams] = useSearchParams();

  // const lat = searchParams.get("lat");
  // const lng = searchParams.get("lng");

  const { cityName, emoji, date, notes } = currentCity;

  return (
    <div className={styles.city}>
      <div className={styles.row}>
        <h6>City name</h6>
        <h3>
          {isLoading2 ? <Spinner /> : <span>{emoji}</span>} {cityName}
        </h3>
      </div>

      <div className={styles.row}>
        <h6>You went to {cityName} on</h6>
        <p>{formatDate(date || null)}</p>
      </div>

      {notes && (
        <div className={styles.row}>
          <h6>Your notes</h6>
          <p>{notes}</p>
        </div>
      )}

      <div className={styles.row}>
        <h6>Learn more</h6>
        <a
          href={`https://en.wikipedia.org/wiki/${cityName}`}
          target="_blank"
          rel="noreferrer"
        >
          Check out {cityName} on Wikipedia &rarr;
        </a>
      </div>

      <div>
        <Button
          onClick={(e) => {
            e.preventDefault();
            handleRecent(id);
            navigate(-1);
          }}
          type="back"
        >
          &larr; Back
        </Button>
      </div>
    </div>
  );
}

export default City;
