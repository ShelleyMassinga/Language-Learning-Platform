// Sample Flashcards Data

export interface FlashcardDeck {
  id: string;
  name: string;
  sourceLanguageId: string;
  targetLanguageId: string;
  level: string;
  description: string;
}

export interface Flashcard {
  id: string;
  deckId: string;
  frontText: string;
  backText: string;
  example?: string;
  imageUrl?: string;
  audioUrl?: string; // New property for audio files
}

export const flashcardDecks: FlashcardDeck[] = [
  // Portuguese Decks
  {
    id: "deck_1",
    name: "Basic Portuguese Vocabulary",
    sourceLanguageId: "lang_en",
    targetLanguageId: "lang_pt",
    level: "beginner",
    description: "Essential words and phrases for beginners in Portuguese"
  },
  {
    id: "deck_2",
    name: "Intermediate Portuguese Vocabulary",
    sourceLanguageId: "lang_en",
    targetLanguageId: "lang_pt",
    level: "intermediate",
    description: "Expand your Portuguese vocabulary with these intermediate-level words and phrases"
  },
  {
    id: "deck_3",
    name: "Advanced Portuguese Terms",
    sourceLanguageId: "lang_en",
    targetLanguageId: "lang_pt",
    level: "advanced",
    description: "Advanced vocabulary for fluent Portuguese conversations"
  },
  
  // Swahili Decks
  {
    id: "deck_4",
    name: "Basic Swahili Vocabulary",
    sourceLanguageId: "lang_en",
    targetLanguageId: "lang_sw",
    level: "beginner",
    description: "Essential words and phrases for beginners in Swahili"
  },
  {
    id: "deck_5",
    name: "Intermediate Swahili Vocabulary",
    sourceLanguageId: "lang_en",
    targetLanguageId: "lang_sw",
    level: "intermediate",
    description: "Expand your Swahili vocabulary with these intermediate-level words and phrases"
  }
];

export const flashcards: Flashcard[] = [
  // Basic Portuguese Deck
  {
    id: "card_1",
    deckId: "deck_1",
    frontText: "água",
    backText: "water",
    example: "Eu preciso de água. (I need water.)",
    imageUrl: "/images/flashcards/water.jpg",
    audioUrl: "/audio/pt/agua.mp3"
  },
  {
    id: "card_2",
    deckId: "deck_1",
    frontText: "pão",
    backText: "bread",
    example: "Eu gosto de pão fresco. (I like fresh bread.)",
    imageUrl: "/images/flashcards/bread.jpg",
    audioUrl: "/audio/pt/pao.mp3"
  },
  {
    id: "card_3",
    deckId: "deck_1",
    frontText: "casa",
    backText: "house",
    example: "Minha casa é grande. (My house is big.)",
    imageUrl: "/images/flashcards/house.jpg",
    audioUrl: "/audio/pt/casa.mp3"
  },
  {
    id: "card_4",
    deckId: "deck_1",
    frontText: "carro",
    backText: "car",
    example: "O carro é vermelho. (The car is red.)",
    imageUrl: "/images/flashcards/car.jpg",
    audioUrl: "/audio/pt/carro.mp3"
  },
  {
    id: "card_5",
    deckId: "deck_1",
    frontText: "livro",
    backText: "book",
    example: "Eu estou lendo um livro. (I am reading a book.)",
    imageUrl: "/images/flashcards/book.jpg",
    audioUrl: "/audio/pt/livro.mp3"
  },
  {
    id: "card_6",
    deckId: "deck_1",
    frontText: "amigo/amiga",
    backText: "friend",
    example: "Ele é meu amigo. (He is my friend.)",
    imageUrl: "/images/flashcards/friend.jpg",
    audioUrl: "/audio/pt/amigo.mp3"
  },
  {
    id: "card_7",
    deckId: "deck_1",
    frontText: "família",
    backText: "family",
    example: "Minha família é grande. (My family is big.)",
    imageUrl: "/images/flashcards/family.jpg",
    audioUrl: "/audio/pt/familia.mp3"
  },
  {
    id: "card_8",
    deckId: "deck_1",
    frontText: "comida",
    backText: "food",
    example: "A comida está boa. (The food is good.)",
    imageUrl: "/images/flashcards/food.jpg",
    audioUrl: "/audio/pt/comida.mp3"
  },
  {
    id: "card_9",
    deckId: "deck_1",
    frontText: "obrigado/obrigada",
    backText: "thank you",
    example: "Obrigado pela ajuda. (Thank you for the help.)",
    imageUrl: "/images/flashcards/thanks.jpg",
    audioUrl: "/audio/pt/obrigado.mp3"
  },
  {
    id: "card_10",
    deckId: "deck_1",
    frontText: "por favor",
    backText: "please",
    example: "Água, por favor. (Water, please.)",
    imageUrl: "/images/flashcards/please.jpg",
    audioUrl: "/audio/pt/por_favor.mp3"
  },
  
  // Intermediate Portuguese Deck
  {
    id: "card_11",
    deckId: "deck_2",
    frontText: "saudade",
    backText: "longing/missing (no direct translation)",
    example: "Estou com saudade da minha família. (I miss my family.)",
    imageUrl: "/images/flashcards/saudade.jpg",
    audioUrl: "/audio/pt/saudade.mp3"
  },
  {
    id: "card_12",
    deckId: "deck_2",
    frontText: "compromisso",
    backText: "appointment/commitment",
    example: "Tenho um compromisso amanhã. (I have an appointment tomorrow.)",
    imageUrl: "/images/flashcards/appointment.jpg",
    audioUrl: "/audio/pt/compromisso.mp3"
  },
  {
    id: "card_13",
    deckId: "deck_2",
    frontText: "desenvolvimento",
    backText: "development",
    example: "O desenvolvimento econômico é importante. (Economic development is important.)",
    imageUrl: "/images/flashcards/development.jpg",
    audioUrl: "/audio/pt/desenvolvimento.mp3"
  },
  
  // Basic Swahili Deck
  {
    id: "card_14",
    deckId: "deck_4",
    frontText: "maji",
    backText: "water",
    example: "Ninataka maji. (I want water.)",
    imageUrl: "/images/flashcards/water.jpg",
    audioUrl: "/audio/sw/maji.mp3"
  },
  {
    id: "card_15",
    deckId: "deck_4",
    frontText: "chakula",
    backText: "food",
    example: "Chakula ni kitamu. (The food is delicious.)",
    imageUrl: "/images/flashcards/food.jpg",
    audioUrl: "/audio/sw/chakula.mp3"
  },
  {
    id: "card_16",
    deckId: "deck_4",
    frontText: "rafiki",
    backText: "friend",
    example: "Yeye ni rafiki yangu. (He/she is my friend.)",
    imageUrl: "/images/flashcards/friend.jpg",
    audioUrl: "/audio/sw/rafiki.mp3"
  },
  {
    id: "card_17",
    deckId: "deck_4",
    frontText: "asante",
    backText: "thank you",
    example: "Asante sana. (Thank you very much.)",
    imageUrl: "/images/flashcards/thanks.jpg",
    audioUrl: "/audio/sw/asante.mp3"
  },
  {
    id: "card_18",
    deckId: "deck_4",
    frontText: "tafadhali",
    backText: "please",
    example: "Maji, tafadhali. (Water, please.)",
    imageUrl: "/images/flashcards/please.jpg",
    audioUrl: "/audio/sw/tafadhali.mp3"
  }
];