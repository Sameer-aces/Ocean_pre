import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
const Replace = (props) => {
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
    filterOperator,
    setFilterOperator,
    value,
    setValue,
    ifText,
    setIftext,
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
  const getOperator = (plotValue, value, operator) => {
    switch (operator) {
      case ">":
        for (var i = 0; i < plotValue.length; i++) {
          if (plotValue[i] > value) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(plotValue[i]);
          }
        }
        break;
      case "<":
        for (var i = 0; i < plotValue.length; i++) {
          if (plotValue[i] < value) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(plotValue[i]);
          }
        }
        break;
      case "=":
        for (var i = 0; i < plotValue.length; i++) {
          if (plotValue[i] === value) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(plotValue[i]);
          }
        }
        break;
      case ">=":
        for (var i = 0; i < plotValue.length; i++) {
          if (plotValue[i] >= value) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(plotValue[i]);
          }
        }
        break;
      case "<=":
        for (var i = 0; i < plotValue.length; i++) {
          if (plotValue[i] <= value) {
            newFieldArray.push(ifText);
          } else {
            newFieldArray.push(plotValue[i]);
          }
        }
        break;
      default:
        break;
    }
  };

  const replaceData = (event) => {
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );

    getOperator(plotValue, value, filterOperator);
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
        Replace Data <br></br>IF
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
        <select id="filter" onClick={(e) => setFilterOperator(e.target.value)}>
          <option value="">operator</option>
          <option value="select">Null</option>
          <option value="=">=</option>
          <option value="<">{"<"}</option>
          <option value="<=">{"<="}</option>
          <option value=">=">{">="}</option>
          <option value=">">{">"}</option>
        </select>
        <input
          text={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="Value..."
          className="modalInput"
        />
        Replace with
        <input
          text={ifText}
          onChange={(e) => setIftext(e.target.value)}
          placeholder="Value..."
          className="modalInput"
        />
      </p>
      <button id="applyMonth" className="modalApplyBtn" onClick={replaceData}>
        Apply
      </button>
    </>
  );
};
export default Replace;
