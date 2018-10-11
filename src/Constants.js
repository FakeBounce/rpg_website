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

export const musics = ["Auberge", "Combat"];
export const noises = [
    "Applaudissement",
    "Boom",
    "Brouhaha",
    "bruit de spectres",
    "Combat a l'épee",
    "Cri de femme",
];

export const defaultState = {
    characterId: 0,
    character: {},
    characters: {},
    characterCreation: false,
    chatInput: "",
    chatHistory: [],
    currentStory: -1,
    currentMerchant: -1,
    currentQuest: -1,
    currentTown: -1,
    currentScale: 1,
    currentX: 0,
    currentY: 0,
    currentZoom: 10,
    currentTile: {},
    errorMessage: "",
    email: "",
    gameMaster: "",
    isAuth: false,
    isItemShowed: false,
    itemsList: [],
    isItemDescriptionShowed: false,
    itemToDescribe: {},
    itemDescribed: 0,
    isTownShowed: false,
    isQuestShowed: false,
    isAdmin: false,
    isGameMaster: false,
    items: {},
    isMusicTransition: false,
    isMusicFirst: false,
    isOnPlayerView: false,
    merchants: [],
    map: [],
    merchantsList: [],
    musicStatusFirst: "PLAYING",
    musicStatusSecond: "STOPPED",
    musicNameFirst: "",
    musicNameSecond: "",
    musicMute: false,
    musicVolume: 100,
    musicVolumeFirst: 100,
    musicVolumeSecond: 0,
    noiseName: "",
    noiseStatus: "PAUSED",
    noiseMute: false,
    noiseVolume: 100,
    onChatHelp: false,
    password: "",
    pseudo: "",
    pseudoInput: "",
    quests: [],
    questsList: [],
    uid: "",
    users: null,
    stories: [],
    storyCharacters: [],
    towns: [],
    tilesTypes: {},
    textureToApply: null,
    spreadSheet: {},
};

export const attributes = [
    "strength",
    "dexterity",
    "luck",
    "charisma",
    "education",
    "magic",
    "perception",
    "constitution",
];
