import React, { useState, useEffect } from 'react';
import { languages, dictionaryEntries } from '../../../data/dictionary-data';
import { Search, ArrowRightLeft, Book, Clock, X, ChevronDown, RefreshCw } from 'lucide-react';
import axios from 'axios';

// Define types for API responses
interface TranslationResponse {
  translatedText: string;
}

interface DictionaryResult {
  word: string;
  translation: string;
  pronunciation?: string;
  examples?: string[];
  isFromAPI?: boolean;
  isError?: boolean;
  errorMessage?: string;
}

const Dictionary = () => {
  const [sourceLanguage, setSourceLanguage] = useState("lang_en");
  const [targetLanguage, setTargetLanguage] = useState("lang_pt");
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState<typeof dictionaryEntries>([]);
  const [selectedEntry, setSelectedEntry] = useState<typeof dictionaryEntries[0] | null>(null);
  const [recentSearches, setRecentSearches] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [apiResult, setApiResult] = useState<DictionaryResult | null>(null);
  const [apiStatus, setApiStatus] = useState<string>("");
  const [debugInfo, setDebugInfo] = useState<string>("");

  // Function to search local dictionary
  const searchLocalDictionary = () => {
    if (!searchTerm.trim()) return false;

    const results = dictionaryEntries.filter(entry => 
      entry.sourceLanguageId === sourceLanguage && 
      entry.targetLanguageId === targetLanguage &&
      entry.word.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    
    if (!recentSearches.includes(searchTerm.toLowerCase()) && searchTerm.trim()) {
      setRecentSearches(prev => [searchTerm.toLowerCase(), ...prev].slice(0, 5));
    }

    return results.length > 0;
  };

  // Function to translate using LibreTranslate API
  const translateWithAPI = async () => {
    if (!searchTerm.trim()) return null;
    
    setIsLoading(true);
    setApiStatus("");
    setDebugInfo("");
    
    try {
      // Map our language IDs to LibreTranslate language codes
      const langMap: Record<string, string> = {
        'lang_en': 'en',
        'lang_pt': 'pt',
        'lang_sw': 'sw'
      };
      
      const sourceLang = langMap[sourceLanguage] || 'en';
      const targetLang = langMap[targetLanguage] || 'en';
      
      const debugMsg = `Translating from ${sourceLang} to ${targetLang}: "${searchTerm}"`;
      console.log(debugMsg);
      setDebugInfo(debugMsg);
      
      // Try multiple LibreTranslate instances in case one is down
      const instances = [
        'https://translate.argosopentech.com/translate',
        'https://libretranslate.de/translate',
        'https://translate.terraprint.co/translate'
      ];
      
      let response = null;
      let error = null;
      
      // Try each instance until one works
      for (const instance of instances) {
        try {
          console.log(`Trying instance: ${instance}`);
          response = await axios.post(instance, {
            q: searchTerm,
            source: sourceLang,
            target: targetLang,
            format: "text"
          }, {
            timeout: 5000, // 5 second timeout
            headers: {
              'Content-Type': 'application/json'
            }
          });
          
          // If we get here, the request was successful
          break;
        } catch (e) {
          console.error(`Error with instance ${instance}:`, e);
          error = e;
          // Continue to the next instance
        }
      }
      
      // If all instances failed
      if (!response) {
        throw error || new Error('All translation instances failed');
      }
      
      console.log('API Response:', response.data);
      
      if (response.data && response.data.translatedText) {
        const result: DictionaryResult = {
          word: searchTerm,
          translation: response.data.translatedText,
          isFromAPI: true
        };
        
        setApiResult(result);
        setApiStatus("LibreTranslate API");
        setIsLoading(false);
        return result;
      } else {
        console.error('Invalid API response format:', response.data);
        setDebugInfo(`Invalid API response: ${JSON.stringify(response.data)}`);
        throw new Error('Invalid API response format');
      }
    } catch (error) {
      console.error('Translation API error:', error);
      setDebugInfo(`API error: ${error instanceof Error ? error.message : String(error)}`);
      
      // Set a user-friendly error message
      setApiResult({
        word: searchTerm,
        translation: "Translation service unavailable. Please try again later.",
        isFromAPI: true,
        isError: true,
        errorMessage: error instanceof Error ? error.message : "Unknown error"
      });
      setApiStatus("Error");
      setIsLoading(false);
      return null;
    }
  };

  // Function to search dictionary (local + API)
  const searchDictionary = async () => {
    if (!searchTerm.trim()) return;
    
    // First try local dictionary
    const foundLocally = searchLocalDictionary();
    
    // If not found locally, try API
    if (!foundLocally) {
      console.log('Word not found in local dictionary, trying API...');
      await translateWithAPI();
    } else {
      setApiResult(null);
      setApiStatus("");
      setDebugInfo("");
    }
  };

  // Function to test API connection
  const testAPI = async () => {
    setSearchTerm("Hello");
    setSourceLanguage("lang_en");
    setTargetLanguage("lang_pt");
    await translateWithAPI();
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    setSearchResults([]);
    setSelectedEntry(null);
    setApiResult(null);
    setApiStatus("");
    setDebugInfo("");
  };

  const handleEntrySelect = (entry: typeof dictionaryEntries[0]) => {
    setSelectedEntry(entry);
    setApiResult(null);
    setApiStatus("");
    setDebugInfo("");
  };

  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  useEffect(() => {
    setSearchResults([]);
    setSelectedEntry(null);
    setApiResult(null);
    setApiStatus("");
    setDebugInfo("");
  }, [sourceLanguage, targetLanguage]);

  // Handle Enter key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      searchDictionary();
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4 text-teal-600">Dictionary</h2>
      
      {/* Language Selection */}
      <div className="flex items-center justify-between mb-4 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center">
          <span className="font-medium mr-2">{getLanguageName(sourceLanguage)}</span>
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
        </div>
        
        <button 
          onClick={swapLanguages}
          className="p-1 rounded-full hover:bg-gray-200 transition-colors"
          title="Swap languages"
        >
          <ArrowRightLeft className="h-5 w-5 text-teal-600" />
        </button>
        
        <div className="flex items-center">
          <span className="font-medium mr-2">{getLanguageName(targetLanguage)}</span>
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

      {/* Search Bar */}
      <div className="relative mb-4">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter a word or phrase to translate..."
          className="w-full p-3 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent"
        />
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
        <button 
          onClick={() => searchDictionary()}
          className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-teal-600 text-white px-4 py-1 rounded-md hover:bg-teal-700 transition-colors"
        >
          {isLoading ? 'Translating...' : 'Search'}
        </button>
      </div>

      {/* Test API Button */}
      <div className="mb-4">
        <button
          onClick={testAPI}
          className="flex items-center text-sm text-teal-600 hover:text-teal-800"
        >
          <RefreshCw className="h-4 w-4 mr-1" />
          Test Translation API
        </button>
      </div>

      {/* Debug Info (only visible in development) */}
      {process.env.NODE_ENV === 'development' && debugInfo && (
        <div className="mb-4 p-2 bg-gray-100 rounded text-xs font-mono overflow-auto">
          <div className="font-bold">Debug Info:</div>
          <div>{debugInfo}</div>
        </div>
      )}

      {/* Translation Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Input Area */}
        <div className="p-4 min-h-[200px] border rounded-lg">
          <h3 className="font-medium mb-2">{getLanguageName(sourceLanguage)}</h3>
          <textarea
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter text"
            className="w-full h-full min-h-[180px] resize-none border-none focus:ring-0 text-lg"
          />
        </div>

        {/* Translation Results */}
        <div className="p-4 min-h-[200px] bg-gray-50 rounded-lg">
          <h3 className="font-medium mb-2">{getLanguageName(targetLanguage)}</h3>
          {isLoading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-600"></div>
            </div>
          ) : selectedEntry ? (
            <div className="space-y-4">
              <div className="text-lg font-medium">{selectedEntry.definitions[0]?.definition}</div>
              {selectedEntry.definitions[0]?.example && (
                <div className="text-gray-600 italic">
                  "{selectedEntry.definitions[0].example}"
                </div>
              )}
              {selectedEntry.phonetic && (
                <div className="text-gray-500">
                  Pronunciation: {selectedEntry.phonetic}
                </div>
              )}
            </div>
          ) : apiResult ? (
            <div className="space-y-4">
              <div className={`text-lg font-medium ${apiResult.isError ? 'text-red-500' : ''}`}>
                {apiResult.translation}
              </div>
              <div className="text-xs text-gray-500 italic">
                {apiResult.isError 
                  ? `(Translation service error: ${apiResult.errorMessage || 'Unknown error'})` 
                  : `(Translation from ${apiStatus})`}
              </div>
            </div>
          ) : (
            <div className="text-gray-500 h-full flex items-center justify-center">
              {searchTerm ? 'No translation found' : 'Translation will appear here'}
            </div>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Search Results</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {searchResults.map((entry) => (
              <div 
                key={entry.id}
                onClick={() => handleEntrySelect(entry)}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedEntry?.id === entry.id ? 'bg-teal-50 border-teal-300' : 'hover:bg-gray-50'
                }`}
              >
                <div className="font-medium">{entry.word}</div>
                <div className="text-gray-600">{entry.definitions[0]?.definition}</div>
                {entry.phonetic && (
                  <div className="text-sm text-gray-500 mt-1">
                    Pronunciation: {entry.phonetic}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Searches */}
      {recentSearches.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium mb-2">Recent Searches</h3>
          <div className="flex flex-wrap gap-2">
            {recentSearches.map((term, index) => (
              <button
                key={index}
                onClick={() => {
                  setSearchTerm(term);
                  searchDictionary();
                }}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm hover:bg-gray-200 transition-colors flex items-center"
              >
                <Clock className="h-3 w-3 mr-1 text-gray-500" />
                {term}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dictionary;