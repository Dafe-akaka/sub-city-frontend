import { createContext, useState, useContext } from "react";
import { appConfig } from "./firebase/firebaseConfig";
import { initializeApp } from "@firebase/app";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import React from "react";
=======
import Signin from "./components/Signin";
import { BrowserRouter as Switch, Route, HashRouter } from "react-router-dom";
import Signup from "./components/Signup";
import { Dashboard } from "./components/Dashboard/Dashboard";
// import { Hash } from "crypto";

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
      <HashRouter>
        <CurrentUserContext.Provider value={currentUser}>
          <Switch>
            <Route exact path="/signin" component={Signin} />
            <Route exact path="/" component={Signup} />
            <Route exact path="/dashboard" component={Dashboard} />
            {/* {eventIDS}.map((event) => <Route exact path `/event-${event}`> component = {AttendeeDashboard}</Route>) */}
          </Switch>
        </CurrentUserContext.Provider>
      </HashRouter>
    </div>
  );
}
export default App;
