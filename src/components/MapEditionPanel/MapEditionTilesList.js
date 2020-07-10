import React from "react";
import { gridDimension } from "../Utils/StyleConstants";
import MapEditionTile from "./MapEditionTile";
import { useDispatch, useSelector } from "react-redux";
import { setTextureToApply } from "../../redux/actions/actionsMapInfos";

const styledMapButtons = {
  border: "1px solid blue",
  width: "100%",
  height: `${gridDimension * 2 + 1}px`,
  display: "inline-block",
  float: "left",
  position: "relative",
};

const MapEditionTilesList = () => {
  const dispatch = useDispatch();

  const { tilesTypes, textureToApply } = useSelector(store => ({
    tilesTypes: store.mapInfos.tilesTypes,
    textureToApply: store.mapInfos.textureToApply,
  }));

  const dispatchSetTextureToApply = payload => {
    dispatch(setTextureToApply(payload));
  };

  const loadTexture = gridType => {
    if (gridType === "Fog") {
      dispatchSetTextureToApply({
        hasFog: true,
      });
    } else if (gridType === "NoFog") {
      dispatchSetTextureToApply({
        hasFog: false,
      });
    } else {
      dispatchSetTextureToApply({
        environment: gridType,
      });
    }
  };

  const getGridSelected = grid => {
    let bg = "";

    if (grid.hasFog) {
      bg = tilesTypes["Fog"];
    } else {
      Object.keys(tilesTypes).map(key => {
        if (key === grid.environment) {
          bg = tilesTypes[key];
        }
        return null;
      });
    }
    return <MapEditionTile action={unloadTexture} tile={bg} isSelected />;
  };

  const unloadTexture = () => {
    dispatchSetTextureToApply(null);
  };

  return (
    <div style={styledMapButtons}>
      {Object.keys(tilesTypes).map(ttKey => {
        return (
          <MapEditionTile
            key={`gridType-${ttKey}`}
            action={() => loadTexture(ttKey)}
            tile={tilesTypes[ttKey]}
            tileKey={ttKey}
          />
        );
      })}
      {textureToApply && getGridSelected(textureToApply)}
    </div>
  );
};

export default MapEditionTilesList;
