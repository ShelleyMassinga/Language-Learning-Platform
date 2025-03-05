import React, { useState, useEffect } from 'react';
import { languages, dictionaryEntries } from '../../../data/dictionary-data';

const Dictionary = () => {
  const [sourceLanguage, setSourceLanguage] = useState("lang_en");
  const [targetLanguage, setTargetLanguage] = useState("lang_pt");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof dictionaryEntries>([]);
  const [selectedEntry, setSelectedEntry] = useState<typeof dictionaryEntries[0] | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);

  // Function to search dictionary
  const searchDictionary = () => {
    if (!searchTerm.trim()) return;

    const results = dictionaryEntries.filter(entry => 
      entry.sourceLanguageId === sourceLanguage && 
      entry.targetLanguageId === targetLanguage &&
      entry.word.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    
    // Add to recent searches if not already there
    if (!recentSearches.includes(searchTerm.toLowerCase()) && searchTerm.trim()) {
      setRecentSearches(prev => [searchTerm.toLowerCase(), ...prev].slice(0, 5));
    }
  };

  // Function to swap languages
  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSearchResults([]);
    setSelectedEntry(null);
  };

  // Function to handle entry selection
  const handleEntrySelect = (entry: typeof dictionaryEntries[0]) => {
    setSelectedEntry(entry);
  };

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  useEffect(() => {
    // Clear results when languages change
    setSearchResults([]);
    setSelectedEntry(null);
  }, [sourceLanguage, targetLanguage]);

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dictionary & Translations</h2>
      
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
      
      {/* Search Box */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchDictionary()}
          placeholder={`Enter a word in ${getLanguageName(sourceLanguage)}...`}
          className="flex-1 p-2 border rounded-md"
        />
        <button 
          onClick={searchDictionary}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          Translate
        </button>
      </div>
      
      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-6">
          <p className="text-sm text-gray-500 mb-2">Recent searches:</p>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(term);
                  searchDictionary();
                }}
                className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
      
      {/* Results Section */}
      <div className="mt-8 grid md:grid-cols-5 gap-6">
        {/* Search Results */}
        <div className={`md:col-span-2 ${selectedEntry ? 'border-r pr-4' : ''}`}>
          {searchResults.length > 0 ? (
            <>
              <h3 className="font-medium mb-3">Results</h3>
              <ul className="space-y-2">
                {searchResults.map(entry => (
                  <li 
                    key={entry.id}
                    onClick={() => handleEntrySelect(entry)}
                    className={`p-2 rounded cursor-pointer hover:bg-gray-100 ${selectedEntry?.id === entry.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''}`}
                  >
                    <div className="font-medium">{entry.definitions[0].definition}</div>
                    <div className="text-sm text-gray-500">{entry.partOfSpeech}</div>
                  </li>
                ))}
              </ul>
            </>
          ) : searchTerm ? (
            <p className="text-gray-600">No results found. Try a different word.</p>
          ) : null}
        </div>
        
        {/* Definition Details */}
        {selectedEntry && (
          <div className="md:col-span-3">
            <div className="mb-4">
              <h3 className="text-xl font-medium">{selectedEntry.word}</h3>
              {selectedEntry.phonetic && (
                <div className="text-gray-500 italic">{selectedEntry.phonetic}</div>
              )}
              <div className="text-sm text-gray-600 mt-1">{selectedEntry.partOfSpeech}</div>
            </div>
            
            <div className="space-y-4">
              {selectedEntry.definitions.map(def => (
                <div key={def.id} className="border-b pb-3">
                  <div className="font-medium text-blue-600">{def.definition}</div>
                  {def.example && (
                    <div className="mt-2 text-sm italic text-gray-600">{def.example}</div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dictionary;