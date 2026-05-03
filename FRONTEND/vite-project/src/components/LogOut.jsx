import React from "react";
import { useEffect } from "react";
import { useStore } from "../store/store";
import { useNavigate } from "react-router-dom";

function LogOut() {
  const { removeToken } = useStore();

  const navigate = useNavigate();

  useEffect(() => {
    removeToken();
    navigate("/login");
  }, []);

  return <div>LogOut</div>;
}

export default LogOut;
