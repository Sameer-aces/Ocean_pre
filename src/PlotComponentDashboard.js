import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalProvider";
import Plot from "react-plotly.js";

const PlotComponentDashboard = ({ sheet, story }) => {
  const [scopemap, setScopeMap] = useState();

  const { filterValue, filterOperator, filterType, sortType, sort } =
    useContext(GlobalContext);
  return (
    <>
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
                    "ISO-3" | "Saudi Arabia" | "USA-states" | "country names",
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
          width: 426,
          height: 252,
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
    </>
  );
};
export default PlotComponentDashboard;
