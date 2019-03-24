import React from 'react';
import { NavLink } from 'react-router-dom';

const Navbar = props => {
  const handleLogOut = e => {
    e.preventDefault();
    localStorage.removeItem('token');
    localStorage.removeItem('isValid');
    window.location.href = '/';
    console.log('logging Out');
  };
  return (
    <nav className="navbar navbar-expand-sm">
      {localStorage.getItem('token') ? (
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" href="/" onClick={handleLogOut}>
              Logout
            </a>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user/admin" strict exact>
              admin
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/user" strict exact>
              Profile
            </NavLink>
          </li>
        </ul>
      ) : (
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink className="nav-link" to="/login" activeClassName="active" strict exact>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/register" activeClassName="active" strict exact>
              Register
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink className="nav-link" to="/" activeClassName="active" strict exact>
              Home
            </NavLink>
          </li>
        </ul>
      )}
    </nav>
  );
};
export default Navbar;
