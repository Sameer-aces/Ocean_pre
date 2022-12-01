import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
const Floor = (props) => {
  const {
    sheets,
    sheetParam,
    setSheets,
    selectedWB,
    selectedWBSheet,
    setIsOpen,
    newfield,
    setNewField,
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
  const applyFloor = (event) => {
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );
    for (var i = 0; i < plotValue.length; i++) {
      newFieldArray.push(Math.floor(plotValue[i]));
    }
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
        type={newfield}
        onChange={(e) => setNewField(e.target.value)}
      />
      <p id="Ceil">
        Floor
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
      <button id="applyFloor" className="modalApplyBtn" onClick={applyFloor}>
        Apply Floor
      </button>
    </>
  );
};
export default Floor;
