export const priceRanges = {
    '1': {
        minValue: 30,
        maxValue: 80,
    },
    '2': {
        minValue: 60,
        maxValue: 150,
    },
    '3': {
        minValue: 100,
        maxValue: 300,
    },
    '4': {
        minValue: 150,
        maxValue: 400,
    },
    '5': {
        minValue: 225,
        maxValue: 550,
    },
    '6': {
        minValue: 325,
        maxValue: 775,
    },
    '7': {
        minValue: 500,
        maxValue: 1250,
    },
    '8': {
        minValue: 750,
        maxValue: 1800,
    },
    '9': {
        minValue: 1000,
        maxValue: 3000,
    },
    '10': {
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

const questList = [
    {
        name: "Recherche d'ingrédients",
        icon: 'notice_6.jpg',
        description:
            'Cherche des ingrédients de qualité rare. Venez me voir pour en savoir plus ' +
            '(Demandez Gi Tan, 3 Baraque à gauche après le poste de garde)',
        position: 2,
        randomStyle: [2, 10],
        dangerosity: 0,
        monsterId: '0',
        reward: 800,
    },
    {
        name: "Extermination d'autochtone",
        icon: 'notice_4.jpg',
        description:
            'Des autochtones attaquent les convois entre les bourgades de Imédétongs et de SotMouton.' +
            ' Les villageois ont du mal à se ravitailler et doivent faire un détour. ' +
            'Nombreuses pertes économiques. ' +
            "Les autochtones sont peu nombreux et n'ont spécialement de force d'attaque.",
        position: 5,
        randomStyle: [1, 7],
        dangerosity: 3,
        monsterId: '1',
        reward: 1550,
    },
];

const merchantList = [5, 8, 12, 25, 34, 1, 2, 4, 6, 7, 9, 11, 15, 16, 18];

export const towns = [
    {
        name: 'Hameau de mes fesses',
        positionX: 6,
        positionY: 6,
        icon: 'big_town',
        merchants: merchantList,
        quests: questList,
    },
];

export const musics = ['Auberge', 'Combat'];
export const noises = [
    'Applaudissement',
    'Boom',
    'Brouhaha',
    'bruit de spectres',
    "Combat a l'épee",
    'Cri de femme',
];

export const defaultState = {
    characterId: 0,
    character: {},
    characters: {},
    characterCreation: false,
    chatInput: '',
    chatHistory: [],
    currentStory: -1,
    currentMerchant: -1,
    currentQuest: {},
    errorMessage: '',
    email: '',
    gameMaster: '',
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
    merchants: [],
    map: [],
    merchantsList: [],
    musicStatusFirst: 'PLAYING',
    musicStatusSecond: 'STOPPED',
    musicNameFirst: '',
    musicNameSecond: '',
    musicMute: false,
    musicVolume: 100,
    musicVolumeFirst: 100,
    musicVolumeSecond: 0,
    noiseName: '',
    noiseStatus: 'PAUSED',
    noiseMute: false,
    noiseVolume: 100,
    onChatHelp: false,
    password: '',
    pseudo: '',
    pseudoInput: '',
    questsList: [],
    uid: '',
    users: null,
    stories: [],
    storyCharacters: [],
    textureToApply: null,
    spreadSheet: {},
};
