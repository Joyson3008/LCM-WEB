export type NavNode = {
  id: string;
  x: number;
  y: number;
};

export const NAV_NODES: Record<string, NavNode> = {
  /* 🚉 Railway Side */
  railwayStation: { id: "railwayStation", x: 89.9401, y: 44 },
  railwayGate: { id: "railwayGate", x: 139.44, y: 64 },

  /* Inner Vertical Railway Road */
  railwayInnerTop: { id: "railwayInnerTop", x: 140.94, y: 62.5 },
  railwayInnerMid: { id: "railwayInnerMid", x: 140.94, y: 121.5 },
  /* All buildings */
  dataScienceBuilding: { id: "dataScience", x: 141, y: 143 },
  ViscomBuilding: { id: "viscom", x: 140, y: 133 },
  Chemistry: { id: "Chemistry", x: 120, y: 210 },
  AdminisBuilding: { id: "Administrative", x: 155, y: 204 },
  Jubilee: { id: "Jubilee", x: 143, y: 229 },
  Jubileebuild: { id: "Jubileebuild", x: 110, y: 249 },
  Jubilee1: { id: "Jubilee1", x: 143, y: 269 },
  Main: { id: "Main", x: 143, y: 229 },
  Main1: { id: "Main1", x: 143, y: 269 },
  MainRoad: { id: "MainRoad", x: 142.97, y: 251.194 },
  MainRoad2: { id: "MainRoad2", x: 156.97, y: 251.194 },
  MainRoad1: { id: "MainRoad1", x: 142.97, y: 325 },
  Canteen: { id: "Canteen", x: 88.97, y: 322 },
    Canteen1: { id: "Canteen1", x: 118.97, y: 324 },
  library: { id: "library", x: 140.97, y: 308 },
  Commerce: { id: "Commerce", x: 142.97, y: 340 },
  Park: { id: "Park", x: 278, y: 430 },
  /* Data Science Junction */
  dataScienceNode: { id: "dataScienceNode", x: 142.97, y: 163 },
  dataScienceNode1: { id: "dataScienceNode1", x: 168.97, y: 169 },
  junctionNode: { id: "junctionNode", x: 142.97, y: 211.194 },

  /* Jubilee / Library Axis */
  jubileeNode: { id: "jubileeNode", x: 143.754, y: 283.409 },
  libraryNode: { id: "libraryNode", x: 145.44, y: 363.25 },

  /* Outer Roads */
  roadBend1: { id: "roadBend1", x: 179.846, y: 103.646 },
  roadBend2: { id: "roadBend2", x: 216.94, y: 173.5 },
  mainGate: { id: "mainGate", x: 238.401, y: 214.5 },
  exitGate1: { id: "exitGate1", x: 279.94, y: 284 },
  exitGate: { id: "exitGate", x: 328.19, y: 341.25 },

  /* Church Road Chain */
  churchTurn1: { id: "churchTurn1", x: 346.44, y: 358.5 },
  churchTurn2: { id: "churchTurn2", x: 386.44, y: 394.5 },
  churchTurn3: { id: "churchTurn3", x: 389.94, y: 427.5 },
  churchTurn4: { id: "churchTurn4", x: 377.44, y: 522 },
  churchTurn5: { id: "churchTurn5", x: 373.94, y: 634.5 },
  libaEntrance: { id: "libaEntrance", x: 205.44, y: 619 },
  libaEntrance1: { id: "libaEntrance1", x: 176, y: 595 },
  licetEntrance: { id: "licetEntrance", x: 172.5, y: 545 },
  licetEntrance1: { id: "licetEntrance1", x: 172.5, y: 503 },
  // -------- INNER CAMPUS ROADS --------
  viscomLeft: { id: "viscomLeft", x: 96.4401, y: 123.5 },
  clubTop: { id: "clubTop", x: 97.4401, y: 158 },
  clubMid: { id: "clubMid", x: 93.4401, y: 187 },
  jubileeBack: { id: "jubileeBack", x: 88.4494, y: 282.5 },
  chemistryLeft: { id: "chemistryLeft", x: 90.377, y: 212.194 },
    chemistryLeft1: { id: "chemistryLeft1", x: 90.377, y: 242.194 },
  adminRight: { id: "adminRight", x: 172.421, y: 213.963 },
  // -------- CRITICAL ROUTING NODES --------
  loyolaStatue: { id: "loyolaStatue", x: 203.127, y: 233.397 },
  statueJunction: { id: "statueJunction", x: 179.127, y: 245.897 },
  statueJunction1: { id: "statueJunction1", x: 240, y: 276.897 },
  centenaryTop: { id: "centenaryTop", x: 204.138, y: 263.372 },
  centenaryBottom: { id: "centenaryBottom", x: 204.813, y: 283.397 },
  centenaryBottom1: { id: "centenaryBottom1", x: 174.813, y: 283.397 },
   centenary: { id: "centenary", x: 206, y: 324 },
  churchFront: { id: "churchFront", x: 191.44, y: 369 },
  church: { id: "church", x: 207.127, y: 362.397 },
  jesuitsResidency: { id: "jesuitsResidency", x: 225.029, y: 308.145 },
  basketballBottom: { id: "basketballBottom", x: 190.44, y: 501.5 },
   churchBottom: { id: "churchBottom", x: 190.44, y: 401.5 },
    basketball: { id: "basketball", x: 190.44, y: 461.5 },
       volleyball: { id: "volleyball", x: 190.44, y: 431.5 },
  footballBottom: { id: "footballBottom", x: 230.44, y: 501.5 },
  /* ❤️ Lovers Park Vertical */
  loversParkBottom: { id: "loversParkBottom", x: 278.94, y: 501 },
  footballCurve: { id: "footballCurve", x: 272, y: 371 },
  footballCurve1: { id: "footballCurve1", x: 278, y: 480 },
  /* 🏫 B.Ed Branch */
  bedRight: { id: "bedRight", x: 349.756, y: 478.551 },
  BEd: { id: "BEd", x: 309.756, y: 478.551 },
  /* 🏫 LIBA Vertical & Old LIBA Road */
  libaVerticalMid: { id: "libaVerticalMid", x: 279.895, y: 581.5 },
  oldLibaRight: { id: "oldLibaRight", x: 330.94, y: 583 },
  LibaCanteen: { id: "LibaCanteen", x: 330.94, y: 553 },
  /* 🚪 LIBA Entrance Area */
  libaEntranceTop: { id: "libaEntranceTop", x: 203.94, y: 604 },
  womenHostelJoin: { id: "womenHostelJoin", x: 240.972, y: 600.27 },
  /* 🏫 LICET Axis */
  hostelLeft: { id: "hostelLeft", x: 138.44, y: 503.5 },
  hostelBottom: { id: "hostelBottom", x: 137.44, y: 479.5 },
  Inigo: { id: "Inigo", x: 137.44, y: 440.5 },
  Teakwood: { id: "Teakwood", x: 135, y: 420.5 },
  Teakwood1: { id: "Teakwood1", x: 135, y: 420.5 },
  hostelFarLeft: { id: "hostelFarLeft", x: 90.4401, y: 503.5 },
  loho2: { id: "loho2", x: 110.4401, y: 503.5 },
  // LICET curve helper
  //licet: { id: "licet", x: 154.94, y: 544.5 },
  // LIBA front road
  libaFrontMid: { id: "libaFrontMid", x: 280.024, y: 541.418 },
  // LOHO admin connector
  lohoAdmin: { id: "lohoAdmin", x: 156.757, y: 385.5 },
  loho: { id: "loho", x: 134.757, y: 385.5 },




  
};
