// types.ts - Database Schema Types

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
    code: string; // e.g., 'en', 'pt', 'sw'
    name: string; // e.g., 'English', 'Portuguese', 'Swahili'
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
    name: string; // e.g., 'Greetings', 'Travel', 'Dining'
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
    level: 'beginner' | 'intermediate' | 'advanced';
    title: string;
    explanation: string;
    examples: GrammarExample[];
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
  
  // Exercises
  export interface ExerciseType {
    id: string;
    name: string; // 'multiple-choice', 'fill-blanks', 'word-order', 'listening'
    description: string;
  }
  
  export interface Exercise {
    id: string;
    typeId: string;
    languageId: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    question: string;
    options?: string[]; // For multiple choice
    correctAnswer: string;
    explanation?: string;
    audioUrl?: string; // For listening exercises
  }
  
  // Flashcards
  export interface FlashcardDeck {
    id: string;
    name: string;
    sourceLanguageId: string;
    targetLanguageId: string;
    level: 'beginner' | 'intermediate' | 'advanced';
    description: string;
  }
  
  export interface Flashcard {
    id: string;
    deckId: string;
    frontText: string; // Word in target language
    backText: string; // Translation in source language
    example?: string;
    imageUrl?: string;
  }
  
  // Progress tracking
  export interface UserProgress {
    id: string;
    userId: string;
    languageId: string;
    vocabularyProgress: number; // Percentage
    grammarProgress: number; // Percentage
    exerciseSuccess: number; // Percentage
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