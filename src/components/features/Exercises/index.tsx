import React, { useState, useEffect, DragEvent } from 'react';
import { Language, Exercise as BaseExercise, ExerciseType } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { exerciseTypes, exercises } from '../../../data/exercises-data';
import { Button } from 'primereact/button';
import { Book, ChevronDown, ChevronRight, CheckCircle, Circle, BookOpen, Lightbulb, ArrowRight } from 'lucide-react';
import Select, { SingleValue, FormatOptionLabelMeta } from 'react-select';
import { GB, PT, KE, ES, FR, DE, IT, RU, JP, KR, CN, SA, IN, TR, NL, PL, VN, TH, ID, MY } from 'country-flag-icons/react/3x2';

type ExerciseModeType = "browse" | "quiz" | "results";

// Helper to remove accents & handle case
function sanitizeInput(str: string): string {
  return str
    .toLowerCase()
    .normalize("NFD") 
    .replace(/[\u0300-\u036f]/g, "")
    .trim();
}

// Optional: a small utility to shuffle an array
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

interface LanguageOption {
  value: string;
  label: string;
  Flag: any;
}

const languageOptions: LanguageOption[] = [
  { value: "lang_pt", label: "Portuguese", Flag: PT },
  { value: "lang_sw", label: "Swahili", Flag: KE }
];

// Extend the base Exercise type to include hint
interface Exercise extends BaseExercise {
  hint?: string;
}

const Exercises = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [currentLevel, setCurrentLevel] = useState<'beginner' | 'intermediate' | 'advanced'>("beginner");
  const [currentType, setCurrentType] = useState<string>("");
  const [filteredExercises, setFilteredExercises] = useState<Exercise[]>([]);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState<number>(0);

  // For any type of exercise
  const [selectedAnswer, setSelectedAnswer] = useState<string>("");
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [isCorrect, setIsCorrect] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showExplanation, setShowExplanation] = useState<boolean>(false);
  const [completedExercises, setCompletedExercises] = useState<string[]>([]);
  const [exerciseMode, setExerciseMode] = useState<ExerciseModeType>("browse");

  // For word-order (type_3) drag-and-drop
  const [draggedWords, setDraggedWords] = useState<string[]>([]);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  // Filter exercises by language, level, and type
  useEffect(() => {
    let filtered = exercises.filter(ex => 
      ex.languageId === currentLanguage && 
      ex.level === currentLevel
    );
    if (currentType) {
      filtered = filtered.filter(ex => ex.typeId === currentType);
    }
    setFilteredExercises(filtered);
    setCurrentExerciseIndex(0);
    resetExerciseState();
  }, [currentLanguage, currentLevel, currentType]);

  // Reset relevant state when we change exercises
  const resetExerciseState = () => {
    setSelectedAnswer("");
    setIsAnswered(false);
    setIsCorrect(false);
    setShowExplanation(false);
    setDraggedWords([]);
    setDraggedIndex(null);
  };

  // Language/level/type changes
  const handleLanguageChange = (option: LanguageOption | null) => {
    if (option) {
      setCurrentLanguage(option.value);
    }
  };
  const handleLevelChange = (level: 'beginner' | 'intermediate' | 'advanced') => {
    setCurrentLevel(level);
  };
  const handleTypeChange = (typeId: string) => {
    setCurrentType(typeId);
  };

  // For multiple choice, fill-blanks, etc.
  const handleAnswerSelect = (answer: string) => {
    if (isAnswered) return;
    setSelectedAnswer(answer);
  };

  // Submit answer
  const submitAnswer = () => {
    if (isAnswered) return;

    const currentExercise = filteredExercises[currentExerciseIndex];
    let userAnswer = "";

    if (currentExercise.typeId === "type_3") {
      // For word-order, compare typed input if present
      // If typed input is empty, compare the drag-and-drop arrangement
      if (selectedAnswer.trim()) {
        userAnswer = selectedAnswer;
      } else {
        // Join the draggedWords array
        userAnswer = draggedWords.join(" ");
      }
    } else {
      // Normal comparison for multiple choice, fill-blanks, etc.
      userAnswer = selectedAnswer;
    }

    if (!userAnswer) return; // if truly empty, do nothing

    const correct = currentExercise.correctAnswer ? (
      sanitizeInput(userAnswer) === sanitizeInput(currentExercise.correctAnswer)
    ) : false;

    setIsAnswered(true);
    setIsCorrect(correct);
    if (correct) {
      setScore(score + 1);
      if (!completedExercises.includes(currentExercise.id)) {
        setCompletedExercises([...completedExercises, currentExercise.id]);
      }
    }
  };

  // Navigation
  const nextExercise = () => {
    if (currentExerciseIndex < filteredExercises.length - 1) {
      setCurrentExerciseIndex(currentExerciseIndex + 1);
      resetExerciseState();
    } else if (exerciseMode === "quiz") {
      setExerciseMode("results");
    }
  };
  const prevExercise = () => {
    if (currentExerciseIndex > 0) {
      setCurrentExerciseIndex(currentExerciseIndex - 1);
      resetExerciseState();
    }
  };

  const toggleExplanation = () => {
    setShowExplanation(!showExplanation);
  };

  // Start quiz mode
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

  // Helpers
  const getLanguageName = (id: string) => {
    const lang = languages.find(l => l.id === id);
    return lang ? lang.name : id;
  };
  const getTypeName = (id: string) => {
    const t = exerciseTypes.find(t => t.id === id);
    return t ? t.name : id;
  };
  const calculateProgress = () => {
    if (!filteredExercises.length) return 0;
    return Math.round(((currentExerciseIndex + 1) / filteredExercises.length) * 100);
  };

  // For listening exercises, we speak the correct answer
  const speakPhrase = (text: string, langCode: string) => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      const languageMap: { [key: string]: string } = {
        'lang_en': 'en-US',
        'lang_pt': 'pt-BR',
        'lang_sw': 'sw',
      };
      utterance.lang = languageMap[langCode] || 'en-US';
      speechSynthesis.speak(utterance);
    }
  };
  const getTextToSpeak = (exercise: Exercise): string => {
    if (exercise.typeId === 'type_4' && exercise.correctAnswer) {
      return exercise.correctAnswer;
    }
    return '';
  };

  // Current exercise
  const currentExercise = filteredExercises.length
    ? filteredExercises[currentExerciseIndex]
    : null;

  // WORD-ORDER (type_3) LOGIC STARTS HERE
  useEffect(() => {
    if (
      currentExercise &&
      currentExercise.typeId === "type_3" &&
      currentExercise.question
    ) {
      // Split the question into words, shuffle them for the drag interface
      const wordsArray = currentExercise.question.split(', ').map(w => w.trim());
      // Shuffle them (optional)
      const shuffled = shuffleArray(wordsArray);
      setDraggedWords(shuffled);
    }
  }, [currentExercise]);

  // Handle drag and drop for type_3
  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };
  const handleDragOver = (e: DragEvent<HTMLDivElement>, index: number) => {
    e.preventDefault(); 
    if (draggedIndex === null || draggedIndex === index) return;
    const newOrder = [...draggedWords];
    // Remove the item from old position
    const [removed] = newOrder.splice(draggedIndex, 1);
    // Insert it at hover position
    newOrder.splice(index, 0, removed);
    setDraggedIndex(index);
    setDraggedWords(newOrder);
  };
  const handleDrop = () => {
    setDraggedIndex(null);
  };

  const [activeTab, setActiveTab] = useState<'question' | 'hint' | 'explanation'>('question');

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
    menu: (provided: any) => ({
      ...provided,
      backgroundColor: 'white',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
      border: '1px solid #e2e8f0',
      borderRadius: '0.375rem',
    }),
    option: (provided: any, state: any) => ({
      ...provided,
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
    }),
  };

  const formatOptionLabel = (data: LanguageOption) => (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <data.Flag style={{ width: '20px', height: '15px' }} />
      <span>{data.label}</span>
    </div>
  );

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interactive Exercises</h2>
      
      {exerciseMode === "browse" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Language Selection */}
            <div className="flex flex-col items-center w-full">
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Language
              </label>
              <Select
                value={languageOptions.find(option => option.value === currentLanguage)}
                onChange={handleLanguageChange}
                options={languageOptions}
                styles={customSelectStyles}
                className="react-select-container w-full"
                classNamePrefix="react-select"
                isSearchable={false}
                formatOptionLabel={formatOptionLabel}
              />
            </div>

            {/* Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Level
              </label>
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

            {/* Exercise Type Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3 text-center">
                Exercise Type
              </label>
              <select
                value={currentType}
                onChange={(e) => handleTypeChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                <option value="">All Types</option>
                {exerciseTypes.map(type => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
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
              />
            </div>
          </div>

          {/* Exercise Type Badge */}
          <div className="mb-4">
            <span className="inline-block px-2 py-1 text-xs rounded bg-blue-100 text-blue-800">
              {getTypeName(currentExercise.typeId)}
            </span>
          </div>

          {/* Tabs */}
          <div className="mb-6">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8" aria-label="Tabs">
                <button
                  onClick={() => setActiveTab('question')}
                  className={`${
                    activeTab === 'question'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Question
                </button>
                <button
                  onClick={() => setActiveTab('hint')}
                  className={`${
                    activeTab === 'hint'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Hint
                </button>
                <button
                  onClick={() => setActiveTab('explanation')}
                  className={`${
                    activeTab === 'explanation'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
                >
                  Explanation
                </button>
              </nav>
            </div>
          </div>

          {/* Tab Content */}
          <div className="mb-6">
            {activeTab === 'question' && (
              <div>
                <h3 className="text-lg font-medium mb-2">
                  {currentExercise.question}
                </h3>
                {currentExercise.typeId === 'type_4' && (
                  <div className="mb-4 flex items-center gap-2">
                    <button
                      onClick={() =>
                        speakPhrase(getTextToSpeak(currentExercise), currentExercise.languageId)
                      }
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 flex items-center gap-2"
                    >
                      <span>🔊</span> Listen
                    </button>
                    <span className="text-sm text-gray-500">
                      Click to hear the audio
                    </span>
                  </div>
                )}
              </div>
            )}
            {activeTab === 'hint' && (
              <div className="text-gray-600">
                {currentExercise.hint || 'No hint available for this exercise.'}
              </div>
            )}
            {activeTab === 'explanation' && (
              <div className="text-gray-600">
                {currentExercise.explanation || 'No explanation available for this exercise.'}
              </div>
            )}
          </div>

          {/* MULTIPLE-CHOICE, FILL-BLANKS, ETC. */}
          {currentExercise.options && currentExercise.typeId !== "type_3" && (
            <div className="space-y-3 mb-6">
              {currentExercise.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(option)}
                  className={`p-3 border rounded-md cursor-pointer transition-colors
                    ${
                      selectedAnswer === option
                        ? isAnswered
                          ? isCorrect
                            ? 'bg-green-100 border-green-500'
                            : 'bg-red-100 border-red-500'
                          : 'bg-blue-50 border-blue-500'
                        : 'hover:bg-gray-50'
                    }
                    ${
                      isAnswered &&
                      option === currentExercise.correctAnswer &&
                      !isCorrect
                        ? 'bg-green-100 border-green-500'
                        : ''
                    }
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

          {/* WORD-ORDER (type_3) BLOCK: DRAG & DROP + TYPING */}
          {currentExercise.typeId === "type_3" && (
            <div className="mb-6">
              {/* DRAG-AND-DROP WORDS */}
              <div className="p-4 bg-gray-50 rounded-md mb-3">
                <p className="text-sm text-gray-700 mb-2">
                  Drag the words to reorder:
                </p>
                <div className="flex flex-wrap gap-2">
                  {draggedWords.map((word, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={handleDrop}
                      className="px-3 py-1 bg-white border rounded-md shadow-sm cursor-move"
                    >
                      {word}
                    </div>
                  ))}
                </div>
              </div>

              {/* TYPED INPUT (optional alternative) */}
              <div className="mb-2">
                <p className="text-sm text-gray-700 mb-2">
                  Or type your answer below:
                </p>
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => setSelectedAnswer(e.target.value)}
                  placeholder="Type the sentence here..."
                  className="w-full p-2 border rounded-md"
                />
              </div>

              {/* If answered, show correct / incorrect */}
              {isAnswered && (
                <div
                  className={`mt-3 p-3 rounded-md ${
                    isCorrect ? 'bg-green-100' : 'bg-red-100'
                  }`}
                >
                  <p className="font-medium">
                    {isCorrect
                      ? 'Correct!'
                      : 'Not quite right. The correct answer is:'}
                  </p>
                  {!isCorrect && (
                    <p className="mt-1 font-medium text-green-700">
                      {currentExercise.correctAnswer}
                    </p>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Submit Button */}
          {!isAnswered ? (
            <button
              onClick={submitAnswer}
              disabled={
                // For word-order, let them at least drag or type
                currentExercise.typeId === "type_3"
                  ? !draggedWords.length && !selectedAnswer
                  : !selectedAnswer
              }
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

              {showExplanation && currentExercise.explanation && (
                <div className="p-4 bg-yellow-50 rounded-md border border-yellow-200">
                  <p className="text-sm text-gray-800">
                    {currentExercise.explanation}
                  </p>
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
                    {currentExerciseIndex < filteredExercises.length - 1
                      ? 'Next Question'
                      : 'Finish Quiz'}
                  </button>
                )}
              </div>
            </div>
          )}
        </div>
      ) : exerciseMode === "results" ? (
        // QUIZ RESULTS
        <div className="bg-white rounded-lg shadow-sm border p-6">
          <div className="text-center mb-6">
            <h3 className="text-2xl font-bold mb-2">Quiz Completed!</h3>
            <p className="text-gray-600">
              You scored {score} out of {filteredExercises.length}
            </p>

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
                  stroke={
                    score / filteredExercises.length >= 0.75
                      ? "#10b981"
                      : score / filteredExercises.length >= 0.5
                      ? "#f59e0b"
                      : "#ef4444"
                  }
                  strokeWidth="3"
                  strokeDasharray={`${(score / filteredExercises.length) * 100}, 100`}
                />
                <text
                  x="18"
                  y="20.5"
                  className="text-5xl font-bold"
                  textAnchor="middle"
                  fill="currentColor"
                >
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
            {score / filteredExercises.length >= 0.75 &&
              score / filteredExercises.length < 1 && (
              <div className="p-3 bg-green-100 text-green-800 rounded-md">
                <p className="font-medium">
                  Great job! You're making excellent progress!
                </p>
              </div>
            )}
            {score / filteredExercises.length >= 0.5 &&
              score / filteredExercises.length < 0.75 && (
              <div className="p-3 bg-yellow-100 text-yellow-800 rounded-md">
                <p className="font-medium">
                  Good effort! Keep practicing to improve.
                </p>
              </div>
            )}
            {score / filteredExercises.length < 0.5 && (
              <div className="p-3 bg-red-100 text-red-800 rounded-md">
                <p className="font-medium">
                  Keep practicing! You'll get better with time.
                </p>
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
        // NO EXERCISES AVAILABLE – or just show exercise types in browse view
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
