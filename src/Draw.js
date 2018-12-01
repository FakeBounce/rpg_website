import React, { Component } from "react";
import PropTypes from "prop-types";
import firebase from "firebase";
import CanvasDraw from "react-canvas-draw";
import { mapWidth, widthLeft } from "./Utils/StyleConstants";

const defaultWidth = (widthLeft + mapWidth) / 2 - 10;
const otherWidth = ((widthLeft + mapWidth) / 2 - 10) / 2;

class Draw extends Component {
  canvas = null;
  state = {
    color: this.props.uid === "default" ? "black" : "red",
  };

  componentDidMount() {
    // Reset drawers
    // firebase
    //   .database()
    //   .ref("stories/" + 0 + "/draw/" + this.props.uid)
    //   .set("{\"lines\":[],\"width\":400,\"height\":400}")
    //   .catch(error => {
    //     // Handle Errors here.
    //     this.triggerError(error);
    //   });

    //listen to drawers
    firebase
      .database()
      .ref("stories/" + 0 + "/draw/" + this.props.uid)
      .on("value", snapshot => {
        if (this.canvas) {
          this.canvas.loadSaveData(snapshot.val(), false);
        }
      });
  }

  render() {
    const { uid, isGameMaster, name, disabled } = this.props;
    return (
      <div
        style={{
          border: "1px solid black",
          width: uid === "default" ? defaultWidth : otherWidth,
          display: "inline-block",
          float: "left",
        }}
      >
        <div
          style={{
            width: uid === "default" ? defaultWidth : otherWidth,
            position: "absolute",
          }}
        >
          {name}
        </div>
        <CanvasDraw
          ref={c => (this.canvas = c)}
          loadTimeOffset={10}
          brushRadius={1}
          lazyRadius={0}
          canvasWidth={uid === "default" ? defaultWidth : otherWidth}
          canvasHeight={uid === "default" ? defaultWidth / 2 : otherWidth / 2}
          disabled={disabled}
        />

        {!disabled && (
          <button
            onClick={() => {
              if (this.canvas) {
                this.canvas.clear();
              }
            }}
          >
            Reset
          </button>
        )}
        {!disabled && (
          <button
            onClick={() => {
              if (this.canvas) {
                this.canvas.undo();
              }
            }}
          >
            Undo
          </button>
        )}
        {!disabled && (
          <button
            onClick={() => {
              if (this.canvas) {
                firebase
                  .database()
                  .ref("stories/" + 0 + "/draw")
                  .once("value")
                  .then(sn => {
                    // this.canvas.loadSaveData(sn.val(), false);

                    const cv = sn.val();
                    cv[uid] = this.canvas.getSaveData();
                    // cv.colors = ['black'];
                    // cv.colorsLeft = ['pink','red','green','purple','orange','yellow','blue', 'grey', 'brown'];
                    firebase
                      .database()
                      .ref("stories/" + 0 + "/draw")
                      .set(cv)
                      .catch(error => {
                        // Handle Errors here.
                        this.triggerError(error);
                      });
                  })
                  .catch(e => this.triggerError(e));
              }
            }}
          >
            Save
          </button>
        )}
        {!disabled && (
          <button
            onClick={() => {
              if (this.canvas) {
                firebase
                  .database()
                  .ref("stories/" + 0 + "/draw/default")
                  .once("value")
                  .then(sn => {
                    this.canvas.loadSaveData(sn.val(), false);
                  })
                  .catch(e => this.triggerError(e));
              }
            }}
          >
            Load GM
          </button>
        )}
        {!disabled && (
          <button
            onClick={() => {
              if (this.canvas) {
                firebase
                  .database()
                  .ref("stories/" + 0 + "/draw/" + uid)
                  .once("value")
                  .then(sn => {
                    this.canvas.loadSaveData(sn.val(), false);
                  })
                  .catch(e => this.triggerError(e));
              }
            }}
          >
            Load self
          </button>
        )}
      </div>
    );
  }
}

Draw.defaultProps = {
  uid: "default",
  isGameMaster: false,
  disabled: true,
};

Draw.propTypes = {
  uid: PropTypes.string,
  name: PropTypes.string.isRequired,
  isGameMaster: PropTypes.bool,
  disabled: PropTypes.bool,
};

export default Draw;
