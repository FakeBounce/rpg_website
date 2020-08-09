import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import firebase from 'firebase';
import './StoryPreview.css';
import { useWindowContext } from './contexts/windowContext';

const iSpeed = 50; // time delay of print out
let iIndex = 0; // start printing array at this posision
const iScrollAt = 100; // start scrolling up at this many lines

let iTextPos = 0; // initialise text position
let sContents = ''; // initialise contents variable
let iRow; // initialise current row
const scrollScaler = 1.8;

const StoryPreview = () => {
  const [animatedClass, setAnimatedClass] = useState('animatedPreviewStarted');
  const { windowHeight, windowWidth } = useWindowContext();
  const [textToDisplay, setTextToDisplay] = useState('');
  const [textFromStory, setTextFromStory] = useState([]);

  const { story } = useParams();

  useEffect(() => {
    firebase
      .database()
      .ref('stories/' + story + '/preview')
      .once('value')
      .then(snapshot => {
        setTextFromStory(snapshot.val());
      })
      .catch(e => {
        console.log('Could not fetch story preview');
      });

    // firebase
    //   .database()
    //   .ref('stories/' + 0 + '/preview')
    //   .set([
    //     'Une histoire comme une autre',
    //     "Avec un long passé d'aventurier, vous apprenez l'existence d'un tombeau refermant une magie très puissante",
    //     "Vous apprenez, qu'il vous faudra récupérer 8 tablettes afin d'accèder au trésor de ce tombeau : une fontaine de jouvence.",
    //     "Vous avez rendez-vous avec l'oreille pour récupérer quelques informations. Il vous retrouve dans la taverne sdoifjsdof qui se trouve dans la ville de Gainsbourg",
    //   ]);

    setTimeout(() => {
      setAnimatedClass('animatedPreviewStarted animatedPreviewFinished');
    }, 2000);
  }, []);

  useEffect(() => {
    const typewriter = () => {
      // set up text to print, each item in array is new line
      const aText = textFromStory;

      sContents = '';
      iRow = Math.max(0, iIndex - iScrollAt);

      while (iRow < iIndex) {
        // sContents += aText[iRow++];
        sContents += aText[iRow++] + '/n';
      }
      setTextToDisplay(sContents + aText[iIndex].substring(0, iTextPos));
      if (iTextPos++ == aText[iIndex].length) {
        iTextPos = 0;
        iIndex++;
        if (iIndex != aText.length) {
          setTimeout(typewriter, 500);
        }
      } else {
        setTimeout(typewriter, iSpeed);
      }
    };

    if (animatedClass === 'animatedPreviewStarted animatedPreviewFinished') {
      typewriter();
    }
  }, [animatedClass]);

  const getNormalizedText = text => {
    const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalized.split('/n');
  };

  console.log('textToDisplay', textToDisplay);

  return (
    <div
      style={{
        backgroundImage: `url(../common/dravos.jpg)`,
        display: 'flex',
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
          height: windowHeight - 50,
          justifyContent: 'center',
          alignItems: 'center',
          position: 'relative',
        }}
      >
        <img
          src={'../common/empty_notice_header.png'}
          style={{
            width: 250 * scrollScaler,
            height: 40 * scrollScaler,
            zIndex: 2,
          }}
        />
        <img
          src={'../common/empty_notice_body.png'}
          className={animatedClass}
          style={{
            width: 243.66 * scrollScaler,
            height: 0,
            marginTop: -10,
          }}
        />
        <img
          src={'../common/empty_notice_footer.png'}
          style={{
            width: 250 * scrollScaler,
            height: 42 * scrollScaler,
            marginTop: -10,
          }}
        />
        <div
          className='medievalFont typewriter'
          style={{
            position: 'absolute',
            top: 40 * scrollScaler,
            fontSize: '1.5rem',
            lineHeight: '2.5rem',
            padding: '3rem',
            textAlign: 'center',
            maxWidth: 250 * scrollScaler,
            flex: 1,
            flexWrap: 'wrap',
            whiteSpace: 'pre-wrap',
          }}
        >
          {getNormalizedText(textToDisplay).map((text, index) => {
            if (index === 0) {
              return (
                <div
                  key={`story-preview-${index}`}
                  style={{ fontSize: '3rem', marginBottom: 30 }}
                >
                  {text}
                  <br />
                  <br />
                </div>
              );
            }
            return (
              <div key={`story-preview-${index}`}>
                {text}
                <br />
                <br />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;
