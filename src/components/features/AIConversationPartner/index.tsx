// File: src/components/features/AIConversationPartner/index.tsx
import React, { useState, useRef, useEffect } from 'react';
import { languages } from '../../../data/dictionary-data';
import { FiSend, FiGlobe, FiBook, FiCheckSquare, FiSquare, FiMessageSquare } from 'react-icons/fi';
import { Button } from 'primereact/button';
import { PT, KE } from 'country-flag-icons/react/3x2';
import Select from 'react-select';

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'ai';
  timestamp: Date;
}

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

const AIConversationPartner = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("lang_pt");
  const [difficulty, setDifficulty] = useState<'beginner' | 'intermediate' | 'advanced'>('beginner');
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showGrammarCorrection, setShowGrammarCorrection] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages arrive
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  // Handle sending a message
  const handleSendMessage = async () => {
    if (!inputMessage.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      // TODO: Replace with actual API call
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: inputMessage,
          language: selectedLanguage,
          difficulty,
          showGrammarCorrection
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: data.response,
        sender: 'ai',
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error:', error);
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I apologize, but I'm having trouble responding right now. Please try again later.",
        sender: 'ai',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle key press
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 gradient-text flex items-center">
        <FiMessageSquare className="mr-2 h-6 w-6" />
        AI Conversation Partner
      </h2>
      
      {/* Language and Difficulty Selection */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <FiGlobe className="mr-2" />
            Language
          </label>
          <Select
            value={languageOptions.find(option => option.value === selectedLanguage)}
            onChange={(option: any) => setSelectedLanguage(option.value)}
            options={languageOptions}
            styles={customSelectStyles}
            formatOptionLabel={formatOptionLabel}
            className="react-select-container"
            classNamePrefix="react-select"
            isSearchable={false}
          />
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow">
          <label className="block text-sm font-medium text-indigo-700 mb-2 flex items-center">
            <FiBook className="mr-2" />
            Difficulty Level
          </label>
          <div className="flex gap-2">
            <Button
              onClick={() => setDifficulty('beginner')}
              severity={difficulty === 'beginner' ? "info" : "help"}
              raised
              size="small"
              className={`flex-1 px-2 py-1 text-sm ${
                difficulty === 'beginner' 
                  ? 'bg-green-500 hover:bg-green-600 text-black' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Beginner
            </Button>
            <Button
              onClick={() => setDifficulty('intermediate')}
              severity={difficulty === 'intermediate' ? "warning" : "help"}
              raised
              size="small"
              className={`flex-1 px-2 py-1 text-sm ${
                difficulty === 'intermediate' 
                  ? 'bg-yellow-500 hover:bg-orange-500 text-black' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Intermediate
            </Button>
            <Button
              onClick={() => setDifficulty('advanced')}
              severity={difficulty === 'advanced' ? "danger" : "help"}
              raised
              size="small"
              className={`flex-1 px-2 py-1 text-sm ${
                difficulty === 'advanced' 
                  ? 'bg-red-500 hover:bg-red-600 text-black' 
                  : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              Advanced
            </Button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow flex items-center">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={showGrammarCorrection}
                onChange={(e) => setShowGrammarCorrection(e.target.checked)}
                className="sr-only"
              />
              <div className={`w-10 h-6 rounded-full transition-colors ${showGrammarCorrection ? 'bg-gradient-to-r from-indigo-500 to-purple-500' : 'bg-gray-300'}`}>
                <div className={`absolute left-1 top-1 w-4 h-4 rounded-full bg-white transition-transform ${showGrammarCorrection ? 'transform translate-x-4' : ''}`}></div>
              </div>
            </div>
            <span className="text-sm text-indigo-700">Show Grammar Corrections</span>
          </label>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="bg-white rounded-xl shadow-md p-6 mb-6 h-[500px] overflow-y-auto border border-indigo-100">
        {messages.length === 0 ? (
          <div className="h-full flex items-center justify-center text-gray-400">
            <p className="text-center">
              Start a conversation in {getLanguageName(selectedLanguage)}!<br />
              <span className="text-sm">Select your language and difficulty level above.</span>
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`mb-4 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              <div
                className={`inline-block p-4 rounded-2xl max-w-[80%] ${
                  message.sender === 'user'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white'
                    : 'bg-indigo-50 text-indigo-800 border border-indigo-100'
                }`}
              >
                <p className="whitespace-pre-wrap">{message.text}</p>
                <span className={`text-xs mt-2 block ${message.sender === 'user' ? 'text-indigo-100' : 'text-indigo-500'}`}>
                  {message.timestamp.toLocaleTimeString()}
                </span>
              </div>
            </div>
          ))
        )}
        {isLoading && (
          <div className="text-left">
            <div className="inline-block p-4 rounded-2xl bg-indigo-50 text-indigo-800 border border-indigo-100">
              <div className="flex space-x-2">
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-100"></div>
                <div className="w-3 h-3 bg-indigo-400 rounded-full animate-bounce delay-200"></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="flex gap-4">
        <textarea
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder={`Type your message in ${getLanguageName(selectedLanguage)}...`}
          className="flex-1 p-4 border border-indigo-200 rounded-xl resize-none h-[60px] focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
        />
        <button
          onClick={handleSendMessage}
          disabled={isLoading || !inputMessage.trim()}
          className="px-6 py-3 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-xl hover:from-indigo-600 hover:to-purple-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center min-w-[100px]"
        >
          <FiSend className="mr-2" />
          Send
        </button>
      </div>
    </div>
  );
};

export default AIConversationPartner; 