import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/navbar.css";
import { HashLink } from "react-router-hash-link";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../redux/reducers/rootSlice";
import { FiMenu } from "react-icons/fi";
import { RxCross1 } from "react-icons/rx";
import jwt_decode from "jwt-decode";

const Navbar = () => {
  const [iconActive, setIconActive] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [user, setUser] = useState(
    localStorage.getItem("token")
      ? jwt_decode(localStorage.getItem("token"))
      : ""
  );
  const userDetails = localStorage.getItem("userDetails") && JSON.parse(localStorage.getItem("userDetails") || {})

  const logoutFunc = () => {
    dispatch(setUserInfo({}));
    localStorage.removeItem("token");
    localStorage.removeItem("userDetails");
    navigate("/login");
  };

  const role = userDetails?.role;
  const status = userDetails?.status;

  return (
    <header>
      <nav className={iconActive ? "nav-active" : ""}>
        <h2 className="nav-logo">
          <NavLink to={"/"}>MediEase</NavLink>
        </h2>
        <ul className="nav-links">
          <li>
            <NavLink to={"/"}>Home</NavLink>
          </li>
          {role === 'patient' && (<li>
            <NavLink to={"/doctors"}>Doctors</NavLink>
          </li>)}
          {token && user.isAdmin && (
            <li>
              <NavLink to={"/dashboard/users"}>Dashboard</NavLink>
            </li>
          )}
          {token && role === "admin" && (
            <>
              <li>
                <NavLink to={"/doctorsList"}>Doctors</NavLink>
              </li>
              <li>
                <NavLink to={"/pharmaciesList"}>Pharmacies</NavLink>
              </li>
              <li>
                <NavLink to={"/laboratoriesList"}>Laboratories</NavLink>
              </li>
            </>
          )}
          {token && !user.isAdmin && (
            <>
              {(role === 'patient' || (role === 'doctor' && status === "approved")) && (<li>
                <NavLink to={"/appointments"}>Appointments</NavLink>
              </li>)}

              {role === 'laboratory' && status === "approved" && (<li>
                <NavLink to={"/prescriptions"}>Laboratory</NavLink>
              </li>)}
              {role === 'pharmacy' && status === "approved" && (<li>
                <NavLink to={"/prescriptions"}>Prescriptions</NavLink>
              </li>)}
              <li>
                <NavLink to={"/profile"}>Profile</NavLink>
              </li>
            </>
          )}
          {!token ? (
            <>
              <li>
                <NavLink
                  className="btn"
                  to={"/login"}
                >
                  Login
                </NavLink>
              </li>
              <li>
                <NavLink
                  className="btn"
                  to={"/register/patient"}
                >
                  Patient
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="btn"
                  to={"/register/doctor"}
                >
                  Doctor
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="btn"
                  to={"/register/pharmacy"}
                >
                  Pharmacy
                </NavLink>
              </li>

              <li>
                <NavLink
                  className="btn"
                  to={"/register/laboratory"}
                >
                  Laboratory
                </NavLink>
              </li>
            </>
          ) : (
            <li>
              <span
                className="btn"
                onClick={logoutFunc}
              >
                Logout
              </span>
            </li>
          )}
        </ul>
      </nav>
      <div className="menu-icons">
        {!iconActive && (
          <FiMenu
            className="menu-open"
            onClick={() => {
              setIconActive(true);
            }}
          />
        )}
        {iconActive && (
          <RxCross1
            className="menu-close"
            onClick={() => {
              setIconActive(false);
            }}
          />
        )}
      </div>
    </header>
  );
};

export default Navbar;
