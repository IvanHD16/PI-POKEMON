import React from 'react'
import {Link} from 'react-router-dom';
import "./navbar.css"

const Navbar = () => {
  return (
    <div className='nav-cont'>
      <div className='nav-link-cont'>
        <Link to={"/home"}>HOME</Link>
        <Link to={"/create"}>CREAR</Link>
      </div>
    </div>
  )
}

export default Navbar