import React from 'react'
import Nav from '../widgets/Nav'



const Login = () => {
  return (

    <div>
      <Nav/>
      <div className='container'>
    <div>
      <h3>Login</h3><br/>
      <div>
        <form action='/login' method='post'>
          <div>
              <label for='username'>User Name</label>
              <input type='text' id='username' name='username'/>

          </div>
          <div>
              <label for='password'>Password</label>
              <input type='password' id='password' name='password'/>
              
          </div>
          <div>
             <button type='submit'>Add User</button>
             <button type='submit'>Login</button>
              
          </div>
        </form>
      </div>
    </div>
    </div>
    </div>
  )
}

export default Login