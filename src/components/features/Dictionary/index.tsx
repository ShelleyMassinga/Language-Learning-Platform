import React, { useState, useEffect } from 'react';
import { languages, dictionaryEntries } from '../../../data/dictionary-data';
import { Search, ArrowRightLeft, Book, Clock, X, ChevronDown } from 'lucide-react';

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
    
    if (!recentSearches.includes(searchTerm.toLowerCase()) && searchTerm.trim()) {
      setRecentSearches(prev => [searchTerm.toLowerCase(), ...prev].slice(0, 5));
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSearchResults([]);
    setSelectedEntry(null);
  };

  const handleEntrySelect = (entry: typeof dictionaryEntries[0]) => {
    setSelectedEntry(entry);
  };

  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  useEffect(() => {
    setSearchResults([]);
    setSelectedEntry(null);
  }, [sourceLanguage, targetLanguage]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Language Selection and Input Area */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-6">
        {/* Language Selection Bar */}
        <div className="flex items-center justify-between px-4 py-3 bg-gray-50 border-b">
          <div className="flex items-center gap-4">
            {/* From Language */}
            <div className="relative">
              <select
                value={sourceLanguage}
                onChange={(e) => setSourceLanguage(e.target.value)}
                className="appearance-none bg-transparent pr-8 py-1 pl-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md cursor-pointer focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>

            {/* Swap Button */}
            <button
              onClick={swapLanguages}
              className="p-1.5 hover:bg-gray-200 rounded-full transition-colors"
              aria-label="Swap languages"
            >
              <ArrowRightLeft className="h-4 w-4 text-gray-600" />
            </button>

            {/* To Language */}
            <div className="relative">
              <select
                value={targetLanguage}
                onChange={(e) => setTargetLanguage(e.target.value)}
                className="appearance-none bg-transparent pr-8 py-1 pl-2 text-gray-700 font-medium hover:bg-gray-100 rounded-md cursor-pointer focus:outline-none"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
              <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-500" />
            </div>
          </div>
        </div>

        {/* Translation Area */}
        <div className="grid grid-cols-2">
          {/* Input Area */}
          <div className="p-4 min-h-[200px] border-r">
            <textarea
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchDictionary()}
              placeholder="Enter text"
              className="w-full h-full min-h-[180px] resize-none border-none focus:ring-0 text-lg"
            />
          </div>

          {/* Translation Results */}
          <div className="p-4 min-h-[200px] bg-gray-50">
            {selectedEntry ? (
              <div className="space-y-4">
                <div className="text-lg font-medium">{selectedEntry.definitions[0]?.definition}</div>
                {selectedEntry.definitions[0]?.example && (
                  <div className="text-gray-600 italic">
                    "{selectedEntry.definitions[0].example}"
                  </div>
                )}
              </div>
            ) : (
              <div className="text-gray-500">Translation</div>
            )}
          </div>
        </div>
      </div>

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-600 mb-2 flex items-center">
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
                className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-gray-200 transition-colors"
              >
                {term}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="bg-white rounded-xl shadow-lg p-4">
          <h3 className="text-lg font-medium text-gray-800 mb-4">Additional Results</h3>
          <ul className="space-y-2">
            {searchResults.map((entry) => (
              <li key={entry.id}>
                <button
                  onClick={() => handleEntrySelect(entry)}
                  className={`w-full text-left p-3 rounded-lg transition-all ${
                    selectedEntry?.id === entry.id
                      ? 'bg-gray-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="font-medium">{entry.word}</div>
                  <div className="text-sm text-gray-600">
                    {entry.definitions[0]?.definition}
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Dictionary;