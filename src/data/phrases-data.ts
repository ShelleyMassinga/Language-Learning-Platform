// Sample Phrases Data
// Categories and phrases for both languages

export const phraseCategories = [
    { id: "cat_1", name: "Greetings" },
    { id: "cat_2", name: "Travel" },
    { id: "cat_3", name: "Dining" },
    { id: "cat_4", name: "Emergency" },
    { id: "cat_5", name: "Shopping" },
    { id: "cat_6", name: "Small Talk" }
  ];
  
  export const phrases = [
    // English to Portuguese - Greetings
    {
      id: "phrase_1",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Good morning!",
      targetText: "Bom dia!",
      audioUrl: "/audio/pt/bom_dia.mp3"
    },
    {
      id: "phrase_2",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Good afternoon!",
      targetText: "Boa tarde!",
      audioUrl: "/audio/pt/boa_tarde.mp3"
    },
    {
      id: "phrase_3",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Good evening/night!",
      targetText: "Boa noite!",
      audioUrl: "/audio/pt/boa_noite.mp3"
    },
    {
      id: "phrase_4",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "How are you?",
      targetText: "Como está?",
      audioUrl: "/audio/pt/como_esta.mp3"
    },
    {
      id: "phrase_5",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "I'm fine, thank you!",
      targetText: "Estou bem, obrigado(a)!",
      audioUrl: "/audio/pt/estou_bem.mp3"
    },
    {
      id: "phrase_6",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Nice to meet you!",
      targetText: "Prazer em conhecê-lo(a)!",
      audioUrl: "/audio/pt/prazer.mp3"
    },
    
    // English to Portuguese - Travel
    {
      id: "phrase_7",
      categoryId: "cat_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Where is the bathroom?",
      targetText: "Onde fica o banheiro?",
      audioUrl: "/audio/pt/banheiro.mp3"
    },
    {
      id: "phrase_8",
      categoryId: "cat_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "How much does this cost?",
      targetText: "Quanto custa isto?",
      audioUrl: "/audio/pt/quanto_custa.mp3"
    },
    {
      id: "phrase_9",
      categoryId: "cat_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "I'm lost.",
      targetText: "Estou perdido(a).",
      audioUrl: "/audio/pt/estou_perdido.mp3"
    },
    
    // English to Portuguese - Dining
    {
      id: "phrase_10",
      categoryId: "cat_3",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "I would like to order.",
      targetText: "Eu gostaria de fazer o pedido.",
      audioUrl: "/audio/pt/fazer_pedido.mp3"
    },
    {
      id: "phrase_11",
      categoryId: "cat_3",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "The check, please.",
      targetText: "A conta, por favor.",
      audioUrl: "/audio/pt/a_conta.mp3"
    },
    {
      id: "phrase_12",
      categoryId: "cat_3",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "I'm vegetarian.",
      targetText: "Eu sou vegetariano(a).",
      audioUrl: "/audio/pt/vegetariano.mp3"
    },
    
    // English to Portuguese - Emergency
    {
      id: "phrase_13",
      categoryId: "cat_4",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "Help!",
      targetText: "Socorro!",
      audioUrl: "/audio/pt/socorro.mp3"
    },
    {
      id: "phrase_14",
      categoryId: "cat_4",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_pt",
      sourceText: "I need a doctor.",
      targetText: "Eu preciso de um médico.",
      audioUrl: "/audio/pt/medico.mp3"
    },
    
    // English to Swahili - Greetings
    {
      id: "phrase_15",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "Hello!",
      targetText: "Jambo!",
      audioUrl: "/audio/sw/jambo.mp3"
    },
    {
      id: "phrase_16",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "Good morning!",
      targetText: "Habari ya asubuhi!",
      audioUrl: "/audio/sw/habari_asubuhi.mp3"
    },
    {
      id: "phrase_17",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "How are you?",
      targetText: "Habari gani?",
      audioUrl: "/audio/sw/habari_gani.mp3"
    },
    {
      id: "phrase_18",
      categoryId: "cat_1",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "I'm fine, thank you!",
      targetText: "Nzuri, asante!",
      audioUrl: "/audio/sw/nzuri_asante.mp3"
    },
    
    // English to Swahili - Travel
    {
      id: "phrase_19",
      categoryId: "cat_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "Where is the bathroom?",
      targetText: "Choo kiko wapi?",
      audioUrl: "/audio/sw/choo_wapi.mp3"
    },
    {
      id: "phrase_20",
      categoryId: "cat_2",
      sourceLanguageId: "lang_en",
      targetLanguageId: "lang_sw",
      sourceText: "How much does this cost?",
      targetText: "Hii ni bei gani?",
      audioUrl: "/audio/sw/bei_gani.mp3"
    }
  ];