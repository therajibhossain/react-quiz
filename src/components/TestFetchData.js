// import { get, getDatabase, ref } from "firebase/database";
// import { useEffect } from "react";
import {
  get,
  getDatabase,
  onValue,
  orderByKey,
  query,
  ref,
} from "firebase/database";
import { useEffect } from "react";

export default function Leads() {
  //   const fbApp = app;
  //   useEffect(() => {
  //     const database = getDatabase(fbApp);
  //     const ads = ref(database, "videos");
  //     console.log("ads: ", ads);
  //     get(ads).then((snap) => {
  //       const results = snap.val();
  //       console.log("results: ", results);
  //     });
  //   });

  useEffect(() => {
    // getDatabase(fbApp);

    const db = getDatabase();
    const connectedRef = ref(db, ".info/connected");
    // console.dir(connectedRef);
    onValue(connectedRef, (snap) => {
      console.log(snap);
      if (snap.val() === true) {
        console.log("connected to db");
      } else {
        console.log("not connected");
      }
    });

    async function fetchVideos() {
      //db related works
      const db = getDatabase();
      const videosRef = ref(db, "videos");
      const videoQuery = query(videosRef, orderByKey());

      try {
        //   setEror(false);
        //   setLoading(true);
        //request firebase database
        const snapshot = await get(videoQuery);
        console.dir(snapshot);
        if (snapshot.exists()) {
          console.log(snapshot.val());
        } else {
          console.log(22);
        }
      } catch (err) {
        console.log(err);
      }
    }

    fetchVideos();
  }, []);

  return [];
}
