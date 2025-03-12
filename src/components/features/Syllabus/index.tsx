import React, { useState, useEffect } from 'react';
import { syllabusUnits } from '../../../data/grammar-data';
import { grammarRules } from '../../../data/grammar-data';
import { exercises } from '../../../data/exercises-data';
import { flashcardDecks } from '../../../data/flashcards-data';
import { languages } from '../../../data/dictionary-data';
import { SyllabusUnit } from '../../../types/schema';

const SyllabusPage = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [currentLevel, setCurrentLevel] = useState<string>("beginner");
  const [currentSyllabus, setCurrentSyllabus] = useState<SyllabusUnit | null>(null);
  const [expandedUnit, setExpandedUnit] = useState<string | null>(null);
  const [expandedTopic, setExpandedTopic] = useState<string | null>(null);
  const [userProgress, setUserProgress] = useState<Record<string, number | boolean>>({});
  
  // Load syllabus data based on selected language and level
  useEffect(() => {
    const syllabus = syllabusUnits.find(
      s => s.languageId === currentLanguage && s.level === currentLevel
    );
    
    if (syllabus) {
      setCurrentSyllabus(syllabus);
      if (syllabus.units.length > 0) {
        setExpandedUnit(syllabus.units[0].id);
      }
    } else {
      setCurrentSyllabus(null);
      setExpandedUnit(null);
    }
    setExpandedTopic(null);
  }, [currentLanguage, currentLevel]);
  
  // Simulate loading user progress
  useEffect(() => {
    // In a real app, this would come from your progress tracking system
    const mockProgress: Record<string, number | boolean> = {};
    // Generate random progress for demo purposes
    grammarRules.forEach(rule => {
      mockProgress[rule.id] = Math.random() > 0.5;
    });
    
    exercises.forEach(exercise => {
      mockProgress[exercise.id] = Math.floor(Math.random() * 101);
    });
    
    flashcardDecks.forEach(deck => {
      mockProgress[deck.id] = Math.floor(Math.random() * 101);
    });
    
    setUserProgress(mockProgress);
  }, []);
  
  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };
  
  // Handle level change
  const handleLevelChange = (level: string) => {
    setCurrentLevel(level);
  };
  
  // Toggle expanded unit
  const toggleUnit = (unitId: string) => {
    setExpandedUnit(expandedUnit === unitId ? null : unitId);
    setExpandedTopic(null);
  };
  
  // Toggle expanded topic
  const toggleTopic = (topicId: string) => {
    setExpandedTopic(expandedTopic === topicId ? null : topicId);
  };
  
  // Get grammar rules for a specific topic
  const getTopicGrammarRules = (unitId: string, topicIndex: number) => {
    return grammarRules.filter(
      rule => rule.unitId === unitId && rule.topicIndex === topicIndex
    );
  };
  
  // Get exercises for a specific topic
  const getTopicExercises = (unitId: string, topicIndex: number) => {
    return exercises.filter(
      exercise => exercise.unitId === unitId && exercise.topicIndex === topicIndex
    );
  };
  
  // Get flashcard decks for a specific topic
  const getTopicFlashcardDecks = (unitId: string, topicIndex: number) => {
    return flashcardDecks.filter(
      deck => (deck as any).unitId === unitId && (deck as any).topicIndex === topicIndex
    );
  };
  
  // Calculate topic completion percentage
  const calculateTopicCompletion = (unitId: string, topicIndex: number) => {
    const rules = getTopicGrammarRules(unitId, topicIndex);
    const topicExercises = getTopicExercises(unitId, topicIndex);
    const decks = getTopicFlashcardDecks(unitId, topicIndex);
    
    let total = 0;
    let completed = 0;
    
    // Count grammar rules
    rules.forEach(rule => {
      total++;
      if (userProgress[rule.id]) {
        completed++;
      }
    });
    
    // Count exercises
    topicExercises.forEach(exercise => {
      total++;
      if ((userProgress[exercise.id] as number) >= 80) { // Passing score is 80%
        completed++;
      }
    });
    
    // Count flashcard decks
    decks.forEach(deck => {
      total++;
      if ((userProgress[deck.id] as number) >= 70) { // Mastery at 70%
        completed++;
      }
    });
    
    return total === 0 ? 0 : Math.round((completed / total) * 100);
  };
  
  // Calculate unit completion percentage
  const calculateUnitCompletion = (unitId: string) => {
    const unit = currentSyllabus?.units.find(u => u.id === unitId);
    if (!unit) return 0;
    
    let totalTopicCompletion = 0;
    
    for (let i = 0; i < unit.topics.length; i++) {
      totalTopicCompletion += calculateTopicCompletion(unitId, i);
    }
    
    return Math.round(totalTopicCompletion / unit.topics.length);
  };
  
  // Calculate overall syllabus completion
  const calculateSyllabusCompletion = () => {
    if (!currentSyllabus) return 0;
    
    let totalUnitCompletion = 0;
    
    currentSyllabus.units.forEach(unit => {
      totalUnitCompletion += calculateUnitCompletion(unit.id);
    });
    
    return Math.round(totalUnitCompletion / currentSyllabus.units.length);
  };
  
  // Get language name
  const getLanguageName = (langId: string) => {
    const language = languages.find(lang => lang.id === langId);
    return language ? language.name : langId;
  };
  
  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6">Language Learning Syllabus</h2>
      
      {/* Language and Level Selection */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
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
            onChange={(e) => handleLevelChange(e.target.value)}
            className="w-full p-2 border rounded-md"
          >
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>
      
      {/* Syllabus Overview */}
      {currentSyllabus && (
        <div className="mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6 mb-4">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-4">
              <div>
                <h3 className="text-xl font-semibold">{currentSyllabus.title}</h3>
                <p className="text-gray-600">{currentSyllabus.description}</p>
              </div>
              
              <div className="mt-4 md:mt-0 flex items-center">
                <div className="mr-3">
                  <div className="text-sm text-gray-600">Overall Progress</div>
                  <div className="text-lg font-semibold">{calculateSyllabusCompletion()}%</div>
                </div>
                <div className="w-24 h-24 relative">
                  <svg className="w-full h-full" viewBox="0 0 36 36">
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#f3f4f6"
                      strokeWidth="3"
                    />
                    <path
                      d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                      fill="none"
                      stroke="#4f46e5"
                      strokeWidth="3"
                      strokeDasharray={`${calculateSyllabusCompletion()}, 100`}
                    />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {currentSyllabus.units.map(unit => (
                <div 
                  key={unit.id}
                  className="border rounded-lg p-4 cursor-pointer hover:bg-gray-50"
                  onClick={() => toggleUnit(unit.id)}
                >
                  <div className="flex justify-between items-center">
                    <h4 className="font-medium">{unit.title}</h4>
                    <span className="text-sm font-semibold">{calculateUnitCompletion(unit.id)}%</span>
                  </div>
                  <div className="mt-2 h-2 bg-gray-200 rounded-full">
                    <div 
                      className="h-2 bg-indigo-500 rounded-full" 
                      style={{ width: `${calculateUnitCompletion(unit.id)}%` }}
                    ></div>
                  </div>
                  <div className="mt-2 text-sm text-gray-600">
                    {unit.topics.length} topics
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
      
      {/* Unit Details */}
      {expandedUnit && currentSyllabus && (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="mb-6">
            <button
              onClick={() => setExpandedUnit(null)}
              className="text-indigo-600 flex items-center"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to Syllabus
            </button>
          </div>
          
          {/* Unit Header */}
          {currentSyllabus.units.filter(unit => unit.id === expandedUnit).map(unit => (
            <div key={unit.id}>
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                  <h3 className="text-xl font-semibold">{unit.title}</h3>
                  <p className="text-gray-600">
                    Part of {getLanguageName(currentSyllabus.languageId)} {currentSyllabus.level} level
                  </p>
                </div>
                <div className="mt-4 md:mt-0 flex items-center">
                  <span className="text-lg font-semibold mr-3">
                    {calculateUnitCompletion(unit.id)}% Complete
                  </span>
                </div>
              </div>
              
              {/* Topic List */}
              <div className="space-y-6">
                {unit.topics.map((topic, topicIndex) => (
                  <div key={topicIndex} className="border rounded-lg overflow-hidden">
                    <div 
                      className="flex justify-between items-center p-4 cursor-pointer hover:bg-gray-50"
                      onClick={() => toggleTopic(`${unit.id}_${topicIndex}`)}
                    >
                      <div>
                        <h4 className="font-medium">{topic}</h4>
                        <p className="text-sm text-gray-600">
                          {getTopicGrammarRules(unit.id, topicIndex).length} grammar rules, 
                          {getTopicExercises(unit.id, topicIndex).length} exercises, 
                          {getTopicFlashcardDecks(unit.id, topicIndex).length} flashcard decks
                        </p>
                      </div>
                      <div className="flex items-center">
                        <span className="text-sm font-semibold mr-3">
                          {calculateTopicCompletion(unit.id, topicIndex)}%
                        </span>
                        <span>
                          {expandedTopic === `${unit.id}_${topicIndex}` ? '▼' : '▶'}
                        </span>
                      </div>
                    </div>
                    
                    {/* Topic Content */}
                    {expandedTopic === `${unit.id}_${topicIndex}` && (
                      <div className="p-4 bg-gray-50">
                        {/* Grammar Rules */}
                        <div className="mb-6">
                          <h5 className="font-medium mb-3">Grammar Rules</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getTopicGrammarRules(unit.id, topicIndex).map(rule => (
                              <div key={rule.id} className="border rounded p-3 bg-white">
                                <div className="flex items-center justify-between">
                                  <h6 className="font-medium">{rule.title}</h6>
                                  {userProgress[rule.id] ? (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                      Completed
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                      Not Started
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1 line-clamp-2">
                                  {rule.explanation}
                                </p>
                                <button className="mt-2 text-sm text-indigo-600">
                                  Go to Grammar Lesson →
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Exercises */}
                        <div className="mb-6">
                          <h5 className="font-medium mb-3">Exercises</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getTopicExercises(unit.id, topicIndex).map(exercise => (
                              <div key={exercise.id} className="border rounded p-3 bg-white">
                                <div className="flex items-center justify-between">
                                  <h6 className="font-medium">{exercise.question.length > 40 ? 
                                    `${exercise.question.substring(0, 40)}...` : 
                                    exercise.question}
                                  </h6>
                                  {(userProgress[exercise.id] as number) >= 80 ? (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                      Passed ({userProgress[exercise.id]}%)
                                    </span>
                                  ) : (userProgress[exercise.id] as number) > 0 ? (
                                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                      In Progress ({userProgress[exercise.id]}%)
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                      Not Started
                                    </span>
                                  )}
                                </div>
                                <button className="mt-2 text-sm text-indigo-600">
                                  Go to Exercise →
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        {/* Flashcards */}
                        <div>
                          <h5 className="font-medium mb-3">Flashcard Decks</h5>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {getTopicFlashcardDecks(unit.id, topicIndex).map(deck => (
                              <div key={deck.id} className="border rounded p-3 bg-white">
                                <div className="flex items-center justify-between">
                                  <h6 className="font-medium">{deck.name}</h6>
                                  {(userProgress[deck.id] as number) >= 70 ? (
                                    <span className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-full">
                                      Mastered ({userProgress[deck.id]}%)
                                    </span>
                                  ) : (userProgress[deck.id] as number) > 0 ? (
                                    <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-800 rounded-full">
                                      Learning ({userProgress[deck.id]}%)
                                    </span>
                                  ) : (
                                    <span className="px-2 py-1 text-xs bg-gray-100 text-gray-800 rounded-full">
                                      Not Started
                                    </span>
                                  )}
                                </div>
                                <p className="text-sm text-gray-600 mt-1">
                                {(deck as any).cardCount || "Unknown"} cards • {(deck as any).estimatedTime || "Unknown"}
                                </p>
                                <button className="mt-2 text-sm text-indigo-600">
                                  Study Flashcards →
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Certificate Preview */}
      {currentSyllabus && calculateSyllabusCompletion() >= 80 && (
        <div className="mt-8 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-lg shadow-md p-6 text-white">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div>
              <h3 className="text-xl font-bold mb-2">Congratulations!</h3>
              <p className="text-white text-opacity-90">
                You've completed over 80% of the {getLanguageName(currentSyllabus.languageId)} {currentSyllabus.level} syllabus. 
                You can now generate your certificate of completion.
              </p>
            </div>
            <button className="mt-4 md:mt-0 px-6 py-2 bg-white text-indigo-600 rounded-md font-medium hover:bg-gray-100">
              Generate Certificate
            </button>
          </div>
        </div>
      )}
      
      {/* No Syllabus Selected */}
      {!currentSyllabus && (
        <div className="bg-white rounded-lg shadow-sm border p-12 flex flex-col items-center justify-center">
          <p className="text-xl text-gray-600 mb-4">
            Please select a language and level to view the syllabus.
          </p>
        </div>
      )}
    </div>
  );
};

export default SyllabusPage;