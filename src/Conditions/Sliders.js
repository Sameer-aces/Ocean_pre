import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
const Sliders = (props) => {
  const {
    sheets,
    sheetParam,
    setSheets,
    selectedWB,
    selectedWBSheet,
    setIsOpen,
    newfield,
    setNewField,
    setFilterOperator,
    value,
    setValue,
    dropValue,
  } = useContext(GlobalContext);
  let newFieldArray = [];
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
  let q4 = [];
  let q3 = [];
  let q2 = [];
  let q1 = [];

  const Slider = (event) => {
    let quarter = [];
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );
    for (var i = 0; i < plotValue.length; i++) {
      if (plotValue[i] === 4) {
        q4.push("q4");
        newFieldArray.push("q4");
      }
      if (plotValue[i] === 3) {
        q3.push("q3");
        newFieldArray.push("q3");
      }
      if (plotValue[i] === 2) {
        q2.push("q2");
        newFieldArray.push("q2");
      }
      if (plotValue[i] === 1) {
        q1.push("q1");
        newFieldArray.push("q1");
      }
    }
    console.log(q4);
    console.log(q3);
    console.log(q2);
    console.log(q1);
    const fileData = selectedWB[selectedWBSheet].slice(1);
    for (var i = 0; i < fileData.length; i++) {
      fileData[i].push(newFieldArray[i]);
    }
    const tempSheets = sheets.map((s) =>
      s.name === sheetParam
        ? { ...s, [field]: { key: addingField, values: newFieldArray } }
        : s
    );
    setSheets(tempSheets);
    setIsOpen(false);
  };
  return (
    <>
      <input
        className="modalInput"
        placeholder="Field name..."
        required
        text={newfield}
        onChange={(e) => setNewField(e.target.value)}
      />
      <p>
        For slider if
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
      </p>
      <button id="applyMonth" className="modalApplyBtn" onClick={Slider}>
        Apply
      </button>
    </>
  );
};
export default Sliders;
