import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { register } from "../redux/reducers/auth";

function Register() {
  const dispatch = useDispatch();
  const { auth } = useSelector((state) => state);
  const [isError, setIsError] = useState(false);
  const intial = { userName: "", email: "", password: "", cfpassword: "" };
  const [user, setUser] = useState(intial);
  const { userName, email, password, cfpassword } = user;
  const onChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
    setIsError(false);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!showError()) {
      dispatch(register(user));
    } else {
      setIsError(true);
    }
  };
  const showError = () => {
    if (password !== cfpassword) {
      return "Repeat password is different from password";
    }
  };
  const showSuccess = () => {
    return "Register Successfully";
  };
  useEffect(() => {
    if (auth.user === "registered") {
      setTimeout(() => {
        window.location.replace("/login");
      }, 1500);
    }
  }, [auth]);
  return (
    <div className="login">
      <div className="login-sidebar">
        <div className="login-info">
          <h3 className="loginLogo">Social-dev-H</h3>
          <span className="loginDesc">
            Connect with friends and the world around you on social-dev-H.
          </span>
        </div>
      </div>
      <div className="login-rightbar">
        <form className="form-Login" onSubmit={handleSubmit}>
          <div className="mb-3">
            <span style={{ fontStyle: "italic", color: "orange" }}>
              {auth.user === "registered" && showSuccess()}
            </span>
            <input
              type="text"
              name="userName"
              className="form-control"
              id="exampleInputEmail0"
              aria-describedby="emailHelp"
              placeholder="User name"
              defaultValue={userName}
              onChange={onChangeValue}
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              name="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Email address"
              defaultValue={email}
              onChange={onChangeValue}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              defaultValue={password}
              onChange={onChangeValue}
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              name="cfpassword"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Repeat Password"
              defaultValue={cfpassword}
              onChange={onChangeValue}
            />
            <span style={{ fontStyle: "italic", color: "orange" }}>
              {isError && showError()}
            </span>
          </div>
          <button
            type="submit"
            className="d-flex justify-content-center w-100 btn btn-primary"
          >
            Submit
          </button>
          <div className="d-flex justify-content-center">
            <Link
              to="/login"
              type="submit"
              className=" w-75 btn btn-success mt-2"
            >
              if You have account Click to login
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
