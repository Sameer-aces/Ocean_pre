import React, { useContext } from "react";
import { GlobalContext } from "./GlobalProvider";
import { useNavigate } from "react-router-dom";

const Header2 = () => {
  const {
    columns,
    dashboards,
    sheets,
    selectedWB,
    selectedSheet,
    selectedWBSheet,
  } = useContext(GlobalContext);

  let navigate = useNavigate();

  // Navigate to Home Page
  async function homehandler(event) {
    event.preventDefault();
    navigate("/", { replace: true });
  }
  return (
    <>
      <div className="Second-line">
        <h3 onClick={homehandler}>Home</h3>
      </div>
    </>
  );
};
export default Header2;
