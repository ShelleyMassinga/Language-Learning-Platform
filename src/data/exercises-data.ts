// Sample Exercises Data

export const exerciseTypes = [
    { id: "type_1", name: "multiple-choice", description: "Test your knowledge with multiple choice questions" },
    { id: "type_2", name: "fill-blanks", description: "Complete sentences with the correct words" },
    { id: "type_3", name: "word-order", description: "Arrange words to form correct sentences" },
    { id: "type_4", name: "listening", description: "Listen and answer questions" }
  ];
  
  export const exercises = [
    // Portuguese - Multiple Choice
    {
      id: "exercise_1",
      typeId: "type_1",
      languageId: "lang_pt",
      level: "beginner",
      question: "What is the Portuguese word for 'water'?",
      options: ["água", "pão", "casa", "carro"],
      correctAnswer: "água",
      explanation: "Água means 'water' in Portuguese."
    },
    {
      id: "exercise_2",
      typeId: "type_1",
      languageId: "lang_pt",
      level: "beginner",
      question: "Which verb form means 'I speak' in Portuguese?",
      options: ["falo", "fala", "falamos", "falam"],
      correctAnswer: "falo",
      explanation: "Falo is the first-person singular form of the verb 'falar' (to speak)."
    },
    {
      id: "exercise_3",
      typeId: "type_1",
      languageId: "lang_pt",
      level: "intermediate",
      question: "Which of these is the correct way to say 'I would like coffee' in Portuguese?",
      options: ["Eu queria café", "Eu quero café", "Eu café", "Café eu"],
      correctAnswer: "Eu queria café",
      explanation: "The imperfect tense of 'querer' (to want) is used as a polite form to express 'would like'."
    },
    
    // Portuguese - Fill in the Blanks
    {
      id: "exercise_4",
      typeId: "type_2",
      languageId: "lang_pt",
      level: "beginner",
      question: "Complete the sentence: Eu ____ água. (I drink water)",
      options: ["bebo", "come", "falo", "vejo"],
      correctAnswer: "bebo",
      explanation: "Beber means 'to drink', so 'bebo' is 'I drink'."
    },
    {
      id: "exercise_5",
      typeId: "type_2",
      languageId: "lang_pt",
      level: "beginner",
      question: "Complete: Bom ____ ! (Good morning!)",
      options: ["dia", "tarde", "noite", "semana"],
      correctAnswer: "dia",
      explanation: "'Bom dia' means 'Good morning' in Portuguese."
    },
    
    // Portuguese - Word Order
    {
      id: "exercise_6",
      typeId: "type_3",
      languageId: "lang_pt",
      level: "beginner",
      question: "Arrange to form a correct sentence: falo, Eu, português",
      correctAnswer: "Eu falo português",
      explanation: "The correct word order is subject-verb-object, just like in English."
    },
    {
      id: "exercise_7",
      typeId: "type_3",
      languageId: "lang_pt",
      level: "intermediate",
      question: "Arrange to form a correct sentence: ao, vou, cinema, amanhã, Eu",
      correctAnswer: "Eu vou ao cinema amanhã",
      explanation: "The correct word order is subject-verb-object-time adverbial."
    },
    
    // Portuguese - Listening
    {
      id: "exercise_8",
      typeId: "type_4",
      languageId: "lang_pt",
      level: "beginner",
      question: "Listen to the audio and select what you hear.",
      options: ["Olá, como está?", "Olá, tudo bem?", "Oi, como vai?", "Oi, bom dia!"],
      correctAnswer: "Olá, como está?",
      audioUrl: "/audio/exercises/pt/ola_como_esta.mp3",
      explanation: "The audio says 'Olá, como está?' which means 'Hello, how are you?'"
    },
    
    // Swahili - Multiple Choice
    {
      id: "exercise_9",
      typeId: "type_1",
      languageId: "lang_sw",
      level: "beginner",
      question: "What is the Swahili word for 'hello'?",
      options: ["jambo", "pole", "asante", "karibu"],
      correctAnswer: "jambo",
      explanation: "Jambo is a common greeting in Swahili, meaning 'hello'."
    },
    {
      id: "exercise_10",
      typeId: "type_1",
      languageId: "lang_sw",
      level: "beginner",
      question: "Which phrase means 'How are you?' in Swahili?",
      options: ["Habari gani?", "Jina lako ni nani?", "Unatoka wapi?", "Asante sana"],
      correctAnswer: "Habari gani?",
      explanation: "'Habari gani?' literally means 'What news?' but is used to ask 'How are you?'"
    },
    
    // Swahili - Fill in the Blanks
    {
      id: "exercise_11",
      typeId: "type_2",
      languageId: "lang_sw",
      level: "beginner",
      question: "Complete the sentence: ____ yako ni nani? (What is your name?)",
      options: ["Jina", "Rafiki", "Mtu", "Jambo"],
      correctAnswer: "Jina",
      explanation: "'Jina lako ni nani?' means 'What is your name?' in Swahili. 'Jina' means 'name'."
    },
    
    // Swahili - Word Order
    {
      id: "exercise_12",
      typeId: "type_3",
      languageId: "lang_sw",
      level: "beginner",
      question: "Arrange to form a correct sentence: ninakula, chakula, Mimi",
      correctAnswer: "Mimi ninakula chakula",
      explanation: "The correct word order is subject-verb-object. 'Mimi ninakula chakula' means 'I eat food'."
    },
    
    // Swahili - Listening
    {
      id: "exercise_13",
      typeId: "type_4",
      languageId: "lang_sw",
      level: "beginner",
      question: "Listen to the audio and select what you hear.",
      options: ["Habari gani?", "Habari ya asubuhi", "Habari za leo?", "Habari yako?"],
      correctAnswer: "Habari gani?",
      audioUrl: "/audio/exercises/sw/habari_gani.mp3",
      explanation: "The audio says 'Habari gani?' which means 'How are you?'"
    }
  ];