import React, { useState, useEffect } from 'react';
import { languages, dictionaryEntries } from '../../../data/dictionary-data';
import { Search, ArrowRightLeft, Book, Clock, X } from 'lucide-react';

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
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center">
        <Book className="mr-2 h-6 w-6" />
        Dictionary
      </h2>
      
      {/* Language Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            From Language
          </label>
          <select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-center">
          <button
            onClick={swapLanguages}
            className="p-3 bg-indigo-100 text-indigo-700 rounded-full hover:bg-indigo-200 transition-colors"
            aria-label="Swap languages"
          >
            <ArrowRightLeft className="h-5 w-5" />
          </button>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-medium text-indigo-700 mb-2">
            To Language
          </label>
          <select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            className="w-full p-3 border border-indigo-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          >
            {languages.map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && searchDictionary()}
            placeholder={`Search in ${getLanguageName(sourceLanguage)}...`}
            className="w-full p-4 pr-12 border border-indigo-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
          />
          <button
            onClick={searchDictionary}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 p-2 text-indigo-500 hover:text-indigo-700"
          >
            <Search className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <Clock className="mr-1 h-4 w-4" />
            Recent Searches
          </h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(term);
                  setSearchResults(
                    dictionaryEntries.filter(entry => 
                      entry.sourceLanguageId === sourceLanguage && 
                      entry.targetLanguageId === targetLanguage &&
                      entry.word.toLowerCase().includes(term.toLowerCase())
                    )
                  );
                }}
                className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm hover:bg-indigo-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Results and Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Search Results */}
        <div className="md:col-span-1 bg-white rounded-xl shadow-sm p-4 h-[500px] overflow-y-auto">
          <h3 className="text-lg font-medium text-indigo-800 mb-4">Results</h3>
          {searchResults.length === 0 ? (
            <p className="text-gray-500 text-center py-4">
              {searchTerm ? "No results found" : "Search for a word or phrase"}
            </p>
          ) : (
            <ul className="space-y-2">
              {searchResults.map((entry) => (
                <li key={entry.id}>
                  <button
                    onClick={() => handleEntrySelect(entry)}
                    className={`w-full text-left p-3 rounded-lg transition-all ${
                      selectedEntry?.id === entry.id
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                        : 'hover:bg-indigo-50 text-indigo-800'
                    }`}
                  >
                    <div className="font-medium">{entry.word}</div>
                    <div className="text-sm opacity-80">
                      {entry.definitions[0]?.definition}
                    </div>
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Entry Details */}
        <div className="md:col-span-2 bg-white rounded-xl shadow-sm p-6">
          {selectedEntry ? (
            <div>
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-2xl font-bold text-indigo-800">{selectedEntry.word}</h3>
                <span className="px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-sm">
                  {selectedEntry.partOfSpeech}
                </span>
              </div>
              
              {selectedEntry.phonetic && (
                <div className="mb-4 text-indigo-600">
                  {selectedEntry.phonetic}
                </div>
              )}
              
              <div className="mb-6">
                <h4 className="text-lg font-medium text-indigo-700 mb-2">Definitions</h4>
                <ul className="space-y-4">
                  {selectedEntry.definitions.map((def) => (
                    <li key={def.id} className="border-l-4 border-indigo-300 pl-4">
                      <div className="font-medium text-indigo-800">{def.definition}</div>
                      {def.example && (
                        <div className="mt-2 text-gray-600 italic">
                          "{def.example}"
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-gray-400">
              <p className="text-center">
                Select a word from the results to see details
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dictionary;