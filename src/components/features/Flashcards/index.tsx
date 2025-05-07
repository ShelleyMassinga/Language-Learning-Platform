import React, { useState, useEffect } from 'react';
import { Language } from '../../../types/schema'; 
import { Flashcard, FlashcardDeck } from '../../../types/schema';
import Select from 'react-select';
import { PT, KE } from 'country-flag-icons/react/3x2';


import { languages } from '../../../data/dictionary-data';
import { flashcardDecks, flashcards } from '../../../data/flashcards-data';

interface LanguageOption {
  value: string;
  label: string;
  Flag: any;
}

const languageOptions: LanguageOption[] = [
  { value: 'lang_pt', label: 'Portuguese', Flag: PT },
  { value: 'lang_sw', label: 'Swahili', Flag: KE }
];

const customSelectStyles = {
  control: (provided: any) => ({
    ...provided,
    minHeight: '45px',
    backgroundColor: 'white',
    borderColor: '#e2e8f0',
    '&:hover': {
      borderColor: '#cbd5e0',
    },
  }),
  option: (provided: any, state: any) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    padding: '8px 12px',
    cursor: 'pointer',
    backgroundColor: state.isSelected ? '#e2e8f0' : 'white',
    color: '#1a202c',
    '&:hover': {
      backgroundColor: '#f0f4f8',
    },
  }),
  singleValue: (provided: any) => ({
    ...provided,
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    color: '#1a202c',
  }),
  menu: (provided: any) => ({
    ...provided,
    backgroundColor: 'white',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
    border: '1px solid #e2e8f0',
    borderRadius: '0.375rem',
  }),
  menuList: (provided: any) => ({
    ...provided,
    backgroundColor: 'white',
    padding: '4px 0',
  }),
};

const formatOptionLabel = (data: LanguageOption) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
    <data.Flag style={{ width: '20px', height: '15px' }} />
    <span>{data.label}</span>
  </div>
);

const Flashcards = () => {
  const [selectedDeck, setSelectedDeck] = useState<string>("");
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [filteredDecks, setFilteredDecks] = useState<FlashcardDeck[]>([]);
  const [deckCards, setDeckCards] = useState<Flashcard[]>([]);
  const [currentCardIndex, setCurrentCardIndex] = useState<number>(0);
  const [flipped, setFlipped] = useState<boolean>(false);
  const [studyMode, setStudyMode] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [knownCards, setKnownCards] = useState<string[]>([]);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);

  
  useEffect(() => {
    const filtered = flashcardDecks.filter(deck => 
      deck.targetLanguageId === currentLanguage
    );
    
    setFilteredDecks(filtered);
    setSelectedDeck("");
  }, [currentLanguage]);

  // Load cards for selected deck
  useEffect(() => {
    if (selectedDeck) {
      const cards = flashcards.filter(card => card.deckId === selectedDeck);
      setDeckCards(cards);
      setCurrentCardIndex(0);
      setFlipped(false);
      setProgress(0);
      setKnownCards([]);
    } else {
      setDeckCards([]);
    }
  }, [selectedDeck]);

  // Function to speak text using browser's speech synthesis
  const speakText = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(text);
      
      
      const languageMap: {[key: string]: string} = {
        'lang_en': 'en-US',
        'lang_pt': 'pt-BR',
        'lang_sw': 'sw'  
      };
      
      utterance.lang = languageMap[langCode] || 'en-US';
      
      utterance.onstart = () => setIsPlaying(true);
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  // Function to play audio file if available, or use speech synthesis if not
  const playAudio = (audioUrl?: string, text?: string) => {
    if (audioUrl && false) { 
      const audio = new Audio(audioUrl);
      
      // Add event handlers to track audio playback state
      audio.onplay = () => setIsPlaying(true);
      audio.onended = () => setIsPlaying(false);
      audio.onerror = () => {
        setIsPlaying(false);
        // Fallback to speech synthesis if audio file fails to load
        if (text && currentLanguage) {
          speakText(text, currentLanguage);
        }
      };
      
      audio.play();
    } else if (text && currentLanguage) {
      speakText(text, currentLanguage);
    }
  };

  // Handle deck selection
  const handleDeckChange = (deckId: string) => {
    setSelectedDeck(deckId);
  };

  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  // Get deck name by ID
  const getDeckName = (id: string) => {
    const deck = flashcardDecks.find(deck => deck.id === id);
    return deck ? deck.name : id;
  };

  // Get current card
  const currentCard = deckCards.length > 0 && currentCardIndex < deckCards.length 
    ? deckCards[currentCardIndex] 
    : null;

  // Flip card
  const flipCard = () => {
    setFlipped(!flipped);
  };

  // Navigate to next card
  const nextCard = () => {
    if (currentCardIndex < deckCards.length - 1) {
      setCurrentCardIndex(currentCardIndex + 1);
      setFlipped(false);
    } else if (studyMode) {
      const remainingCards = deckCards.filter(card => !knownCards.includes(card.id));
      if (remainingCards.length > 0) {
        const newDeckCards = [...remainingCards];
        setDeckCards(newDeckCards);
        setCurrentCardIndex(0);
        setFlipped(false);
        setProgress(Math.round((knownCards.length / flashcards.filter(card => card.deckId === selectedDeck).length) * 100));
      } else {
        setStudyMode(false);
        setProgress(100);
      }
    }
  };

  // Navigate to previous card
  const prevCard = () => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex(currentCardIndex - 1);
      setFlipped(false);
    }
  };

  // Mark card as known
  const markAsKnown = () => {
    if (currentCard && !knownCards.includes(currentCard.id)) {
      setKnownCards([...knownCards, currentCard.id]);
    }
    nextCard();
  };

  // Start study mode
  const startStudyMode = () => {
    setStudyMode(true);
    setCurrentCardIndex(0);
    setFlipped(false);
    setKnownCards([]);
  };

  // Shuffle cards
  const shuffleCards = () => {
    const shuffled = [...deckCards].sort(() => Math.random() - 0.5);
    setDeckCards(shuffled);
    setCurrentCardIndex(0);
    setFlipped(false);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Flashcards</h2>
      
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        {/* Language Selection */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <Select
            value={languageOptions.find(option => option.value === currentLanguage)}
            onChange={(option: any) => handleLanguageChange(option.value)}
            options={languageOptions}
            styles={customSelectStyles}
            formatOptionLabel={formatOptionLabel}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>
        
        {/* Deck Selection */}
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Select a deck</label>
          <select
            value={selectedDeck}
            onChange={(e) => handleDeckChange(e.target.value)}
            className="w-full p-2 border rounded-md"
            disabled={filteredDecks.length === 0}
          >
            <option value="">Select a deck</option>
            {filteredDecks.map(deck => (
              <option key={deck.id} value={deck.id}>{deck.name} ({deck.level})</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Study Mode Controls */}
      {selectedDeck && (
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={startStudyMode}
            className={`px-4 py-2 rounded-md ${studyMode ? 'bg-green-500 text-white' : 'bg-gray-200 hover:bg-gray-300'}`}
          >
            {studyMode ? 'Studying...' : 'Start Study Mode'}
          </button>
          
          <button
            onClick={shuffleCards}
            className="px-4 py-2 bg-blue-100 text-blue-700 rounded-md hover:bg-blue-200"
          >
            Shuffle Cards
          </button>
          
          {studyMode && (
            <div className="flex-1 flex items-center pl-4">
              <span className="text-sm text-gray-600 mr-2">Progress:</span>
              <div className="flex-1 h-2 bg-gray-200 rounded">
                <div 
                  className="h-2 bg-green-500 rounded" 
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600 ml-2">{progress}%</span>
            </div>
          )}
        </div>
      )}
      
      {/* Flashcard Display */}
      {selectedDeck ? (
        <>
          {currentCard ? (
            <div className="flex flex-col items-center">
              <div 
                className="w-full max-w-md aspect-[3/2] bg-white rounded-xl shadow-lg relative cursor-pointer overflow-hidden"
                onClick={flipCard}
              >
                {/* Front of Card */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl transition-opacity duration-300 ${flipped ? 'opacity-0' : 'opacity-100'}`}>
                  {currentCard.imageUrl && (
                    <div className="mb-4 w-32 h-32 overflow-hidden rounded-lg">
                      <img 
                        src={currentCard.imageUrl} 
                        alt={currentCard.frontText}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{currentCard.frontText}</h3>
                  <p className="text-sm text-gray-500">Click to flip</p>
                </div>
                
                {/* Back of Card */}
                <div className={`absolute inset-0 flex flex-col items-center justify-center p-6 border border-gray-200 rounded-xl bg-blue-50 transition-opacity duration-300 ${flipped ? 'opacity-100' : 'opacity-0'}`}>
                  {currentCard.imageUrl && (
                    <div className="mb-4 w-32 h-32 overflow-hidden rounded-lg">
                      <img 
                        src={currentCard.imageUrl} 
                        alt={currentCard.backText}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold mb-2">{currentCard.backText}</h3>
                  {currentCard.example && (
                    <p className="text-sm text-gray-600 mb-2 italic">{currentCard.example}</p>
                  )}
                  <p className="text-sm text-gray-500">Click to flip back</p>
                </div>
              </div>
              
              {/* Navigation Controls */}
              <div className="flex justify-center gap-4 mt-6">
                <button
                  onClick={prevCard}
                  disabled={currentCardIndex === 0}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                >
                  ← Previous
                </button>
                
                {/* Standalone Audio button */}
                <button
                  onClick={() => currentCard && playAudio(currentCard.audioUrl, currentCard.frontText)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-1"
                  disabled={isPlaying}
                >
                  {isPlaying ? '🔊 Playing...' : '🔈 Listen'}
                </button>
                
                {studyMode && (
                  <button
                    onClick={markAsKnown}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                  >
                    I Know This
                  </button>
                )}
                
                <button
                  onClick={nextCard}
                  disabled={currentCardIndex === deckCards.length - 1 && !studyMode}
                  className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                >
                  Next →
                </button>
              </div>
              
              {/* Card Counter */}
              <div className="mt-4 text-sm text-gray-500">
                Card {currentCardIndex + 1} of {deckCards.length}
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-8 border rounded-xl bg-gray-50">
              <p className="text-lg text-gray-600 mb-2">No cards available in this deck.</p>
              <p className="text-sm text-gray-500">Please select another deck.</p>
            </div>
          )}
        </>
      ) : (
        <div className="aspect-[3/2] max-w-md mx-auto bg-white rounded-xl shadow-lg flex items-center justify-center border">
          <p className="text-gray-600">Select a deck to start practicing</p>
        </div>
      )}
      
      {/* Deck Information */}
      {selectedDeck && (
        <div className="mt-8 p-4 bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">About this deck</h3>
          <p className="text-sm text-gray-600">
            {getDeckName(selectedDeck)} - {
              flashcardDecks.find(deck => deck.id === selectedDeck)?.description
            }
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Level: {flashcardDecks.find(deck => deck.id === selectedDeck)?.level}
          </p>
          <p className="text-sm text-gray-600 mt-1">
            Cards: {flashcards.filter(card => card.deckId === selectedDeck).length}
          </p>
        </div>
      )}
    </div>
  );
};

export default Flashcards;