import React, { useState, useEffect, DragEvent } from 'react';
import { Language, Exercise, ExerciseType } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { exerciseTypes, exercises } from '../../../data/exercises-data';

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
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
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
    let isCorrect = false;

    if (currentExercise.typeId === "type_3") {
      // For word-order, compare typed input if present
      // If typed input is empty, compare the drag-and-drop arrangement
      if (selectedAnswer.trim()) {
        userAnswer = selectedAnswer;
      } else {
        // Join the draggedWords array
        userAnswer = draggedWords.join(" ");
      }
      isCorrect = sanitizeInput(userAnswer) === sanitizeInput(currentExercise.correctAnswer || "");
    } else if (currentExercise.typeId === "type_5") {
      // For matching exercises, validate the matches
      isCorrect = currentExercise.matchItems?.every(item => {
        const response = currentExercise.matchResponses?.find(r => r.matchesId === item.id);
        return response && selectedAnswer.includes(`${item.id}-${response.id}`);
      }) || false;
    } else if (currentExercise.typeId === "type_7") {
      // For conjugation exercises, validate each conjugation
      isCorrect = currentExercise.conjugations?.every(conj => 
        selectedAnswer.includes(`${conj.pronoun}-${conj.correctForm}`)
      ) || false;
    } else {
      // Normal comparison for multiple choice, fill-blanks, etc.
      userAnswer = selectedAnswer;
      isCorrect = sanitizeInput(userAnswer) === sanitizeInput(currentExercise.correctAnswer || "");
    }

    if (!userAnswer && !isCorrect) return; // if truly empty and not a valid answer, do nothing

    setIsAnswered(true);
    setIsCorrect(isCorrect);
    if (isCorrect) {
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

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interactive Exercises</h2>
      
      {exerciseMode === "browse" && (
        <>
          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            {/* Language Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Language
              </label>
              <select
                value={currentLanguage}
                onChange={(e) => handleLanguageChange(e.target.value)}
                className="w-full p-2 border rounded-md"
              >
                {languages.map(lang => (
                  <option key={lang.id} value={lang.id}>{lang.name}</option>
                ))}
              </select>
            </div>

            {/* Level Selection */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Level
              </label>
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
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Exercise Type
              </label>
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

          {/* Start Quiz Button */}
          <button
            onClick={startQuiz}
            className="w-full md:w-auto px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-6"
          >
            Start Quiz
          </button>
        </>
      )}

      {exerciseMode === "quiz" && currentExercise && (
        <div className="space-y-6">
          {/* Progress Bar */}
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <div
              className="bg-blue-600 h-2.5 rounded-full transition-all duration-300"
              style={{ width: `${calculateProgress()}%` }}
            ></div>
          </div>

          {/* Exercise Content */}
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-medium mb-4">{currentExercise.question}</h3>

            {/* Exercise Type Specific Rendering */}
            {currentExercise.typeId === "type_1" && (
              <div className="space-y-3">
                {currentExercise.options?.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`w-full p-3 text-left rounded-md border ${
                      selectedAnswer === option
                        ? isAnswered
                          ? option === currentExercise.correctAnswer
                            ? "bg-green-100 border-green-500"
                            : "bg-red-100 border-red-500"
                          : "bg-blue-50 border-blue-500"
                        : "hover:bg-gray-50"
                    }`}
                  >
                    {option}
                  </button>
                ))}
              </div>
            )}

            {currentExercise.typeId === "type_2" && (
              <div className="space-y-3">
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Type your answer..."
                />
                {currentExercise.options && (
                  <div className="flex flex-wrap gap-2">
                    {currentExercise.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-full"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {currentExercise.typeId === "type_3" && (
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  {draggedWords.map((word, index) => (
                    <div
                      key={index}
                      draggable
                      onDragStart={() => handleDragStart(index)}
                      onDragOver={(e) => handleDragOver(e, index)}
                      onDrop={handleDrop}
                      className={`px-3 py-2 bg-gray-100 rounded-md cursor-move ${
                        draggedIndex === index ? "opacity-50" : ""
                      }`}
                    >
                      {word}
                    </div>
                  ))}
                </div>
                <input
                  type="text"
                  value={selectedAnswer}
                  onChange={(e) => handleAnswerSelect(e.target.value)}
                  className="w-full p-2 border rounded-md"
                  placeholder="Or type your answer..."
                />
              </div>
            )}

            {currentExercise.typeId === "type_4" && (
              <div className="space-y-4">
                <button
                  onClick={() => speakPhrase(getTextToSpeak(currentExercise), currentExercise.languageId)}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md flex items-center gap-2"
                >
                  <span>🔊</span> Listen
                </button>
                {currentExercise.options && (
                  <div className="space-y-3">
                    {currentExercise.options.map((option, index) => (
                      <button
                        key={index}
                        onClick={() => handleAnswerSelect(option)}
                        className={`w-full p-3 text-left rounded-md border ${
                          selectedAnswer === option
                            ? isAnswered
                              ? option === currentExercise.correctAnswer
                                ? "bg-green-100 border-green-500"
                                : "bg-red-100 border-red-500"
                              : "bg-blue-50 border-blue-500"
                            : "hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* Submit Button */}
            {!isAnswered && (
              <button
                onClick={submitAnswer}
                className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Submit Answer
              </button>
            )}

            {/* Explanation */}
            {isAnswered && (
              <div className="mt-4">
                <button
                  onClick={toggleExplanation}
                  className="text-blue-500 hover:text-blue-600"
                >
                  {showExplanation ? "Hide Explanation" : "Show Explanation"}
                </button>
                {showExplanation && (
                  <p className="mt-2 text-gray-600">{currentExercise.explanation}</p>
                )}
              </div>
            )}

            {/* Navigation */}
            <div className="mt-6 flex justify-between">
              <button
                onClick={prevExercise}
                disabled={currentExerciseIndex === 0}
                className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-md disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={nextExercise}
                disabled={!isAnswered && currentExerciseIndex < filteredExercises.length - 1}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 disabled:opacity-50"
              >
                {currentExerciseIndex === filteredExercises.length - 1 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        </div>
      )}

      {exerciseMode === "results" && (
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-xl font-medium mb-4">Quiz Results</h3>
          <p className="text-lg mb-4">
            Your score: {score} out of {filteredExercises.length}
          </p>
          <button
            onClick={returnToBrowse}
            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Return to Browse
          </button>
        </div>
      )}
    </div>
  );
};

export default Exercises;
