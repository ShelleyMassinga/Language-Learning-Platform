// Sample Dictionary Data
// English to Portuguese & Portuguese to English

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
    }
  ];