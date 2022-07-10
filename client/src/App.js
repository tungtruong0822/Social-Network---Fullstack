import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PageRender from "./PageRender";
import Home from "./page/Home";
import "./styles/style.css";
import { refreshToken, getAllUser } from "./redux/reducers/auth";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./components/Loading";
import io from "socket.io-client";
import { getSocket } from "./redux/reducers/socket";
import SocketClient from "./SocketClient";
import Toasts from "./components/Toasts";

function App() {
  const dispatch = useDispatch();
  const { auth, alert } = useSelector((state) => state);
  useEffect(() => {
    if (localStorage.getItem("login")) {
      dispatch(refreshToken());
      dispatch(getAllUser());
      const socket = io();
      dispatch(getSocket(socket));
      return () => socket.close();
    }
  }, [dispatch]);
  return (
    <div className="">
      {auth.loading === true && <Loading />}
      {auth.user && <SocketClient />}
      <div className={alert.isLoad ? "toast_app_in" : "toast_app_out"}>
        <Toasts alert={alert} />
      </div>
      <Router>
        <Routes>
          <Route exact path="/" element={<PageRender />} />
          <Route exact path="/:page" element={<PageRender />} />
          <Route exact path="/:page/:id" element={<PageRender />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
