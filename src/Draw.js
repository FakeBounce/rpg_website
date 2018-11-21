import React, { Component } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import CanvasDraw from 'react-canvas-draw';

class Draw extends Component {
  canvas = null;

  render() {
    const { uid, isGameMaster } = this.props;
    return (
      <div style={{ border: '1px solid black', width: uid === 'default' ? 400 : 200 }}>
        <CanvasDraw
          ref={c => (this.canvas = c)}
          loadTimeOffset={10}
          brushRadius={2}
          lazyRadius={0}
          canvasWidth={uid === 'default' ? 400 : 200}
          canvasHeight={uid === 'default' ? 400 : 200}
          disabled={uid === 'default' ? !isGameMaster : false}
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
                .ref('stories/' + 0 + '/draw')
                .once('value')
                .then(sn => {
                  // this.canvas.loadSaveData(sn.val(), false);

                  const cv = sn.val();
                  cv[uid] = this.canvas.getSaveData();
                  // cv.colors = ['black'];
                  // cv.colorsLeft = ['pink','red','green','purple','orange','yellow','blue', 'grey', 'brown'];
                  firebase
                    .database()
                    .ref('stories/' + 0 + '/draw')
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
        <button
          onClick={() => {
            if (this.canvas) {
              firebase
                .database()
                .ref('stories/' + 0 + '/draw')
                .once('value')
                .then(sn => {
                  this.canvas.loadSaveData(sn.val(), false);
                })
                .catch(e => this.triggerError(e));
            }
          }}
        >
          Load
        </button>
      </div>
    );
  }
}

Draw.defaultProps = {
  uid: 'default',
  isGameMaster: false,
};

Draw.propTypes = {
  uid: PropTypes.string,
  isGameMaster: PropTypes.bool,
};

export default Draw;
