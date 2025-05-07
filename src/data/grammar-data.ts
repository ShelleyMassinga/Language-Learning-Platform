export const syllabusUnits = [
  // Portuguese Syllabus
  {
    id: "syllabus_pt_beginner",
    languageId: "lang_pt",
    level: "beginner",
    title: "Portuguese Beginner",
    description: "Master the fundamentals of Portuguese language with these core grammar concepts.",
    units: [
      {
        id: "unit_pt_b1",
        title: "Introductory Portuguese",
        topics: ["Subject Pronouns", "Basic Greetings", "Present Tense of Ser/Estar"]
      },
      {
        id: "unit_pt_b2",
        title: "Everyday Communication",
        topics: ["Regular Verbs in Present Tense", "Definite & Indefinite Articles", "Basic Questions"]
      },
      {
        id: "unit_pt_b3",
        title: "Describing People & Things",
        topics: ["Adjectives & Agreement", "Possessive Pronouns", "Demonstrative Pronouns"]
      },
      {
        id: "unit_pt_b4",
        title: "Daily Activities",
        topics: ["Present Tense of -AR Verbs", "Present Tense of -ER Verbs", "Present Tense of -IR Verbs"]
      }
    ]
  },
  {
    id: "syllabus_pt_intermediate",
    languageId: "lang_pt",
    level: "intermediate",
    title: "Portuguese Intermediate",
    description: "Expand your Portuguese skills with more complex grammar and expressions.",
    units: [
      {
        id: "unit_pt_i1",
        title: "Past Tenses",
        topics: ["Preterite Tense", "Imperfect Tense", "Preterite vs. Imperfect"]
      },
      {
        id: "unit_pt_i2",
        title: "Future & Conditional",
        topics: ["Simple Future", "Conditional Tense", "Future Expressions"]
      },
      {
        id: "unit_pt_i3",
        title: "Advanced Communication",
        topics: ["Subjunctive Mood", "Giving Opinions", "Making Suggestions"]
      },
      {
        id: "unit_pt_i4",
        title: "Complex Structures",
        topics: ["Relative Pronouns", "Passive Voice", "Reported Speech"]
      }
    ]
  },
  {
    id: "syllabus_pt_advanced",
    languageId: "lang_pt",
    level: "advanced",
    title: "Portuguese Advanced",
    description: "Achieve fluency with advanced grammar concepts and native-like expressions.",
    units: [
      {
        id: "unit_pt_a1",
        title: "Perfect Tenses",
        topics: ["Present Perfect", "Past Perfect", "Future Perfect"]
      },
      {
        id: "unit_pt_a2",
        title: "Subjunctive Mastery",
        topics: ["Present Subjunctive", "Imperfect Subjunctive", "Future Subjunctive"]
      },
      {
        id: "unit_pt_a3",
        title: "Literary Portuguese",
        topics: ["Idiomatic Expressions", "Literary Tenses", "Regional Variations"]
      },
      {
        id: "unit_pt_a4",
        title: "Professional Portuguese",
        topics: ["Business Language", "Academic Writing", "Formal Speech"]
      }
    ]
  },
  
  // Swahili Syllabus
  {
    id: "syllabus_sw_beginner",
    languageId: "lang_sw",
    level: "beginner",
    title: "Swahili Beginner",
    description: "Learn foundational Swahili grammar and basic communication skills.",
    units: [
      {
        id: "unit_sw_b1",
        title: "Getting Started with Swahili",
        topics: ["Noun Classes", "Subject Prefixes", "Basic Greetings"]
      },
      {
        id: "unit_sw_b2",
        title: "Simple Sentences",
        topics: ["Present Tense", "Negation", "Simple Questions"]
      },
      {
        id: "unit_sw_b3",
        title: "Describing Things",
        topics: ["Adjectives", "Demonstratives", "Possessives"]
      },
      {
        id: "unit_sw_b4",
        title: "Everyday Activities",
        topics: ["Common Verbs", "Time Expressions", "Basic Adverbs"]
      }
    ]
  },
  {
    id: "syllabus_sw_intermediate",
    languageId: "lang_sw",
    level: "intermediate",
    title: "Swahili Intermediate",
    description: "Expand your Swahili skills with more complex grammar structures.",
    units: [
      {
        id: "unit_sw_i1",
        title: "Past and Future",
        topics: ["Past Tense", "Future Tense", "Time References"]
      },
      {
        id: "unit_sw_i2",
        title: "Complex Sentences",
        topics: ["Compound Sentences", "Relative Clauses", "Conditionals"]
      },
      {
        id: "unit_sw_i3",
        title: "Advanced Communication",
        topics: ["Object Infixes", "Extended Verbs", "Modal Expressions"]
      },
      {
        id: "unit_sw_i4",
        title: "Swahili Culture",
        topics: ["Cultural Idioms", "Proverbs", "Polite Expressions"]
      }
    ]
  },
  {
    id: "syllabus_sw_advanced",
    languageId: "lang_sw",
    level: "advanced",
    title: "Swahili Advanced",
    description: "Master advanced Swahili for professional and academic contexts.",
    units: [
      {
        id: "unit_sw_a1",
        title: "Literary Swahili",
        topics: ["Poetry Forms", "Narrative Structures", "Classic Texts"]
      },
      {
        id: "unit_sw_a2",
        title: "Specialized Language",
        topics: ["Academic Swahili", "Business Terminology", "Political Discourse"]
      },
      {
        id: "unit_sw_a3",
        title: "Dialectal Variations",
        topics: ["Regional Dialects", "Urban Slang", "Historical Changes"]
      },
      {
        id: "unit_sw_a4",
        title: "Professional Mastery",
        topics: ["Public Speaking", "Advanced Writing", "Translation Skills"]
      }
    ]
  }
];

export const grammarRules = [
  // PORTUGUESE GRAMMAR - BEGINNER LEVEL
  
  // Unit 1: Introductory Portuguese
  {
    id: "grammar_1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 0,
    title: "Subject Pronouns",
    explanation: "Portuguese has different subject pronouns than English. They change based on the person and number.",
    examples: [
      {
        id: "example_1_1",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "I",
        targetText: "Eu",
        explanation: "First person singular"
      },
      {
        id: "example_1_2",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "You (informal)",
        targetText: "Tu",
        explanation: "Second person singular, informal (used in some regions)"
      },
      {
        id: "example_1_3",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "You (formal)",
        targetText: "Você",
        explanation: "Second person singular, formal (commonly used)"
      },
      {
        id: "example_1_4",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "He",
        targetText: "Ele",
        explanation: "Third person singular, masculine"
      },
      {
        id: "example_1_5",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "She",
        targetText: "Ela",
        explanation: "Third person singular, feminine"
      },
      {
        id: "example_1_6",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "We",
        targetText: "Nós",
        explanation: "First person plural"
      },
      {
        id: "example_1_7",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "You all",
        targetText: "Vocês",
        explanation: "Second person plural"
      },
      {
        id: "example_1_8",
        ruleId: "grammar_1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "They",
        targetText: "Eles (masculine), Elas (feminine)",
        explanation: "Third person plural"
      }
    ]
  },
  {
    id: "grammar_pt_b1_t2",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 1,
    title: "Basic Greetings",
    explanation: "Portuguese has specific greetings for different times of the day and different social contexts.",
    examples: [
      {
        id: "example_pt_b1_t2_1",
        ruleId: "grammar_pt_b1_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Good morning",
        targetText: "Bom dia",
        explanation: "Used from sunrise until noon"
      },
      {
        id: "example_pt_b1_t2_2",
        ruleId: "grammar_pt_b1_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Good afternoon",
        targetText: "Boa tarde",
        explanation: "Used from noon until sunset"
      },
      {
        id: "example_pt_b1_t2_3",
        ruleId: "grammar_pt_b1_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Good evening/night",
        targetText: "Boa noite",
        explanation: "Used after sunset"
      },
      {
        id: "example_pt_b1_t2_4",
        ruleId: "grammar_pt_b1_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Hello/Hi",
        targetText: "Olá/Oi",
        explanation: "Informal greeting used at any time"
      }
    ]
  },
  {
    id: "grammar_2",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b1",
    topicIndex: 2,
    title: "Verb 'To Be' (Ser vs. Estar)",
    explanation: "Portuguese has two verbs for 'to be': 'ser' is used for permanent characteristics, while 'estar' is used for temporary states or locations.",
    examples: [
      {
        id: "example_2_1",
        ruleId: "grammar_2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "I am a teacher. (permanent)",
        targetText: "Eu sou professor(a).",
        explanation: "Using 'ser' for a profession (permanent characteristic)"
      },
      {
        id: "example_2_2",
        ruleId: "grammar_2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "I am happy. (temporary)",
        targetText: "Eu estou feliz.",
        explanation: "Using 'estar' for a feeling (temporary state)"
      },
      {
        id: "example_2_3",
        ruleId: "grammar_2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The book is on the table. (location)",
        targetText: "O livro está na mesa.",
        explanation: "Using 'estar' for location"
      },
      {
        id: "example_2_4",
        ruleId: "grammar_2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "He is tall. (permanent)",
        targetText: "Ele é alto.",
        explanation: "Using 'ser' for physical characteristics"
      },
      {
        id: "example_2_5",
        ruleId: "grammar_2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "They are sick. (temporary)",
        targetText: "Eles estão doentes.",
        explanation: "Using 'estar' for temporary states of health"
      }
    ]
  },
  
  // Unit 2: Everyday Communication
  {
    id: "grammar_pt_b2_t1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b2",
    topicIndex: 0,
    title: "Regular Verbs in Present Tense",
    explanation: "Regular verbs in Portuguese follow consistent patterns based on their endings (-ar, -er, -ir).",
    examples: [
      {
        id: "example_pt_b2_t1_1",
        ruleId: "grammar_pt_b2_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "I speak (-ar verb)",
        targetText: "Eu falo",
        explanation: "First person singular of falar (to speak)"
      },
      {
        id: "example_pt_b2_t1_2",
        ruleId: "grammar_pt_b2_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "You eat (-er verb)",
        targetText: "Tu comes / Você come",
        explanation: "Second person singular of comer (to eat)"
      },
      {
        id: "example_pt_b2_t1_3",
        ruleId: "grammar_pt_b2_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "He opens (-ir verb)",
        targetText: "Ele abre",
        explanation: "Third person singular of abrir (to open)"
      },
      {
        id: "example_pt_b2_t1_4",
        ruleId: "grammar_pt_b2_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "We work (-ar verb)",
        targetText: "Nós trabalhamos",
        explanation: "First person plural of trabalhar (to work)"
      }
    ]
  },
  {
    id: "grammar_pt_b2_t2",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b2",
    topicIndex: 1,
    title: "Definite & Indefinite Articles",
    explanation: "Portuguese articles change based on the gender and number of the noun they modify.",
    examples: [
      {
        id: "example_pt_b2_t2_1",
        ruleId: "grammar_pt_b2_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The book (masculine singular)",
        targetText: "O livro",
        explanation: "Definite article for masculine singular nouns"
      },
      {
        id: "example_pt_b2_t2_2",
        ruleId: "grammar_pt_b2_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The house (feminine singular)",
        targetText: "A casa",
        explanation: "Definite article for feminine singular nouns"
      },
      {
        id: "example_pt_b2_t2_3",
        ruleId: "grammar_pt_b2_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The books (masculine plural)",
        targetText: "Os livros",
        explanation: "Definite article for masculine plural nouns"
      },
      {
        id: "example_pt_b2_t2_4",
        ruleId: "grammar_pt_b2_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "A book (masculine singular)",
        targetText: "Um livro",
        explanation: "Indefinite article for masculine singular nouns"
      },
      {
        id: "example_pt_b2_t2_5",
        ruleId: "grammar_pt_b2_t2",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "A house (feminine singular)",
        targetText: "Uma casa",
        explanation: "Indefinite article for feminine singular nouns"
      }
    ]
  },
  {
    id: "grammar_pt_b2_t3",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b2",
    topicIndex: 2,
    title: "Basic Questions",
    explanation: "Portuguese questions can be formed by changing intonation or using question words.",
    examples: [
      {
        id: "example_pt_b2_t3_1",
        ruleId: "grammar_pt_b2_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "What is your name?",
        targetText: "Como você se chama?",
        explanation: "Using 'como' (how) to ask about names"
      },
      {
        id: "example_pt_b2_t3_2",
        ruleId: "grammar_pt_b2_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Where do you live?",
        targetText: "Onde você mora?",
        explanation: "Using 'onde' (where) to ask about location"
      },
      {
        id: "example_pt_b2_t3_3",
        ruleId: "grammar_pt_b2_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "How much does this cost?",
        targetText: "Quanto custa isto?",
        explanation: "Using 'quanto' (how much) to ask about price"
      },
      {
        id: "example_pt_b2_t3_4",
        ruleId: "grammar_pt_b2_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "Do you speak English?",
        targetText: "Você fala inglês?",
        explanation: "Yes/no question formed by intonation alone"
      }
    ]
  },
  
  // Unit 3: Describing People & Things
  {
    id: "grammar_pt_b3_t1",
    languageId: "lang_pt",
    level: "beginner",
    unitId: "unit_pt_b3",
    topicIndex: 0,
    title: "Adjectives & Agreement",
    explanation: "In Portuguese, adjectives must agree with the nouns they modify in gender and number.",
    examples: [
      {
        id: "example_pt_b3_t1_1",
        ruleId: "grammar_pt_b3_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "A good book (masculine singular)",
        targetText: "Um bom livro",
        explanation: "Adjective agrees with masculine singular noun"
      },
      {
        id: "example_pt_b3_t1_2",
        ruleId: "grammar_pt_b3_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "A good house (feminine singular)",
        targetText: "Uma boa casa",
        explanation: "Adjective agrees with feminine singular noun"
      },
      {
        id: "example_pt_b3_t1_3",
        ruleId: "grammar_pt_b3_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The new books (masculine plural)",
        targetText: "Os novos livros",
        explanation: "Adjective agrees with masculine plural noun"
      },
      {
        id: "example_pt_b3_t1_4",
        ruleId: "grammar_pt_b3_t1",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_pt",
        sourceText: "The new houses (feminine plural)",
        targetText: "As novas casas",
        explanation: "Adjective agrees with feminine plural noun"
      }
    ]
  },
  
  
  // SWAHILI GRAMMAR - BEGINNER LEVEL
  
  // Unit 1: Getting Started with Swahili
  {
    id: "grammar_4",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 0,
    title: "Noun Classes",
    explanation: "Swahili nouns are divided into different classes, and the prefixes change depending on the class. These prefixes affect agreements with adjectives, verbs, and other parts of speech.",
    examples: [
      {
        id: "example_4_1",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "person (singular)",
        targetText: "mtu",
        explanation: "M-/WA- class (Class 1), used for people"
      },
      {
        id: "example_4_2",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "people (plural)",
        targetText: "watu",
        explanation: "M-/WA- class (Class 2), plural form"
      },
      {
        id: "example_4_3",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "tree (singular)",
        targetText: "mti",
        explanation: "M-/MI- class (Class 3), used for plants and natural things"
      },
      {
        id: "example_4_4",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "trees (plural)",
        targetText: "miti",
        explanation: "M-/MI- class (Class 4), plural form"
      },
      {
        id: "example_4_5",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "book (singular)",
        targetText: "kitabu",
        explanation: "KI-/VI- class (Class 7), used for tools, languages, etc."
      },
      {
        id: "example_4_6",
        ruleId: "grammar_4",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "books (plural)",
        targetText: "vitabu",
        explanation: "KI-/VI- class (Class 8), plural form"
      }
    ]
  },
  {
    id: "grammar_5",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 1,
    title: "Subject Prefixes",
    explanation: "In Swahili, verbs are conjugated by adding prefixes that indicate the subject (who is performing the action).",
    examples: [
      {
        id: "example_5_1",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "I read",
        targetText: "Ninasoma",
        explanation: "Ni- is the prefix for 'I'"
      },
      {
        id: "example_5_2",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "You read",
        targetText: "Unasoma",
        explanation: "U- is the prefix for 'you (singular)'"
      },
      {
        id: "example_5_3",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "He/She reads",
        targetText: "Anasoma",
        explanation: "A- is the prefix for 'he/she'"
      },
      {
        id: "example_5_4",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "We read",
        targetText: "Tunasoma",
        explanation: "Tu- is the prefix for 'we'"
      },
      {
        id: "example_5_5",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "You (plural) read",
        targetText: "Mnasoma",
        explanation: "M- is the prefix for 'you (plural)'"
      },
      {
        id: "example_5_6",
        ruleId: "grammar_5",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "They read",
        targetText: "Wanasoma",
        explanation: "Wa- is the prefix for 'they'"
      }
    ]
  },
  {
    id: "grammar_sw_b1_t3",
    languageId: "lang_sw",
    level: "beginner",
    unitId: "unit_sw_b1",
    topicIndex: 2,
    title: "Basic Greetings",
    explanation: "Swahili has specific greetings for different times of day and social contexts, often with specific responses.",
    examples: [
      {
        id: "example_sw_b1_t3_1",
        ruleId: "grammar_sw_b1_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "Hello",
        targetText: "Jambo / Hujambo",
        explanation: "General greeting, hujambo literally means 'do you have any issue?'"
      },
      {
        id: "example_sw_b1_t3_2",
        ruleId: "grammar_sw_b1_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "How are you?",
        targetText: "Habari gani?",
        explanation: "Literally means 'what news?'"
      },
      {
        id: "example_sw_b1_t3_3",
        ruleId: "grammar_sw_b1_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "Good morning",
        targetText: "Habari ya asubuhi",
        explanation: "Morning greeting"
      },
      {
        id: "example_sw_b1_t3_4",
        ruleId: "grammar_sw_b1_t3",
        sourceLanguageId: "lang_en",
        targetLanguageId: "lang_sw",
        sourceText: "I'm fine, thank you",
        targetText: "Nzuri, asante",
        explanation: "Common response to 'Habari gani?'"
      }
    ]
  },
  
];