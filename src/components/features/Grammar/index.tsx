import React, { useState, useEffect } from 'react';
import { Language, GrammarRule, GrammarExample } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { grammarRules } from '../../../data/grammar-data';
import { syllabusUnits } from '../../../data/grammar-data';
import { Book, ChevronDown, ChevronRight, CheckCircle, Circle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import { Button } from 'primereact/button';
import Select, { SingleValue, FormatOptionLabelMeta } from 'react-select';
import { GB, PT, KE, ES, FR, DE, IT, RU, JP, KR, CN, SA, IN, TR, NL, PL, VN, TH, ID, MY } from 'country-flag-icons/react/3x2';

interface LanguageOption {
  code: string;
  name: string;
  Flag: any;
}

const languageOptions: LanguageOption[] = [
  { code: 'pt', name: 'Portuguese', Flag: PT },
  { code: 'sw', name: 'Swahili', Flag: KE }
];

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
  const handleLanguageChange = (option: LanguageOption) => {
    setCurrentLanguage(option.code === 'pt' ? 'lang_pt' : 'lang_sw');
  };

  const customSelectStyles = {
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
    control: (provided: any) => ({
      ...provided,
      minHeight: '48px',
      backgroundColor: 'white',
      borderColor: '#e2e8f0',
      '&:hover': {
        borderColor: '#cbd5e0',
      },
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

  const formatOptionLabel = (data: LanguageOption, meta: FormatOptionLabelMeta<LanguageOption>) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <data.Flag style={{ width: '20px', height: '15px' }} />
      <span>{data.name}</span>
    </div>
  );

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
    <div className="max-w-7xl mx-auto p-6">
      {/* Header Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Grammar Lessons</h2>
        <p className="text-gray-600">Master grammar concepts step by step</p>
      </div>

      {/* Controls Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Language Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">Language</label>
            <Select
              value={languageOptions.find(lang => (lang.code === 'pt' && currentLanguage === 'lang_pt') || (lang.code === 'sw' && currentLanguage === 'lang_sw'))}
              onChange={(option) => option && handleLanguageChange(option)}
              options={languageOptions}
              formatOptionLabel={formatOptionLabel}
              styles={customSelectStyles}
              className="react-select-container"
              classNamePrefix="react-select"
              getOptionLabel={(option) => option.name}
            />
          </div>
          
          {/* Level Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3 text-center">Level</label>
            <div className="flex gap-2">
              <Button
                onClick={() => handleLevelChange('beginner')}
                severity={currentLevel === 'beginner' ? "info" : "help"}
                raised
                size="small"
                className={`flex-1 px-3 py-1 ${
                  currentLevel === 'beginner' 
                    ? 'bg-green-500 hover:bg-green-600 text-black' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Beginner
              </Button>
              <Button
                onClick={() => handleLevelChange('intermediate')}
                severity={currentLevel === 'intermediate' ? "warning" : "help"}
                raised
                size="small"
                className={`flex-1 px-3 py-1 ${
                  currentLevel === 'intermediate' 
                    ? 'bg-yellow-500 hover:bg-orange-500 text-black' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Intermediate
              </Button>
              <Button
                onClick={() => handleLevelChange('advanced')}
                severity={currentLevel === 'advanced' ? "danger" : "help"}
                raised
                size="small"
                className={`flex-1 px-3 py-1 ${
                  currentLevel === 'advanced' 
                    ? 'bg-red-500 hover:bg-red-600 text-black' 
                    : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                Advanced
              </Button>
            </div>
          </div>
          
          {/* View Mode Toggle */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2 text-center">View Mode</label>
            <button
              onClick={toggleViewMode}
              className={`w-full p-3 rounded-lg flex items-center justify-center gap-2 transition-colors ${
                viewMode === 'syllabus' 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              {viewMode === 'syllabus' ? 'Syllabus View' : 'List View'}
            </button>
          </div>
        </div>
      </div>

      {/* Progress Section */}
      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Book className="w-5 h-5 text-blue-600" />
            <span className="font-medium text-gray-900">Your Progress</span>
          </div>
          <span className="text-lg font-semibold text-blue-600">{calculateCompletion()}%</span>
        </div>
        <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-600 rounded-full transition-all duration-500" 
            style={{ width: `${calculateCompletion()}%` }}
          ></div>
        </div>
      </div>

      {/* Syllabus Navigation */}
      {viewMode === 'syllabus' && currentSyllabus && (
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Unit</label>
              <select
                value={currentUnit || ""}
                onChange={(e) => handleUnitChange(e.target.value)}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {currentSyllabus.units.map((unit: any) => (
                  <option key={unit.id} value={unit.id}>
                    {unit.title} ({calculateUnitCompletion(unit.id)}% complete)
                  </option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <select
                value={currentTopic !== null ? currentTopic : ""}
                onChange={(e) => handleTopicChange(parseInt(e.target.value))}
                className="w-full p-3 border border-gray-200 rounded-lg bg-gray-50 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
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
          
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <span className="font-medium">Current path:</span>
              <span>{getLanguageName(currentLanguage)}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{currentLevel}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{getUnitName(currentUnit)}</span>
              <ChevronRight className="w-4 h-4" />
              <span>{getTopicName(currentUnit, currentTopic)}</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="grid md:grid-cols-12 gap-8">
        {/* Rules List */}
        <div className="md:col-span-4">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-6">
            <h3 className="font-medium text-gray-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-yellow-500" />
              {viewMode === 'syllabus' 
                ? `${getTopicName(currentUnit, currentTopic)} Grammar Rules`
                : "All Grammar Rules"
              }
            </h3>
            
            {filteredRules.length > 0 ? (
              <div className="space-y-2">
                {filteredRules.map(rule => {
                  const isCompleted = completedRules.includes(rule.id);
                  return (
                    <button
                      key={rule.id}
                      onClick={() => handleRuleSelect(rule)}
                      className={`w-full p-4 rounded-lg text-left transition-colors flex items-center gap-3
                        ${selectedRule?.id === rule.id 
                          ? 'bg-blue-50 border-l-4 border-blue-500' 
                          : 'hover:bg-gray-50'
                        }
                        ${isCompleted ? 'text-green-700' : ''}
                      `}
                    >
                      {isCompleted ? (
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0" />
                      ) : (
                        <Circle className="w-5 h-5 text-gray-300 flex-shrink-0" />
                      )}
                      <span className="font-medium">{rule.title}</span>
                    </button>
                  );
                })}
              </div>
            ) : (
              <p className="text-gray-600 text-center py-4">No grammar rules available for this selection.</p>
            )}
          </div>
        </div>
        
        {/* Rule Details */}
        <div className="md:col-span-8">
          {selectedRule ? (
            <div className="bg-white rounded-xl shadow-sm p-8">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">{selectedRule.title}</h3>
                <button
                  onClick={() => markAsCompleted(selectedRule.id)}
                  className={`px-4 py-2 rounded-lg flex items-center gap-2 transition-colors ${
                    completedRules.includes(selectedRule.id) 
                      ? 'bg-green-100 text-green-800 hover:bg-green-200' 
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {completedRules.includes(selectedRule.id) ? (
                    <>
                      <CheckCircle className="w-5 h-5" />
                      <span>Completed</span>
                    </>
                  ) : (
                    <>
                      <Circle className="w-5 h-5" />
                      <span>Mark as Complete</span>
                    </>
                  )}
                </button>
              </div>
              
              {viewMode === 'syllabus' && (
                <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-sm text-gray-600">
                    <span className="font-medium">From:</span>
                    <span>{getUnitName(selectedRule.unitId)}</span>
                    <ChevronRight className="w-4 h-4" />
                    <span>{getTopicName(selectedRule.unitId, selectedRule.topicIndex)}</span>
                  </div>
                </div>
              )}
              
              <div className="prose prose-blue max-w-none mb-8">
                <p className="text-gray-700 leading-relaxed">{selectedRule.explanation}</p>
              </div>
              
              <h4 className="text-lg font-semibold text-gray-900 mb-4">Examples</h4>
              <div className="space-y-4">
                {selectedRule.examples.map((example: GrammarExample) => (
                  <div 
                    key={example.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    <button
                      className="w-full p-4 bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
                      onClick={() => toggleExample(example.id)}
                    >
                      <div className="flex items-center gap-4">
                        <div className="text-gray-600">{example.sourceText}</div>
                        <ArrowRight className="w-4 h-4 text-gray-400" />
                        <div className="text-blue-600 font-medium">{example.targetText}</div>
                      </div>
                      <ChevronDown 
                        className={`w-5 h-5 text-gray-400 transition-transform ${
                          expandedExample === example.id ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    
                    {expandedExample === example.id && example.explanation && (
                      <div className="p-4 bg-blue-50">
                        <p className="text-sm text-gray-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              
              <div className="mt-8 pt-6 border-t">
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Practice this rule</h4>
                <div className="flex flex-wrap gap-3">
                  <button className="px-4 py-2 bg-blue-100 text-blue-700 rounded-lg hover:bg-blue-200 transition-colors">
                    Exercises
                  </button>
                  <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg hover:bg-purple-200 transition-colors">
                    Flashcards
                  </button>
                  <button className="px-4 py-2 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition-colors">
                    Example Sentences
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl shadow-sm p-12 flex flex-col items-center justify-center text-center">
              <BookOpen className="w-12 h-12 text-gray-400 mb-4" />
              <p className="text-xl text-gray-600 mb-2">Select a grammar rule to begin</p>
              <p className="text-gray-500">Learn {getLanguageName(currentLanguage)} grammar step by step</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Grammar;