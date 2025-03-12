import React, { useState, useEffect } from 'react';
import { Language, Exercise, ExerciseType } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { exerciseTypes, exercises } from '../../../data/exercises-data';

type ExerciseModeType = "browse" | "quiz" | "results";

const Exercises = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>("beginner");
  const [currentType, setCurrentType] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [exerciseMode, setExerciseMode] = useState<ExerciseModeType>("browse");

  // Filter exercises by language, level, and type
  useEffect(() => {
    let filtered = exercises.filter(exercise => 
      exercise.languageId === currentLanguage && 
      exercise.level === currentLevel
    );
    
    if (currentType) {
      filtered = filtered.filter(exercise => exercise.typeId === currentType);
    }
    
    setFilteredExercises(filtered as Exercise[]); // Add type assertion here
    setCurrentExerciseIndex(0);
    resetExerciseState();
  }, [currentLanguage, currentLevel, currentType]);

  // Reset exercise state
  const resetExerciseState = () => {
    setSelectedAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
  };

  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };

  // Handle level change
  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentLevel(level);
  };

  // Handle exercise type change
  const handleTypeChange = (typeId: string) => {
    setCurrentType(typeId);
  };

  // Handle answer selection
  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    
    setSelectedAnswer(answer);
  };

  // Submit answer
  const submitAnswer = () => {
    if (!selectedAnswer || isAnswered) return;
    
    const currentExercise = filteredExercises[currentExerciseIndex];
    const correct = selectedAnswer === currentExercise.correctAnswer;
    
    setIsAnswered(true);
    setIsCorrect(correct);
    
    if (correct) {
      setScore(score + 1);
      if (!completedExercises.includes(currentExercise.id)) {
        setCompletedExercises([...completedExercises, currentExercise.id]);
      }
    }
  };

  // Move to the next exercise
  const nextExercise = () => {
    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExerciseState();
    } else if (exerciseMode === "quiz") {
      // End of quiz
      setExerciseMode("results");
    }
  };

  // Move to the previous exercise
  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      resetExerciseState();
    }
  };

  // Toggle explanation
  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Start a quiz with all filtered exercises
  const startQuiz = () => {
    setExerciseMode("quiz");
    setCurrentExerciseIndex(0);
    setScore(0);
    resetExerciseState();
  };

  // Return to browse mode
  const returnToBrowse = () => {
    setExerciseMode("browse");
    resetExerciseState();
  };

  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };

  // Get exercise type name by ID
  const getTypeName = (id: string) => {
    const type = exerciseTypes.find(type => type.id === id);
    return type ? type.name : id;
  };

  // Current exercise
  const currentExercise = filteredExercises.length > 0 
    ? filteredExercises[currentExerciseIndex] 
    : null;

  // Calculate progress
  const calculateProgress = () => {
    if (filteredExercises.length === 0) return 0;
    return Math.round((currentExerciseIndex + 1) / filteredExercises.length * 100);
  };

  // Function to speak text using browser's speech synthesis (copied from Phrases component)
  const speakPhrase = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      
      // Set language code (simplified for demo)
      const languageMap: {[key: string]: string} = {
        'lang_en': 'en-US',
        'lang_pt': 'pt-BR',
        'lang_sw': 'sw'  // Default Swahili code
      };
      
      utterance.lang = languageMap[langCode] || 'en-US';
      speechSynthesis.speak(utterance);
    }
  };

  // Get text to speak for listening exercises
  const getTextToSpeak = (exercise: Exercise): string => {
    // If this is a listening exercise, use the correct answer as the text to speak
    if (exercise.typeId === 'type_4' && exercise.correctAnswer) {
      return exercise.correctAnswer;
    }
    return '';
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interactive Exercises</h2>
      
      {exerciseMode === "browse" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Language Selection */}
            <div>
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
            
            {/* Level Selection */}
            <div>
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
            
            {/* Exercise Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Exercise Type</label>
              <select
                value={currentType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Types</option>
                {exerciseTypes.map(type => (
                  <option key={type.id} value={type.id}>{type.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Quiz Mode Button */}
          {filteredExercises.length > 0 && (
            <div className="mb-6">
              <button
                onClick={startQuiz}
                className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
              >
                Start Quiz Mode ({filteredExercises.length} questions)
              </button>
            </div>
          )}
        </>
      )}
      
      {/* Exercise Display */}
      {currentExercise && exerciseMode !== "results" ? (
        <div className="bg-white rounded-lg shadow-sm border p-6">
          {/* Progress Bar */}
          <div className="mb-4">
            <div className="flex items-center justify-between mb-1">
              <span className="text-sm text-gray-600">
                Question {currentExerciseIndex + 1} of {filteredExercises.length}
              </span>
              {exerciseMode === "quiz" && (
                <span className="text-sm font-medium text-gray-900">
                  Score: {score}/{currentExerciseIndex + (isAnswered ? 1 : 0)}
                </span>
              )}
            </div>
            <div className="h-2 bg-gray-200 rounded">
              <div 
                className="h-2 bg-blue-500 rounded" 
                style={{ width: `${calculateProgress()}%` }}
              ></div>
            </div>
          </div>
          
          {/* Exercise Type Badge */}
          <div className="mb-4">
            <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
              {getTypeName(currentExercise.typeId)}
            </span>
          </div>
          
          {/* Question */}
          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">{currentExercise.question}</h3>
            
            {/* Audio for listening exercises */}
            {currentExercise.typeId === 'type_4' && (
              <div className="mb-4 flex items-center gap-2">
                <button 
                  onClick={() => speakPhrase(getTextToSpeak(currentExercise), currentExercise.languageId)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                >
                  <span>🔊</span> Listen
                </button>
                <span className="text-sm text-gray-500">Click to hear the audio</span>
              </div>
            )}
          </div>
          
          {/* Multiple Choice Options */}
          {currentExercise.options && (
            <div className="space-y-3 mb-6">
              {currentExercise.options.map((option, index) => (
                <div 
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-3 border rounded-md cursor-pointer transition-colors
                    ${selectedAnswer === option 
                      ? isAnswered 
                        ? isCorrect 
                          ? 'bg-green-100 border-green-500' 
                          : 'bg-red-100 border-red-500'
                        : 'bg-blue-50 border-blue-500'
                      : 'hover:bg-gray-50'}
                    ${isAnswered && option === currentExercise.correctAnswer && !isCorrect
                      ? 'bg-green-100 border-green-500'
                      : ''}
                  `}
                >
                  <div className="flex items-center">
                    <span className="w-6 h-6 flex items-center justify-center rounded-full border mr-3">
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span>{option}</span>
                    
                    {isAnswered && (
                      <span className="ml-auto">
                        {option === currentExercise.correctAnswer 
                          ? '✓' 
                          : selectedAnswer === option && !isCorrect 
                            ? '✗' 
                            : ''}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
          
          {/* Word Order Exercise */}
          {currentExercise.typeId === "type_3" && (
            <div className="mb-6">
              <div className="p-4 bg-gray-50 rounded-md mb-3">
                <p className="text-sm text-gray-600 mb-2">Arrange the words in the correct order:</p>
                <div className="flex flex-wrap gap-2">
                  {currentExercise.question.split(', ').map((word, index) => (
                    <div 
                      key={index}
                      className="px-3 py-1 bg-white border rounded-md shadow-sm"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>
              
              <input
                type="text"
                value={selectedAnswer}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                placeholder="Type your answer here..."
                className="w-full p-2 border rounded-md"
              />
              
              {isAnswered && (
                <div className={`mt-3 p-3 rounded-md ${isCorrect ? 'bg-green-100' : 'bg-red-100'}`}>
                  <p className="font-medium">
                    {isCorrect 
                      ? 'Correct!' 
                      : 'Not quite right. The correct answer is:'
                    }
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 font-medium text-green-700">{currentExercise.correctAnswer}</p>
                  )}
                </div>
              )}
            </div>
          )}
          
          {/* Submit Button */}
          {!isAnswered ? (
            <button
              onClick={submitAnswer}
              disabled={!selectedAnswer}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Check Answer
            </button>
          ) : (
            <div className="space-y-4">
              {/* Explanation Toggle */}
              {currentExercise.explanation && (
                <button
                  onClick={toggleExplanation}
                  className="px-4 py-2 bg-gray-100 text-gray-800 rounded-md hover:bg-gray-200"
                >
                  {showExplanation ? 'Hide Explanation' : 'Show Explanation'}
                </button>
              )}
              
              {/* Explanation */}
              {showExplanation && currentExercise.explanation && (
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-sm text-gray-800">{currentExercise.explanation}</p>
                </div>
              )}
              
              {/* Navigation Buttons */}
              <div className="flex justify-between">
                {exerciseMode === "browse" ? (
                  <>
                    <button
                      onClick={prevExercise}
                      disabled={currentExerciseIndex === 0}
                      className="px-4 py-2 bg-gray-200 rounded-md disabled:opacity-50 hover:bg-gray-300"
                    >
                      Previous
                    </button>
                    
                    <button
                      onClick={nextExercise}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      Next
                    </button>
                  </>
                ) : (
                  <button
                    onClick={nextExercise}
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 ml-auto"
                  >
                    {currentExerciseIndex < filteredExercises.length - 1 ? 'Next Question' : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : exerciseMode === "results" ? (
        // Quiz Results
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-gray-600">You scored {score} out of {filteredExercises.length}</p>
            
            <div className="w-32 h-32 mx-auto mt-4 relative">
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
                  stroke={score / filteredExercises.length >= 0.75 ? "#10b981" : score / filteredExercises.length >= 0.5 ? "#f59e0b" : "#ef4444"}
                  strokeWidth="3"
                  strokeDasharray={`${(score / filteredExercises.length) * 100}, 100`}
                />
                <text x="18" y="20.5" className="text-5xl font-bold" textAnchor="middle" fill="currentColor">
                  {Math.round((score / filteredExercises.length) * 100)}%
                </text>
              </svg>
            </div>
          </div>
          
          <div className="space-y-2 mb-6">
            {score / filteredExercises.length === 1 && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md">
                <p className="font-medium">Perfect score! Excellent work!</p>
              </div>
            )}
            
            {score / filteredExercises.length >= 0.75 && score / filteredExercises.length < 1 && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md">
                <p className="font-medium">Great job! You're making excellent progress!</p>
              </div>
            )}
            
            {score / filteredExercises.length >= 0.5 && score / filteredExercises.length < 0.75 && (
              <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md">
                <p className="font-medium">Good effort! Keep practicing to improve.</p>
              </div>
            )}
            
            {score / filteredExercises.length < 0.5 && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md">
                <p className="font-medium">Keep practicing! You'll get better with time.</p>
              </div>
            )}
          </div>
          
          <div className="flex justify-center gap-4">
            <button
              onClick={returnToBrowse}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300"
            >
              Back to Exercises
            </button>
            
            <button
              onClick={startQuiz}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Retry Quiz
            </button>
          </div>
        </div>
      ) : (
        // No exercises available
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-2">
          {exerciseTypes.map((type) => (
            <div 
              key={type.id}
              onClick={() => handleTypeChange(type.id)}
              className="p-4 border rounded-lg hover:shadow-md transition-shadow cursor-pointer"
            >
              <h3 className="font-medium mb-2">{type.name}</h3>
              <p className="text-sm text-gray-600">{type.description}</p>
              <button className="mt-4 text-blue-500 hover:text-blue-600">
                Start Exercise →
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Exercises;