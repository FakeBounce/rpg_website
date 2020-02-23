import React, { useState } from "react";
import LogList from "./LogList";
import { cursorPointer } from "../Utils/StyleConstants";

const Logs = () => {
  const [showPatches, setShowPatches] = useState(false);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        height: 300,
      }}
    >
      <p
        onClick={() => setShowPatches(!showPatches)}
        style={{ cursor: cursorPointer, textDecoration: "underline" }}
      >
        Show patches history
      </p>
      {showPatches && (
        <div
          className="scrollbar"
          style={{ height: "100%", overflowY: "scroll" }}
        >
          <LogList />
        </div>
      )}
    </div>
  );
};

export default Logs;
