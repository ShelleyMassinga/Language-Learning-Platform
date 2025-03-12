import React, { useState, useEffect } from 'react';
import { Language, GrammarRule, GrammarExample } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { grammarRules } from '../../../data/grammar-data';
import { syllabusUnits } from '../../../data/grammar-data';

const Grammar = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>("beginner");
  const [currentUnit, setCurrentUnit] = useState<string | null>(null);
  const [currentTopic, setCurrentTopic] = useState<number | null>(null);
  const [filteredRules, setFilteredRules] = useState<GrammarRule[]>([]);
  const [selectedRule, setSelectedRule] = useState<GrammarRule | null>(null);
  const [expandedExample, setExpandedExample] = useState<string | null>(null);
  const [completedRules, setCompletedRules] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<'syllabus' | 'list'>('syllabus');
  const [currentSyllabus, setCurrentSyllabus] = useState<any>(null);

  // Load syllabus data
  useEffect(() => {
    const syllabus = syllabusUnits.find(
      s => s.languageId === currentLanguage && s.level === currentLevel
    );
    setCurrentSyllabus(syllabus);
    
    if (syllabus && syllabus.units.length > 0) {
      setCurrentUnit(syllabus.units[0].id);
      setCurrentTopic(0);
    } else {
      setCurrentUnit(null);
      setCurrentTopic(null);
    }
  }, [currentLanguage, currentLevel]);

  // Filter grammar rules by language, level, unit, and topic
  useEffect(() => {
    let filtered: GrammarRule[];
    
    if (viewMode === 'syllabus' && currentUnit !== null && currentTopic !== null) {
      filtered = grammarRules.filter(rule => 
        rule.languageId === currentLanguage && 
        rule.level === currentLevel &&
        rule.unitId === currentUnit &&
        rule.topicIndex === currentTopic
      ) as GrammarRule[];
    } else {
      filtered = grammarRules.filter(rule => 
        rule.languageId === currentLanguage && 
        rule.level === currentLevel
      ) as GrammarRule[];
    }
    
    setFilteredRules(filtered);
    setSelectedRule(null);
  }, [currentLanguage, currentLevel, currentUnit, currentTopic, viewMode]);

  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };

  // Handle level change
  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentLevel(level);
  };

  // Handle unit change
  const handleUnitChange = (unitId: string) => {
    setCurrentUnit(unitId);
    setCurrentTopic(0);
  };

  // Handle topic change
  const handleTopicChange = (topicIndex: number) => {
    setCurrentTopic(topicIndex);
  };

  // Handle view mode toggle
  const toggleViewMode = () => {
    setViewMode(viewMode === 'syllabus' ? 'list' : 'syllabus');
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

  // Get unit name by ID
  const getUnitName = (unitId: string | null) => {
    if (!unitId || !currentSyllabus) return "";
    const unit = currentSyllabus.units.find((u: any) => u.id === unitId);
    return unit ? unit.title : "";
  };

  // Get topic name by unit ID and topic index
  const getTopicName = (unitId: string | null, topicIndex: number | null) => {
    if (!unitId || topicIndex === null || !currentSyllabus) return "";
    const unit = currentSyllabus.units.find((u: any) => u.id === unitId);
    return unit && unit.topics[topicIndex] ? unit.topics[topicIndex] : "";
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

  // Calculate completion for current unit
  const calculateUnitCompletion = (unitId: string) => {
    const unitRules = grammarRules.filter(rule => 
      rule.languageId === currentLanguage && 
      rule.level === currentLevel &&
      rule.unitId === unitId
    );
    
    if (unitRules.length === 0) return 0;
    
    const completed = unitRules.filter(rule => 
      completedRules.includes(rule.id)
    ).length;
    
    return Math.round((completed / unitRules.length) * 100);
  };

  // Calculate completion for current topic
  const calculateTopicCompletion = (unitId: string, topicIndex: number) => {
    const topicRules = grammarRules.filter(rule => 
      rule.languageId === currentLanguage && 
      rule.level === currentLevel &&
      rule.unitId === unitId &&
      rule.topicIndex === topicIndex
    );
    
    if (topicRules.length === 0) return 0;
    
    const completed = topicRules.filter(rule => 
      completedRules.includes(rule.id)
    ).length;
    
    return Math.round((completed / topicRules.length) * 100);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Grammar Lessons</h2>
      
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
        
        <div className="flex-1">
          <label className="block text-sm font-medium text-gray-700 mb-1">View Mode</label>
          <button
            onClick={toggleViewMode}
            className={`w-full p-2 rounded-md ${
              viewMode === 'syllabus' 
                ? 'bg-blue-600 text-white' 
                : 'bg-gray-200 text-gray-700'
            }`}
          >
            {viewMode === 'syllabus' ? 'Syllabus View' : 'List View'}
          </button>
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
      
      {/* Syllabus Navigation (only shown in syllabus view) */}
      {viewMode === 'syllabus' && currentSyllabus && (
        <div className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Unit</label>
              <select
                value={currentUnit || ""}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {currentSyllabus.units.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title} ({calculateUnitCompletion(unit.id)}% complete)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <select
                value={currentTopic !== null ? currentTopic : ""}
                onChange={(e) => handleTopicChange(parseInt(e.target.value))}
                className="w-full p-2 border rounded-md"
                disabled={!currentUnit}
              >
                {currentUnit && currentSyllabus.units
                  .find((u: any) => u.id === currentUnit)?.topics
                  .map((topic: string, index: number) => (
                    <option key={index} value={index}>
                      {topic} ({calculateTopicCompletion(currentUnit, index)}% complete)
                    </option>
                  ))}
              </select>
            </div>
          </div>
          
          {/* Current Path Display */}
          <div className="bg-gray-50 p-3 rounded-md mt-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Current path: </span>
              {getLanguageName(currentLanguage)} &gt; {currentLevel} &gt; {getUnitName(currentUnit)} &gt; {getTopicName(currentUnit, currentTopic)}
            </p>
          </div>
        </div>
      )}
      
      {/* Main Content */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Rules List */}
        <div className="md:col-span-1 bg-gray-50 p-4 rounded-lg h-min">
          <h3 className="font-medium mb-3">
            {viewMode === 'syllabus' 
              ? `${getTopicName(currentUnit, currentTopic)} Grammar Rules`
              : "All Grammar Rules"
            }
          </h3>
          
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
            <p className="text-gray-600">No grammar rules available for this selection.</p>
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
              
              {/* Path display (if in syllabus view) */}
              {viewMode === 'syllabus' && (
                <div className="mb-4 text-sm text-gray-600">
                  <span className="font-medium">From: </span>
                  {getUnitName(selectedRule.unitId)} &gt; {getTopicName(selectedRule.unitId, selectedRule.topicIndex)}
                </div>
              )}
              
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