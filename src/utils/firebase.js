import React, { createContext } from "react";
import app from "firebase/app";

const firebaseContext = createContext(null);
export { firebaseContext };

export default ({ children }) => {
  if (!app.apps.length) {
    console.log(process.env.REACT_APP_FIREBASE_PROJECT_ID)
    app.initializeApp({
      apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
      authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
      databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
      projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
      storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
      messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
      appId: process.env.REACT_APP_FIREBASE_APP_ID,
    });
  }

  return (
    <firebaseContext.Provider value={app}>
      {children}
    </firebaseContext.Provider>
  );
};
