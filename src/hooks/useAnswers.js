import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useAnswers(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    async function fetchQuestons() {
      const db = getDatabase();
      const answersRef = ref(db, `answers/` + videoID + "/questions");
      const answersQuery = query(answersRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(answersQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setAnswers((prevAnswers) => {
            return [...prevAnswers, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setLoading(false);
        setError(err.message());
      }
    }

    fetchQuestons();
  }, [videoID]);
  return { loading, error, answers };
}
