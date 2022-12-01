import React, { useState, useContext } from "react";
import Modal from "react-modal";
import { GlobalContext } from "./GlobalProvider";
import IFelse from "./Conditions/IFelse";
import Ceil from "./Conditions/Ceil";
import Floor from "./Conditions/Floor";
import Power from "./Conditions/Power";
import Decimal from "./Conditions/Decimal";
import Searchstring from "./Conditions/Searchstring";
import And from "./Conditions/And";
import In from "./Conditions/In";
import GetYearOnly from "./Conditions/GetYearOnly";
import GetMonth from "./Conditions/GetMonth";
import Replace from "./Conditions/Replace";
import DateDiff from "./Conditions/DateDiff";
import Quarter from "./Conditions/Quarter";
import Sliders from "./Conditions/Sliders";

const Condition = () => {
  const {
    setIsOpe,
    modalIsOpen,
    setIsOpen,
    selectCondition,
    setSelectedCondition,
    setDropValue,
  } = useContext(GlobalContext);

  const openModal = (e) => {
    setIsOpen(true);
    if (e.target.value === "if else") {
      setIsOpen(true);
    }
    if (e.target.value === "ELSE") {
      setIsOpe(true);
    }
  };
  function closeModal() {
    setIsOpen(false);
  }

  function selectValue(e) {
    let sem = e.target.value; //  for iteration in row values
    setDropValue(sem);
  }
  const processCsv = (jsonData) => {
    const head = jsonData[0];
    const rows = jsonData.slice(1);
    const newArray = rows.map((row) => {
      const values = row;
      const eachObject = head.reduce((obj, header, i) => {
        obj[header] = values[i];
        return obj;
      }, {});
      return eachObject;
    });

    return newArray;
  };

  return (
    <>
      <button onClick={openModal} className="HeaderBtn">
        Condition
      </button>

      <Modal
        isOpen={modalIsOpen}
        className="modalStyle"
        onRequestClose={closeModal}
        ariaHideApp={false}
      >
        <div className="modalTitle">
          <h4 className="modalHeader">Logical Operations</h4>
          <button className="modalButton" onClick={closeModal}>
            X
          </button>
        </div>
        <div className="conditionDropDown">
          <select
            onClick={(e) => setSelectedCondition(e.target.value)}
            id="consice"
          >
            <option value="">Conditions</option>
            <option value="IFELSE">IF ELSE</option>
            <option value="Ceil">Ceil</option>
            <option value="Floor">Floor</option>
            <option value="Power">Power</option>
            <option value="fixedDecimal">Fixed Decimal</option>
            <option value="subString">Search String</option>
            <option value="AND">AND</option>
            <option value="IN">IN</option>
            <option value="Year">Year</option>
            <option value="Month">Month</option>
            <option value="Replace">Replace</option>
            <option value="Date">DateDiff</option>
            <option value="Quarter">Quarter</option>
            <option value="Sliders">Sliders</option>
          </select>
        </div>
        {selectCondition === "IFELSE" ? (
          <IFelse selectValue={selectValue} />
        ) : selectCondition === "Ceil" ? (
          <Ceil selectValue={selectValue} />
        ) : selectCondition === "Floor" ? (
          <Floor selectValue={selectValue} />
        ) : selectCondition === "Power" ? (
          <Power selectValue={selectValue} />
        ) : selectCondition === "fixedDecimal" ? (
          <Decimal selectValue={selectValue} />
        ) : selectCondition === "subString" ? (
          <Searchstring selectValue={selectValue} />
        ) : selectCondition === "AND" ? (
          <And selectValue={selectValue} />
        ) : selectCondition === "IN" ? (
          <In selectValue={selectValue} />
        ) : selectCondition === "Year" ? (
          <GetYearOnly selectValue={selectValue} />
        ) : selectCondition === "Month" ? (
          <GetMonth selectValue={selectValue} />
        ) : selectCondition === "Replace" ? (
          <Replace selectValue={selectValue} />
        ) : selectCondition === "Date" ? (
          <DateDiff selectValue={selectValue} />
        ) : selectCondition === "Quarter" ? (
          <Quarter selectValue={selectValue} />
        ) : selectCondition === "Sliders" ? (
          <Sliders selectValue={selectValue} />
        ) : (
          <div></div>
        )}
        {/* <Condition /> */}
      </Modal>
    </>
  );
};
export default Condition;
