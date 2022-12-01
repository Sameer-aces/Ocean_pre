import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
const Decimal = (props) => {
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
    value,
    setValue,
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
  const applyfixedDecimal = (event) => {
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );
    for (var i = 0; i < plotValue.length; i++) {
      const fixedArray = plotValue[i].toFixed(value);
      newFieldArray.push(fixedArray);
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
      <p id="fixedDecimal">
        Enter Decimal value
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
        <input
          className="modalInput"
          type="number"
          text={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="number of decimals..."
        />
      </p>
      <button
        id="applyfixedDecimal"
        className="modalApplyBtn"
        onClick={applyfixedDecimal}
      >
        Apply decimals
      </button>
    </>
  );
};
export default Decimal;
