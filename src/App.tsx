import { createContext, useState, useContext } from "react";
import { appConfig } from "./firebase/firebaseConfig";
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React from "react";
import Signin from "./components/Signin/Signin";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Signup from "./components/Signup/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";

export const app = initializeApp(appConfig);
export const auth = getAuth(app);
export function useAuth() {
  return useContext(CurrentUserContext);
}
export const CurrentUserContext = createContext<any>(undefined);

function App() {
  const [currentUser, setCurrentUser] = useState<User | undefined>(undefined);

  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in
      console.log("app.tsx signed in ");
      setCurrentUser(user);
    } else {
    }
  });

  return (
    <div>
      <Router>
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
          </Switch>
        </CurrentUserContext.Provider>
      </Router>
    </div>
  );
}
export default App;
