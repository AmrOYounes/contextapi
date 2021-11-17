import React from 'react'
import './Signup.styles.scss';
 const Signup = () => {
    return (
        <div className='signup-container'>
         <div className = 'signup-header'>
         <div className='header-title'>Welcome!</div>
          <div className='header-description' >
      Applying for a Jasper Cash Back Mastercard® is quick and easy! Let's get you on board.
         </div>
         </div>    
         
         <div className='signup-form'>
         <div className='fname-midname-container'>
             <div className='fname-wrapper'>
             <input type='text' name='f-name' placeholder='First Name *' required/>
             </div>
             <div>
             <input type='text' name='mid-name' placeholder='Middle Name' required/>
             </div>
         
         </div>
         <div>
         <input type='text' name='l-name' placeholder='Last Name *' required/>
         </div>
         <div>
         <input type='text' name='l-name' placeholder='Promo Code (optional)' required/>
         </div>
         <div>
         <input type='email' name='email' placeholder='Enter your e-mail address' required/>
         </div>
         <div>
         <input type='password' name='password' placeholder='Create password' required/>
         </div>
         <div>
         <button type='submit'> Continue</button>
         </div>
         </div>
        </div>
    )
}

export default Signup;
