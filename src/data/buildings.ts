// data/buildings.ts
export type Building = {
  id: string | number;
  name: string;
  description?: string;
  images?: any[];
  nodeId?: string;

  /* NEW – search aliases */
  aliases?: string[];

  floors?: {
    floor: string;
    places: string[];
  }[];

  x?: number;
  y?: number;
};

export const BUILDINGS: Building[] = [
  {
    id: "main",
    name: "MAIN BUILDING",

    aliases: [
      "main",
      "main block",
      "administration main",
      "arts building",
      "arts block",
      "english department",
      "tamil department",
      "history department",
      "sanskrit department",
      "sociology department",
      "students office",
      "placement cell",
      "training placement",
      "dean office",
      "vice principal office",
      "cms counter",
      "network room",
      "staff common room",
      "language department",
      "french department",
      "hindi department",
      "foreign language",
      "school of human excellence",
      "outreach department",
    ],

    nodeId: "MainRoad2",
    x: 142.97,
    y: 251.194,

    description:
      "Central administrative and academic block housing multiple departments, offices, student facilities, and service units.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260984/main_building1_zxxg8w.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261034/mainbuilding3_wexgws.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Department of Tamil (Shift 1 & Shift 2)",
          "Department of English – Shift 1",
          "Staff Common Room",
          "Staff Association Room",
          "Department of History",
          "Department of Sanskrit",
          "Department of Physical Education",
          "Students Common Room",
          "Network Room",
          "CMS Counter",
          "Vice Principal Room",
          "Vice Principal – Shift 1 (Admin)",
          "Internet Complaints Committee (ICC)",
          "Women Staff Common Room",
          "Office of Media Relations",
          "Training & Placement Cell Office",
          "Dean of Students",
          "Dean of Students – Shift 2",
          "Loyola Students' Counsel",
          "Dean of Women Students Room",
          "Research Scholars Room (English)",
          "Non-Teaching Staff Room",
          "Department of Sociology (Shift 2)",

          /* ✅ NEW ADDED */
          "Office of the Dean of Human Excellence",
          "Department of Sociology (Shift 1)",
        ],
      },

      {
        floor: "First Floor",
        places: [
          /* EXISTING */
          "Department of Hindi",
          "Foreign Language Department",
          "French",
          "Department of English – Shift 2",
          "Dean of Arts & Science",

          /* ✅ UPDATED MF ROOMS */
          "MF 01 – Hindi",
          "MF 02 – Foreign Language",
          "MF 03 – Service Learning",

          "MF 10, 11, 12, 13, 14, 15, 16 – Classrooms",
        ],
      },

      {
        floor: "Second Floor",
        places: [
          /* EXISTING */
          "Department of Service Learning (Outreach)",
          "School of Human Excellence",

          /* ✅ UPDATED MS ROOMS */
          "MS 01, 02, 03, 05, 07, 08, 09 – Classrooms",
          "MS 04 – School of Human Excellence",
          "MS 06 – Loyola Hall of Fame",
        ],
      },
    ],
  },

  {
    id: "chemistry",
    name: "CHEMISTRY BUILDING",

    aliases: [
      "chemistry",
      "chemistry block",
      "chem block",
      "chem",
      "chem lab",
      "chemistry lab",
      "food chemistry",
      "food chemistry lab",
      "chemistry department",
      "chem dept",
      "m sc lab",
      "msc lab",
      "research lab chemistry",
      "ug lab chemistry",
      "yd hall",
      "smart room chemistry",
      "social work department",
      "department of chemistry",
    ],

    nodeId: "Chemistry",
    x: 120,
    y: 204,

    description:
      "Chemistry Building with labs, classrooms, department facilities, and research spaces across multiple floors.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260901/chemistry_itlgbz.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor Backside",
        places: ["Department of Social work"],
      },
      {
        floor: "Ground Floor",
        places: [
          "HOD Room(Chemistry)",
          "Staff Room",
          "M.Sc Lab",
          "Research Lab",
          "Food Chemistry Lab",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Department of Social Work",
          "Food Chemistry Staff Room",
          "Department of Food Chemistry and Processing (Shift 2)",
          "Department of Chemistry",
          "Staff Room 2",
          "Department Library",
          "YD Hall",
          "UG Lab",
          "Smart Room",
        ],
      },
      {
        floor: "Second Floor",
        places: ["Department of Chemistry Classroom", "UG Lab"],
      },
    ],
  },

  {
    id: "library",
    name: "LIBRARY-BERTRAM HALL-XEROX SHOP",

    aliases: [
      "library",
      "lib",
      "main library",
      "bertram hall",
      "bertram square",
      "reading hall",
      "study hall",
      "books",
      "reference section",
      "book lending",
      "xerox",
      "printing",
      "photocopy",
      "xerox shop",
      "library reading area",
    ],

    nodeId: "library",
    x: 120,
    y: 340,

    description:
      "Central Library building providing academic resources, reading halls, and seminar facilities for students and faculty.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260903/bertram_hall_xivja6.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772466144/libraryIn_e8kmbz.png",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261225/xerox_ym3jy6.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Bertram Square",
          "Main Library Reading Area",
          "Reference Section",
          "Book Lending",
          "Xerox shop",
        ],
      },
      {
        floor: "First Floor",
        places: ["Bertram Hall"],
      },
    ],
  },

  {
    id: "Administration",
    name: "JEROME D'SOUZA ADMINISTRATIVE BLOCK",

    aliases: [
      "admin",
      "administration",
      "administrative block",
      "jd block",
      "jerome dsouza",
      "principal office",
      "college office",
      "secretary office",
      "correspondent office",
      "bursar office",
      "alumni office",
      "iqac",
      "research dean",
      "conference hall",
      "counselling centre",
      "controller of examinations",
      "exam office",
      "jd hall",
    ],

    nodeId: "adminRight",

    description:
      "Central administrative hub housing the Principal’s Office, examination section, research administration, alumni coordination, and key institutional governance offices.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260872/adminis_lpfd3i.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Secretary & Correspondent",
          "Principal’s Office",
          "College Office (Shift 1)",
          "Deputy Principal (shift 1)",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Bursar Office",
          "Loyola Alumni Association",
          "Conference Hall",
          "Dean of Research",
          "IQAC (Internal Quality Assurance Cell)",
          "Counselling Centre",
        ],
      },
      {
        floor: "Second Floor",
        places: ["Controller of Examinations", "Jerome D'Souza Hall (JD Hall)"],
      },
    ],
  },

  {
    id: "Licet hostel",
    name: "LOHO-2(LICET HOSTEL)",

    aliases: [
      "licet hostel",
      "loho2",
      "loho 2",
      "licet accommodation",
      "engineering hostel",
      "hostel licet",
      "student hostel licet",
    ],

    description:
      "Residential hostel facility for LICET students offering secure accommodation, study-friendly spaces, and essential residential amenities within the campus.",

    nodeId: "licetEntrance",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261080/loho2_azpdgc.jpg",
    ],
  },

  {
    id: "Jub_mess",
    name: "LOYOLA MEN'S HOSTEL (JUBILEE MESS)",

    aliases: [
      "jubilee mess",
      "mess",
      "hostel mess",
      "loyola mess",
      "jub mess",
      "hostel dining",
      "hostel food",
    ],

    description:
      "Primary dining hall serving nutritious and hygienic meals to hostel residents in a spacious and organized environment.",

    nodeId: "hostelBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260978/jub_mess_mumjzu.jpg",
    ],
  },
  {
    id: "Centenary building",
    name: "CENTENARY BUILDING",

    aliases: ["centenary", "centenary block", "Social Work"],

    description: "This block is in under construction.",

    nodeId: "clubTop",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260972/law_jdoxgj.jpg",
    ],
  },

  {
    id: "Jesuit's building",
    name: "JESUIT'S BUILDING",

    aliases: [
      "jesuit",
      "jesuit building",
      "jesuits residence",
      "priests residence",
      "jesuit house",
    ],

    description:
      "Institutional building associated with Jesuit community members supporting administrative, spiritual, and academic responsibilities within the campus.",

    nodeId: "railwayInnerMid",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260962/jesuits_ewfl07.jpg",
    ],
  },

  {
    id: "data-science",
    name: "MCA BUILDING",

    aliases: [
      "mca",
      "mca block",
      "data science",
      "ds building",
      "data science department",
      "robotics lab",
      "robotics",
      "international relations",
      "ir department",
      "counselling psychology",
      "psychology department",
      "limcos",
      "erp",
      "it support",
      "computer lab",
      "language lab",
    ],

    nodeId: "dataScienceBuilding",

    description:
      "Interdisciplinary academic block housing Data Science, International Relations, Counselling Psychology, MCA facilities, and advanced laboratory services.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261127/data_g3asnh.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Language Lab",
          "Arulanandam Computer Lab",
          "Enterprise Resource Planning (ERP)",
          "Loyola IT Support Services",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Department of International Relations",
          "Women's Restroom",
          "Smart Room",
          "LIMCOS",
          "MCA Hall",
        ],
      },
      {
        floor: "Second Floor",
        places: [
          "Department of Counselling Psychology",
          "Jesuit Worldwide Learning",
        ],
      },
      {
        floor: "Third Floor",
        places: ["Robotics Lab", "Department of Data Science", "Store Room"],
      },
    ],
  },
  {
    id: "bank-post",
    name: "BANK AND POST OFFICE BUILDING",

    aliases: [
      "bank",
      "post office",
      "atm",
      "bank building",
      "campus bank",
      "student bank",
      "bank service",
      "postal service",
      "post",
      "mail service",
      "guest house",
      "guest support",
      "ncca",
      "financial services",
    ],

    nodeId: "dataScienceNode1",

    description:
      "Campus service building housing banking facilities, post office services, guest support areas, and student utility services for convenient financial and administrative access.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261185/post_yntvev.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260870/bank_x7lg4u.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260963/guest_ccz4u3.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261141/ncca_mp2jhc.jpg",
    ],
  },
  {
    id: "commerce-economics",
    name: "COMMERCE AND ECONOMICS BUILDING",

    aliases: [
      "commerce",
      "commerce block",
      "economics",
      "economics department",
      "commerce department",
      "bba department",
      "bba",
      "finance",
      "finance lab",
      "corporate secretaryship",
      "bcom cs",
      "bcom honours",
      "bcom accounting",
      "bcom finance",
      "bcom computer application",
      "liac",
      "loyola international academic collaboration",
      "beschi hall",
      "commerce library",
      "lsss",
      "student support services",
    ],

    nodeId: "Commerce",

    description:
      "Major academic block accommodating the Departments of Economics, Commerce, BBA, Corporate Secretaryship, Finance, LIAC and related administrative offices with dedicated classrooms, labs, and faculty spaces.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260088/comEco_snbzfu.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260050/comEco1_g697qv.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "DP Office",
          "Admit Card Section",
          "Department of Economics",
          "Economics Shift 2",
          "Pondicherry University-Loyola College Society(PU-LCS)",
          "Resource Centre for Differently Abled (Benjamin Chemin)",
          "LEAD",
          "Xavier Britto",
          "College Office Shift 2",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Loyola Student Support Services(LSSS)",
          "Department of Commerce (Shift 1)",
          "Commerce Staff Room",
          "Vice Principal (Discipline)",
        ],
      },
      {
        floor: "Second Floor",
        places: [
          "Department of BBA",
          "Live Classroom",
          "Department of Commerce (Shift 2)",
        ],
      },
      {
        floor: "Third Floor",
        places: [
          "Finance Lab",
          "Beschi Hall",
          "Commerce Library",
          "Department of Corporate Secretaryship(B.com cs)",
        ],
      },
      {
        floor: "Fourth Floor",
        places: [
          "B.com Honours",
          "LIAC-Loyola International Academic Collabration",
          "B.com Accounting & Finance",
          "B.com Computer Application",
        ],
      },
    ],
  },

  {
    id: "B.Ed college building",
    name: "B.Ed COLLEGE BUILDING",

    aliases: [
      "bed",
      "b.ed",
      "bed college",
      "teacher training",
      "teacher education",
      "education department",
      "teaching course",
      "teacher training hall",
      "education research",
      "bed administrative office",
    ],

    nodeId: "BEd",

    description:
      "Academic facility dedicated to teacher education programs, including classrooms, training halls, and educational research spaces.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260918/Bed_college_td6so5.jpg",
    ],

    floors: [
      {
        floor: "Courses",
        places: [
          "B.Ed Administrative Office",
          "Teacher Training Hall",
          "Educational Research Centre",
          "Tamil Department",
          "English Department",
          "Mathematics Department",
          "Physical Science Department",
          "Biological Science Department",
          "History Department",
          "Commerce Department",
          "Computer Science Department",
        ],
      },
    ],
  },

  {
    id: "liba-building",
    name: "LIBA BUILDING",

    aliases: [
      "liba",
      "loyola institute of business administration",
      "mba",
      "management department",
      "management studies",
      "business administration",
      "liba library",
      "inigo courtyard",
      "xavier britto auditorium",
      "auditorium liba",
    ],

    nodeId: "libaFrontMid",

    description:
      "LIBA (Loyola Institute of Business Administration) academic and administrative block housing management classrooms, faculty offices, library facilities, activity spaces, and the Xavier Britto Auditorium.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260974/liba_zy7wsg.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Reception",
          "Faculty Offices",
          "Dean Offices",
          "Director's Office",
          "Inigo Courtyard",
          "LIBA Library",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Library Extension",
          "Regular Classrooms",
          "Activity Rooms",
          "Meeting Rooms",
          "Combined Classroom",
          "First Year Classrooms",
        ],
      },
      {
        floor: "Second Floor",
        places: ["Xavier Britto Auditorium", "Computer Examination Rooms"],
      },
      {
        floor: "Third Floor",
        places: [
          "Regular Classrooms",
          "Activity Rooms",
          "Meeting Rooms",
          "Combined Classroom",
          "Second Year Classrooms",
        ],
      },
    ],
  },

  {
    id: "Women's Hostel building",
    name: "WOMEN'S HOSTEL",

    aliases: [
      "women hostel",
      "ladies hostel",
      "girls hostel",
      "women residence",
      "hostel for women",
      "female hostel",
      "ladies accommodation",
    ],

    description:
      "Residential hostel for women students providing safe accommodation, study areas, dining access, and essential support facilities.",

    nodeId: "libaVerticalMid",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261206/womensLH_rydutu.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261209/womensLH1_a5llsl.jpg",
    ],
  },

  {
    id: "Eat Right Canteen",
    name: "EAT RIGHT CANTEEN",

    aliases: [
      "canteen",
      "eat right",
      "food court",
      "food stall",
      "student canteen",
      "campus food",
      "tea shop",
      "snacks",
      "staff dining",
    ],

    description:
      "Campus food outlet promoting healthy and hygienic dining options for students, faculty, and visitors.",

    nodeId: "jubileeBack",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260935/eatRight_lkpqu3.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261199/staffDr_crgial.jpg",
    ],
  },

  {
    id: "Club building",
    name: "CLUBS – XEROX – STATIONERY – LOYOLA HEALTH CARE (LHC)",

    aliases: [
      "clubs",
      "club building",
      "student clubs",
      "ncc",
      "nss",
      "debating club",
      "red cross",
      "xerox",
      "xerox centre",
      "stationery",
      "co operative store",
      "health care",
      "lhc",
      "loyola health care",
      "medical room",
      "first aid",
    ],

    description:
      "Multi-purpose campus facility housing student clubs and activity units along with xerox and stationery services, and Loyola Health Care providing basic medical support and first-aid assistance to students and staff.",

    nodeId: "clubMid",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260074/army_dxovjr.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260045/clubs1_njqivf.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261133/ncc1_t4qvef.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261160/nss_m2cmwx.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261248/NCC_dcd9jb.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261222/xerox1_mhipot.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260102/co-store_yohax1.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260923/enviro_gyddfu.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261146/ncda_yzrhf8.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260941/health_yxw03u.jpg",
    ],
  },

  {
    id: "Men's Hostel building",
    name: "MEN'S HOSTEL(A BLOCK)",

    aliases: [
      "mens hostel",
      "boys hostel",
      "hostel a block",
      "a block hostel",
      "male hostel",
      "student hostel",
    ],

    description:
      "Main residential hostel complex providing accommodation, recreational areas, and essential facilities for male students.",

    nodeId: "loho",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260057/A_block_fsajod.jpg",
    ],
  },

  {
    id: "Parking ",
    name: "PARKING AREA(MAIN GATE)",

    aliases: [
      "parking",
      "bike parking",
      "car parking",
      "main gate parking",
      "vehicle parking",
      "parking area",
    ],

    description:
      "Designated parking zone for students, staff, and visitors with structured vehicle bays and campus security monitoring.",

    nodeId: "dataScienceNode1",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261166/parking3_uqguzj.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261159/parking1_riyeg5.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261150/parking_rtf7qi.jpg",
    ],
  },

  {
    id: "Jesuit Residence",
    name: "JESUIT RESIDENCE",

    aliases: [
      "jesuit residence",
      "jesuit house",
      "priests residence",
      "fathers residence",
    ],

    description:
      "Residential quarters for Jesuit fathers and members of the Society of Jesus, supporting the spiritual, academic, and administrative mission of the institution.",

    nodeId: "jesuitsResidency",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260950/Jesuit_Residence_dlp1uk.webp",
    ],
  },

  {
    id: "Cricket ground",
    name: "CRICKET GROUND",

    aliases: [
      "cricket",
      "cricket field",
      "cricket ground",
      "sports ground",
      "practice ground",
    ],

    description:
      "Dedicated cricket field used for practice sessions, intercollegiate tournaments, and major sporting events within the campus.",

    nodeId: "footballBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260135/cricket_kaqgdx.jpg",
    ],
  },

  {
    id: "Football ground(Main)",
    name: "FOOTBALL GROUND(MAIN)",

    aliases: [
      "football",
      "football field",
      "soccer ground",
      "football stadium",
      "sports field",
    ],

    description:
      "Spacious football field utilized for training, competitive matches, and campus sports activities.",

    nodeId: "footballBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260937/football_kz3k3c.jpg",
    ],
  },

  {
    id: "Loyola church",
    name: "LOYOLA CHURCH(CHRIST THE KING CHURCH)",

    aliases: [
      "church",
      "loyola church",
      "campus church",
      "chapel",
      "prayer hall",
    ],

    description:
      "Primary campus church serving as a place of worship, spiritual gatherings, and community prayer services for students and staff.",

    nodeId: "church",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772259963/church1_j8wmyb.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260907/church_scjvlz.jpg",
    ],
  },

  {
    id: "Church of St. Joseph the Worker",
    name: "CHURCH OF ST. JOSEPH THE WORKER",

    aliases: [
      "st joseph church",
      "joseph church",
      "joseph worker church",
      "st joseph worker",
      "second church",
    ],

    description:
      "A serene place of worship within the campus dedicated to St. Joseph the Worker, hosting regular masses and spiritual events.",

    nodeId: "churchTurn5",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772259967/church2_fybhcc.jpg",
    ],
  },
  {
    id: "Licet",
    name: "LOYOLA ICAM COLLEGE OF ENGINEERING AND TECHNOLOGY(LICET)",

    aliases: [
      "licet",
      "loyola icam",
      "loyola engineering college",
      "engineering college",
      "loyola icam college",
      "licet college",
      "icam",
      "engineering block",
      "engineering labs",
      "Incubation Centre",
    ],

    description:
      "Autonomous engineering institution offering undergraduate and postgraduate programs in engineering and technology with modern laboratories and academic facilities.",

    nodeId: "licetEntrance",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260976/licet_dgzqwt.webp",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Manufacturing Technology Lab",
          "Loyola Skill Development Centre",
          "Engineering Practices Lab",
          "Fluid Mechanics Lab",
          "Strength of Materials Lab",
          "Electrical Machines Lab",
          "Science & Humanities Staff Room",
          "Control Systems Lab",
          "Measurements & Instrumentation Lab",
          "Thermal Engineering Lab",
          "Machine Shop",
          "Daikin Centre of Excellence",
          "Wellness Centre",
          "Creche",
          "Project Works Area",
          "Indoor Shuttle Court",
          "Boys Common Room",
          "Girls Common Room",
          "First Aid Room",
          "Xerox Shop",
          "Stationary Store",
          "Auditorium",
          "Incubation Centre",
          "Rest Room (Women)",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Language Lab",
          "Physical Director's Office",
          "IQAC & Documentation",
          "Dean of Engineering Education",
          "Director Office",
          "Board Room",
          "Vice Principal Office",
          "Dean of Students",
          "Dean of Women",
          "Principal Office",
          "Central Office",
          "Strong Room",
          "Examination Office",
          "Coordinator of Exams",
          "International Programmes Office",
          "Industry Interaction Cell",
          "Visitor's Lounge",
          "Library",
          "Seminar Hall",
          "Women's Cell",
          "Software Development Lab",
          "Centre of Excellence in Machine Learning",
          "ICT Centre",
          "Central Computing Facility",
          "Mechatronics / Automation Lab",
          "Centre for Intelligent Systems",
          "Smart Room",
          "Electronics Circuits Lab",
          "Mechanical Staff Room",
          "Rest Room (Men)",
        ],
      },
      {
        floor: "Second Floor",
        places: [
          "Data Structures Lab",
          "Studio",
          "Library",
          "Tutorial Room",
          "Dynamics and Metrology Lab",
          "Centre of Peace",
          "Microprocessor Lab",
          "CAD/CAM Lab",
          "Open Source Lab",
          "CASE Tools Lab",
          "Life Skills Room",
          "French Classroom",
          "CSE Staff Room",
          "Optical and Microwave Lab",
          "ECE Staff Room",
          "Medical cum First Aid Room",
          "Project and Research Lab",
          "Rest Room (Women)",
        ],
      },
      {
        floor: "Third Floor",
        places: [
          "Chemistry Lab",
          "Physics Lab",
          "Drawing Hall",
          "IT Staff Room",
          "DSP / VLSI Lab",
          "Power System Simulation Lab",
          "Computer Networks Lab",
          "Power Backup Room",
          "Tutorial Room",
          "Rest Room (Men)",
        ],
      },
    ],
  },

  {
    id: "Loyola hoste(main gate)",
    name: "LOYOLA MEN'S HOSTEL",

    aliases: [
      "mens hostel",
      "loyola hostel",
      "boys hostel",
      "hostel entrance",
      "loho",
      "loyola hostel main gate",
    ],

    description:
      "Main entrance to the Loyola Men's Hostel complex providing residential accommodation and essential facilities for students.",

    nodeId: "loho",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772259953/2block_tb1e1i.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261138/loho_pxfo4p.jpg",
    ],
  },

  {
    id: "Sauliere hall",
    name: "SAULIERE HALL",

    aliases: [
      "sauliere",
      "sauliere hall",
      "hostel hall",
      "seminar hall hostel",
      "meeting hall hostel",
    ],

    description:
      "Multipurpose hall within the hostel complex used for meetings, seminars, cultural programs, and student gatherings.",

    nodeId: "loho",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261183/Sauliere1_lrq5iy.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261194/Sauliere.jpg_ffnn5h.jpg",
    ],
  },
  {
    id: "Loyola hostel(veg mess)",
    name: "LOYOLA MEN'S HOSTEL VEG MESS",
    description:
      "Vegetarian dining facility serving balanced and hygienic meals exclusively for hostel residents.",
    nodeId: "hostelBottom",
    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261206/vegmess_vmdhpt.jpg",
    ],
  },
  {
    id: "Loyola hostel(non veg mess)",
    name: "LOYOLA MEN'S HOSTEL NON VEG MESS",
    description:
      "Non-vegetarian dining facility catering to hostel students with a variety of meal options.",
    nodeId: "hostelBottom",
    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261136/nonveg_siksq5.jpg",
    ],
  },
  {
    id: "Loyola hostel( metro mess)",
    name: "LOYOLA MEN'S HOSTEL METRO MESS",

    aliases: [
      "metro mess",
      "hostel metro mess",
      "mess metro",
      "student dining hall",
      "loyola hostel dining",
    ],

    description:
      "Specialized hostel dining area offering diverse meal options in a structured and student-friendly environment.",

    nodeId: "hostelBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261021/metro_mrtvjt.jpg",
    ],
  },

  {
    id: "Shop@1925",
    name: "SHOP@1925",

    aliases: [
      "shop",
      "shop1925",
      "campus store",
      "stationery shop",
      "college shop",
      "loyola merchandise",
      "student store",
      "daily essentials",
    ],

    description:
      "Campus convenience store providing stationery, daily essentials, and Loyola merchandise for students and staff.",

    nodeId: "jubileeBack",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261170/shop_ijidiv.jpg",
    ],
  },

  {
    id: "WCR",
    name: "WOMEN'S COMMON ROOM",

    aliases: [
      "wcr",
      "women common room",
      "ladies common room",
      "girls common room",
      "women rest area",
    ],

    description:
      "Designated space for women students to relax, interact, and access basic facilities within a comfortable and safe environment.",

    nodeId: "jubileeBack",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261203/WCR_rl0b6d.jpg",
    ],
  },

  {
    id: "eat@1925",
    name: "eat@1925",

    aliases: [
      "eat1925",
      "eat at 1925",
      "snacks shop",
      "campus cafe",
      "quick food",
      "beverages",
      "student snacks",
    ],

    description:
      "Modern campus food outlet offering snacks, beverages, and quick meals for students and visitors.",

    nodeId: "jubileeBack",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260915/eat_1925.jpg_wcqycb.jpg",
    ],
  },
  {
    id: "centenary park",
    name: "LOYOLA CENTENARY PARK",

    aliases: [
      "centenary park",
      "loyola park",
      "campus park",
      "green park",
      "garden",
      "relaxation park",
      "centenary garden",
    ],

    description:
      "Landscaped green park commemorating the centenary celebration, providing a peaceful space for relaxation and informal gatherings.",

    nodeId: "centenaryBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260935/centpark_eeheag.jpg",
    ],
  },

  {
    id: "LIBA park (Arts Gallery)",
    name: "LIBA PARK  (ARTS GALLERY)",

    aliases: [
      "liba park",
      "Park",
      "arts gallery",
      "lover's Park",
      "art exhibition",
      "student art gallery",
      "cultural exhibition",
      "creative gallery",
    ],

    description:
      "Creative exhibition space showcasing student artwork, cultural displays, and academic exhibitions.",

    nodeId: "Park",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261003/lover_s_vbcchu.jpg",
    ],
  },

  {
    id: "viscom building",
    name: "SCHOOL OF MEDIA STUDIES",

    aliases: [
      "viscom",
      "visual communication",
      "media studies",
      "multimedia department",
      "media building",
      "film lab",
      "editing studio",
      "green screen studio",
      "animation lab",
      "photography lab",
      "television lab",
      "fm studio",
    ],

    nodeId: "ViscomBuilding",

    description:
      "School of Media Service building with visual communication facilities, studios, and production labs.",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261219/viscom_k1ckue.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Department of Visual Communication (VISCOM)",
          "Department of Multimedia",
          "Preview Theatre",
        ],
      },
      {
        floor: "First Floor",
        places: ["Animation lab", "Computer Grapics Lab"],
      },
      {
        floor: "Second Floor",
        places: [
          "LAMP Studio",
          "Editing Suite",
          "Photography and Television Lab",
          "Green Screen Studio",
          "E-content Studio",
          "FM Studio",
        ],
      },
      {
        floor: "Third Floor",
        places: [
          "Department of Kaushal Kendra",
          "Production Labs",
          "Department of 3D Animation",
        ],
      },
    ],
  },

  {
    id: "Jubilee building",
    name: "JUBILEE BUILDING",

    aliases: [
      "jubilee",
      "jubilee block",
      "physics department",
      "physics lab",
      "mathematics department",
      "zoology department",
      "statistics department",
      "computer science department",
      "biotechnology lab",
      "science block",
      "lisstar",
      "live institute",
    ],

    description:
      "A major academic and research block housing multiple science departments, advanced laboratories, smart classrooms, seminar halls, and administrative offices, supporting undergraduate and postgraduate education.",

    nodeId: "Jubileebuild",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260953/jub_lpo5sz.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260961/jubb1_qu8mt9.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260958/jubb_ygp1bo.jpg",
    ],

    floors: [
      {
        floor: "Ground Floor",
        places: [
          "Jubilee Quadrangle",
          "Department of Physics",
          "Physics Lab",
          "Smart Classroom",
          "VP Office – Shift 2 (Academics)",
          "VP Office – Shift 2 (Administration)",
          "Lawrence Sundharam Hall",
          "Green Hall",
          "MRF Hall",
          "Department of Plant Biology and Biotechnology",
        ],
      },
      {
        floor: "First Floor",
        places: [
          "Department of Mathematics",
          "Smart Rooms",
          "Department of Advanced Zoology",
        ],
      },
      {
        floor: "Second Floor",
        places: [
          "Department of Statistics",
          "Department of Computer Science and Application",
          "Smart Rooms",
        ],
      },
      {
        floor: "Third Floor",
        places: [
          "Biotechnology Labs",
          "Computer Science Labs",
          "LISSTAR",
          "Physics Lab",
          "LIVE-Loyola Institute of Vocational Education",
        ],
      },
    ],
  },
  {
    id: "LIBA Hostel building",
    name: "LIBA HOSTEL BUILDING",

    aliases: [
      "liba hostel",
      "mba hostel",
      "management hostel",
      "liba residence",
    ],

    description:
      "Residential hostel facility for LIBA students, providing accommodation, study spaces, and essential amenities within a secure campus environment.",

    nodeId: "libaEntrance1",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260975/libaHostel_z4eu6a.jpg",
    ],
  },

  {
    id: "Old LIBA",
    name: "OLD LIBA",

    aliases: [
      "old liba",
      "liba old block",
      "ias coaching",
      "ias academy",
      "lbic",
      "incubation centre",
    ],

    description:
      "Heritage academic block of LIBA housing classrooms, administrative offices, and specialized academic programs, preserving the institution’s legacy.",

    nodeId: "oldLibaRight",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261153/old_liba_iuczsw.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260941/IAS_tlocmw.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260942/IAS1_ukfklk.jpg",
    ],
    floors: [
      {
        floor: "Ground Floor",
        places: ["Loyola IAS Academy"],
      },
      {
        floor: "First Floor",
        places: ["Lcube Busa Incubation Centre(LBIC)"],
      },
    ],
  },

 {
  id: "Entomology Research Building",
  name: "ENTOMOLOGY RESEARCH BUILDING (ERI)",

  aliases: [
    "eri",
    "entomology",
    "entomology research",
    "mosquito research",
    "biodiversity lab",
    "microbiology lab",
    "biotech lab",
    "ipm lab",
    "animal house",
    "research building",
  ],

  description:
    "Dedicated research facility focusing on entomological studies, insect biodiversity, and scientific research supported by advanced laboratory infrastructure.",

  nodeId: "licetEntrance",

  images: [
    "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260111/entomology_dx8dw1.jpg",
  ],

  floors: [
    {
      floor: "Ground Floor",
      places: [
        "GF-01 Bioproducts",
        "GF-02 Ecology and Environment",
        "GF-03 Instrumentation - IA",
        "GF-04 Mosquito Control",
        "GF-05 Instrumentation - IB",
        "GF-B Fr Director",
        "GF-06 E.B. Room",
        "GF-07 Office",
        "GF-08 Molecular Lab",
        "GF-C Staff Room",
        "GF-0 Chemical Room",
        "Stock Room",
      ],
    },

    {
      floor: "First Floor",
      places: [
        "FF-01 Biodiversity",
        "FF-02 Auditorium",
        "FF-03 P.T.C. Lab-A",
        "FF-04 P.T.C. Lab-B",
        "FF-05 Library",
      ],
    },

    {
      floor: "Second Floor",
      places: [
        "SF-01 Animal House",
        "SF-02 Phytochemistry",
        "SF-03 Integrated Pest Management (IPM)",
        "SF-04 Biotechnology",
        "SF-05 Microbiology Lab-A & Water Quality Analysis Lab",
        "SF-06 Microbiology Lab-B & Animal Cell Culture Lab",
      ],
    },
  ],
},
  {
    id: "Berchmans Illam",
    name: "BERCHMANS ILLAM",

    aliases: [
      "berchmans",
      "berchmans residence",
      "jesuit residence berchmans",
      "clergy residence",
    ],

    description:
      "Residential and community space associated with campus clergy and administrative members, supporting academic and institutional activities.",

    nodeId: "basketballBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260855/berchmans_tsg8al.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260859/bermens_gr3jpe.jpg",
    ],
  },

  {
    id: "Sports building",
    name: "SPORTS BUILDING",

    aliases: [
      "sports complex",
      "gym",
      "sports office",
      "athletics building",
      "fitness center",
    ],

    description:
      "Comprehensive sports complex equipped with indoor training areas, fitness facilities, and administrative offices supporting campus athletic programs.",

    nodeId: "basketballBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261174/sports_ol00yy.jpg",
    ],
  },

  {
    id: "Parking(LIBA)",
    name: "PARKING(LIBA)",

    aliases: [
      "parking area",
      "vehicle parking",
      "car parking",
      "bike parking",
      "campus parking",
    ],

    description:
      "Designated vehicle parking area for students, staff, and visitors with organized parking bays and security monitoring.",

    nodeId: "libaEntrance",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261157/parking4_lr5trl.jpg",
    ],
  },

  {
    id: "Gallery",
    name: "GALLERY",

    aliases: [
      "art gallery",
      "exhibition hall",
      "display hall",
      "campus gallery",
      "art exhibition",
    ],

    description:
      "A multipurpose exhibition and display space used for academic showcases, cultural events, art exhibitions, and student presentations.",

    nodeId: "libaEntrance1",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260856/audi_dri2o4.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366295/bankLiba_jbkqtm.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/v1773419048/stands_vu3hlw.jpg",
    ],
  },

  {
    id: "LICET CANTEEN",
    name: "LICET CANTEEN",

    aliases: [
      "licet canteen",
      "canteen",
      "food court",
      "licet food",
      "snacks",
      "cafeteria",
    ],

    description:
      "Campus dining facility serving snacks, beverages, and meals for LICET students and staff in a casual and comfortable setting.",

    nodeId: "licetEntrance1",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260977/licetCanteen_xywjfn.jpg",
    ],
  },

  {
    id: "Loho Administrative",
    name: "LOHO ADMINISTRATIVE OFFICE",

    aliases: [
      "hostel admin",
      "loho admin",
      "hostel office",
      "hostel administration",
    ],

    description:
      "Administrative block managing hostel operations, student records, accommodation services, and related administrative activities.",

    nodeId: "lohoAdmin",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260076/adminisHO_zajufq.jpg",
    ],
  },

  {
    id: "Teakwood Garden",
    name: "TEAKWOOD GARDEN",

    aliases: [
      "teakwood",
      "teakwood park",
      "garden",
      "campus garden",
      "green area",
    ],

    description:
      "A landscaped green space within the campus offering a peaceful environment for relaxation, informal gatherings, and outdoor activities.",

    nodeId: "Teakwood",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366723/teak_kohxuv.jpg",
    ],
  },

  {
    id: "Inigo Kiosk",
    name: "INIGO KIOSK",

    aliases: ["kiosk", "inigo cafe", "inigo snacks", "refreshment kiosk"],

    description:
      "A small refreshment kiosk providing quick relaxation for students and visitors near the hostel area.",

    nodeId: "Inigo",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366723/inigo_lvfymu.jpg",
    ],
  },

  {
    id: "LIBA Canteen",
    name: "LIBA CANTEEN",

    aliases: [
      "liba food",
      "liba cafeteria",
      "liba dining",
      "liba snacks",
      "liba mess",
    ],

    description:
      "Dining facility for LIBA students and faculty offering a variety of meals, snacks, and refreshments in a spacious seating area.",

    nodeId: "LibaCanteen",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366298/liba_can_ov6bgm.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1773419048/liba_canteen_lqh47u.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366297/libacan1_sili00.jpg",
    ],
  },

  {
    id: "Basketball - Volleyball court",
    name: "BASKETBALL - VOLLEYBALL COURT",

    aliases: [
      "basketball",
      "volleyball",
      "basketball court",
      "volleyball court",
      "sports court",
    ],

    description:
      "Outdoor sports courts designed for basketball and volleyball practice, matches, and recreational activities for students.",

    nodeId: "basketballBottom",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366300/basketball1_kvh3wu.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772366301/volley1_w6onpy.jpg",
    ],
  },

  {
    id: "LCS-SIGA PRESS",
    name: "LCS-SIGA PRESS(XERO SHOP)",

    aliases: [
      "xerox",
      "xerox shop",
      "printing",
      "printing shop",
      "photocopy",
      "scan",
      "binding",
    ],

    description:
      "Campus printing and photocopy center providing Xerox, printing, scanning, binding, and document services for students and staff.",

    nodeId: "bedRight",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772419296/xeroxSiga_qup0cn.jpg",
    ],
  },

  {
    id: "Loyola Statue",
    name: "St. IGNATIUS OF LOYOLA STATUE",

    aliases: [
      "statue",
      "loyola statue",
      "ignatius statue",
      "campus statue",
      "meeting point",
    ],

    description: "The Loyola Statue is a central landmark of the campus.",

    nodeId: "statueJunction",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772466136/loyolaStatue_xmm8ue.png",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772261034/main2_kfkxqu.jpg",
    ],
  },

  {
    id: "Loyola Science Building",
    name: "LOYOLA INSTITUTE OF FRONTIER ENERGY (LIFE) BUILDING",

    aliases: [
      "science building",
      "loyola science",
      "science block",
      "science labs",
      "life lab",
      "lifescience building",
    ],

    description:
      "The Loyola Science Building houses various science departments, laboratories, and research facilities. It supports academic and research activities in life sciences and related disciplines.",

    nodeId: "AdminisBuilding",
    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1773806428/LIFE_bxa6lo.jpg",
    ],
    floors: [
      {
        floor: "Third Floor",
        places: ["Loyola EduTech", "LIFE"],
      },
    ],
  },

  {
    id: "LIBA Entrance Gate",
    name: "LIBA ENTRANCE GATE",

    aliases: [
      "liba gate",
      "liba entrance",
      "licet gate",
      "engineering gate",
      "kodambakkam gate",
      "liba entry",
    ],

    description:
      "The LIBA Entrance Gate serves as a primary access point for students and staff of LIBA (Loyola Institute of Business Administration) and LICET (Loyola-ICAM College of Engineering and Technology). It is also commonly used by residents and commuters from the Kodambakkam area as a convenient entry route to the campus",

    nodeId: "libaEntrance",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772693474/libaEnt_evextc.jpg",
    ],
  },

  {
    id: "Loyola College Main Gate",
    name: "LOYOLA COLLEGE MAIN GATE",

    aliases: [
      "main gate",
      "college gate",
      "loyola gate",
      "main entrance",
      "front gate",
    ],

    description:
      "Primary entrance of Loyola College used by students, staff, and visitors for daily campus access",

    nodeId: "mainGate",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260926/gate_udv19o.webp",
    ],
  },

  {
    id: "Railway Gate",
    name: "RAILWAY GATE",

    aliases: [
      "train gate",
      "railway entrance",
      "nungambakkam gate",
      "railway station gate",
    ],

    description:
      "Primary entrance of Loyola College used by students, staff, and visitors for who all coming through trains.",

    nodeId: "railwayGate",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772733743/railGate_cdab3g.jpg",
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772733743/railGate_sdaeec.jpg",
    ],
  },

  {
    id: "Tennis Courts",
    name: "TENNIS COURTS",

    aliases: ["tennis court", "tennis ground", "sports tennis", "tennis area"],

    description:
      "Tennis courts utilized for training, competitive matches, and campus sports activities.",

    nodeId: "MainRoad1",
    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1773806428/Tennis_y4ag5d.jpg",
    ],
  },

  {
    id: "Hockey Ground",
    name: "HOCKEY GROUND",

    aliases: ["hockey field", "hockey stadium", "hockey ground loyola"],

    description:
      "Hockey field utilized for training, competitive matches, and campus sports activities.",

    nodeId: "centenaryBottom",
    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1773806428/hockey_kdwhcb.jpg",
    ],
  },

  {
    id: "Football ground(licet)",
    name: "FOOTBALL GROUND (LICET)",

    aliases: [
      "football ground",
      "licet football ground",
      "football field licet",
      "football stadium",
    ],

    description:
      "Spacious football field utilized for training, competitive matches, and campus sports activities.",

    nodeId: "hostelFarLeft",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260937/football_kz3k3c.jpg",
    ],
  },

  {
    id: "Football ground(BE.d)",
    name: "FOOTBALL GROUND(BE.d)",

    aliases: [
      "bed football ground",
      "football ground bed",
      "football field bed",
    ],

    description:
      "Spacious football field utilized for training, competitive matches, and campus sports activities.",

    nodeId: "bedRight",

    images: [
      "https://res.cloudinary.com/dytxo2sof/image/upload/f_auto,q_auto,w_800/v1772260937/football_kz3k3c.jpg",
    ],
  },

  {
    id: "RestRoom(Mens)",
    name: "RESTROOMS(MENS)",

    aliases: [
      "mens restroom",
      "mens toilet",
      "gents restroom",
      "gents toilet",
      "men restroom",
      "wc men",
    ],

    description: "Restroom for mens",
  },

  {
    id: "RestRoom(Women)",
    name: "RESTROOMS(WOMENS)",

    aliases: [
      "women restroom",
      "ladies restroom",
      "ladies toilet",
      "wc women",
      "women toilet",
    ],

    description: "Restroom for womens",
  },

  {
    id: "Loyola College Exit Gate",
    name: "LOYOLA COLLEGE EXIT GATE",

    aliases: ["exit gate", "college exit", "loyola exit", "back gate"],

    description:
      "Primary exit of Loyola College used by students, staff, and visitors for exiting.",

    nodeId: "exitGate1",
  },
];
