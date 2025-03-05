// Sample Grammar Data

export const grammarRules = [
    // Portuguese Grammar - Beginner Level
    {
      id: "grammar_1",
      languageId: "lang_pt",
      level: "beginner",
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
      id: "grammar_2",
      languageId: "lang_pt",
      level: "beginner",
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
        }
      ]
    },
    
    // Portuguese Grammar - Intermediate Level
    {
      id: "grammar_3",
      languageId: "lang_pt",
      level: "intermediate",
      title: "Present Tense of Regular Verbs",
      explanation: "Regular verbs in Portuguese fall into three categories based on their infinitive endings: -ar, -er, and -ir. Each category follows a specific pattern for conjugation in the present tense.",
      examples: [
        {
          id: "example_3_1",
          ruleId: "grammar_3",
          sourceLanguageId: "lang_en",
          targetLanguageId: "lang_pt",
          sourceText: "I speak (-ar verb)",
          targetText: "Eu falo",
          explanation: "First person singular of falar (to speak)"
        },
        {
          id: "example_3_2",
          ruleId: "grammar_3",
          sourceLanguageId: "lang_en",
          targetLanguageId: "lang_pt",
          sourceText: "You eat (-er verb)",
          targetText: "Você come",
          explanation: "Third person singular of comer (to eat)"
        },
        {
          id: "example_3_3",
          ruleId: "grammar_3",
          sourceLanguageId: "lang_en",
          targetLanguageId: "lang_pt",
          sourceText: "We open (-ir verb)",
          targetText: "Nós abrimos",
          explanation: "First person plural of abrir (to open)"
        }
      ]
    },
    
    // Swahili Grammar - Beginner Level
    {
      id: "grammar_4",
      languageId: "lang_sw",
      level: "beginner",
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
        }
      ]
    },
    {
      id: "grammar_5",
      languageId: "lang_sw",
      level: "beginner",
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
        }
      ]
    }
  ];