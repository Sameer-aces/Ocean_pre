import React, { createContext, useState } from "react";
const initialSheets = [{ name: "sheet", workbooks: [], rows: [] }];
const initialDashboards = [{ name: "dashboard", graphs: [0, 1, 2, 3, 4, 5] }];
const initialStorys = [{ name: "story", buttonContain: [] }];
const initialContainer = [{ name: "container", containers: [0] }];

export const GlobalContext = createContext({});

export const GlobalProvider = ({ children }) => {
  const [sheets, setSheets] = useState(initialSheets);
  const [dashboards, setDashboards] = useState(initialDashboards);
  const [storys, setStorys] = useState(initialStorys);
  const [container, setContainer] = useState(initialContainer);
  const [selectedStory, setSelectedStory] = useState();
  const [selectedSheet, setSelectedSheet] = useState();
  const [columns, setColumns] = useState([]);
  const [selectedWB, setSelectedWB] = useState();
  const [selectedWBSheet, setSelectedWBSheet] = useState();
  const [sortType, setSortType] = useState();
  const [sort, setSort] = useState();
  const [filterValue, setFilterValue] = useState();
  const [filterOperator, setFilterOperator] = useState();
  const [filterType, setFilterType] = useState();
  const [modalIsOpen, setIsOpen] = useState(false);
  const [modalIsOpe, setIsOpe] = useState(false);
  const [newfield, setNewField] = useState();
  const [selectCondition, setSelectedCondition] = useState();
  const [dropValue, setDropValue] = useState();
  const [value, setValue] = useState();
  const [ifText, setIftext] = useState();
  const [elseText, setElsetext] = useState();
  const [operator1, setOperator1] = useState();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <GlobalContext.Provider
      value={{
        selectedStory,
        setSelectedStory,
        container,
        setContainer,
        storys,
        setStorys,
        showMenu,
        setShowMenu,
        operator1,
        setOperator1,
        value,
        setValue,
        ifText,
        setIftext,
        elseText,
        setElsetext,
        modalIsOpe,
        setIsOpe,
        modalIsOpen,
        setIsOpen,
        newfield,
        setNewField,
        selectCondition,
        setSelectedCondition,
        dropValue,
        setDropValue,
        filterValue,
        setFilterValue,
        filterOperator,
        setFilterOperator,
        filterType,
        setFilterType,
        sort,
        setSort,
        sortType,
        setSortType,
        columns,
        setColumns,
        sheets,
        setSheets,
        dashboards,
        setDashboards,
        selectedWB,
        setSelectedWB,
        selectedSheet,
        setSelectedSheet,
        selectedWBSheet,
        setSelectedWBSheet,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};
