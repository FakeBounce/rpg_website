import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { heightLeft, widthLeft } from "../Utils/StyleConstants";
import { colors, tempoImagesList } from "../Utils/Constants";
import firebase from "firebase";

const styledTempContainer = {
  float: "left",
  width: `${widthLeft}px`,
  height: `${heightLeft + 2}px`,
  position: "relative",
  backgroundColor: colors.background,
};
const styledTempImage = {
  maxWidth: `${widthLeft}px`,
  maxHeight: `${heightLeft}px`,
  display: "inline-block",
  position: "absolute",
  left: "50%",
  top: "50%",
  transform: "translate(-50%,-50%)",
};
const styledTempSelect = {
  position: "absolute",
  zIndex: 1,
};

const TempImage = () => {
  const [tempImage, setTempImage] = useState("noTown.jpg");
  const [bestiaryList, setBestiaryList] = useState(null);

  const { currentStory, isGameMaster } = useSelector(store => ({
    currentStory: store.appState.currentStory,
    isGameMaster: store.appState.isGameMaster,
  }));

  useEffect(() => {
    firebase
      .database()
      .ref("stories/" + currentStory + "/tempoImage")
      .on("value", snapshot => {
        setTempImage(snapshot.val());
      });
    if (isGameMaster) {
      firebase
        .database()
        .ref("stories/" + currentStory + "/bestiary")
        .once("value")
        .then(snapshot => {
          setBestiaryList(snapshot.val());
        });
    }
    // eslint-disable-next-line
  }, []);

  const onChange = value => {
    firebase
      .database()
      .ref("stories/" + currentStory + "/tempoImage")
      .set(value)
      .catch(error => {
        // Handle Errors here.
        console.log("Error", error);
      });
  };

  return (
    <div style={styledTempContainer}>
      {isGameMaster && (
        <select
          value={tempImage}
          onChange={e => {
            onChange(e.target.value);
          }}
          style={styledTempSelect}
        >
          {tempoImagesList.map(obj => {
            return (
              <option key={obj.path} value={obj.path}>
                {obj.name}
              </option>
            );
          })}
          {bestiaryList !== null &&
            Object.keys(bestiaryList).map(bKey => {
              return (
                <option
                  key={bestiaryList[bKey].name}
                  value={"bestiary/" + bestiaryList[bKey].image}
                >
                  {bestiaryList[bKey].name}
                </option>
              );
            })}
        </select>
      )}
      <img src={"./" + tempImage} style={styledTempImage} alt={tempImage} />
    </div>
  );
};

export default TempImage;
