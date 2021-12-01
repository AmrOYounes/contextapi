import React, { useReducer, useMemo } from "react";
import Routing from "./Components/Routing";
import { initialState, userReducer } from "./AppReducer/reducer";
import "./App.scss";
export const userContext: any = React.createContext({});
const App: React.FC = () => {
  const isValidToken = !!localStorage.getItem("Auth-token");
  const [state, dispatch]: any = useReducer(userReducer, initialState);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <userContext.Provider value={contextValue}>
      <Routing />
    </userContext.Provider>
  );
};

export default App;
