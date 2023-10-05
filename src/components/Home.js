import React from 'react'
import Nav from '../widgets/Nav'
import '../App.css'

const Home = () => {
  return (
    <div className='home-page'>
      <Nav/>
      <h3 className='Heading'>
        Welcome To My TODO Application
      </h3>
    </div>
  )
}

export default Home