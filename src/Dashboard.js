import React, { useContext, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import Footer from "./Footer";
import Header from "./Header";
import Filter from "./Filter";
import ImportExcel from "./ImportExcel";
//Second commit
const Dashboard = () => {
  const dragItem = useRef();
  const [scopemap, setScopeMap] = useState();

  const {
    sheets,
    dashboards,
    setDashboards,
    sort,
    sortType,
    filterType,
    filterOperator,
    filterValue,
  } = useContext(GlobalContext);

  const dashboardParam = useParams().dashboard;

  const handleDrop = (index) => {
    const dragSheet = dragItem.current;
    const updatedDashboard = dashboards.find(
      (dashboard) => dashboard.name === dashboardParam
    );
    updatedDashboard.graphs[index] = dragSheet;
    const tempDashboards = dashboards.map((dashboard) =>
      dashboard.name === dashboardParam ? updatedDashboard : dashboard
    );
    setDashboards(tempDashboards);
  };
  function mobileView() {
    document.getElementById("myDIV").style.width = "470px";
    document.getElementById("myDIV").style.display = "block";
    document.getElementById("myDIV").style.overflow = "auto";
  }
  function TabletView() {
    document.getElementById("myDIV").style.width = "920px";
    document.getElementById("myDIV").style.display = "grid";
    document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr";
    document.getElementById("myDIV").style.overflow = "auto";
  }
  function DashboardView() {
    document.getElementById("myDIV").style.width = "1500px";
    document.getElementById("myDIV").style.display = "grid";
    document.getElementById("myDIV").style.gridTemplateColumns = "1fr 1fr 1fr";
    document.getElementById("myDIV").style.overflow = "hidden";
  }

  return (
    <>
      <Header />
      <div
        className="Dashboard"
        style={{ border: "5px solid blue", height: "88vh" }}
      >
        <div className="Sheets">
          <Filter />
          <div style={{ display: "flex" }}>
            <button onClick={mobileView} className="HeaderBtn">
              Mobile
            </button>
            <button onClick={TabletView} className="HeaderBtn">
              Tablet
            </button>
            <button onClick={DashboardView} className="HeaderBtn">
              Dashboard
            </button>
          </div>
          <p style={{ fontSize: "18px", padding: "8px", textAlign: "center" }}>
            Sheets
          </p>
          <hr></hr>
          <br></br>
          {sheets.map((sheet, index) => (
            <p
              key={index}
              className="sheetName"
              style={{
                width: "auto",
                height: "30px",
                padding: "5px",
                margin: "3px",
                background: "#5d6d7e",
                color: "white",
              }}
              draggable
              onDragStart={() => (dragItem.current = sheet)}
            >
              {sheet.name}
            </p>
          ))}
        </div>

        <div
          className="AllSheets"
          id="myDIV"
          style={{
            border: "1px solid black",
            overflow: "hidden",
          }}
        >
          {dashboards
            .find((dashboard) => dashboard.name === dashboardParam)
            .graphs.map((sheet, index) => (
              <div
                droppable
                onDrop={() => handleDrop(index)}
                onDragOver={(e) => e.preventDefault()}
                className="graphDrop"
                style={{
                  border: "1px solid black",
                  width: "450px",
                  height: "323px",
                }}
              >
                <Plot
                  data={[
                    sheet.graph === "pie"
                      ? {
                          type: sheet?.graph,
                          values: sheet?.row?.values,
                          labels: sheet?.col?.values,
                        }
                      : sheet.graph === "donut"
                      ? {
                          type: "pie",
                          values: sheet?.row?.values,
                          labels: sheet?.col?.values,
                          hole: 0.4,
                        }
                      : sheet.graph === "box"
                      ? {
                          type: sheet?.graph,
                          x: sheet?.col?.values,
                          y: sheet?.row?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },
                          ],
                        }
                      : sheet.graph === "funnel"
                      ? {
                          type: sheet?.graph,
                          y: sheet?.col?.values,
                          x: sheet?.row?.values,
                          hoverinfo: "x+percent previous+percent initial",
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "x",
                                  func: "sum",
                                },
                              ],
                            },
                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                            {
                              type: "sort",
                              target: sheet?.row?.values,
                              order: "descending",
                            },
                          ],
                        }
                      : sheet.graph === "scatter"
                      ? {
                          type: sheet?.graph,
                          x: sheet?.col?.values,
                          y: sheet?.row?.values,
                          mode: "markers", //only for the mode scatter has to be written in a diffrent object.
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "y",
                                  func: "sum",
                                },
                              ],
                            },
                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },

                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                          ],
                        }
                      : sheet.graph === "table"
                      ? {
                          type: sheet?.graph,
                          columnorder: [1, 9],
                          columnwidth: [40, 40],
                          header: {
                            values: [sheet?.col?.key, sheet?.row?.key],
                            align: "center",
                            font: {
                              family: "Roboto",
                              size: 15,
                              color: "Black",
                            },
                          },
                          cells: {
                            values: [sheet?.col?.values, sheet?.row?.values],
                            height: 20,
                            font: {
                              family: "Roboto",
                              size: 13,
                              color: "Black",
                            },
                          },
                        }
                      : sheet.graph === "scattermapbox"
                      ? {
                          type: sheet?.graph,
                          lon: sheet?.col?.values,
                          lat: sheet?.row?.values,
                          mode: "markers",
                          marker: {
                            size: 12,
                          },
                          text: sheet?.text?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                          ],
                        }
                      : sheet.graph === "scattergeo"
                      ? {
                          type: sheet?.graph,
                          lon: sheet?.col?.values,
                          lat: sheet?.row?.values,
                          locationmode: {
                            enumerated:
                              "ISO-3" |
                              "Saudi Arabia" |
                              "USA-states" |
                              "country names",
                          },
                          default: "ISO-3",
                          mode: "markers",
                          marker: {
                            size: 12,
                          },
                          text: sheet?.text?.values,
                          transforms: [
                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                          ],
                        }
                      : sheet.graph === "treemap"
                      ? {
                          type: "treemap",
                          labels: sheet?.row?.values,
                          parents: sheet?.col?.values,
                        }
                      : {
                          type: sheet?.graph,
                          x: sheet?.col?.values,
                          y: sheet?.row?.values,
                          barmode: "stack",
                          transforms: [
                            {
                              type: "aggregate",
                              aggregations: [
                                {
                                  target: "y",
                                  func: "sum",
                                  enabled: true,
                                },
                              ],
                            },

                            {
                              type: filterType,
                              target: "y",
                              operation: filterOperator,
                              value: filterValue,
                            },
                            {
                              type: sort,
                              target: sheet?.row?.values,
                              order: sortType,
                            },
                            {
                              type: "groupby",
                              groups: sheet?.groupby?.values,
                            },
                          ],
                        },
                  ]}
                  layout={{
                    // autosize: false,
                    xaxis: { title: { text: sheet?.col?.key } },
                    yaxis: { title: { text: sheet?.row?.key } },
                    width: 446,
                    height: 302,
                    fontSize: 2,
                    mapbox: { style: "open-street-map" },
                    title: sheet.name,
                    barmode: "relative",
                    hovermode: "closest",
                    geo: {
                      scope: scopemap,
                      showlakes: true,
                      lakecolor: "rgb(255,255,255)",
                    },
                  }}
                />
              </div>
            ))}
        </div>
      </div>
      <Footer />
    </>
  );
};
export default Dashboard;
