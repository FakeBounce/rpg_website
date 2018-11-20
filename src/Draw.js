import React, { Component } from 'react';
import firebase from 'firebase';
import CanvasDraw from 'react-canvas-draw';

class Draw extends Component {
  canvas = null;

  render() {
    return (
      <div>
        <CanvasDraw
          ref={c => (this.canvas = c)}
          loadTimeOffset={20}
          brushRadius={2}
          lazyRadius={0}
        />

        <button
          onClick={() => {
            if (this.canvas) {
              this.canvas.clear();
            }
          }}
        >
          Reset
        </button>
        <button
          onClick={() => {
            if (this.canvas) {
              this.canvas.undo();
            }
          }}
        >
          Undo
        </button>
        <button
          onClick={() => {
            if (this.canvas) {
              firebase
                .database()
                .ref("stories/" + 0 + "/draw")
                .set(this.canvas.getSaveData())
                .catch(error => {
                  // Handle Errors here.
                  this.triggerError(error);
                });
            }
          }}
        >
          Save
        </button>
        <button
          onClick={() => {
            if (this.canvas) {
              firebase
                .database()
                .ref("stories/" + 0 + "/draw")
                .once("value")
                .then(sn => {
                  this.canvas.loadSaveData(sn.val(), false);
                }).catch(e => this.triggerError(e));
            }
          }}
        >
          Load
        </button>
      </div>
    );
  }
}

export default Draw;
