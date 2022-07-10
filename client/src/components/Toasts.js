/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setIsLoading, setMsg } from "../redux/reducers/alert";

function Toasts({ alert }) {
  const dispatch = useDispatch();
  const handleCancel = () => {
    dispatch(setIsLoading(false));
    dispatch(setMsg(""));
  };
  useEffect(() => {
    if (alert.isLoad) {
      setTimeout(() => {
        dispatch(setIsLoading(false));
        dispatch(setMsg(""));
      }, 5000);
    }
  }, [alert]);

  return (
    <div className="toast_fix" style={{ zIndex: "100" }}>
      <div className="toast-header">
        <strong className="me-auto">
          {alert.status ? "Success 🎉🎉🎉" : "Error 👿👿👿"}
        </strong>
        <button
          onClick={handleCancel}
          type="button"
          className="btn-close"
        ></button>
      </div>
      <div
        className={`toast-body ${
          alert.status ? "bg-info text-black" : "bg-warning text-danger"
        }`}
      >
        {alert.msg}
      </div>
    </div>
  );
}

export default Toasts;
