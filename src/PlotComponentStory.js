import React, { useContext, useState } from "react";
import { GlobalContext } from "./GlobalProvider";
import Plot from "react-plotly.js";

const PlotComponent = ({ sheet, story }) => {
  const [scopemap, setScopeMap] = useState();

  const { filterValue, filterOperator, filterType, sortType, sort } =
    useContext(GlobalContext);
  return (
    <>
      <Plot
        data={[
          story.graph === "pie"
            ? {
                type: story?.graph,
                values: story?.row?.values,
                labels: story?.col?.values,
              }
            : story.graph === "donut"
            ? {
                type: "pie",
                values: story?.row?.values,
                labels: story?.col?.values,
                hole: 0.4,
              }
            : story.graph === "box"
            ? {
                type: story?.graph,
                x: story?.col?.values,
                y: story?.row?.values,
                transforms: [
                  {
                    type: "groupby",
                    groups: story?.groupby?.values,
                  },
                  {
                    type: filterType,
                    target: "y",
                    operation: filterOperator,
                    value: filterValue,
                  },
                ],
              }
            : story.graph === "funnel"
            ? {
                type: story?.graph,
                y: story?.col?.values,
                x: story?.row?.values,
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
                    groups: story?.groupby?.values,
                  },
                  {
                    type: "sort",
                    target: story?.row?.values,
                    order: "descending",
                  },
                ],
              }
            : story.graph === "scatter"
            ? {
                type: story?.graph,
                x: story?.col?.values,
                y: story?.row?.values,
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
                    groups: story?.groupby?.values,
                  },
                ],
              }
            : story.graph === "table"
            ? {
                type: story?.graph,
                columnorder: [1, 9],
                columnwidth: [40, 40],
                header: {
                  values: [story?.col?.key, story?.row?.key],
                  align: "center",
                  font: {
                    family: "Roboto",
                    size: 15,
                    color: "Black",
                  },
                },
                cells: {
                  values: [story?.col?.values, story?.row?.values],
                  height: 20,
                  font: {
                    family: "Roboto",
                    size: 13,
                    color: "Black",
                  },
                },
              }
            : story.graph === "scattermapbox"
            ? {
                type: story?.graph,
                lon: story?.col?.values,
                lat: story?.row?.values,
                mode: "markers",
                marker: {
                  size: 12,
                },
                text: story?.text?.values,
                transforms: [
                  {
                    type: "groupby",
                    groups: story?.groupby?.values,
                  },
                ],
              }
            : story.graph === "scattergeo"
            ? {
                type: story?.graph,
                lon: story?.col?.values,
                lat: story?.row?.values,
                locationmode: {
                  enumerated:
                    "ISO-3" | "Saudi Arabia" | "USA-states" | "country names",
                },
                default: "ISO-3",
                mode: "markers",
                marker: {
                  size: 12,
                },
                text: story?.text?.values,
                transforms: [
                  {
                    type: "groupby",
                    groups: story?.groupby?.values,
                  },
                ],
              }
            : story.graph === "treemap"
            ? {
                type: "treemap",
                labels: story?.row?.values,
                parents: story?.col?.values,
              }
            : {
                type: story?.graph,
                x: story?.col?.values,
                y: story?.row?.values,
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
                    target: story?.row?.values,
                    order: sortType,
                  },
                  {
                    type: "groupby",
                    groups: story?.groupby?.values,
                  },
                ],
              },
        ]}
        layout={{
          // autosize: false,
          xaxis: { title: { text: story?.col?.key } },
          yaxis: { title: { text: story?.row?.key } },
          width: 1292,
          height: 515,
          fontSize: 2,
          title: story.name,
          mapbox: { style: "open-street-map" },
          barmode: "relative",
          hovermode: "closest",
          geo: {
            scope: scopemap,
            showlakes: true,
            lakecolor: "rgb(255,255,255)",
          },

          updatemenus: [
            {
              x: 0.85,
              y: 1.05,
              showactive: true,
              buttons: [
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "sum"],
                  label: "Sum",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "avg"],
                  label: "Avg",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "min"],
                  label: "Min",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "max"],
                  label: "Max",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "mode"],
                  label: "Mode",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "median"],
                  label: "Median",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "count"],
                  label: "Count",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "stddev"],
                  label: "Std.Dev",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "first"],
                  label: "First",
                },
                {
                  method: "restyle",
                  args: ["transforms[0].aggregations[0].func", "last"],
                  label: "Last",
                },
              ],
            },
          ],
        }}
      />
    </>
  );
};
export default PlotComponent;
