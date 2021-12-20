import successImage from "../assets/images/success.png";
import useFetch from "../hooks/useFetech";
import classes from "../styles/Summary.module.css";

export default function Summary({ score, noq }) {
  const getKeyword = () => {
    const percentage = score > 0 ? (score / (noq * 5)) * 100 : 0;
    if (percentage < 50) {
      return "failed";
    } else if (percentage < 75) {
      return "good";
    } else if (percentage < 100) {
      return "very good";
    } else {
      return "excellent";
    }
  };

  const { loading, error, result } = useFetch(
    `https://api.pexels.com/v1/search?query=${getKeyword()}`,
    "GET",
    {
      Authorization: process.env.REACT_APP_PEXELS_API_KEY,
    }
  );

  const image = result ? result?.photos[0].src.medium : successImage;

  return (
    <div className={classes.summary}>
      <div className={classes.point}>
        <p className={classes.score}>
          Your score is <br />
          {score} out of {noq * 5}
        </p>
      </div>

      {loading && <div className={classes.badge}>Loading your badge...</div>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <div className={classes.badge}>
          <img src={image} alt="Success" />
        </div>
      )}
    </div>
  );
}
