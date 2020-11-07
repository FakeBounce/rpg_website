import React, { useState, useEffect, useRef } from 'react';
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
  const scrollContent = useRef(null);

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
    //     `L'héritage d'Ijildur`,
    //     `1452, Terres de Dravos. Anniversaire centenaire de la mort du dît "prodige", possédé par la magie elle-même, stoppé par les 6 légendaires, héros de la nation. La mort du prodige à engendré une guerre instantanée avec les Eldrazis, peuple des forêts nordiques, monstres géants et surpuissants, attisées par la source d'énergie qu'était devenu le cadavre du prodige.`,
    //     `La guerre dura des décénies entières. Femmes, enfants, toute la nation s'est engagée au combat. Formation des recrues, fortifications, l'invasion paru simple à repousser. Mais l'apparition des élites sonnait le glas pour le peuple de Dravos.`,
    //     `Des colosses pouvant raser un avant-poste fortifié magiquement d'une seule attaque. 36 mai 1256, la guerre totale était déclarée. Un décret demandant l'utilisation de tous les moyens possibles était lancé. Les pierres de puissance, pouvant donner le pouvoir d'une liche à un paysan furent toutes utilisées, nous perdirent nos plus grand combattants, conseil, nobles, arch-mages... On ne comptait plus les morts. Leurs troupes semblaient innaretables.`,
    //     `2 novembre 1278, les Eldrazis arrênt leur assaut. Personne n'a jamais compris pourquoi. D'un seul coup, les titans arrêtèrent de bouger et firent demi-tour. Etait-ce par épuisement, manque de troupes, leur objectif était-il atteint ? Nul n'aura la réponse. Mais depuis ce jour, toute magie de niveau 5 ou plus est interdite. On détecte le potentiel énergétique afin de brider dès la naissance. La création de pierre de puissance ou d'artefacts est interdite, et punissable de mort, de peur d'une nouvelle invasion. Les élémentaires sont forcés de porter un collier restrictif.`,
    //     `Lors de la mort du dernier ermite, en 1352, ayant utilisé ses pouvoirs malgré la restriction, on découvrit un domaine posthume surprenant. Le dernier ermite à sa mort un endroit empli de magie, dont personne ne ressortais vivant. Des runes serait récupérables et nécesaaires afin de progresser dans le domaine. Elles se disperseraient dans le monde tous les 10 ans.`,
    //     `1382, on raconte qu'une équipe d'aventuriers parvient au bout du domaine. Il y aurait une fontaine qui permettrait d'obtenir une puissance incroyable, à l'instar des combattants d'autre fois. Voici une liste des rumeurs sur leurs pouvoirs :`,
    //     `- la force de briser un bras de primordial rocheux d'une seule main, la puissance de sauter la paroi d'un château`,
    //     `- une maîtrise de son corps si parfaite qu'elle permet de grimper sur un mur glissant ou de maîtriser n'importe quelle arme parfaitement (score parfait de 500 points au 100m lancer de fléchettes*)`,
    //     `- une force magique telle qu'elle permettrais de contrôler un géant`,
    //     `- l'incapacité à subir de blessure, endurance infinie`,
    //     `- un esprit inviolable et l'impossibilité d'échouer n'importe quelle tâche`,
    //     `- une vision et une ouie parfaite sur des kilomètres, détection de magie, de la température et des zones sensibles`,
    //     `- une force de persuasion capable de ralier différentes espèces de monstres`,
    //     `- une mémoire infinie, couplée à la compréhension de toutes choses d'un seul regard et à une vision futuriste sur quelques secondes`,
    //     `- une chance à se déplacer les yeux bandés`,
    //     `Aujourd'hui`,
    //     `Les rumeurs sur les pouvoirs offerts par la fontaine de cet endroit vous ont rendu curieux, et vous ont donné envie de vérifier ces histoires. Cet année, les runes ont réapparues pour la 10ème fois à travers Dravos, vous vous êtes donc lancé à leur recherche.`,
    //     `Vous avez récupéré une rune nécéssaire à l'exploration du domaine de l'ermite, et avez décidé de vous rendre à Sutton, une ville dans se trouve les meilleurs informateurs de Dravos.`,
    //     `Vous avez rendez-vous avec l'Oreille, dans la taverne "A la montagne éméchée", dans la partie haute de la ville, l'occasion de prendre des informations et de trouver quelques compagnons de voyage...`,
    //   ]);

    setTimeout(() => {
      setAnimatedClass('animatedPreviewStarted animatedPreviewFinished');
    }, 2000);
  }, []);

  useEffect(() => {
    const typewriter = () => {
      // set up text to print, each item in array is new line
      const aText = textFromStory;

      // setTextToDisplay(textFromStory);

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

  useEffect(() => {
    scrollToBottom();
  }, [textToDisplay]);

  const scrollToBottom = () => {
    if (scrollContent !== null) {
      scrollContent.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const getNormalizedText = text => {
    const normalized = text.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    return normalized.split('/n');
  };

  return (
    <div
      style={{
        backgroundImage: `url(../common/dravos.jpg)`,
        display: 'flex',
        height: windowHeight,
        width: windowWidth,
        alignItems: 'center',
        overflow: 'hidden',
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
            zIndex: 2,
          }}
        />
        <div
          className='medievalFont typewriter scrollbar'
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
            maxHeight: windowHeight - (40 + 42) * scrollScaler,
            overflow: 'hidden',
            overflowY: 'auto',
            clear: 'both',
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
          <div style={{ float: 'left', clear: 'both' }} ref={scrollContent} />
        </div>
      </div>
    </div>
  );
};

export default StoryPreview;
