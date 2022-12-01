import React, { useContext, useState } from "react";
import { FaTrash } from "react-icons/fa";
import "./App.css";
import { GlobalContext } from "./GlobalProvider";
const Granularity = (props) => {
  const [color, setColor] = useState();
  const { selectedSheet } = useContext(GlobalContext);
  return (
    <>
      <div className="Granularity-container">
        <div
          className="granularity-color"
          droppable
          onDrop={props.drop}
          onDragOver={(e) => e.preventDefault()}
          id="groupby"
        >
          <span className="R">R</span>
          <span className="G">G</span>
          <span className="B">B</span>
          <p
            droppable
            onDrop={props.drop}
            onDragOver={(e) => e.preventDefault()}
            id="groupby"
          >
            {selectedSheet?.groupby?.key}
            <FaTrash
              onClick={props.deleteValues}
              id="groupby"
              style={{ cursor: "pointer", height: "12px", marginTop: "2px" }}
            />
          </p>
        </div>
        <div className="granularity-color">
          <img
            src="../images/detail.png"
            style={{
              display: "block",
              width: "40px",
              marginLeft: "20px",
              borderRadius: "20px",
              alignContent: "center",
              justifyContent: "center",
            }}
          ></img>

          <p
            droppable
            onDrop={props.drop}
            onDragOver={(e) => e.preventDefault()}
            id="text"
          >
            {selectedSheet?.text?.key}
            <FaTrash
              onClick={props.deleteValues}
              id="text"
              style={{ cursor: "pointer", height: "12px", marginTop: "2px" }}
            />
          </p>
        </div>
        {/* <button className="granularity size">
          <img src="../images/size.png" style={{ width: "20px" }}></img>

          <p>Size</p>
        </button>
        <button className="granularity detail">
          <img src="../images/detail.png" style={{ width: "20px" }}></img>

          <p>Detail</p>
        </button>
        <button className="granularity tooltip">
          <img src="../images/tooltip.png" style={{ width: "20px" }}></img>
          <p>ToolTip</p>
        </button>
        <button className="granularity label">
          <img src="../images/label.jpg" style={{ width: "20px" }}></img>
          <p>Label</p>
        </button>
        <button className="granularity shape">
          <img src="../images/shape.png" style={{ width: "20px" }}></img>
          <p>Shape</p>
        </button> */}
      </div>
    </>
  );
};
export default Granularity;
