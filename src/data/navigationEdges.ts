export type NavEdge = {
  from: string;
  to: string;
};

export const NAV_EDGES: NavEdge[] = [
  /* Railway station flow */
  { from: "railwayStation", to: "railwayGate" },

  /* Railway gate → Outer road */
  { from: "railwayGate", to: "roadBend1" },
  { from: "roadBend1", to: "roadBend2" },
  { from: "roadBend2", to: "mainGate" },

  /* Main gate → Campus gates */
  { from: "mainGate", to: "exitGate1" },
  { from: "exitGate1", to: "exitGate" },

  /* Exit gate → Church road */
  { from: "exitGate", to: "churchTurn1" },
  { from: "churchTurn1", to: "churchTurn2" },
  { from: "churchTurn2", to: "churchTurn3" },
  { from: "churchTurn3", to: "churchTurn4" },
  { from: "churchTurn4", to: "churchTurn5" },
  { from: "churchTurn5", to: "libaEntrance" },

  // ---------------- INNER CAMPUS FLOW ----------------

  { from: "railwayGate", to: "railwayInnerTop" },
  { from: "railwayInnerTop", to: "railwayInnerMid" },
  { from: "railwayInnerMid", to: "dataScienceNode" },
  { from: "dataScienceNode", to: "dataScienceNode1" },
  { from: "dataScienceNode", to: "junctionNode" },
  { from: "junctionNode", to: "MainRoad" },
  { from: "jubileeNode", to: "MainRoad" },
  { from: "jubileeNode", to: "MainRoad1" },
  { from: "library", to: "MainRoad1" },
  { from: "library", to: "jubileeNode" },
  { from: "Canteen1", to: "MainRoad1" },
    { from: "Canteen", to: "Canteen1" },
  { from: "Canteen", to: "jubileeBack" },
  { from: "Commerce", to: "MainRoad1" },
  { from: "MainRoad1", to: "libraryNode" },
  // ---------------- All in All ----------------
  { from: "dataScienceNode", to: "dataScienceBuilding" },
  { from: "dataScienceNode", to: "ViscomBuilding" },
  { from: "Chemistry", to: "junctionNode" },
  { from: "AdminisBuilding", to: "junctionNode" },
  { from: "AdminisBuilding", to: "adminRight" },
  { from: "junctionNode", to: "Jubilee" },
  { from: "junctionNode", to: "Main" },
  { from: "Jubileebuild", to: "MainRoad" },
  { from: "jubileeNode", to: "Jubilee1" },
  { from: "jubileeNode", to: "Main1" },
  { from: "MainRoad", to: "Jubilee" },
  { from: "MainRoad", to: "MainRoad2" },
  { from: "MainRoad", to: "Jubilee1" },
  { from: "MainRoad", to: "Main" },
  { from: "MainRoad", to: "Main1" },
  { from: "Commerce", to: "libraryNode" },
  // ---------------- SIDE ROADS ----------------

  { from: "railwayInnerMid", to: "viscomLeft" },
  { from: "viscomLeft", to: "clubTop" },
  { from: "clubTop", to: "clubMid" },
  { from: "clubMid", to: "chemistryLeft" },
  { from: "chemistryLeft", to: "junctionNode" },
  { from: "junctionNode", to: "adminRight" },
  { from: "adminRight", to: "loyolaStatue" },
  { from: "centenaryBottom", to: "centenaryBottom1" },
   { from: "centenaryBottom1", to: "jubileeNode" },
  { from: "adminRight", to: "dataScienceNode1" },
  { from: "jubileeBack", to: "chemistryLeft1" },
   { from: "chemistryLeft", to: "chemistryLeft1" },
  { from: "jubileeBack", to: "jubileeNode" },

  // ---------------- STATUE LOGIC (VERY IMPORTANT) ----------------

  { from: "mainGate", to: "loyolaStatue" },
  { from: "loyolaStatue", to: "statueJunction" },
  { from: "loyolaStatue", to: "centenaryTop" },
  { from: "statueJunction1", to: "exitGate1" },
  // ---------------- CENTENARY PARK SPINE ----------------

  { from: "centenaryTop", to: "centenaryBottom" },
  { from: "statueJunction", to: "centenaryTop" },
  { from: "statueJunction", to: "adminRight" },
  { from: "statueJunction1", to: "centenaryTop" },

  // ---------------- CHURCH CONNECTIVITY ----------------

  { from: "libraryNode", to: "churchFront" },
  { from: "libraryNode", to: "loho" },
  { from: "Teakwood", to: "loho" },
  { from: "Teakwood", to: "Inigo" },
  { from: "church", to: "churchFront" },
  { from: "centenary", to: "centenaryBottom" },
  { from: "church", to: "centenary" },
  // ---------------- RESIDENCY CONNECTION ----------------

  { from: "statueJunction1", to: "jesuitsResidency" },
  /* Church Front Horizontal */
  { from: "libraryNode", to: "churchFront" },
  /* Basketball Vertical */

  { from: "churchFront", to: "churchBottom" },
  { from: "basketball", to: "basketballBottom" },
  { from: "volleyball", to: "churchBottom" },
  { from: "volleyball", to: "basketballBottom" },
  /* Basketball → Fields */
  /* Lovers Park Main Vertical */
  { from: "church", to: "footballCurve" },
  { from: "footballCurve1", to: "Park" },
  { from: "Park", to: "footballCurve" },
  /* Lovers Park → Fields */

  { from: "loversParkBottom", to: "footballCurve1" },
  /* B.Ed Branch */
  { from: "footballCurve1", to: "BEd" },
  { from: "BEd", to: "bedRight" },
  /* LIBA Vertical Road */
  { from: "basketballBottom", to: "footballBottom" },
  { from: "footballBottom", to: "loversParkBottom" },
  { from: "loversParkBottom", to: "libaFrontMid" },
  /* Old LIBA Horizontal */
  { from: "libaVerticalMid", to: "oldLibaRight" },

  /* Women Hostel Curve Road */
  { from: "libaVerticalMid", to: "womenHostelJoin" },

  /* Women Hostel → LIBA Entrance */
  { from: "womenHostelJoin", to: "libaEntranceTop" },

  /* LIBA Entrance Vertical */

  /* LICET Horizontal Axis */
  { from: "basketballBottom", to: "licetEntrance1" },
  /* Hostel Vertical */
  { from: "libaEntranceTop", to: "libaEntrance" },
  { from: "hostelLeft", to: "licetEntrance1" },
  { from: "licetEntrance", to: "licetEntrance1" },
  { from: "licetEntrance", to: "libaEntrance1" },
  { from: "libaEntranceTop", to: "libaEntrance1" },
  { from: "hostelLeft", to: "hostelBottom" },

  /* Hostel → Far Left */
  { from: "hostelLeft", to: "loho2" },
  { from: "loho2", to: "hostelFarLeft" },
  // LIBA front connection
  { from: "libaVerticalMid", to: "libaFrontMid" },
//  { from: "licetEntrance1", to: "licet" },
 // { from: "licetEntrance", to: "licet" },
  // LOHO admin connector

  { from: "lohoAdmin", to: "libraryNode" },
  { from: "lohoAdmin", to: "loho" },
  { from: "BEd", to: "bedRight" },
  { from: "oldLibaRight", to: "LibaCanteen" },
];
