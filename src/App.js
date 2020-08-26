import React, { useContext, useState, useEffect } from "react";
import { firebaseContext } from "./utils/firebase";
import "firebase/firestore";

function App() {
  const firebase = useContext(firebaseContext);
  const [list, setList] = useState(null);
  const ref = firebase.firestore().collection("posts");

  useEffect(() => {
    const getPosts = async () => {
      const snapshot = await ref.get();
      if (!snapshot) {
        setList([]);
      } else {
        let posts = [];
        snapshot.forEach((post) => {
          posts.push({ id: post.id, ...post.data() });
        });
        setList(posts);
      }
    };
    getPosts();
  }, []);

  let listToDisplay;

  if (list === null) {
    listToDisplay = <li>Loading...</li>;
  } else if (list.length === 0) {
    listToDisplay = <li>There are no Posts...</li>;
  } else {
    listToDisplay = (
      <ol>
        {list.map((post) => {
          return <li key={post.id}>{post.title}</li>;
        })}
      </ol>
    );
  }

  return listToDisplay;
}

export default App;
