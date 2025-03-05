import React, { useState, useEffect } from 'react';
import { Language, GrammarRule, GrammarExample } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { grammarRules } from '../../../data/grammar-data';

const Grammar = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>("beginner");
  const [filteredRules, setFilteredRules] = useState<GrammarRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<GrammarRule | null>(null);
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [completedRules, setCompletedRules] = useState<string[]>([]);

  // Filter grammar rules by language and level
  useEffect(() => {
    const filtered = grammarRules.filter(rule => 
      rule.languageId === currentLanguage && 
      rule.level === currentLevel
    ) as GrammarRule[]; // Add type assertion here
    
    setFilteredRules(filtered);
    setSelectedRule(null);
  }, [currentLanguage, currentLevel]);

  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };

  // Handle level change
  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentLevel(level);
  };

  // Handle rule selection
  const handleRuleSelect = (rule: GrammarRule) => {
    setSelectedRule(rule);
    setExpandedExample(null);
  };

  // Toggle example expansion
  const toggleExample = (exampleId: string) => {
    setExpandedExample(expandedExample === exampleId ? null : exampleId);
  };

  // Mark rule as completed
  const markAsCompleted = (ruleId: string) => {
    if (completedRules.includes(ruleId)) {
      setCompletedRules(completedRules.filter(id => id !== ruleId));
    } else {
      setCompletedRules([...completedRules, ruleId]);
    }
  };

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  // Calculate completion percentage for current level
  const calculateCompletion = () => {
    const levelRules = grammarRules.filter(rule => 
      rule.languageId === currentLanguage && 
      rule.level === currentLevel
    );
    
    if (levelRules.length === 0) return 0;
    
    const completed = levelRules.filter(rule => 
      completedRules.includes(rule.id)
    ).length;
    
    return Math.round((completed / levelRules.length) * 100);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Grammar Lessons</h2>
      
      {/* Language Selection */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
          <select
            value={currentLanguage}
            onChange={(e) => handleLanguageChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            {languages.filter(lang => lang.id !== "lang_en").map(lang => (
              <option key={lang.id} value={lang.id}>{lang.name}</option>
            ))}
          </select>
        </div>
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">Level</label>
          <select
            value={currentLevel}
            onChange={(e) => handleLevelChange(e.target.value as 'beginner' | 'intermediate' | 'advanced')}
            className="w-full p-2 border rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      {/* Progress Bar */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-1">
          <span className="text-sm text-gray-600">Your progress</span>
          <span className="text-sm font-medium text-gray-900">{calculateCompletion()}%</span>
        </div>
        <div className="h-2 bg-gray-200 rounded">
          <div 
            className="h-2 bg-green-500 rounded" 
            style={{ width: `${calculateCompletion()}%` }}
          ></div>
        </div>
      </div>
      
      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg h-min">
          <h3 className="font-medium mb-3">Grammar Rules</h3>
          
          {filteredRules.length > 0 ? (
            <ul className="space-y-2">
              {filteredRules.map(rule => {
                const isCompleted = completedRules.includes(rule.id);
                return (
                  <li 
                    key={rule.id}
                    onClick={() => handleRuleSelect(rule)}
                    className={`p-3 rounded cursor-pointer transition-colors flex items-center gap-2
                      ${selectedRule?.id === rule.id ? 'bg-blue-50 border-l-4 border-blue-500' : 'hover:bg-gray-100'}
                      ${isCompleted ? 'text-green-700' : ''}
                    `}
                  >
                    {isCompleted && (
                      <span className="text-green-500">✓</span>
                    )}
                    <span>{rule.title}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <p className="text-gray-600">No grammar rules available for this language and level.</p>
          )}
        </div>
        
        {/* Rule Details */}
        <div className="md:col-span-2">
          {selectedRule ? (
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-medium">{selectedRule.title}</h3>
                <button
                  onClick={() => markAsCompleted(selectedRule.id)}
                  className={`p-2 rounded-md ${
                    completedRules.includes(selectedRule.id) 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-gray-100 hover:bg-gray-200'
                  }`}
                >
                  {completedRules.includes(selectedRule.id) ? 'Completed ✓' : 'Mark as Complete'}
                </button>
              </div>
              
              <div className="prose prose-blue max-w-none mb-6">
                <p>{selectedRule.explanation}</p>
              </div>
              
              <h4 className="font-medium mb-3">Examples:</h4>
              <div className="space-y-4">
                {selectedRule.examples.map((example: GrammarExample) => (
                  <div 
                    key={example.id}
                    className="border rounded-md overflow-hidden"
                  >
                    <div 
                      className="flex justify-between items-center p-3 bg-gray-50 cursor-pointer"
                      onClick={() => toggleExample(example.id)}
                    >
                      <div>
                        <span className="font-medium">{example.sourceText}</span>
                        <span className="mx-2">→</span>
                        <span className="text-blue-600">{example.targetText}</span>
                      </div>
                      <span>
                        {expandedExample === example.id ? '▼' : '▲'}
                      </span>
                    </div>
                    
                    {expandedExample === example.id && example.explanation && (
                      <div className="p-3 bg-blue-50 text-sm">
                        <p>{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              {/* Related Resources */}
              <div className="mt-8 border-t pt-4">
                <h4 className="font-medium mb-2">Practice this rule:</h4>
                <div className="flex flex-wrap gap-2">
                  <button className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full hover:bg-blue-200">
                    Exercises
                  </button>
                  <button className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full hover:bg-purple-200">
                    Flashcards
                  </button>
                  <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full hover:bg-yellow-200">
                    Example Sentences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-lg h-full">
              <p className="text-lg text-gray-500 mb-2">Select a grammar rule to begin</p>
              <p className="text-sm text-gray-400">Learn {getLanguageName(currentLanguage)} grammar step by step</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grammar;