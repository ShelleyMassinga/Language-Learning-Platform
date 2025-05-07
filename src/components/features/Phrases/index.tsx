import React, { useState, useEffect } from 'react';
import { languages } from '../../../data/dictionary-data';
import { phraseCategories, phrases } from '../../../data/phrases-data';

const Phrases = () => {
  const [sourceLanguage, setSourceLanguage] = useState("lang_en");
  const [targetLanguage, setTargetLanguage] = useState("lang_pt");
  const [selectedCategory, setSelectedCategory] = useState<string>("");
  const [filteredPhrases, setFilteredPhrases] = useState<typeof phrases>([]);
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Function to handle category change
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId);
  };

  // Function to swap languages
  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
  };

  // Function to toggle favorite status
  const toggleFavorite = (phraseId: string) => {
    if (favorites.includes(phraseId)) {
      setFavorites(favorites.filter(id => id !== phraseId));
    } else {
      setFavorites([...favorites, phraseId]);
    }
  };

  // Function to speak phrase using browser's speech synthesis
  const speakPhrase = (text: string, langCode:string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      const languageMap: {[key: string]: string} = {
        'lang_en': 'en-US',
        'lang_pt': 'pt-BR',
        'lang_sw': 'sw'  
      };
      
      utterance.lang = languageMap[langCode] || 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  // Update filtered phrases when language or category changes
  useEffect(() => {
    let filtered = phrases.filter(phrase => 
      phrase.sourceLanguageId === sourceLanguage && 
      phrase.targetLanguageId === targetLanguage
    );
    
    if (selectedCategory) {
      filtered = filtered.filter(phrase => phrase.categoryId === selectedCategory);
    }
    
    setFilteredPhrases(filtered);
  }, [sourceLanguage, targetLanguage, selectedCategory]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Common Phrases</h2>
      
      {/* Language Selection */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">From</label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex items-end justify-center">
          <button 
            onClick={swapLanguages}
            className="p-2 border rounded-md hover:bg-gray-100"
            aria-label="Swap languages"
          >
            ⇄
          </button>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">To</label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>
      
      {/* Category Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
        <select
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
          className="w-full p-2 border rounded-md"
        >
          <option value="">All Categories</option>
          {phraseCategories.map(category => (
            <option key={category.id} value={category.id}>{category.name}</option>
          ))}
        </select>
      </div>
      
      {/* Phrases Section */}
      <div className="mt-4 space-y-3">
        {filteredPhrases.length > 0 ? (
          filteredPhrases.map(phrase => {
            const isFavorite = favorites.includes(phrase.id);
            return (
              <div key={phrase.id} className="border rounded-md p-4 hover:shadow-sm transition-shadow">
                <div className="flex justify-between">
                  <div>
                    <div className="font-medium">{phrase.sourceText}</div>
                    <div className="text-blue-600 mt-1">{phrase.targetText}</div>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => speakPhrase(phrase.targetText, targetLanguage)}
                      className="p-2 rounded-full hover:bg-gray-100"
                      aria-label="Listen"
                    >
                      🔊
                    </button>
                    <button 
                      onClick={() => toggleFavorite(phrase.id)}
                      className="p-2 rounded-full hover:bg-gray-100"
                      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
                    >
                      {isFavorite ? "★" : "☆"}
                    </button>
                  </div>
                </div>
                {phrase.audioUrl && (
                  <div className="mt-2">
                    <audio controls src={phrase.audioUrl} className="w-full h-8"></audio>
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <p className="text-gray-600">
            No phrases available for the selected category and language pair.
          </p>
        )}
      </div>
      
      {/* Show Favorites Toggle */}
      {favorites.length > 0 && (
        <div className="mt-6">
          <button
            onClick={() => setSelectedCategory(favorites.length > 0 ? "favorites" : "")}
            className={`px-4 py-2 rounded-md ${selectedCategory === "favorites" ? "bg-yellow-100 text-yellow-800" : "bg-gray-100"}`}
          >
            {selectedCategory === "favorites" ? "Showing Favorites" : "Show Favorites"} ({favorites.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default Phrases;