import React, { useContext, useRef, useState } from "react";
import Plot from "react-plotly.js";
import { useParams } from "react-router-dom";
import { GlobalContext } from "./GlobalProvider";
import Footer from "./Footer";
import Header from "./Header";
import { pickBy, keys, max, isEmpty } from "lodash";
import StoryPlot from "./StoryPlot";
import { useEffect } from "react";

//Second commit
const Story = () => {
  const dragItem = useRef();
  const [selected, setSelected] = useState();

  const {
    sheets,
    dashboards,
    storys,
    setStorys,
    container,
    selectedStory,
    setSelectedStory,
  } = useContext(GlobalContext);

  const storyParam = useParams().story;

  const handleDrop = (index) => {
    const dragSheet = dragItem.current;
    const updatedStory = storys.find((story) => story.name === storyParam);
    updatedStory.buttonContain[index] = dragSheet;
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
    setSelectedStory(storys.find((s) => s.name === storyParam));
  };
  function handleAddContainer() {
    const newStory = {
      name: `container${container.length}`,
      buttonContain: [],
    };
    const updatedStory = storys.find((story) => story.name === storyParam);
    updatedStory.buttonContain.push(updatedStory.buttonContain.length);
    const tempStorys = storys.map((story) =>
      story.name === storyParam ? updatedStory : story
    );
    setStorys(tempStorys);
  }

  useEffect(() => {
    setSelectedStory(storys.find((s) => s.name === storyParam));
  }, [storyParam, selectedStory]);
  return (
    <>
      <Header />
      <div className="storyPage">
        <div className="SheetNames">
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
          {dashboards.map((dashboard, index) => (
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
              onDragStart={() => (dragItem.current = dashboard)}
            >
              {dashboard.name}
            </p>
          ))}
        </div>

        <div className="StoryContainer">
          <div className="StoryContainerBtn">
            <p
              className="sheetName"
              style={{
                display: "flex",
                justifyContent: "center",
                fontSize: "20px",
                textTransform: "uppercase",
                width: "100px",
              }}
            >
              {storyParam}
            </p>
            {/* <Scrollbars style={{ width: 600, height: 80 }}> */}
            <div className="storyDisplay">
              {storys.find((story) => story.name === storyParam) &&
                selectedStory?.buttonContain.map((sheet, index) => (
                  <div
                    droppable
                    onDrop={() => handleDrop(index)}
                    onDragOver={(e) => e.preventDefault()}
                  >
                    <button
                      key={index}
                      onClick={() => setSelected(sheet.name)}
                      className="storyDropBlock"
                    >
                      {sheet.name}
                    </button>
                  </div>
                ))}
              <button
                onClick={handleAddContainer}
                className="Story-Container-Btn"
              >
                Add container
              </button>
            </div>
            {/* </Scrollbars> */}
          </div>
          <div className="StoryContainerPlot">
            {/* <div>{renderGraphs(storys)}</div> */}
            {selectedStory && selected && (
              <StoryPlot selectedStory={selectedStory} selected={selected} />
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};
export default Story;
