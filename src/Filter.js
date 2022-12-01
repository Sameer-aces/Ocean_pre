import React, { useContext } from "react";
import ReactDOM from "react-dom";
import Modal from "react-modal";
import { GlobalContext } from "./GlobalProvider";
import "./App.css";
import { useState } from "react";
import { Scrollbars } from "react-custom-scrollbars";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

function Filter() {
  const {
    selectedSheet,
    setFilterValue,
    setFilterOperator,
    setFilterType,
    filterValue,
  } = useContext(GlobalContext);
  let subtitle;
  const [modalIsOpen, setIsOpen] = useState(false);
  const [selectValue, setSelectValue] = useState();
  const [x, setX] = useState();

  function openModal(e) {
    setIsOpen(true);
    setFilterType(e.target.value);
    let str = selectedSheet?.row?.values.map((d) => (
      <option className="filterOptions" value={d}>
        {d}
      </option>
    ));
    setSelectValue(str);
  }
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "black";
    subtitle.style.fontSize = "15px";
  }

  function closeModal() {
    setIsOpen(false);
  }
  function filterOperator(e) {
    setFilterOperator(e.target.value);
    if (e.target.value === "select") {
      setFilterOperator(null);
      setFilterValue(null);
      setFilterType(null);
    }
  }
  return (
    <div>
      <select onClick={openModal}>
        <option value="filter">Filters</option>
      </select>
      <Scrollbars>
        <Modal
          isOpen={modalIsOpen}
          onAfterOpen={afterOpenModal}
          onRequestClose={closeModal}
          style={customStyles}
        >
          <h2 className="title">Filter Data</h2>
          <button onClick={closeModal}>X</button>
          <form>
            <label>Target:{selectedSheet?.row?.key}</label>
            <br></br>
            <label>Operator:</label>
            <select onClick={filterOperator} id="filter">
              <option value="">select</option>
              <option value="select">Null</option>
              <option value="=">=</option>
              <option value="<">{"<"}</option>
              <option value="<=">{"<="}</option>
              <option value=">">{">="}</option>
              <option value=">">{">"}</option>
            </select>
            <br></br>
            <label onClick={(e) => setFilterValue(e.target.value)}>
              Value:
              <input
                type="text"
                onChange={(e) => setFilterValue(e.target.value)}
              />
              <select>{selectValue}</select>
            </label>
          </form>
        </Modal>
      </Scrollbars>
    </div>
  );
}
export default Filter;
