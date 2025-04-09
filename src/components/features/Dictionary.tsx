import React, { useState, useRef, useEffect } from 'react';
import { Search, Volume2, Copy, Check, Globe, ChevronDown } from 'lucide-react';

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

// Rename the local languages array to availableLanguages to avoid conflict
const availableLanguages: Language[] = [
  { code: 'en', name: 'English' },
  { code: 'pt', name: 'Portuguese' },
  { code: 'sw', name: 'Swahili' },
];

// Mock dictionary data for demonstration
const mockDictionary: DictionaryData = {
  en: {
    'hello': { word: 'hello', translation: 'Olá', pronunciation: '/həˈləʊ/', examples: ['Hello, how are you?', 'Hello, nice to meet you!'] },
    'goodbye': { word: 'goodbye', translation: 'Adeus', pronunciation: '/ɡʊdˈbaɪ/', examples: ['Goodbye, see you later!', 'Goodbye and good luck!'] },
    'thank you': { word: 'thank you', translation: 'Obrigado', pronunciation: '/θæŋk juː/', examples: ['Thank you for your help.', 'Thank you very much!'] },
    'please': { word: 'please', translation: 'Por favor', pronunciation: '/pliːz/', examples: ['Please help me.', 'Please come in.'] },
    'yes': { word: 'yes', translation: 'Sim', pronunciation: '/jes/', examples: ['Yes, I understand.', 'Yes, that\'s correct.'] },
    'no': { word: 'no', translation: 'Não', pronunciation: '/nəʊ/', examples: ['No, thank you.', 'No, I don\'t think so.'] },
    'ola': { word: 'ola', translation: 'Olá', pronunciation: '/oʊˈlɑː/', examples: ['Olá, como vai?', 'Olá, prazer em conhecer!'] },
    'water': { word: 'water', translation: 'Água', pronunciation: '/ˈwɔːtə/', examples: ['I need water.', 'Can I have some water?'] },
    'food': { word: 'food', translation: 'Comida', pronunciation: '/fuːd/', examples: ['The food is delicious.', 'I love this food.'] },
    'time': { word: 'time', translation: 'Tempo', pronunciation: '/taɪm/', examples: ['What time is it?', 'I don\'t have time.'] },
    'day': { word: 'day', translation: 'Dia', pronunciation: '/deɪ/', examples: ['Have a good day!', 'What day is it today?'] },
    'night': { word: 'night', translation: 'Noite', pronunciation: '/naɪt/', examples: ['Good night!', 'I work at night.'] },
    'morning': { word: 'morning', translation: 'Manhã', pronunciation: '/ˈmɔːnɪŋ/', examples: ['Good morning!', 'I wake up early in the morning.'] },
    'evening': { word: 'evening', translation: 'Noite', pronunciation: '/ˈiːvnɪŋ/', examples: ['Good evening!', 'I like to walk in the evening.'] },
    'friend': { word: 'friend', translation: 'Amigo', pronunciation: '/frend/', examples: ['She is my friend.', 'I have many friends.'] },
    'family': { word: 'family', translation: 'Família', pronunciation: '/ˈfæmɪli/', examples: ['I love my family.', 'My family is big.'] },
    'love': { word: 'love', translation: 'Amor', pronunciation: '/lʌv/', examples: ['I love you.', 'Love is beautiful.'] },
    'hate': { word: 'hate', translation: 'Ódio', pronunciation: '/heɪt/', examples: ['I hate waiting.', 'Don\'t hate others.'] },
    'happy': { word: 'happy', translation: 'Feliz', pronunciation: '/ˈhæpi/', examples: ['I am happy today.', 'She looks happy.'] },
    'sad': { word: 'sad', translation: 'Triste', pronunciation: '/sæd/', examples: ['I feel sad.', 'Why are you sad?'] },
    'tired': { word: 'tired', translation: 'Cansado', pronunciation: '/ˈtaɪəd/', examples: ['I am tired.', 'Are you tired?'] },
    'sleep': { word: 'sleep', translation: 'Dormir', pronunciation: '/sliːp/', examples: ['I need to sleep.', 'Sleep well!'] },
    'eat': { word: 'eat', translation: 'Comer', pronunciation: '/iːt/', examples: ['Let\'s eat!', 'I like to eat fruits.'] },
    'drink': { word: 'drink', translation: 'Beber', pronunciation: '/drɪŋk/', examples: ['I want to drink water.', 'Don\'t drink and drive.'] },
    'walk': { word: 'walk', translation: 'Andar', pronunciation: '/ənˈdɑːr/', examples: ['I like to walk.', 'Let\'s go for a walk.'] },
    'run': { word: 'run', translation: 'Correr', pronunciation: '/rʌn/', examples: ['I run every morning.', 'Run faster!'] },
    'jambo': { word: 'jambo', translation: 'Jambo', pronunciation: '/ˈdʒæmboʊ/', examples: ['Jambo, habari?', 'Jambo, nice to meet you!'] },
    'asante': { word: 'asante', translation: 'Asante', pronunciation: '/əˈsænteɪ/', examples: ['Asante for your help.', 'Asante sana!'] },
  },
  pt: {
    'ola': { word: 'ola', translation: 'Hello', pronunciation: '/oʊˈlɑː/', examples: ['Olá, como vai?', 'Olá, prazer em conhecer!'] },
    'obrigado': { word: 'obrigado', translation: 'Thank you', pronunciation: '/oʊbriˈɡɑːduː/', examples: ['Obrigado pela sua ajuda.', 'Muito obrigado!'] },
    'por favor': { word: 'por favor', translation: 'Please', pronunciation: '/pɔːr fəˈvɔːr/', examples: ['Por favor, me ajude.', 'Por favor, entre.'] },
    'sim': { word: 'sim', translation: 'Yes', pronunciation: '/siːm/', examples: ['Sim, eu entendo.', 'Sim, isso está correto.'] },
    'nao': { word: 'nao', translation: 'No', pronunciation: '/naʊ/', examples: ['Não, obrigado.', 'Não, eu não acho.'] },
    'adeus': { word: 'adeus', translation: 'Goodbye', pronunciation: '/əˈdeʊs/', examples: ['Adeus, até logo!', 'Adeus e boa sorte!'] },
    'hello': { word: 'hello', translation: 'Olá', pronunciation: '/həˈləʊ/', examples: ['Olá, como vai?', 'Olá, prazer em conhecer!'] },
    'agua': { word: 'agua', translation: 'Water', pronunciation: '/ˈɑːɡwə/', examples: ['Preciso de água.', 'Posso ter um pouco de água?'] },
    'comida': { word: 'comida', translation: 'Food', pronunciation: '/kəˈmiːdə/', examples: ['A comida está deliciosa.', 'Eu amo esta comida.'] },
    'tempo': { word: 'tempo', translation: 'Time', pronunciation: '/ˈtɛmpuː/', examples: ['Que horas são?', 'Não tenho tempo.'] },
    'dia': { word: 'dia', translation: 'Day', pronunciation: '/ˈdiːə/', examples: ['Tenha um bom dia!', 'Que dia é hoje?'] },
    'noite': { word: 'noite', translation: 'Night', pronunciation: '/ˈnɔɪtʃi/', examples: ['Boa noite!', 'Eu trabalho à noite.'] },
    'manha': { word: 'manha', translation: 'Morning', pronunciation: '/məˈɲɑː/', examples: ['Bom dia!', 'Eu acordo cedo pela manhã.'] },
    'tarde': { word: 'tarde', translation: 'Evening', pronunciation: '/ˈtɑːrdʒi/', examples: ['Boa tarde!', 'Eu gosto de caminhar à tarde.'] },
    'amigo': { word: 'amigo', translation: 'Friend', pronunciation: '/əˈmiːɡuː/', examples: ['Ela é minha amiga.', 'Eu tenho muitos amigos.'] },
    'familia': { word: 'familia', translation: 'Family', pronunciation: '/fəˈmiːljə/', examples: ['Eu amo minha família.', 'Minha família é grande.'] },
    'amor': { word: 'amor', translation: 'Love', pronunciation: '/əˈmɔːr/', examples: ['Eu te amo.', 'O amor é bonito.'] },
    'odio': { word: 'odio', translation: 'Hate', pronunciation: '/ˈɔːdʒuː/', examples: ['Eu odeio esperar.', 'Não odeie os outros.'] },
    'feliz': { word: 'feliz', translation: 'Happy', pronunciation: '/fəˈliːz/', examples: ['Eu estou feliz hoje.', 'Ela parece feliz.'] },
    'triste': { word: 'triste', translation: 'Sad', pronunciation: '/ˈtriːstʃi/', examples: ['Eu me sinto triste.', 'Por que você está triste?'] },
    'cansado': { word: 'cansado', translation: 'Tired', pronunciation: '/kənˈsɑːduː/', examples: ['Eu estou cansado.', 'Você está cansado?'] },
    'dormir': { word: 'dormir', translation: 'Sleep', pronunciation: '/dɔːrˈmiːr/', examples: ['Eu preciso dormir.', 'Durma bem!'] },
    'comer': { word: 'comer', translation: 'Eat', pronunciation: '/kəˈmeːr/', examples: ['Vamos comer!', 'Eu gosto de comer frutas.'] },
    'beber': { word: 'beber', translation: 'Drink', pronunciation: '/bəˈbeːr/', examples: ['Eu quero beber água.', 'Não beba e dirija.'] },
    'andar': { word: 'andar', translation: 'Walk', pronunciation: '/ənˈdɑːr/', examples: ['Eu gosto de andar.', 'Vamos dar um passeio.'] },
    'correr': { word: 'correr', translation: 'Run', pronunciation: '/kɔːˈreːr/', examples: ['Eu corro todas as manhãs.', 'Corra mais rápido!'] },
    'jambo': { word: 'jambo', translation: 'Jambo', pronunciation: '/ˈdʒæmboʊ/', examples: ['Jambo, habari?', 'Jambo, nice to meet you!'] },
    'asante': { word: 'asante', translation: 'Asante', pronunciation: '/əˈsænteɪ/', examples: ['Asante for your help.', 'Asante sana!'] },
  },
  sw: {
    'jambo': { word: 'jambo', translation: 'Hello', pronunciation: '/ˈdʒæmboʊ/', examples: ['Jambo, habari?', 'Jambo, nice to meet you!'] },
    'asante': { word: 'asante', translation: 'Thank you', pronunciation: '/əˈsænteɪ/', examples: ['Asante for your help.', 'Asante sana!'] },
    'tafadhali': { word: 'tafadhali', translation: 'Please', pronunciation: '/tɑːfəˈdɑːliː/', examples: ['Tafadhali, help me.', 'Tafadhali, come in.'] },
    'ndiyo': { word: 'ndiyo', translation: 'Yes', pronunciation: '/nˈdiːjoʊ/', examples: ['Ndiyo, I understand.', 'Ndiyo, that\'s correct.'] },
    'hapana': { word: 'hapana', translation: 'No', pronunciation: '/həˈpɑːnə/', examples: ['Hapana, thank you.', 'Hapana, I don\'t think so.'] },
    'kwaheri': { word: 'kwaheri', translation: 'Goodbye', pronunciation: '/kwəˈheɪriː/', examples: ['Kwaheri, see you later!', 'Kwaheri and good luck!'] },
    'hello': { word: 'hello', translation: 'Jambo', pronunciation: '/həˈləʊ/', examples: ['Jambo, habari?', 'Jambo, nice to meet you!'] },
    'maji': { word: 'maji', translation: 'Water', pronunciation: '/ˈmɑːdʒiː/', examples: ['Nahitaji maji.', 'Naweza kupata maji?'] },
    'chakula': { word: 'chakula', translation: 'Food', pronunciation: '/tʃəˈkuːlə/', examples: ['Chakula ni kitamu.', 'Ninaipenda chakula hiki.'] },
    'wakati': { word: 'wakati', translation: 'Time', pronunciation: '/wəˈkɑːtiː/', examples: ['Ni saa ngapi?', 'Sina wakati.'] },
    'siku': { word: 'siku', translation: 'Day', pronunciation: '/ˈsiːkuː/', examples: ['Siku njema!', 'Ni siku gani leo?'] },
    'usiku': { word: 'usiku', translation: 'Night', pronunciation: '/uːˈsiːkuː/', examples: ['Usiku mwema!', 'Ninafanya kazi usiku.'] },
    'asubuhi': { word: 'asubuhi', translation: 'Morning', pronunciation: '/əsuːˈbuːhiː/', examples: ['Habari za asubuhi!', 'Ninaamka mapema asubuhi.'] },
    'jioni': { word: 'jioni', translation: 'Evening', pronunciation: '/dʒiːˈoːniː/', examples: ['Habari za jioni!', 'Napenda kutembea jioni.'] },
    'rafiki': { word: 'rafiki', translation: 'Friend', pronunciation: '/rəˈfiːkiː/', examples: ['Yeye ni rafiki yangu.', 'Nina marafiki wengi.'] },
    'familia': { word: 'familia', translation: 'Family', pronunciation: '/fəˈmiːljə/', examples: ['Ninaipenda familia yangu.', 'Familia yangu ni kubwa.'] },
    'upendo': { word: 'upendo', translation: 'Love', pronunciation: '/uːˈpɛndoʊ/', examples: ['Nakupenda.', 'Upendo ni mzuri.'] },
    'chuki': { word: 'chuki', translation: 'Hate', pronunciation: '/ˈtʃuːkiː/', examples: ['Ninachuki kusubiri.', 'Usichukie wengine.'] },
    'furaha': { word: 'furaha', translation: 'Happy', pronunciation: '/fuːˈrɑːhə/', examples: ['Nina furaha leo.', 'Anaonekana na furaha.'] },
    'huzuni': { word: 'huzuni', translation: 'Sad', pronunciation: '/huːˈzuːniː/', examples: ['Ninasikia huzuni.', 'Kwa nini una huzuni?'] },
    'uchovu': { word: 'uchovu', translation: 'Tired', pronunciation: '/uːˈtʃoʊvuː/', examples: ['Nina uchovu.', 'Una uchovu?'] },
    'kulala': { word: 'kulala', translation: 'Sleep', pronunciation: '/kuːˈlɑːlə/', examples: ['Nahitaji kulala.', 'Lala vizuri!'] },
    'kula': { word: 'kula', translation: 'Eat', pronunciation: '/ˈkuːlə/', examples: ['Tukule!', 'Napenda kula matunda.'] },
    'kunywa': { word: 'kunywa', translation: 'Drink', pronunciation: '/kuːˈɲwə/', examples: ['Nataka kunywa maji.', 'Usinywe na kuendesha gari.'] },
    'kutembea': { word: 'kutembea', translation: 'Walk', pronunciation: '/kuːtɛmˈbeːə/', examples: ['Napenda kutembea.', 'Tutembelee!'] },
    'kukimbia': { word: 'kukimbia', translation: 'Run', pronunciation: '/kuːkimˈbiːə/', examples: ['Nakimbia kila asubuhi.', 'Kimbia haraka!'] },
    'ola': {
      word: 'ola',
      translation: 'hello',
      examples: ['Ola, como vai?', 'Ola, tudo bem?'],
      pronunciation: 'oh-lah'
    },
    'agua': {
      word: 'agua',
      translation: 'water',
      examples: ['Preciso de agua.', 'A agua esta fria.'],
      pronunciation: 'ah-gwah'
    },
    'comida': {
      word: 'comida',
      translation: 'food',
      examples: ['A comida esta boa.', 'Gosto desta comida.'],
      pronunciation: 'koh-mee-dah'
    },
    'obrigado': {
      word: 'obrigado',
      translation: 'thank you',
      examples: ['Obrigado pela ajuda.', 'Muito obrigado!'],
      pronunciation: 'oh-bree-gah-doh'
    },
    'bom dia': {
      word: 'bom dia',
      translation: 'good morning',
      examples: ['Bom dia, como vai?', 'Bom dia a todos!'],
      pronunciation: 'bohm dee-ah'
    }
  }
};

// Define the color palette as CSS variables
const colorPalette = {
  teal: '#00BCD4',
  coral: '#FF5722',
  purple: '#9C27B0',
  yellowGreen: '#CDDC39',
  lightBlue: '#E3F2FD',
  lightPink: '#FCE4EC',
  lightGreen: '#E8F5E9',
  orange: '#FF9800',
  pink: '#E91E63',
  blue: '#2196F3',
  yellow: '#FFC107',
  green: '#4CAF50',
};

const Dictionary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [copied, setCopied] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState<Language>(availableLanguages[0]);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [currentWord, setCurrentWord] = useState({
    word: 'Olá',
    pronunciation: '/oʊˈlɑː/',
    translation: 'hello',
    examples: ['Olá, como vai?', 'Olá, prazer em conhecer!']
  });
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Close language menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.language-selector')) {
        setIsLanguageMenuOpen(false);
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

  const handleSearch = (searchTerm: string) => {
    if (!searchTerm.trim()) {
      setCurrentWord({
        word: '',
        pronunciation: '',
        translation: '',
        examples: []
      });
      return;
    }

    // Normalize the search term
    const normalizedSearch = searchTerm.toLowerCase().trim();
    
    // Always search in English dictionary first since all inputs are in English
    const englishDict = mockDictionary['en'];
    
    // Check if the word exists in English
    if (englishDict && englishDict[normalizedSearch]) {
      const englishWordData = englishDict[normalizedSearch];
      
      // If the selected language is not English, try to find the translation
      if (selectedLanguage.code !== 'en') {
        // Look for a word in the selected language that has this English word as its translation
        const selectedLangDict = mockDictionary[selectedLanguage.code];
        let translationFound = false;
        
        for (const key in selectedLangDict) {
          const wordData = selectedLangDict[key];
          if (wordData.translation.toLowerCase() === normalizedSearch) {
            setCurrentWord({
              word: key, // Use the key (word in selected language)
              translation: englishWordData.word, // Show English word as translation
              pronunciation: wordData.pronunciation,
              examples: wordData.examples
            });
            translationFound = true;
            break;
          }
        }
        
        // If no translation was found, use the English word
        if (!translationFound) {
          setCurrentWord({
            word: englishWordData.translation, // Use the translation field which contains the word in selected language
            translation: englishWordData.word, // Show English word as translation
            pronunciation: englishWordData.pronunciation,
            examples: englishWordData.examples
          });
        }
      } else {
        // For English, just use the English word
        setCurrentWord({
          word: englishWordData.word,
          translation: englishWordData.translation,
          pronunciation: englishWordData.pronunciation,
          examples: englishWordData.examples
        });
      }
      return;
    }
    
    // Word not found in English dictionary
    setCurrentWord({
      word: '',
      pronunciation: '',
      translation: 'Word not found',
      examples: []
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch(searchTerm);
    }
  };

  const handleLanguageSelect = (language: Language) => {
    setSelectedLanguage(language);
    setIsLanguageMenuOpen(false);
    
    // If there's a current search term, search again with the new language
    if (searchTerm.trim()) {
      handleSearch(searchTerm);
    }
  };

  const playPronunciation = () => {
    if (!currentWord) return;
    
    // Map language codes to specific speech synthesis codes
    const languageMap: Record<string, string> = {
      'en': 'en-US',
      'pt': 'pt-BR', // Brazilian Portuguese
      'sw': 'sw-KE'  // Kenyan Swahili
    };
    
    // Get the language code for speech synthesis
    const langCode = languageMap[selectedLanguage.code] || selectedLanguage.code;
    
    // Use the current word directly since it's already in the selected language
    const wordToSpeak = currentWord.word;
    
    console.log(`Speaking word: "${wordToSpeak}" in language: ${langCode}`);
    
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(wordToSpeak);
      utterance.lang = langCode;
      utterance.rate = 0.9; // Slightly slower for clarity
      utterance.pitch = 1.0; // Natural pitch
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      // Speak the word
      window.speechSynthesis.speak(utterance);
    } else {
      console.error('Speech synthesis not supported in this browser');
    }
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-6 text-teal-600">Dictionary</h2>
      
      {/* Language Selector */}
      <div className="mb-6 relative language-selector">
        <button
          onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
          className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-teal-500 to-blue-500 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          <span>{selectedLanguage.name}</span>
          <ChevronDown className="h-4 w-4" />
        </button>
        
        {isLanguageMenuOpen && (
          <div className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700">
            {availableLanguages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang)}
                className="w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
              >
                {lang.name}
              </button>
            ))}
          </div>
        )}
      </div>
      
      {/* Search Bar */}
      <div className="mb-6">
        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search for a word..."
            className="w-full p-3 pl-10 border-2 border-transparent bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-700 rounded-lg focus:border-teal-500 focus:outline-none transition-all duration-300 shadow-sm"
          />
          <Search 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5 cursor-pointer" 
            onClick={() => handleSearch(searchTerm)}
          />
        </div>
      </div>
      
      {/* Word Card */}
      <div className="card bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-700 p-6 rounded-lg shadow-lg border-l-4 border-teal-500 hover:shadow-xl transition-all duration-300">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-2xl font-bold text-teal-600 dark:text-teal-400 mb-2">{currentWord?.word}</h3>
            <p className="text-gray-600 dark:text-gray-300">{currentWord?.pronunciation}</p>
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
            <p className="text-lg bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">{currentWord?.translation}</p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-teal-600 dark:text-teal-400 mb-2">Examples</h4>
            <ul className="space-y-2">
              {currentWord?.examples.map((example, index) => (
                <li key={index} className="text-gray-600 dark:text-gray-300 bg-white dark:bg-gray-800 p-3 rounded-md shadow-sm">{example}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dictionary; 