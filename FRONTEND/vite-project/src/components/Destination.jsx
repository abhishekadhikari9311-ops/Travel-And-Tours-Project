// ... existing imports
import { useNavigate } from "react-router-dom";
import AddDestination from "./AddDestination";
import EditDestination from "./EditDestination";
import { useStore } from "../store/store";
import { useState } from "react";
import GetDestination from "./GetDestination";

function Destination() {
  return (
    <>
      <GetDestination />
    </>
  );
}

export default Destination;
