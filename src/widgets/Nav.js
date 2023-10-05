import React from 'react'
import { Link } from 'react-router-dom'
import '../App.css'

const Nav = () => {
  return (
    <div className='NavBar'>
        <ul className='Nav-list'>
        <li><Link className='link' to="/login">Login</Link></li>
        <li><Link className='link' to="/registration">Registration</Link></li>
    
       </ul>
    
    </div>

  )
}

export default Nav