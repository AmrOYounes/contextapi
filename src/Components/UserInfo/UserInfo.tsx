import React, {useState,useContext, useEffect} from 'react'
import './UserInfo.styles.scss';
import {userContext} from '../../App';
import {toggleAuth} from '../../AppReducer/action';
import {getSpecificUser} from '../../APIs/UserAPIs';

type userInfo = {
  email?: string,
  firstName?: string,
  middleName?: string,
  lastName?: string,
  promoCode?: string,
  password?: string,
}

const UserInfo = () => {
  const {state,dispatch} = React.useContext(userContext);
  
  const [userdata, setUserData] = useState<userInfo>({});
  useEffect( ()=> {
    const  userEmail = localStorage.getItem('email');
   getSpecificUser(userEmail as string).then( res => {
     setUserData(res as userInfo);
   }).catch( err => {

   })
  }, []);

  const handleLogout = () => {
    dispatch(toggleAuth());
    localStorage.clear()
  }
    return (
      <div className='user-info-container'>
        {userdata  && (
          <React.Fragment>
           <h1>user Information</h1>
           <div> {userdata.email}</div>
           <div>{userdata.firstName}</div>
           <div>{userdata.middleName}</div>
           <div>{userdata.lastName}</div>
           <div>{userdata.promoCode}</div>

           <button onClick={handleLogout}>Logout</button>
          </React.Fragment>
         
        )}
      </div>
    )
     
    
}

export default UserInfo;