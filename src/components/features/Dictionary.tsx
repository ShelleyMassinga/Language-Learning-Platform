import React, { useState, useRef, useEffect } from 'react';
import { Search, Volume2, Copy, Check, Globe, ChevronDown, ArrowRightLeft } from 'lucide-react';

interface Language {
  code: string;
  name: string;
}

interface WordData {
  word: string;
  pronunciation: string;
  translation: string;
  examples: string[];
  partOfSpeech?: string;
}

interface DictionaryData {
  [key: string]: {
    [key: string]: WordData;
  };
}


const availableLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sw', name: 'Swahili' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ru', name: 'Russian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];


const apiLanguageMapping: {[key: string]: string} = {
  'en': 'en', // English
  'pt': 'pt', // Portuguese
  'sw': 'sw', // Swahili 
};


const mockDictionary: DictionaryData = {
  en: {
    'hello': { word: 'hello', translation: 'Olá', pronunciation: '/həˈləʊ/', examples: ['Hello, how are you?', 'Hello, nice to meet you!'] },
    'goodbye': { word: 'goodbye', translation: 'Adeus', pronunciation: '/ɡʊdˈbaɪ/', examples: ['Goodbye, see you later!', 'Goodbye and good luck!'] },
    'thank you': { word: 'thank you', translation: 'Obrigado', pronunciation: '/θæŋk juː/', examples: ['Thank you for your help.', 'Thank you very much!'] },
    
  },
  pt: {
    'ola': { word: 'ola', translation: 'Hello', pronunciation: '/oʊˈlɑː/', examples: ['Olá, como vai?', 'Olá, prazer em conhecer!'] },
    'obrigado': { word: 'obrigado', translation: 'Thank you', pronunciation: '/oʊbriˈɡɑːduː/', examples: ['Obrigado pela sua ajuda.', 'Muito obrigado!'] },
    
  },
  sw: {
    'jambo': { word: 'jambo', translation: 'Hello', pronunciation: '/ˈdʒæmboʊ/', examples: ['Jambo, habari?', 'Jambo, nice to meet you!'] },
    'asante': { word: 'asante', translation: 'Thank you', pronunciation: '/əˈsænteɪ/', examples: ['Asante for your help.', 'Asante sana!'] },
    
  }
};

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [sourceLanguage, setSourceLanguage] = useState<Language>(availableLanguages[0]);
  const [targetLanguage, setTargetLanguage] = useState<Language>(availableLanguages[1]);
  const [isSourceLanguageMenuOpen, setIsSourceLanguageMenuOpen] = useState(false);
  const [isTargetLanguageMenuOpen, setIsTargetLanguageMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState<WordData>({
    word: '',
    pronunciation: '',
    translation: '',
    examples: []
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const translateWithApi = async (text: string, sourceLang: string, targetLang: string): Promise<string | null> => {
    try {
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text,
          sourceLang,
          targetLang,
        }),
      });

      if (!response.ok) {
        throw new Error(`Translation failed: ${response.statusText}`);
      }

      const data = await response.json();
      return data.translation;
    } catch (err) {
      console.error('Translation API error:', err);
      setError('Translation service unavailable. Please try again later.');
      return null;
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsSourceLanguageMenuOpen(false);
        setIsTargetLanguageMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleCopy = () => {
    const textToCopy = `Word: ${currentWord.word}\nTranslation: ${currentWord.translation}\nPronunciation: ${currentWord.pronunciation}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSearch = async (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setCurrentWord({
        word: '',
        pronunciation: '',
        translation: '',
        examples: []
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    try {
      const translation = await translateWithApi(
        normalizedSearch,
        sourceLanguage.code,
        targetLanguage.code
      );
      
      if (translation) {
        setCurrentWord({
          word: normalizedSearch,
          pronunciation: '',
          translation: translation,
          examples: [`${normalizedSearch} = ${translation}`] as string[]
        });
      } else {
        setCurrentWord({
          word: searchTerm,
          pronunciation: '',
          translation: 'Translation not available',
          examples: []
        });
      }
    } catch (err) {
      console.error('Error during translation:', err);
      setError('Failed to translate. Please try again later.');
    }
    
    setIsLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleLanguageSelect = (language: Language, isSource: boolean) => {
    if (isSource) {
      setSourceLanguage(language);
      setIsSourceLanguageMenuOpen(false);
    } else {
      setTargetLanguage(language);
      setIsTargetLanguageMenuOpen(false);
    }
    
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  const swapLanguages = () => {
    setSourceLanguage(targetLanguage);
    setTargetLanguage(sourceLanguage);
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  const playPronunciation = () => {
    if (!currentWord.word) return;
    
    
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'pt': 'pt-BR', // Brazilian Portuguese
      'sw': 'sw-KE'  // Kenyan Swahili
    };
    
    
    const langCode = languageMap[sourceLanguage.code] || sourceLanguage.code;
    
    
    const wordToSpeak = currentWord.word;
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      utterance.lang = langCode;
      utterance.rate = 0.9; 
      utterance.pitch = 1.0; 
      
      
      window.speechSynthesis.cancel();
      
      
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-3 text-teal-600">Dictionary</h2>
      <p className="text-gray-600 mb-6">Translate words between different languages. Select your languages and type a word to translate.</p>
      <p className="text-gray-600 mb-6">This dictionary feature allows you to translate words and phrases between multiple languages. Simply select your source and target languages, enter the text you want to translate, and get instant translations with pronunciation guides and example sentences.</p>
      
      {/* Language Selectors */}
      <div className="flex items-center justify-between mb-6 space-x-4">
        {/* Source Language */}
        <div className="relative language-selector flex-1">
          <button
            onClick={() => setIsSourceLanguageMenuOpen(!isSourceLanguageMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>{sourceLanguage.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isSourceLanguageMenuOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang, true)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Swap Button */}
        <button
          onClick={swapLanguages}
          className="p-2 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
          title="Swap languages"
        >
          <ArrowRightLeft className="h-5 w-5 text-gray-600" />
        </button>

        {/* Target Language */}
        <div className="relative language-selector flex-1">
          <button
            onClick={() => setIsTargetLanguageMenuOpen(!isTargetLanguageMenuOpen)}
            className="w-full flex items-center justify-between px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <span>{targetLanguage.name}</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          
          {isTargetLanguageMenuOpen && (
            <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
              {availableLanguages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => handleLanguageSelect(lang, false)}
                  className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                >
                  {lang.name}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Enter text to translate..."
            className="w-full p-3 pl-10 border-2 border-transparent bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-300 shadow-sm"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" 
            onClick={() => handleSearch(searchTerm)}
          />
        </div>
      </div>
      
      {/* Loading State */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-teal-500 border-r-transparent"></div>
          <p className="mt-3 text-gray-600">Translating...</p>
        </div>
      )}
      
      {/* Error Message */}
      {error && (
        <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6 rounded">
          <p>{error}</p>
        </div>
      )}
      
      {/* Word Card */}
      {!isLoading && currentWord.word && (
        <div className="card bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-all duration-300">
          <div className="flex items-start justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">{currentWord.word}</h3>
              {currentWord.pronunciation && (
                <p className="text-gray-600 dark:text-gray-300">{currentWord.pronunciation}</p>
              )}
            </div>
            <div className="flex space-x-2">
              <button 
                className="p-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 transition-all duration-300 shadow-md"
                onClick={playPronunciation}
                title="Listen to pronunciation"
              >
                <Volume2 className="h-5 w-5" />
              </button>
              <button 
                className="p-2 rounded-full bg-gradient-to-r from-green-500 to-teal-500 text-white hover:from-green-600 hover:to-teal-600 transition-all duration-300 shadow-md"
                onClick={handleCopy}
                title="Copy to clipboard"
              >
                {copied ? <Check className="h-5 w-5" /> : <Copy className="h-5 w-5" />}
              </button>
            </div>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">Translation</h4>
              <p className="text-lg bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">{currentWord.translation}</p>
            </div>
            {currentWord.examples && currentWord.examples.length > 0 && (
              <div>
                <h4 className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">Examples</h4>
                <ul className="space-y-2">
                  {currentWord.examples.map((example, index) => (
                    <li key={index} className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">{example}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {/* API source indication */}
            {currentWord.translation !== 'Translation not available' && (
              <div className="text-xs text-gray-500 mt-4 italic">
                Translation provided by Google Translate API
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dictionary;