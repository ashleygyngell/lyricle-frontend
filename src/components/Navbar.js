import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getUserById } from '../lib/api.js';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const navigate = useNavigate();
  const logOut = () => {
    localStorage.removeItem('accessToken');
    navigate('/');
  };
  const logIn = () => {
    navigate('/login');
  };

  const [openBurger, setOpenBurger] = React.useState(false);

  const toggleBurgerMenu = () => {
    setOpenBurger(!openBurger);
  };

  return (
    <nav
      className="navbar is-success py-2"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <div>
          <a className="navbar-item" href="/">
            <img
              src="https://i.imgur.com/y9qikIT.png"
              alt="Small Lyricle Logo"
              width="30"
              height="100"
            />
            <p className="styled-title title has-text-white"> Lyricle</p>
          </a>
        </div>
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          href="#"
          onClick={toggleBurgerMenu}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div
        className={openBurger ? 'navbar is-success is-active ' : 'navbar-menu '}
      >
        <div className="navbar-end">
          {getUserById() && (
            <Link to={'/userleagues'} className="navbar-item">
              <i className="fa-solid fa-trophy fa-xl"></i>
            </Link>
          )}

          {getUserById() && (
            <Link to={'/userprofile'} className="navbar-item">
              <span className="icon ">
                <i className="fas fa-user fa-xl"></i>
              </span>
            </Link>
          )}

          <div className="navbar-item">
            <p className="control">
              {getUserById() ? (
                <>
                  <button className="button is-info " onClick={logOut}>
                    Log Out
                  </button>
                  <Link to={'/joinleague'} className="button is-info ">
                    Join A League
                  </Link>
                </>
              ) : (
                <button className="button is-success" onClick={logIn}>
                  <span>Log In</span>
                </button>
              )}
            </p>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
