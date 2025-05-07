export const languages = [
    { id: "lang_en", code: "en", name: "English" },
    { id: "lang_pt", code: "pt", name: "Portuguese" },
    { id: "lang_sw", code: "sw", name: "Swahili" }
  ];
  
  export const dictionaryEntries = [
    // English to Portuguese
    {
      id: "dict_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "hello",
      partOfSpeech: "interjection",
      phonetic: "/həˈloʊ/",
      definitions: [
        {
          id: "def_1_1",
          entryId: "dict_1",
          definition: "olá",
          example: "Hello, how are you? = Olá, como está?"
        }
      ]
    },
    {
      id: "dict_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "water",
      partOfSpeech: "noun",
      phonetic: "/ˈwɔːtər/",
      definitions: [
        {
          id: "def_2_1",
          entryId: "dict_2",
          definition: "água",
          example: "I need some water. = Eu preciso de água."
        }
      ]
    },
    {
      id: "dict_3",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "book",
      partOfSpeech: "noun",
      phonetic: "/bʊk/",
      definitions: [
        {
          id: "def_3_1",
          entryId: "dict_3",
          definition: "livro",
          example: "I'm reading a book. = Estou lendo um livro."
        }
      ]
    },
    {
      id: "dict_4",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "to eat",
      partOfSpeech: "verb",
      phonetic: "/tuː iːt/",
      definitions: [
        {
          id: "def_4_1",
          entryId: "dict_4",
          definition: "comer",
          example: "I want to eat dinner. = Eu quero comer jantar."
        }
      ]
    },
    {
      id: "dict_5",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "friend",
      partOfSpeech: "noun",
      phonetic: "/frɛnd/",
      definitions: [
        {
          id: "def_5_1",
          entryId: "dict_5",
          definition: "amigo (masculine), amiga (feminine)",
          example: "He is my friend. = Ele é meu amigo."
        }
      ]
    },
    
    // Portuguese to English
    {
      id: "dict_6",
      sourceLanguageId: "lang_pt",
      targetLanguageId: "lang_en",
      word: "olá",
      partOfSpeech: "interjeição",
      phonetic: "/ɔ.ˈla/",
      definitions: [
        {
          id: "def_6_1",
          entryId: "dict_6",
          definition: "hello",
          example: "Olá, como está? = Hello, how are you?"
        }
      ]
    },
    {
      id: "dict_7",
      sourceLanguageId: "lang_pt",
      targetLanguageId: "lang_en",
      word: "água",
      partOfSpeech: "substantivo",
      phonetic: "/ˈa.ɡwa/",
      definitions: [
        {
          id: "def_7_1",
          entryId: "dict_7",
          definition: "water",
          example: "Eu preciso de água. = I need some water."
        }
      ]
    },
    
    // English to Swahili
    {
      id: "dict_8",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "hello",
      partOfSpeech: "interjection",
      phonetic: "/həˈloʊ/",
      definitions: [
        {
          id: "def_8_1",
          entryId: "dict_8",
          definition: "jambo, hujambo",
          example: "Hello, how are you? = Jambo, habari gani?"
        }
      ]
    },
    {
      id: "dict_9",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "water",
      partOfSpeech: "noun",
      phonetic: "/ˈwɔːtər/",
      definitions: [
        {
          id: "def_9_1",
          entryId: "dict_9",
          definition: "maji",
          example: "I need some water. = Ninahitaji maji."
        }
      ]
    },
    
    // Swahili to English
    {
      id: "dict_10",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "jambo",
      partOfSpeech: "kiunganishi",
      definitions: [
        {
          id: "def_10_1",
          entryId: "dict_10",
          definition: "hello",
          example: "Jambo, habari gani? = Hello, how are you?"
        }
      ]
    },
    {
      id: "dict_11",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "maji",
      partOfSpeech: "nomino",
      definitions: [
        {
          id: "def_11_1",
          entryId: "dict_11",
          definition: "water",
          example: "Ninahitaji maji. = I need water."
        }
      ]
    },
    
    // Additional English to Portuguese entries
    {
      id: "dict_12",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "good morning",
      partOfSpeech: "phrase",
      phonetic: "/ɡʊd ˈmɔːnɪŋ/",
      definitions: [
        {
          id: "def_12_1",
          entryId: "dict_12",
          definition: "bom dia",
          example: "Good morning! How are you? = Bom dia! Como está?"
        }
      ]
    },
    {
      id: "dict_13",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "thank you",
      partOfSpeech: "phrase",
      phonetic: "/θæŋk juː/",
      definitions: [
        {
          id: "def_13_1",
          entryId: "dict_13",
          definition: "obrigado (masculine), obrigada (feminine)",
          example: "Thank you for your help. = Obrigado pela sua ajuda."
        }
      ]
    },
    {
      id: "dict_14",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "to sleep",
      partOfSpeech: "verb",
      phonetic: "/tuː sliːp/",
      definitions: [
        {
          id: "def_14_1",
          entryId: "dict_14",
          definition: "dormir",
          example: "I need to sleep. = Eu preciso dormir."
        }
      ]
    },
    {
      id: "dict_15",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      word: "house",
      partOfSpeech: "noun",
      phonetic: "/haʊs/",
      definitions: [
        {
          id: "def_15_1",
          entryId: "dict_15",
          definition: "casa",
          example: "This is my house. = Esta é minha casa."
        }
      ]
    },

    // Additional Portuguese to English entries
    {
      id: "dict_16",
      sourceLanguageId: "lang_pt",
      targetLanguageId: "lang_en",
      word: "bom dia",
      partOfSpeech: "phrase",
      phonetic: "/bõ ˈdʒi.a/",
      definitions: [
        {
          id: "def_16_1",
          entryId: "dict_16",
          definition: "good morning",
          example: "Bom dia! Como está? = Good morning! How are you?"
        }
      ]
    },
    {
      id: "dict_17",
      sourceLanguageId: "lang_pt",
      targetLanguageId: "lang_en",
      word: "obrigado",
      partOfSpeech: "adjective",
      phonetic: "/o.bɾi.ˈɡa.du/",
      definitions: [
        {
          id: "def_17_1",
          entryId: "dict_17",
          definition: "thank you (masculine)",
          example: "Obrigado pela sua ajuda. = Thank you for your help."
        }
      ]
    },
    {
      id: "dict_18",
      sourceLanguageId: "lang_pt",
      targetLanguageId: "lang_en",
      word: "dormir",
      partOfSpeech: "verb",
      phonetic: "/doʁ.ˈmiʁ/",
      definitions: [
        {
          id: "def_18_1",
          entryId: "dict_18",
          definition: "to sleep",
          example: "Eu preciso dormir. = I need to sleep."
        }
      ]
    },

    // Additional English to Swahili entries
    {
      id: "dict_19",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "good morning",
      partOfSpeech: "phrase",
      phonetic: "/ɡʊd ˈmɔːnɪŋ/",
      definitions: [
        {
          id: "def_19_1",
          entryId: "dict_19",
          definition: "habari za asubuhi",
          example: "Good morning! How are you? = Habari za asubuhi! Habari gani?"
        }
      ]
    },
    {
      id: "dict_20",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "thank you",
      partOfSpeech: "phrase",
      phonetic: "/θæŋk juː/",
      definitions: [
        {
          id: "def_20_1",
          entryId: "dict_20",
          definition: "asante",
          example: "Thank you for your help. = Asante kwa msaada wako."
        }
      ]
    },
    {
      id: "dict_21",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "to sleep",
      partOfSpeech: "verb",
      phonetic: "/tuː sliːp/",
      definitions: [
        {
          id: "def_21_1",
          entryId: "dict_21",
          definition: "kulala",
          example: "I need to sleep. = Ninahitaji kulala."
        }
      ]
    },
    {
      id: "dict_22",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      word: "house",
      partOfSpeech: "noun",
      phonetic: "/haʊs/",
      definitions: [
        {
          id: "def_22_1",
          entryId: "dict_22",
          definition: "nyumba",
          example: "This is my house. = Hii ni nyumba yangu."
        }
      ]
    },

    // Additional Swahili to English entries
    {
      id: "dict_23",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "habari za asubuhi",
      partOfSpeech: "phrase",
      definitions: [
        {
          id: "def_23_1",
          entryId: "dict_23",
          definition: "good morning",
          example: "Habari za asubuhi! Habari gani? = Good morning! How are you?"
        }
      ]
    },
    {
      id: "dict_24",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "asante",
      partOfSpeech: "interjection",
      definitions: [
        {
          id: "def_24_1",
          entryId: "dict_24",
          definition: "thank you",
          example: "Asante kwa msaada wako. = Thank you for your help."
        }
      ]
    },
    {
      id: "dict_25",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "kulala",
      partOfSpeech: "verb",
      definitions: [
        {
          id: "def_25_1",
          entryId: "dict_25",
          definition: "to sleep",
          example: "Ninahitaji kulala. = I need to sleep."
        }
      ]
    },
    {
      id: "dict_26",
      sourceLanguageId: "lang_sw",
      targetLanguageId: "lang_en",
      word: "nyumba",
      partOfSpeech: "noun",
      definitions: [
        {
          id: "def_26_1",
          entryId: "dict_26",
          definition: "house",
          example: "Hii ni nyumba yangu. = This is my house."
        }
      ]
    }
  ];