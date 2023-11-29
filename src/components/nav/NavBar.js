import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";
import Logo from "./rare.jpeg";

export const NavBar = ({ token, setToken, staff }) => {
  const navigate = useNavigate();
  const navbar = useRef();
  const hamburger = useRef();

  const showMobileNavbar = () => {
    hamburger.current.classList.toggle("is-active");
    navbar.current.classList.toggle("is-active");
  };

  const userLink = () => {
    if (token && staff) {
      return (
        <Link to="/tags/all" className="navbar-item">
          User Manager
        </Link>
      );
    } else if (token) {
      return (
        <Link to="/tags/all" className="navbar-item">
          Users
        </Link>
      );
    } else {
      return "";
    }
  };

  return (
    <nav
      className="navbar is-success mb-3"
      role="navigation"
      aria-label="main navigation"
    >
      <div className="navbar-brand">
        <a className="navbar-item" href={token ? "/" : "/login"}>
          <img src={Logo} height="3rem" alt="Rare Logo" />{" "}
          <h1 className="title is-4">Rare Publishing</h1>
        </a>

        {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          role="button"
          className="navbar-burger"
          aria-label="menu"
          aria-expanded="false"
          data-target="navbarBasicExample"
          onClick={showMobileNavbar}
          ref={hamburger}
        >
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div className="navbar-menu" ref={navbar}>
        <div className="navbar-start">
          {token ? (
            <Link to="/posts/all" className="navbar-item">
              All Posts
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <Link to="/posts/mine" className="navbar-item">
              My Posts
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <Link to="/categories/all" className="navbar-item">
              Category Manager
            </Link>
          ) : (
            ""
          )}
        </div>
        <div className="navbar-start">
          {token ? (
            <Link to="/tags/all" className="navbar-item">
              Tag Manager
            </Link>
          ) : (
            ""
          )}
        </div>

        <div className="navbar-start">{userLink()}</div>

        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {token ? (
                <button
                  className="button is-outlined"
                  onClick={() => {
                    setToken("");
                    navigate("/login");
                  }}
                >
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/register" className="button is-link">
                    Register
                  </Link>
                  <Link to="/login" className="button is-outlined">
                    Login
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
