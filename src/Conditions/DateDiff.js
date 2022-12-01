import React, { useState, useContext } from "react";
import { GlobalContext } from "../GlobalProvider";
import moment from "moment";
const DateDiff = (props) => {
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
    setFilterOperator,
    setOperator1,
    value,
    setValue,
    ifText,
    setIftext,
    elseText,
    setElsetext,
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
  var getDaysBetweenDates = function (startDate, endDate) {
    var now = startDate.clone(),
      dates = [];

    while (now.isSameOrBefore(endDate)) {
      dates.push(now.format("MM/DD/YYYY"));
      now.add(1, "days");
    }
    return dates;
  };

  var startDate = moment(ifText);
  var endDate = moment(value);
  const handleDates = (event) => {
    var dateList = getDaysBetweenDates(startDate, endDate);
    console.log(dateList);
    const addingField = selectedWB[selectedWBSheet][0].push(newfield);
    const field = event.currentTarget.id;
    const plotValue = processCsv(selectedWB[selectedWBSheet]).map(
      (record) => record[dropValue]
    );
    for (var i = 0; i < plotValue.length; i++) {
      if ((plotValue[i] = dateList[i])) {
        newFieldArray.push(plotValue[i]);
      } else {
        console.log("no match");
      }
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
  // Usage
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
        From
        <input
          type={ifText}
          placeholder="mm/dd/yyyy"
          onChange={(e) => setIftext(e.target.value)}
        />
        To
        <input
          type={value}
          placeholder="mm/dd/yyyy"
          onChange={(e) => setValue(e.target.value)}
        />
        compare with
        {selectedWB && selectedWB[selectedWBSheet] && (
          <select id="conditionValue" onClick={props.selectValue}>
            {selectedWB[selectedWBSheet][0].map((d) => (
              <option className="filterOptions" value={d}>
                {d}
              </option>
            ))}
          </select>
        )}
        get total sales
      </p>

      <button id="applyMonth" className="modalApplyBtn" onClick={handleDates}>
        Apply
      </button>
    </>
  );
};
export default DateDiff;
