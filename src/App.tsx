import React, { useReducer, useMemo } from "react";
import Routing from "./Components/Routing";
import { initialState, userReducer } from "./Store/reducer";
import "./App.scss";
export const userContext: any = React.createContext({});

const App: React.FC = () => {
  const isValidToken = !!localStorage.getItem("Auth-token");
  const [state, dispatchAction]: any = useReducer(userReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatchAction };
  }, [state, dispatchAction]);

  return (
    <userContext.Provider value={contextValue}>
      <Routing />
    </userContext.Provider>
  );
};

export default App;
