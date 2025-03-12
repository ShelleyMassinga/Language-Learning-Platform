// Enhanced Exercises Data with Syllabus Alignment

export const exerciseTypes = [
  { id: "type_1", name: "multiple-choice", description: "Test your knowledge with multiple choice questions" },
  { id: "type_2", name: "fill-blanks", description: "Complete sentences with the correct words" },
  { id: "type_3", name: "word-order", description: "Arrange words to form correct sentences" },
  { id: "type_4", name: "listening", description: "Listen and answer questions" },
  { id: "type_5", name: "matching", description: "Match items from two columns" },
  { id: "type_6", name: "translation", description: "Translate sentences between languages" },
  { id: "type_7", name: "conjugation", description: "Practice verb conjugations" },
  { id: "type_8", name: "dictation", description: "Write what you hear" }
];

export const exercises = [
  // PORTUGUESE EXERCISES - BEGINNER LEVEL
  
  // Unit 1: Introductory Portuguese - Subject Pronouns
  {
    id: "exercise_pt_b1_t1_1",
    typeId: "type_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 0,
    question: "What is the Portuguese translation for 'I'?",
    options: ["Eu", "Tu", "Ele", "Nós"],
    correctAnswer: "Eu",
    explanation: "The subject pronoun 'I' is 'Eu' in Portuguese."
  },
  {
    id: "exercise_pt_b1_t1_2",
    typeId: "type_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 0,
    question: "Which of these means 'we' in Portuguese?",
    options: ["Vocês", "Nós", "Eles", "Tu"],
    correctAnswer: "Nós",
    explanation: "The subject pronoun 'we' is 'Nós' in Portuguese."
  },
  {
    id: "exercise_pt_b1_t1_3",
    typeId: "type_2",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 0,
    question: "Complete the sentence: ____ sou professor. (I am a teacher.)",
    options: ["Eu", "Tu", "Ele", "Nós"],
    correctAnswer: "Eu",
    explanation: "The first person singular pronoun is 'Eu'."
  },
  {
    id: "exercise_pt_b1_t1_4",
    typeId: "type_3",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 0,
    question: "Arrange to form a correct sentence: sou, Eu, brasileiro",
    correctAnswer: "Eu sou brasileiro",
    explanation: "The correct word order is subject + verb + complement. 'Eu sou brasileiro' means 'I am Brazilian'."
  },
  
  // Unit 1: Introductory Portuguese - Basic Greetings
  {
    id: "exercise_pt_b1_t2_1",
    typeId: "type_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 1,
    question: "Which greeting is appropriate in the morning?",
    options: ["Bom dia", "Boa tarde", "Boa noite", "Olá"],
    correctAnswer: "Bom dia",
    explanation: "'Bom dia' means 'Good morning' and is used from sunrise until noon."
  },
  {
    id: "exercise_pt_b1_t2_2",
    typeId: "type_4",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 1,
    question: "Listen to the audio and select what you hear.",
    options: ["Bom dia", "Boa tarde", "Boa noite", "Olá"],
    correctAnswer: "Boa tarde",
    audioUrl: "/audio/exercises/pt/boa_tarde.mp3",
    explanation: "The audio says 'Boa tarde' which means 'Good afternoon' in Portuguese."
  },
  {
    id: "exercise_pt_b1_t2_3",
    typeId: "type_5",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 1,
    question: "Match the greetings with their meanings:",
    matchItems: [
      { id: "m1", text: "Bom dia" },
      { id: "m2", text: "Boa tarde" },
      { id: "m3", text: "Boa noite" },
      { id: "m4", text: "Olá" }
    ],
    matchResponses: [
      { id: "r1", text: "Good morning", matchesId: "m1" },
      { id: "r2", text: "Good afternoon", matchesId: "m2" },
      { id: "r3", text: "Good evening/night", matchesId: "m3" },
      { id: "r4", text: "Hello", matchesId: "m4" }
    ],
    explanation: "These are the basic Portuguese greetings and their English equivalents."
  },
  
  // Unit 1: Introductory Portuguese - Present Tense of Ser/Estar
  {
    id: "exercise_pt_b1_t3_1",
    typeId: "type_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 2,
    question: "Which verb would you use in the sentence: 'He ____ a doctor'?",
    options: ["é (ser)", "está (estar)", "either can be used", "neither can be used"],
    correctAnswer: "é (ser)",
    explanation: "For permanent characteristics like professions, we use 'ser' (é)."
  },
  {
    id: "exercise_pt_b1_t3_2",
    typeId: "type_2",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 2,
    question: "Complete: A festa ____ na casa dele. (The party is at his house.)",
    options: ["é", "está", "são", "estão"],
    correctAnswer: "está",
    explanation: "For locations, we use 'estar' (está)."
  },
  {
    id: "exercise_pt_b1_t3_3",
    typeId: "type_7",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 2,
    question: "Conjugate the verb 'ser' (to be) for 'nós' (we):",
    options: ["somos", "estamos", "semos", "é"],
    correctAnswer: "somos",
    explanation: "The conjugation of 'ser' for 'nós' (we) is 'somos'."
  },
  
  // Unit 2: Everyday Communication - Regular Verbs in Present Tense
  {
    id: "exercise_pt_b2_t1_1",
    typeId: "type_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b2",
    topicIndex: 0,
    question: "Which is the correct conjugation of 'falar' (to speak) for 'eu'?",
    options: ["falo", "fala", "falas", "falamos"],
    correctAnswer: "falo",
    explanation: "The first-person singular (eu) form of 'falar' is 'falo'."
  },
  {
    id: "exercise_pt_b2_t1_2",
    typeId: "type_7",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b2",
    topicIndex: 0,
    question: "Conjugate the verb 'comer' (to eat) for all subject pronouns:",
    conjugations: [
      { pronoun: "eu", correctForm: "como" },
      { pronoun: "tu", correctForm: "comes" },
      { pronoun: "ele/ela/você", correctForm: "come" },
      { pronoun: "nós", correctForm: "comemos" },
      { pronoun: "eles/elas/vocês", correctForm: "comem" }
    ],
    explanation: "These are the present tense conjugations for the regular -er verb 'comer'."
  },
  
  // Continue with many more Portuguese exercises...
  
  // SWAHILI EXERCISES - BEGINNER LEVEL
  
  // Unit 1: Getting Started with Swahili - Noun Classes
  {
    id: "exercise_sw_b1_t1_1",
    typeId: "type_1",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 0,
    question: "Which pair shows the correct singular and plural forms in the M-/WA- class?",
    options: ["mtu - watu", "kitabu - vitabu", "kitu - vitu", "mti - miti"],
    correctAnswer: "mtu - watu",
    explanation: "The M-/WA- class (Class 1/2) is used for people, with 'mtu' (person) and 'watu' (people)."
  },
  {
    id: "exercise_sw_b1_t1_2",
    typeId: "type_2",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 0,
    question: "Complete: ____ is the singular form of 'vitabu' (books).",
    options: ["kitabu", "mtabu", "tabu", "matabu"],
    correctAnswer: "kitabu",
    explanation: "'Kitabu' (book) is the singular form of 'vitabu' (books), belonging to the KI-/VI- class."
  },
  {
    id: "exercise_sw_b1_t1_3",
    typeId: "type_5",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 0,
    question: "Match each noun with its correct class:",
    matchItems: [
      { id: "m1", text: "mtu (person)" },
      { id: "m2", text: "kitabu (book)" },
      { id: "m3", text: "mti (tree)" },
      { id: "m4", text: "nyumba (house)" }
    ],
    matchResponses: [
      { id: "r1", text: "M-/WA- class (Class 1)", matchesId: "m1" },
      { id: "r2", text: "KI-/VI- class (Class 7)", matchesId: "m2" },
      { id: "r3", text: "M-/MI- class (Class 3)", matchesId: "m3" },
      { id: "r4", text: "N-/N- class (Class 9)", matchesId: "m4" }
    ],
    explanation: "Each noun in Swahili belongs to a specific noun class that determines its prefixes and agreements."
  },
  
  // Unit 1: Getting Started with Swahili - Subject Prefixes
  {
    id: "exercise_sw_b1_t2_1",
    typeId: "type_1",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 1,
    question: "Which prefix is used for 'I' in Swahili verbs?",
    options: ["ni-", "u-", "a-", "tu-"],
    correctAnswer: "ni-",
    explanation: "The prefix 'ni-' is used for the first person singular (I) in Swahili verbs."
  },
  {
    id: "exercise_sw_b1_t2_2",
    typeId: "type_2",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 1,
    question: "Complete: ____ -nasoma kitabu. (They are reading a book.)",
    options: ["Ni", "U", "A", "Wa"],
    correctAnswer: "Wa",
    explanation: "The prefix 'Wa-' is used for the third person plural (they) in Swahili verbs."
  },
  {
    id: "exercise_sw_b1_t2_3",
    typeId: "type_7",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 1,
    question: "Add the correct subject prefix to the verb stem '-soma' (to read) for each pronoun:",
    conjugations: [
      { pronoun: "mimi (I)", correctForm: "ninasoma" },
      { pronoun: "wewe (you)", correctForm: "unasoma" },
      { pronoun: "yeye (he/she)", correctForm: "anasoma" },
      { pronoun: "sisi (we)", correctForm: "tunasoma" },
      { pronoun: "ninyi (you plural)", correctForm: "mnasoma" },
      { pronoun: "wao (they)", correctForm: "wanasoma" }
    ],
    explanation: "Subject prefixes in Swahili change based on the person and number."
  },
  
  // And many more Swahili exercises...
  
  // This is just a sample - a complete implementation would have many more exercises
  // covering all units and topics in the syllabus
];

export const lessonProgress = {
  trackCompletion: true,
  passingScore: 80, // percentage
  experiencePoints: {
    completion: 10, // XP for completing an exercise
    perfectScore: 15, // additional XP for 100% correct
    firstAttempt: 5 // bonus XP for correct on first try
  },
  badges: [
    { id: "badge_beginner", title: "Beginner", description: "Complete all beginner exercises", imageUrl: "/images/badges/beginner.png" },
    { id: "badge_intermediate", title: "Intermediate", description: "Complete all intermediate exercises", imageUrl: "/images/badges/intermediate.png" },
    { id: "badge_advanced", title: "Advanced", description: "Complete all advanced exercises", imageUrl: "/images/badges/advanced.png" },
    { id: "badge_perfect", title: "Perfectionist", description: "Get 100% on all exercises in a unit", imageUrl: "/images/badges/perfect.png" },
    { id: "badge_streak", title: "Consistent Learner", description: "Complete exercises for 7 consecutive days", imageUrl: "/images/badges/streak.png" }
  ],
  milestones: [
    { id: "milestone_1", title: "First Steps", description: "Complete your first 5 exercises", xpRequired: 50 },
    { id: "milestone_2", title: "Getting Started", description: "Complete your first unit", xpRequired: 200 },
    { id: "milestone_3", title: "Dedicated Student", description: "Complete your first level", xpRequired: 1000 },
    { id: "milestone_4", title: "Language Enthusiast", description: "Complete all units in a language", xpRequired: 5000 }
  ]
};