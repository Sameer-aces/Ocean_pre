import React, { useContext, useState } from "react";
import { Row, Col } from "reactstrap";
import { pickBy, keys, max, isEmpty } from "lodash";
import * as XLSX from "xlsx";
import { GlobalContext } from "./GlobalProvider";
import "./App.css";
import { useParams } from "react-router-dom";
import Scrollbars from "react-custom-scrollbars";

function getDataRange(data) {
  const dataWithValues = pickBy(data, (value, key) => !!value.v);
  const cellNamesWithValues = keys(dataWithValues);
  const cellsWithValues = cellNamesWithValues.map((cell) =>
    XLSX.utils.decode_cell(cell)
  );
  const maxRow = max(cellsWithValues.map((cell) => cell.r));
  const maxColumn = max(cellsWithValues.map((cell) => cell.c));

  const lastCellName = XLSX.utils.encode_cell({ c: maxColumn, r: maxRow });
  return `A1:${lastCellName}`;
}

const ImportExcel = (props) => {
  const [switchSheet, setswitchSheet] = useState(1);
  const [switchDashboard, setswitchDashboard] = useState(1);
  const [addedFile, setAddedFile] = useState(false);
  const {
    setColumns,
    sheets,
    setSheets,
    selectedSheet,
    setSelectedSheet,
    selectedWB,
    setSelectedWB,
    selectedWBSheet,
    setSelectedWBSheet,
    dashboards,
    setDashboards,
  } = useContext(GlobalContext);
  const sheetParam = useParams().sheet;
  const dashboardParam = useParams().dashboard;

  const acceptableFileName = ["xlsx", "xls", "csv", "owbx"];

  const isFileSupported = (name) => {
    return acceptableFileName.includes(name.split(".").pop().toLowerCase());
  };

  const getFileName = (file) => file.name.split(".").slice(0, -1).join(".");

  const readDataFromExcel = (data) => {
    const wb = XLSX.read(data);
    var mySheetData = {};
    //Loop throught the sheets
    for (var i = 0; i < wb.SheetNames.length; i++) {
      let sheetName = wb.SheetNames[i];
      const worksheet = wb.Sheets[sheetName];
      worksheet["!ref"] = getDataRange(worksheet);
      const jsonData = XLSX.utils.sheet_to_json(worksheet, {
        raw: false,
        header: 1,
        cellDates: true,
        dateNF: "dd.mm.yyyy",
      });
      mySheetData[sheetName] = jsonData;

      setColumns(jsonData[0]);
    }
    return mySheetData;
  };
  const processAgainFile = (jsondata) => {
    let sheet = jsondata.sheetParam;
    let dashboard = jsondata.dashboardParam;
    if (sheet) {
      let totalSheetSize = sheet.length;
      let numberToSwitch = sheet.substring(totalSheetSize);
      if (sheet === undefined) setswitchSheet(1);
      setswitchSheet(Number(numberToSwitch));
    }
    if (dashboard) {
      let totalDashboardSize = dashboard.length;
      let numberToSwitchDashboard = dashboard.substring(totalDashboardSize);
      if (dashboard === undefined) setswitchDashboard(1);
      setswitchDashboard(Number(numberToSwitchDashboard));
    }
    // setColumns(jsondata.columns);
    setSheets(jsondata.globalData);
    setDashboards(jsondata.dashboards);
    setSelectedWB(jsondata.allSheetsData);
    setAddedFile(true);
  };

  const handleUploadFile = async (e) => {
    const myFile = e.target.files[0];
    var idx = myFile.name.lastIndexOf(".");
    var filetype = idx < 1 ? "" : myFile.name.substr(idx + 1);
    if (filetype === "owbx") {
      const reader = new FileReader();
      reader.onload = (event) => {
        let text = event.target.result;
        const PARSEDTEXT = JSON.parse(text);
        processAgainFile(PARSEDTEXT);
      };
      reader.readAsText(e.target.files[0]);
    } else {
      //Read Xlsx file
      const data = await myFile.arrayBuffer();
      const mySheetData = readDataFromExcel(data);
      const tempSheets = sheets.map((sheet) =>
        sheet.name === sheetParam
          ? {
              ...sheet,
              workbooks: [
                ...sheet.workbooks,
                { fileName: getFileName(myFile), workbook: mySheetData },
              ],
            }
          : sheet
      );

      setSheets(tempSheets);
      setSelectedWB(mySheetData);
      setSelectedWBSheet(Object.keys(mySheetData)[0]);
    }
    if (!myFile) return;
    if (!isFileSupported(myFile.name)) {
      alert("Invalid file type");
      return;
    }
  };
  const handleWorkBookChange = (event) => {
    const wb = selectedSheet.workbooks.find(
      (wb) => wb.fileName === event.target.value
    );
    setSelectedWB(wb.workbook);
    setSelectedWBSheet(Object.keys(wb.workbook)[0]);
  };
  const handleSheetChange = (event) => {
    setSelectedWBSheet(event.target.value);
  };

  return (
    <Row>
      <Col>
        <input
          type="file"
          accept="xlsx,xls,csv"
          onChange={(e) => handleUploadFile(e)}
          style={{ margin: "2px", fontSize: "13px" }}
        />
        <div
          className="fileName"
          style={{ display: "block", cursor: "pointer" }}
        >
          {!isEmpty(selectedSheet) &&
            !isEmpty(selectedSheet.workbooks) &&
            selectedSheet.workbooks.map((wb, index) => (
              <button
                className="fileName"
                style={{ display: "block", cursor: "pointer" }}
                onClick={handleWorkBookChange}
                key={index}
                value={wb.fileName}
              >
                {wb.fileName}
              </button>
            ))}
        </div>
      </Col>
    </Row>
  );
};

export default ImportExcel;
