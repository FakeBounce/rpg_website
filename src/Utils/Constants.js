import React from "react";

export const priceRanges = {
  "1": {
    minValue: 30,
    maxValue: 80,
  },
  "2": {
    minValue: 60,
    maxValue: 150,
  },
  "3": {
    minValue: 100,
    maxValue: 300,
  },
  "4": {
    minValue: 150,
    maxValue: 400,
  },
  "5": {
    minValue: 225,
    maxValue: 550,
  },
  "6": {
    minValue: 325,
    maxValue: 775,
  },
  "7": {
    minValue: 500,
    maxValue: 1250,
  },
  "8": {
    minValue: 750,
    maxValue: 1800,
  },
  "9": {
    minValue: 1000,
    maxValue: 3000,
  },
  "10": {
    minValue: 1500,
    maxValue: 5000,
  },
};

export const itemQuantities = {
  consumables: 3,
  weapons: 3,
  artefacts: 1,
  runes: 0,
  enhancements: 2,
  stones: 2,
  spells: 4,
};

// const questList = [
//     {
//         name: "Recherche d'ingrédients",
//         icon: "notice_6.jpg",
//         description:
//             "Cherche des ingrédients de qualité rare. Venez me voir pour en savoir plus " +
//             "(Demandez Gi Tan, 3 Baraque à gauche après le poste de garde)",
//         position: 2,
//         randomStyle: [2, 10],
//         dangerosity: 0,
//         monsterId: "0",
//         reward: 800,
//     },
//     {
//         name: "Extermination d'autochtone",
//         icon: "notice_4.jpg",
//         description:
//             "Des autochtones attaquent les convois entre les bourgades de Imédétongs et de SotMouton." +
//             " Les villageois ont du mal à se ravitailler et doivent faire un détour. " +
//             "Nombreuses pertes économiques. " +
//             "Les autochtones sont peu nombreux et n'ont spécialement de force d'attaque.",
//         position: 5,
//         randomStyle: [1, 7],
//         dangerosity: 3,
//         monsterId: "1",
//         reward: 1550,
//     },
// ];

const merchantList = [];

const questList = [];

export const quests = [
  {
    name: "Recherche d'ingrédients",
    icon: "notice_6.jpg",
    description:
      "Cherche des ingrédients de qualité rare. Venez me voir pour en savoir plus " +
      "(Demandez Gi Tan, 3 Baraque à gauche après le poste de garde)",
    position: 2,
    randomStyle: [2, 10],
    dangerosity: 0,
    monsterId: "0",
    reward: 800,
  },
  {
    name: "Extermination d'autochtone",
    icon: "notice_4.jpg",
    description:
      "Des autochtones attaquent les convois entre les bourgades de Imédétongs et de Garmsby." +
      " Les villageois ont du mal à se ravitailler et doivent faire un détour. " +
      "Nombreuses pertes économiques. " +
      "Les autochtones sont peu nombreux et n'ont spécialement de force d'attaque.",
    position: 5,
    randomStyle: [1, 7],
    dangerosity: 3,
    monsterId: "1",
    reward: 1550,
  },
  {
    name: "Phénomènes étranges",
    icon: "notice_5.jpg",
    description:
      "Des phénomènes étranges sont signalés dans les environs de Willesden. " +
      "Enquêter sur les évènements et émettre un rapport.",
    position: 3,
    randomStyle: [1, 5],
    dangerosity: 2,
    reward: 1000,
  },
  {
    name: "Apparaition de Zorgul",
    icon: "notice_2.jpg",
    description:
      "Un Zorgul serait apparu dans le cimetière de Penketh. " +
      "Enquêter sur l'apparition du Zorgul, et le tuer si il existe.",
    position: 7,
    randomStyle: [0, 8],
    dangerosity: 8,
    monsterId: "2",
    reward: 8750,
  },
];

export const towns = [
  {
    name: "Losère",
    size: 4,
    positionX: 16,
    positionY: 33,
  },
  {
    name: "Nadija",
    size: 4,
    positionX: 13,
    positionY: 15,
  },
  {
    name: "Hystrou",
    size: 4,
    positionX: 23,
    positionY: 25,
  },
  {
    name: "Emall",
    size: 3,
    positionX: 8,
    positionY: 25,
  },
  {
    name: "Sutton",
    size: 3,
    positionX: 27,
    positionY: 29,
  },
  {
    name: "Moonbright",
    size: 3,
    positionX: 7,
    positionY: 18,
  },
  {
    name: "Bellmare",
    size: 3,
    positionX: 24,
    positionY: 12,
  },
  {
    name: "Halivaara",
    size: 3,
    positionX: 16,
    positionY: 16,
  },
  {
    name: "Boatwright",
    size: 2,
    positionX: 7,
    positionY: 13,
  },
  {
    name: "Aberdyfi",
    size: 2,
    positionX: 11,
    positionY: 11,
  },
  {
    name: "Imédestongs",
    size: 2,
    positionX: 22,
    positionY: 32,
  },
  {
    name: "Mountmend",
    size: 2,
    positionX: 33,
    positionY: 11,
  },
  {
    name: "Athelney",
    size: 2,
    positionX: 34,
    positionY: 30,
  },
  {
    name: "Haedleigh",
    size: 2,
    positionX: 12,
    positionY: 28,
  },
  {
    name: "Willesden",
    size: 2,
    positionX: 14,
    positionY: 23,
  },
  {
    name: "Nearon",
    size: 2,
    positionX: 22,
    positionY: 22,
  },
  {
    name: "Aylesbury",
    size: 2,
    positionX: 29,
    positionY: 18,
  },
  {
    name: "Beckinsdale",
    size: 2,
    positionX: 19,
    positionY: 11,
  },
  {
    name: "Cardend",
    size: 1,
    positionX: 15,
    positionY: 9,
  },
  {
    name: "Garmsby",
    size: 1,
    positionX: 20,
    positionY: 32,
  },
  {
    name: "Mansfield",
    size: 1,
    positionX: 19,
    positionY: 29,
  },
  {
    name: "Erstonia",
    size: 1,
    positionX: 23,
    positionY: 34,
  },
  {
    name: "Thorpes",
    size: 1,
    positionX: 30,
    positionY: 10,
  },
  {
    name: "Brickelwhyte",
    size: 1,
    positionX: 16,
    positionY: 25,
  },
  {
    name: "Calcheth",
    size: 1,
    positionX: 15,
    positionY: 21,
  },
  {
    name: "Irragin",
    size: 1,
    positionX: 14,
    positionY: 20,
  },
  {
    name: "Northwich",
    size: 1,
    positionX: 18,
    positionY: 7,
  },
  {
    name: "Keld",
    size: 1,
    positionX: 17,
    positionY: 29,
  },
  {
    name: "Damerel",
    size: 1,
    positionX: 27,
    positionY: 23,
  },
  {
    name: "Orilon",
    size: 1,
    positionX: 26,
    positionY: 18,
  },
  {
    name: "Penketh",
    size: 1,
    positionX: 12,
    positionY: 32,
  },
  {
    name: "Hankala",
    size: 1,
    positionX: 19,
    positionY: 24,
  },
  {
    name: "Ilfracombe",
    size: 1,
    positionX: 23,
    positionY: 16,
  },
  {
    name: "Pontypridd",
    size: 1,
    positionX: 26,
    positionY: 25,
  },
  {
    name: "Dalhurst",
    size: 1,
    positionX: 23,
    positionY: 28,
  },
  {
    name: "Frostford",
    size: 1,
    positionX: 21,
    positionY: 20,
  },
];

export const musics = [
  "Alarme",
  "Auberge",
  "Aventure_tranquille",
  "Boss_crescendo",
  "Boss_duel",
  "Boss_final",
  "Boss_rapide",
  "Boss_surprise",
  "Cimetierre",
  "Combat",
  "Combat_cimetierre",
  "Combat_desert",
  "Combat_foret",
  "Combat_intense",
  "Combat_monstre",
  "Combat_preparation",
  "Combat_ring",
  "Combat_stressant",
  "Combat_tendu",
  "Combat_tranquille",
  "Drame",
  "Duel_intense",
  "Embuscade",
  "Foret_mysterieux",
  "Paisible",
  "Place_publique",
  "Port_joyeux",
  "Presentation",
  "Pris_au_piege",
  "Profondeurs",
  "Stress_decouverte",
  "Stress_inconnu",
  "Suspens",
  "Taverne_et_bruits",
  "Village_fete",
  "Village_paisible",
  "Ville_decouverte",
  "Ville_tranquille",
  "Voyage_concentre",
  "Voyage_joyeux",
  "Voyage_mysterieux",
  "Voyage_paisible",
];
export const noises = [
  "Applaudissement",
  "Boom",
  "Brouhaha",
  "Bruit_de_spectre",
  "Combat_epee",
  "Cri_de_femme",
  "Fantome_cri",
  "Femme_qui_pleure",
  "Foret",
  "Loup",
  "Monstre",
  "Pleurs_demon",
  "Pluie",
  "Port",
  "Squelettes",
  "Tonnerre",
];

export const defaultState = {
  character: {},
  characterCreation: false,
  characterId: 0,
  characters: {},
  chatHistory: [],
  chatInput: "",
  currentEvent: -1,
  currentMerchant: -1,
  currentQuest: -1,
  currentScale: 1,
  currentStory: -1,
  currentTile: {},
  currentTown: -1,
  currentX: 0,
  currentY: 0,
  currentZoom: 10,
  email: "",
  errorMessage: "",
  eventHistory: [
    {
      type: "gold",
      gold: 35,
      goldLeft: 35,
      description: "test",
      isActive: false,
      actionHistory: [],
    },
  ],
  gameMaster: "",
  isAdmin: false,
  isAuth: false,
  isGameMaster: false,
  isItemDescriptionShowed: false,
  isItemShowed: false,
  isMusicFirst: false,
  isMusicTransition: false,
  isOnPlayerView: false,
  isQuestShowed: false,
  isTownShowed: false,
  itemDescribed: 0,
  items: {},
  itemsList: [],
  itemToDescribe: {},
  map: [],
  merchants: [],
  merchantsList: [],
  musicMute: false,
  musicNameFirst: "",
  musicNameSecond: "",
  musicStatusFirst: "PLAYING",
  musicStatusSecond: "STOPPED",
  musicVolume: 100,
  musicVolumeFirst: 100,
  musicVolumeSecond: 0,
  noiseMute: false,
  noiseName: "",
  noiseStatus: "PAUSED",
  noiseVolume: 100,
  oldCharacterCreation: false,
  oldCharacterId: 0,
  onChatHelp: false,
  password: "",
  pseudo: "",
  pseudoInput: "",
  quests: [],
  questsList: [],
  spreadSheet: {},
  stories: [],
  storyCharacters: [],
  textureToApply: null,
  tilesTypes: {},
  towns: [],
  uid: "",
  users: null,
};

export const attributes = [
  "strength",
  "dexterity",
  "magic",
  "constitution",
  "perception",
  "charisma",
  "education",
  "luck",
];

export const eventList = ["nothing", "gold", "item"];