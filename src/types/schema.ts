// User-related types
export interface User {
    id: string;
    email: string;
    name: string;
    createdAt: Date;
    nativeLanguage: string;
    learningLanguages: UserLanguage[];
  }
  
  export interface UserLanguage {
    id: string;
    userId: string;
    languageId: string;
    proficiencyLevel: 'beginner' | 'intermediate' | 'advanced';
    startedAt: Date;
    lastActive: Date;
  }
  
  // Language and content types
  export interface Language {
    id: string;
    code: string; 
    name: string; 
  }
  
  // Dictionary entries
  export interface DictionaryEntry {
    id: string;
    sourceLanguageId: string;
    targetLanguageId: string;
    word: string;
    partOfSpeech: string;
    phonetic?: string;
    definitions: DictionaryDefinition[];
  }
  
  export interface DictionaryDefinition {
    id: string;
    entryId: string;
    definition: string;
    example?: string;
  }
  
  // Common phrases
  export interface PhraseCategory {
    id: string;
    name: string; 
  }
  
  export interface Phrase {
    id: string;
    categoryId: string; 
    sourceLanguageId: string;
    targetLanguageId: string;
    sourceText: string;
    targetText: string;
    audioUrl?: string;
  }
  
  // Grammar section
  export interface GrammarRule {
    id: string;
    languageId: string;
    level: string;
    title: string;
    explanation: string;
    examples: GrammarExample[];
    unitId: string;      
    topicIndex: number; 
  }
  
  export interface GrammarExample {
    id: string;
    ruleId: string;
    sourceLanguageId: string;
    targetLanguageId: string;
    sourceText: string;
    targetText: string;
    explanation?: string;
  }

  export interface SyllabusUnit {
    id: string;
    languageId: string;
    level: string;
    title: string;
    description: string;
    units: {
      id: string;
      title: string;
      topics: string[];
    }[];
  }
  
  // Exercises
  export interface ExerciseType {
    id: string;
    name: string; 
    description: string;
  }
  
  export interface Exercise {
    id: string;
    typeId: string;
    languageId: string;
    level: string;
    question: string;
    options?: string[];
    correctAnswer?: string;  
    explanation?: string;
    audioUrl?: string;
    matchItems?: { id: string; text: string; }[];
    matchResponses?: { id: string; text: string; matchesId: string; }[];
    conjugations?: { pronoun: string; correctForm: string; }[];
    unitId?: string;
    topicIndex?: number;
    answerType?: 'text' | 'matching' | 'conjugation';  
  }
  
  // Flashcards
  export interface FlashcardDeck {
    id: string;
    name: string;
    sourceLanguageId: string;
    targetLanguageId: string;
    level: string;
    description: string;
    unitId?: string;          
    topicIndex?: number;      
    cardCount?: number;       
    estimatedTime?: string;   
  }
  
  export interface Flashcard {
    id: string;
    deckId: string;
    frontText: string; 
    backText: string; 
    example?: string;
    imageUrl?: string;
    audioUrl?: string;
  }
  
  // Progress tracking
  export interface UserProgress {
    id: string;
    userId: string;
    languageId: string;
    vocabularyProgress: number; 
    grammarProgress: number; 
    exerciseSuccess: number; 
    lastUpdated: Date;
  }
  
  export interface UserActivity {
    id: string;
    userId: string;
    languageId: string;
    activityType: 'dictionary' | 'phrases' | 'grammar' | 'exercises' | 'flashcards';
    itemId: string; // ID of the related item
    completedAt: Date;
    score?: number; // For scored activities like exercises
  }