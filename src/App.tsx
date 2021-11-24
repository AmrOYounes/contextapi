import React, {useState,useEffect} from 'react';
import Routing from './Components/Routing';

import './App.scss';

export type StateContent = {
  isAuth: boolean,
  toggleAuth: () => void,

}

export const userContext = React.createContext<StateContent>({
  isAuth: false,
  toggleAuth: () => {},  
});

 const  App = () =>  {
 const  isValidToken = !!localStorage.getItem('Auth-token');
 const [isAuth, setIsAuth] = useState <boolean>(isValidToken);
 const toggleAuth = () => {
  setIsAuth(!isAuth);
 }

 const initialState : StateContent = {
  isAuth,
  toggleAuth,
 }

  return (
    <userContext.Provider value={initialState}>
        <Routing/>
   </userContext.Provider>
  );
}

export default App;
