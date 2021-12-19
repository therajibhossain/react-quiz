import { get, getDatabase, orderByKey, query, ref } from "firebase/database";
import { useEffect, useState } from "react";

export default function useQuestions(videoID) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    async function fetchQuestons() {
      const db = getDatabase();
      const questionsRef = ref(db, `quiz/` + videoID + "/questions");
      const quizQuery = query(questionsRef, orderByKey());

      try {
        setLoading(true);
        setError(false);
        const snapshot = await get(quizQuery);
        setLoading(false);
        if (snapshot.exists()) {
          setQuestions((prevQuistions) => {
            return [...prevQuistions, ...Object.values(snapshot.val())];
          });
        }
      } catch (err) {
        setLoading(false);
        setError(err.message());
      }
    }

    fetchQuestons();
  }, [videoID]);
  return { loading, error, questions };
}
