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
      'Des autochtones attaquent les convois entre les bourgades de Imédétongs et de Garmsby.' +
      ' Les villageois ont du mal à se ravitailler et doivent faire un détour. ' +
      'Nombreuses pertes économiques. ' +
      "Les autochtones sont peu nombreux et n'ont pas spécialement de force d'attaque.",
    position: 5,
    randomStyle: [1, 7],
    dangerosity: 3,
    monsterId: '1',
    reward: 1550,
  },
  {
    name: 'Phénomènes étranges',
    icon: 'notice_5.jpg',
    description:
      'Des phénomènes étranges sont signalés dans les environs de Willesden. ' +
      'Enquêter sur les évènements et émettre un rapport.',
    position: 3,
    randomStyle: [1, 5],
    dangerosity: 2,
    reward: 1000,
  },
  {
    name: 'Apparaition de Zorgul',
    icon: 'notice_2.jpg',
    description:
      'Un Zorgul serait apparu dans le cimetière de Penketh. ' +
      "Enquêter sur l'apparition du Zorgul, et le tuer si il existe.",
    position: 7,
    randomStyle: [0, 8],
    dangerosity: 8,
    monsterId: '2',
    reward: 8750,
  },
  {
    name: 'Cherche coeur de Taton',
    icon: 'notice_3.jpg',
    description: 'Achète coeur de Taton bon prix.',
    position: 1,
    randomStyle: [3, 6],
    dangerosity: 6,
    monsterId: '3',
    reward: 3550,
  },
  {
    name: 'PRIME: Assassin, Mort ou vif',
    icon: 'notice_6.jpg',
    description: `Prime pour l'assassin au masque de Docteur Peste qui rode dans la ville. Mort ou vif. `,
    position: 4,
    randomStyle: [2, 9],
    dangerosity: 4,
    monsterId: '3',
    reward: 1500,
  },
  {
    name: 'Expédition en montagne',
    icon: 'notice_5.jpg',
    description:
      'Je cherche des poches de venin de Rynyx ! Un ptit tour à la montagne, on rentre dans une grotte,' +
      ' vous en tuez quelques uns, je récolte, finis ! Simple non ? ' +
      "Venez vite me voir dans la plus grande boutique d'Hystrou, vous ne pourrez pas la rater !" +
      ' Sensations garanties',
    position: 8,
    randomStyle: [0, 7],
    dangerosity: 5,
    monsterId: '4',
    reward: 2750,
  },
];

export const towns = [
  {
    name: 'Losère',
    size: 4,
    positionX: 16,
    positionY: 33,
  },
  {
    name: 'Nadija',
    size: 4,
    positionX: 13,
    positionY: 15,
  },
  {
    name: 'Hystrou',
    size: 4,
    positionX: 23,
    positionY: 25,
  },
  {
    name: 'Emall',
    size: 3,
    positionX: 8,
    positionY: 25,
  },
  {
    name: 'Sutton',
    size: 3,
    positionX: 27,
    positionY: 29,
  },
  {
    name: 'Moonbright',
    size: 3,
    positionX: 7,
    positionY: 18,
  },
  {
    name: 'Bellmare',
    size: 3,
    positionX: 24,
    positionY: 12,
  },
  {
    name: 'Halivaara',
    size: 3,
    positionX: 16,
    positionY: 16,
  },
  {
    name: 'Boatwright',
    size: 2,
    positionX: 7,
    positionY: 13,
  },
  {
    name: 'Aberdyfi',
    size: 2,
    positionX: 11,
    positionY: 11,
  },
  {
    name: 'Imédestongs',
    size: 2,
    positionX: 22,
    positionY: 32,
  },
  {
    name: 'Mountmend',
    size: 2,
    positionX: 33,
    positionY: 11,
  },
  {
    name: 'Athelney',
    size: 2,
    positionX: 34,
    positionY: 30,
  },
  {
    name: 'Haedleigh',
    size: 2,
    positionX: 12,
    positionY: 28,
  },
  {
    name: 'Willesden',
    size: 2,
    positionX: 14,
    positionY: 23,
  },
  {
    name: 'Nearon',
    size: 2,
    positionX: 22,
    positionY: 22,
  },
  {
    name: 'Aylesbury',
    size: 2,
    positionX: 29,
    positionY: 18,
  },
  {
    name: 'Beckinsdale',
    size: 2,
    positionX: 19,
    positionY: 11,
  },
  {
    name: 'Cardend',
    size: 1,
    positionX: 15,
    positionY: 9,
  },
  {
    name: 'Garmsby',
    size: 1,
    positionX: 20,
    positionY: 32,
  },
  {
    name: 'Mansfield',
    size: 1,
    positionX: 19,
    positionY: 29,
  },
  {
    name: 'Erstonia',
    size: 1,
    positionX: 23,
    positionY: 34,
  },
  {
    name: 'Thorpes',
    size: 1,
    positionX: 30,
    positionY: 10,
  },
  {
    name: 'Brickelwhyte',
    size: 1,
    positionX: 16,
    positionY: 25,
  },
  {
    name: 'Calcheth',
    size: 1,
    positionX: 15,
    positionY: 21,
  },
  {
    name: 'Irragin',
    size: 1,
    positionX: 14,
    positionY: 20,
  },
  {
    name: 'Northwich',
    size: 1,
    positionX: 18,
    positionY: 7,
  },
  {
    name: 'Keld',
    size: 1,
    positionX: 17,
    positionY: 29,
  },
  {
    name: 'Damerel',
    size: 1,
    positionX: 27,
    positionY: 23,
  },
  {
    name: 'Orilon',
    size: 1,
    positionX: 26,
    positionY: 18,
  },
  {
    name: 'Penketh',
    size: 1,
    positionX: 12,
    positionY: 32,
  },
  {
    name: 'Hankala',
    size: 1,
    positionX: 19,
    positionY: 24,
  },
  {
    name: 'Ilfracombe',
    size: 1,
    positionX: 23,
    positionY: 16,
  },
  {
    name: 'Pontypridd',
    size: 1,
    positionX: 26,
    positionY: 25,
  },
  {
    name: 'Dalhurst',
    size: 1,
    positionX: 23,
    positionY: 28,
  },
  {
    name: 'Frostford',
    size: 1,
    positionX: 21,
    positionY: 20,
  },
];

export const musics = [
  'Alarme',
  'Auberge',
  'Aventure_tranquille',
  'Boss_crescendo',
  'Boss_duel',
  'Boss_final',
  'Boss_rapide',
  'Boss_surprise',
  'Cimetierre',
  'Combat',
  'Combat_cimetierre',
  'Combat_desert',
  'Combat_foret',
  'Combat_intense',
  'Combat_monstre',
  'Combat_preparation',
  'Combat_ring',
  'Combat_stressant',
  'Combat_tendu',
  'Combat_tranquille',
  'Drame',
  'Duel_intense',
  'Embuscade',
  'Foret_mysterieux',
  'Paisible',
  'Place_publique',
  'Port_joyeux',
  'Presentation',
  'Pris_au_piege',
  'Profondeurs',
  'Stress_decouverte',
  'Stress_inconnu',
  'Suspens',
  'Taverne_et_bruits',
  'Village_fete',
  'Village_paisible',
  'Ville_decouverte',
  'Ville_tranquille',
  'Voyage_concentre',
  'Voyage_joyeux',
  'Voyage_mysterieux',
  'Voyage_paisible',
];
export const noises = [
  'Applaudissement',
  'Boom',
  'Brouhaha',
  'Bruit_de_spectre',
  'Combat_epee',
  'Cri_de_femme',
  'Cri_Guerre_2',
  'Cri_Douleur_2',
  'Fantome_cri',
  'Femme_qui_pleure',
  'Foret',
  'Loup',
  'Monstre',
  'Pleurs_demon',
  'Pluie',
  'Port',
  'Squelettes',
  'Tempete',
  'Tonnerre',
];

export const defaultState = {
  bestiary: [],
  character: {},
  characterCreation: false,
  characterId: 0,
  characters: {},
  chatHistory: [],
  chatInput: '',
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
  email: '',
  error: '',
  eventHistory: [
    {
      type: 'gold',
      gold: 35,
      goldLeft: 35,
      description: 'test',
      isActive: false,
      actionHistory: [],
    },
  ],
  gameMaster: '',
  isAdmin: false,
  isAuth: false,
  isGameMaster: false,
  isItemDescriptionShowed: false,
  isItemShowed: false,
  isMusicFirst: false,
  isMusicTransition: false,
  isOnBestiary: false,
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
  musicNameFirst: '',
  musicNameSecond: '',
  musicStatusFirst: 'PLAYING',
  musicStatusSecond: 'STOPPED',
  musicVolume: 100,
  musicVolumeFirst: 100,
  musicVolumeSecond: 0,
  noiseMute: false,
  noiseName: '',
  noiseStatus: 'PAUSED',
  noiseVolume: 100,
  oldCharacterCreation: false,
  oldCharacterId: 0,
  onChatHelp: false,
  password: '',
  pseudo: '',
  pseudoInput: '',
  quests: [],
  questsList: [],
  spreadSheet: {},
  stories: [],
  storyCharacters: [],
  textureToApply: null,
  tilesTypes: {},
  towns: [],
  uid: '',
  users: null,
};

export const attributes = [
  'strength',
  'dexterity',
  'magic',
  'constitution',
  'perception',
  'charisma',
  'education',
  'luck',
];

export const eventList = ['nothing', 'gold', 'item', 'debt', 'draw'];
export const spellTypeList = [
  'Chaos',
  'Eau',
  'Esprit',
  'Feu',
  'Foudre',
  'Glace',
  'Malédiction',
  'Nécromancie',
  'Vent',
  'Terre',
  'Sable',
  'Toxique',
  'Neutre',
  'Piège',
  'Psyché',
  'Sacré',
];
export const spellModeList = ['Offensif', 'Défensif', 'Failed'];

export const bestiary = [
  {
    name: 'Gyros',
    image: 'gyros.jpg',
    text1:
      'Commandant de la meilleure escouade d’élite des soldats. Il mène les meilleurs soldats dans les missions les plus difficiles assignées par le conseil. Assassinat, contrôle de territoire, traques, son escouade à réussi les tâches soi-disant irréalisable sans perdre un seul membre de son équipe.',
    text2:
      'Leur mission actuelle est la récupération d’un artefact apparemment situé sur le territoire des Gnolls, sans provoquer de guerre.',
    text3: '',
    text4: '',
    age: '???',
    taille: '235',
    poids: '160',
    known: true,
    seen: false,
  },
  {
    name: 'Dante',
    image: 'dante.jpg',
    text1:
      'Dante est un des premiers hommes chasseurs de prime de Dravos. On ne sait pas grand chose de lui, à part qu’il attiré par l’argent et qu’il aime traquer des proies potentielles. Il parle très peu, Dante préfère l’action.',
    text2:
      'Il a pour habitude de chasser seul, sa puissance est encore inconnue. On raconte qu’il a vaincu un titan, créatures les plus redoutables de Dravos, plus puissant encore que les Géants d’élites de Kedra. Il ne chasse plus que des primes de Dangerosité 10 maintenant. On peut apercevoir des changements météorologiques lorsqu’il se bat. Éclairs, nuages sombres, même quelques tremblements ont pu être ressentis à des kilomètres de ses batailles, accompagnés de cris de guerre assourdissants ayant rendu sourd des villages entier trop proches du combat.',
    text3:
      'Booster de muscles, runes de puissance, régénération (lente), réflexes hors norme, résiste aux poisons, inattaquable mentalement. Provoque des ondes de choc lors qu’il frappe. Crée des changements de météo pour l’aider au combat.',
    text4:
      'N’avoue jamais la défaite, impose sa volonté et n’as peur de rien.' +
      'Avare, et n’aime la compagnie.' +
      'Possède pleins d’objets de soins/défensifs, aucun objet offensif à part ses deux masses d’armes.',
    age: '???',
    taille: '250',
    poids: '125',
    known: false,
    seen: false,
  },
  {
    name: 'Rhodogueux',
    image: 'rhodogueux.jpg',
    text1:
      'Le Rhodogueux est une créature eldrazi habitant sur des terres arides. il est plutôt agressif sur son territoire et attaque sans réfléchir. Il se repère au bruit, il possède une ouïe surdéveloppée, il pourrait entendre une mouche à des centaines de mètres. Il se nourrit principalement de créatures vivant dans la terre.',
    text2:
      'Seul il n’est pas très dangereux, mais attention tout de même, il ne faut surtout pas baisser sa garde sinon ce serait prendre le risque de se faire planter par des griffes de dizaines de centimètres de long ou se faire croquer par une mâchoire de plus de 50 dents capable de broyer le métal.',
    text3:
      'Il est agile, il peut faire des bonds d’une douzaine de mètres, tout en restant stable pour porter une attaque en plein vol. Sa peau n’est pas très dure, il est assez facile de blesser cette créature et de la forcer à se replier. Mais attention, en bande ils auront plus confiance en eux et ne se contenteront pas de quelques blessures pour s’arrêter.',
    text4:
      'Perception accrue, Agilité accrue, Bonds, Machoîre capable de broyer le métal, Griffes acérées',
    dangerosity: '6/10',
    taille: '350/700',
    poids: '1300',
    known: false,
    monster: true,
    seen: false,
  },
  {
    name: 'Zorgul',
    image: 'zorgul.jpg',
    text1:
      'Un Zorgul est une entité spectrale extrêmement puissante qui vient hanter les cimetières. Il apparaît généralement entre 02h et 04h du matin pour se nourrir de la haine des morts. Les esprits ainsi consommés peuvent être invoqués par le Zorgul à son bon vouloir. Son apparition marque l’esprit des vivants pendant leur sommeil, en leur insinuant des cauchemars de mort violente ou de torture atroce. ',
    text2:
      'Il est sensible à la lumière et au feu, mais toute la difficulté est de s’approcher de cet être. Distorsion de réalité, sommeil profond, il possède de nombreuses compétences magiques permettant de tenir tout agresseur à distance. Si toutefois on réussit à l’approcher, son aura de gel limite toute action, et sa magie du chaos pénètre facilement les armures.',
    text3: '',
    text4:
      'Intangible, manipulation mentale, attaques psychiques, insinuation de peur/douleur, sommeil instantané, invocation d’esprits, aura de gel, souffle glacial, lances téléguidées de chaos, griffe de chaos, évasion interdimensionnelle',
    dangerosity: '8/10',
    taille: '280~350',
    poids: '0',
    known: false,
    monster: true,
    seen: true,
  },
  {
    name: 'Tribus autochtones',
    image: 'tribal.jpg',
    text1:
      'Peuple natif de Dravos qui s’est fait écraser par les Humains lors de leur arrivée sur le continent.' +
      'Comme les autres autochtones, ils ont une haine noire envers les Humains. Ils organisent souvent des attaques sur les convois ou pillent des villages à l’écart des grandes villes.',
    text2:
      'Il y a assez peu de survivants chez les autochtones, malgré tout ils continuent de mener la vie dure aux paysans Humains, quitte à être exterminés. Ne tenant plus à la vie, ils essayent de déstabiliser l’économie avec leur maigre moyens.',
    text3:
      'Nous n’avons pas encore remarqués de regroupement des différentes tribus.',
    text4:
      'En fonction de la tribu : (Bouyaka) Manipulation de réalité, (Titata) contrôle des bêtes de faible rang, (Kotalu) régénération, magie mineure',
    dangerosity: '2~3/10',
    taille: '140~180',
    poids: '50~90',
    known: false,
    monster: true,
    seen: true,
  },
  {
    name: 'Tot',
    image: 'tot.jpg',
    text1:
      'Tot le voleur de son surnom, il adore les objets brillants, un peu comme un corbeau. Tout ce qui brille finit sur lui puis dans une de ses cachettes. Il est très habile et à appris des sorts de dissimulation exclusivement pour voler. ',
    text2:
      'Quand il arrive dans une ville, il mémorise les rondes des gardes, teste la portée des sorts de détection de magie, trouve et crée des passages secrets, et une fois toutes les bases préparées, il pille tout ce qu’il peut avant de passer à une autre ville. Si la ville est trop grande il pille quartier après quartier. Ses victimes ne se rendent compte du vol qu’une fois Tot à une centaine de mètres, ce qui rend la chasse impossible.',
    text3:
      'On a déjà réussi à l’attraper plusieurs fois mais impossible de lui faire avouer l’emplacement des cachettes, et surtout il réussit à s’évader à chaque fois. Il faut le reconnaître, il a un vrai talent.',
    text4: 'Invisibilité, Perception et agilité exceptionnelles, Immunisé aux attaques mentales, Enfouissement, Manipulation',
    age: '23',
    taille: '99',
    poids: '19',
    known: false,
    seen: true,
  },
  {
    name: 'Jenko',
    image: 'jenko.jpg',
    text1: '',
    text2: '',
    text3: '',
    text4: 'Sacré (Soin, Boucliers, ???), Sombre (Décharge sombre, Manipulation, Augmentation physique, ???), Liaison mentale',
    age: '46',
    taille: '172',
    poids: '63',
    known: false,
    seen: true,
  },
  {
    name: 'Banshee',
    image: 'banshee.jpg',
    text1:
      'Esprit errant sur les terres. La banshee peut être seule ou en groupe. Elle n’est généralement pas agressive à moins de trop l’approcher ou de l’attaquer. Dans de rares cas des aventuriers furent attaqués par une Banshee, donc il ne faut pas hésiter à prendre ses précautions. Le cri de la Banshee est ravageur et peut tourmenter un être pendant des mois. Les victimes étant constamment sous état de choc finissent par se suicider.',
    text2:
      'La Banshee est un esprit donc intangible mais facilement contrable si l’on utilise la magie Psychique ou la magie Esprit. Prévoir des objets ou enchantement anti-bruits sous peine de subir le cri de la Banshee, pouvant affecter une cible à une centaine de mètres.',
    text3:
      'Elle peut apparaître tel un mirage dans les désert, son apparence humaine crée une parfaite illusion si on l’observe de loin, mais on peut distinguer la légère traînée bleutée que laisse la Banshee qui la fait se distinguer de tout être vivant.',
    text4: 'Cri strident, Intangible, Langage Esprit, Aura de froid',
    dangerosity: '4/10',
    taille: '???',
    poids: '0',
    known: false,
    monster: true,
    seen: false,
  },
  {
    name: 'Cultiste Eldrazi',
    image: 'cultist.jpg',
    text1:
      'Les cultistes Eldrazi ont choisis de vénérer comme dieux les Eldrazi. Le culte est apparu quelques décennies après l’arrivée sur Dravos, lors d’une attaque dévastatrice par une créature Eldrazi gigantesque. La découverte de ces derniers et de leur puissance a rassemblé un petit groupe de personne qui s’est agrandit d’années en années. Ils voient les Eldrazi comme des descendants direct des dieux. Chacune de leur engeances est sacré pour eux. C’est pourquoi ils mènent des manifestations et ils sabotent les opérations lorsqu’elles sont liées à l’avancée du front au nord. On parle même d’assassinats de leur part mais aucune preuve n’as été avancée. Ils convertissent de plus en plus de monde, surtout dans les petits villages. ',
    text2:
      'De temps en temps le culte fait des pèlerinages dans les forêts Eldrazis, en sacrifice pour ces derniers. Parfois les soldats s’en servent pour exterminer des groupes d’Eldrazis regroupés pour manger les sacrifiés, ce qui rend la relation entre le culte et l’armée très difficile. ',
    text3:
      'Pour l’instant le culte ne prospèrent que dans les petites villes et villages, mais apparemment ils auraient établit une base à Hystrou. En tout cas, l’apparition du culte présage toujours de mauvaises nouvelles.',
    text4: '',
    age: '???',
    taille: '???',
    poids: '???',
    known: false,
    monster: true,
  },
  {
    name: 'Assassin',
    image: 'assassin.jpg',
    text1: 'Un assassin déguisé sous l’emblème des Plague Doctors.',
    text2: '',
    text3: '',
    text4: '',
    age: '???',
    taille: '173',
    poids: '64',
    known: false,
    monster: true,
  },
  {
    name: 'Taton & Sacahe',
    image: 'taton_sacahe.png',
    text1:
      'Les Tatons et les Sacahes sont deux espèces très proches. Elles forment des duos de chasse jusqu’à des dizaines de kilomètres de leur foyer. Chaque duo est composé d’un Taton et d’un Sacahe, le Taton faisant l’appât tandis que le Sacahe se met en position, prêt à sauter sur leur proie.',
    text2:
      'Ils ont tous les deux une capacité régénératrice puissante, qui leur permet de décupler leur puissance jusqu’à une certaine limite. Elle ne s’enclenche qu’après avoir subis des blessures. Le Taton gagne en force et en résistance tandis que le Sacahe gagne en force, agilité et rapidité. C’est pourquoi le Taton fait l’appât; dans tous les cas, ils ne subiront que très peu de dégâts avec leur capacité.',
    text3:
      'Ils chassent assez pour nourrir leur famille pendant plusieurs semaine avant de retrouver leur foyer. Les Tatons fabriquent de grande toiles pour embarquer la viande pendant que les Sacahe coupent et préparent la viande.',
    text4: "Taton: Régénération majeure, Force et constitution accrues, Prise d'aggression; Sacahe: Régénération, Force et agilité accrues, Griffes acérées, Bonds, Inaudible si caché",
    dangerosity: '6~7/10, 7~8/10',
    taille: '180~360, 160~250',
    poids: '250~500, 80~110',
    known: false,
    monster: true,
  },
  {
    name: 'Serf',
    image: 'serf.jpg',
    text1:
      "Combattante cornu faisant partie des rebelles, Sert est venu au tournoi pour essayer de remporter la première place au prix de sa vie. L’argent promis au gagnant permettront à sa cause de grandir et d’avoir plus d’influence. Ils pourront sûrement porter atteinte à la communauté peu après sa victoire, grâce au sort d'Apothéose, c’est pourquoi il est très important pour eux qu’elle gagne.",
    text2:
      'Evidemment, les autorités pensent qu’elle est une cornue normale et chercher juste à gagner de l’argent, comme les autres participants…',
    text3:
      'Elle fait partie des meilleurs combattants cornus rebelles parmi les nouvelles recrues, elle a suffisamment fait ses preuves pour qu’ils laissent une recrue participer à ce tournoi.',
    text4: '',
    age: '75',
    taille: '182',
    poids: '67',
    known: false,
    monster: true,
  },
  {
    name: 'Gnolls',
    image: 'gnoll.jpg',
    text1:
      "Les Gnolls sont des créatures féroces de l’Est. Elles sont agressives et vicieuses; elles n'attaquent pas à moins d’être sûr de gagner. Elles vivent sur des Terres arides, en meute. Les meutes peuvent se rassembler pour créer une Waaaagh, lorsque plusieurs chef des meutes s’allient. Pour cela, il faut qu’un chef de meute montre sa puissance en combat. Les meutes se rallient si un des chefs combattant se démarque beaucoup des autres, attirant l’admiration et le respect de la foule.",
    text2:
      'Pièges, attaque sournoise, embuscade, ces créatures sont intelligentes. S’aventurer sur leur territoire n’est pas chose aisé. Elle attaquent le plus souvent quand leurs proies dorment tranquillement.  Elles sont équipées d’armures et de lames usées, récupérées sur les champs de bataille. Généralement, ils portent des armes de combat rapproché.',
    text3: '',
    text4:
      'Force accrue, dextérité accrue, perception accrue, sens du respect, magies mineures',
    dangerosity: '3~4/10',
    taille: '130~180',
    poids: '50~70',
    known: false,
    monster: true,
  },
  {
    name: 'Chef Gnoll: Rwokrwoka',
    image: 'gnoll_chief.jpg',
    text1:
      'Puissant chef de meute, il a participé à plusieurs Waaaagh et à toujours su rallier ses troupes. Combattant vétéran, il utilise une masse d’arme capable de briser n’importe quelle armure.',
    text2: '',
    text3: 'Il porte un anneau étrange sur sa annulaire gauche.',
    text4:
      'Force accrue, dextérité accrue, perception accrue, aura de feu,  souffle de flammes, stabilité, peau de roche, résistance mentale accrue',
    dangerosity: '7/10',
    taille: '210',
    poids: '90',
    known: false,
    monster: true,
  },
];

export const tempoImagesList = ['noTown.jpg', 'desert.jpg', 'cavern.jpg'];
export const bonusList = [-30, -20, -10, 0, 10, 20, 30];

export const chatDices = [
  {
    attribute: 'stre',
    image: './common/dice_red.jpg',
    alt: 'Strength dice',
    tip: 'Strength',
  },
  {
    attribute: 'dext',
    image: './common/dice_green.jpg',
    alt: 'Dexterity dice',
    tip: 'Dexterity',
  },
  {
    attribute: 'perc',
    image: './common/dice_orange.jpg',
    alt: 'Perception dice',
    tip: 'Perception',
  },
  {
    attribute: 'magi',
    image: './common/dice_purple.jpg',
    alt: 'Magic dice',
    tip: 'Magic',
  },
  {
    attribute: 'cons',
    image: './common/dice_blue.jpg',
    alt: 'Constitution dice',
    tip: 'Constitution',
  },
  {
    attribute: 'char',
    image: './common/dice_black.jpg',
    alt: 'Charisma dice',
    tip: 'Charisma',
  },
  {
    attribute: 'luck',
    image: './common/dice_yellow.jpg',
    alt: 'Luck dice',
    tip: 'Luck',
  },
  {
    attribute: 'educ',
    image: './common/dice_white.jpg',
    alt: 'Education dice',
    tip: 'Education',
  },
];

export const bestiaryFilters = ['All', 'Monster', 'PNJ'];
export const bestiaryOrderByType = ['None', 'Monster', 'PNJ'];
export const bestiaryOrderBy = [
  'Default',
  'Alphabetical',
  'Reversed alphabetical',
  'Knowledge',
  'Reversed knowledge',
];

export const initialBestiaryPanel = {
  selectedFilter: 'All',
  selectedOrderBy: 'Default',
  selectedOrderByType: 'None',
  filteredBestiary: [],
  selectedBeast: -1,
  isOnForm: false,
  name: '',
  monster: true,
  image: '',
  text1: '',
  text2: '',
  text3: '',
  text4: '',
  age: '',
  taille: '',
  poids: '',
  known: false,
  dangerosity: '',
};