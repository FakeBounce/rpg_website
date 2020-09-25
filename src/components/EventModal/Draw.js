import React, { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';
import firebase from 'firebase';
import CanvasDraw from 'react-canvas-draw';
import useApp from '../../hooks/useApp';
import { mapWidth, widthLeft } from '../Utils/StyleConstants';

const defaultWidth = (widthLeft + mapWidth) / 2 - 10 + 2;
const otherWidth = ((widthLeft + mapWidth) / 2 - 10) / 2;

const Draw = ({ drawUid, name, disabled }) => {
  const [color, setColor] = useState(drawUid === 'default' ? 'black' : 'red');
  const canvas = useRef(null);

  const { triggerError } = useApp();

  useEffect(() => {
    // Reset drawers
    // firebase
    //   .database()
    //   .ref("stories/" + 0 + "/draw/" + props.drawUid)
    //   .set("{\"lines\":[],\"width\":400,\"height\":400}")
    //   .catch(error => {
    //     // Handle Errors here.
    //     triggerError(error);
    //   });

    //listen to drawers
    // @TODO: sagas
    firebase
      .database()
      .ref('stories/' + 0 + '/draw/' + drawUid)
      .on('value', snapshot => {
        if (canvas) {
          if (typeof snapshot.val() === 'string') {
            canvas.loadSaveData(snapshot.val(), false);
          } else {
            firebase
              .database()
              .ref('stories/' + 0 + '/draw/' + drawUid)
              .set('{"lines":[],"width":400,"height":400}')
              .catch(error => {
                // Handle Errors here.
                triggerError(error);
              });
          }
        }
      });
  }, []);

  return (
    <div
      style={{
        border: '1px solid black',
        width: drawUid === 'default' ? defaultWidth : otherWidth,
        display: 'inline-block',
        float: 'left',
      }}
    >
      <div
        style={{
          width: drawUid === 'default' ? defaultWidth : otherWidth,
          position: 'absolute',
        }}
      >
        {name}
      </div>
      <CanvasDraw
        ref={canvas}
        loadTimeOffset={3}
        brushRadius={1}
        lazyRadius={0}
        canvasWidth={drawUid === 'default' ? defaultWidth : otherWidth}
        canvasHeight={drawUid === 'default' ? defaultWidth / 2 : otherWidth / 2}
        disabled={disabled}
      />

      {!disabled && (
        <button
          onClick={() => {
            if (canvas) {
              canvas.clear();
            }
          }}
        >
          Reset
        </button>
      )}
      {!disabled && (
        <button
          onClick={() => {
            if (canvas) {
              canvas.undo();
            }
          }}
        >
          Undo
        </button>
      )}
      {!disabled && (
        <button
          onClick={() => {
            if (canvas) {
              firebase
                .database()
                .ref('stories/' + 0 + '/draw')
                .once('value')
                .then(sn => {
                  // canvas.loadSaveData(sn.val(), false);

                  const cv = sn.val();
                  cv[drawUid] = canvas.getSaveData();
                  // cv.colors = ['black'];
                  // cv.colorsLeft = ['pink','red','green','purple','orange','yellow','blue', 'grey', 'brown'];
                  firebase
                    .database()
                    .ref('stories/' + 0 + '/draw')
                    .set(cv)
                    .catch(error => {
                      // Handle Errors here.
                      triggerError(error);
                    });
                })
                .catch(e => triggerError(e));
            }
          }}
        >
          Save
        </button>
      )}
      {!disabled && (
        <button
          onClick={() => {
            if (canvas) {
              firebase
                .database()
                .ref('stories/' + 0 + '/draw/default')
                .once('value')
                .then(sn => {
                  canvas.loadSaveData(sn.val(), false);
                })
                .catch(e => triggerError(e));
            }
          }}
        >
          Load GM
        </button>
      )}
      {!disabled && (
        <button
          onClick={() => {
            if (canvas) {
              firebase
                .database()
                .ref('stories/' + 0 + '/draw/' + drawUid)
                .once('value')
                .then(sn => {
                  canvas.loadSaveData(sn.val(), false);
                })
                .catch(e => triggerError(e));
            }
          }}
        >
          Load self
        </button>
      )}
    </div>
  );
};

Draw.defaultProps = {
  drawUid: 'default',
  disabled: true,
};

Draw.propTypes = {
  drawUid: PropTypes.string,
  name: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
};

export default Draw;
