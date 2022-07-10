import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/reducers/auth";
import { Link } from "react-router-dom";

function Login() {
  const dispatch = useDispatch();
  const intial = { email: "", password: "" };
  const [user, setUser] = useState(intial);
  const { email, password } = user;
  const onChangeValue = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login(user));
  };
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
          <button
            type="submit"
            className="d-flex justify-content-center w-100 btn btn-primary"
          >
            Submit
          </button>
          <div className="d-flex justify-content-center">
            <Link to="/register" className=" w-75 btn btn-success mt-2">
              if You have not account Click here to Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
