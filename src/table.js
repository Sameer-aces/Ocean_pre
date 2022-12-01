import React, { useContext, useRef } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
const table = () => {
  const { selectedSheet, sheets, table, setTable } = useContext(GlobalContext);

  return (
    <>
      <h1>Table</h1>
      <h2>table</h2>
    </>
  );
};
export default table;
