import React, { useState, useEffect } from 'react';
import { Language, Exercise, GrammarRule, FlashcardDeck, Flashcard, Phrase } from '../../../types/schema';
import { languages } from '../../../data/dictionary-data';
import { exerciseTypes, exercises } from '../../../data/exercises-data';
import { grammarRules } from '../../../data/grammar-data';
import { flashcardDecks, flashcards } from '../../../data/flashcards-data';
import { phrases } from '../../../data/phrases-data';

// Define types for Progress component
interface UserProgress {
  userId: string;
  languageId: string;
  vocabularyProgress: number;
  grammarProgress: number;
  exerciseSuccess: number;
  completedExercises: number;
  totalExercises: number;
  masteredWords: number;
  totalWords: number;
  learnedGrammarRules: number;
  totalGrammarRules: number;
  level: 'beginner' | 'intermediate' | 'advanced';
  streak: number;
  totalTimeSpent: number;
  lastActive: Date;
  strengthByCategory: {
    [key: string]: number;
  };
}

interface UserActivity {
  id: string;
  userId: string;
  languageId: string;
  activityType: 'dictionary' | 'phrases' | 'grammar' | 'exercises' | 'flashcards';
  itemId: string;
  completedAt: Date;
  score: number | null;
}

interface Recommendation {
  title: string;
  description: string;
  action: string;
  link: string;
}

const Progress = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>("lang_pt");
  const [userProgress, setUserProgress] = useState<UserProgress | null>(null);
  const [userActivities, setUserActivities] = useState<UserActivity[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch user progress data when language changes
  useEffect(() => {
    setLoading(true);
    fetchUserProgress(currentLanguage);
    fetchUserActivities(currentLanguage);
  }, [currentLanguage]);

  // Simulated API call to fetch user progress data
  const fetchUserProgress = (languageId: string) => {
    // In a real app, this would be an API call to your backend
    // For now, we'll calculate progress based on our sample data
    try {
      // Calculate progress metrics based on activities
      const totalExercises = exercises.filter(ex => ex.languageId === languageId).length;
      const completedExercises = Math.floor(Math.random() * totalExercises); // Simulate completed exercises
      
      const totalFlashcards = flashcards.filter(card => {
        const deck = flashcardDecks.find(deck => deck.id === card.deckId);
        return deck?.targetLanguageId === languageId;
      }).length;
      const masteredFlashcards = Math.floor(Math.random() * totalFlashcards); // Simulate mastered flashcards
      
      const totalGrammarRules = grammarRules.filter(rule => rule.languageId === languageId).length;
      const learnedGrammarRules = Math.floor(Math.random() * totalGrammarRules); // Simulate learned grammar rules
      
      // Calculate percentages
      const vocabProgress = totalFlashcards ? Math.round((masteredFlashcards / totalFlashcards) * 100) : 0;
      const grammarProgress = totalGrammarRules ? Math.round((learnedGrammarRules / totalGrammarRules) * 100) : 0;
      const exerciseSuccess = completedExercises ? Math.round(Math.random() * 100) : 0; // Simulate exercise success rate
      
      // Determine level based on progress
      let level: 'beginner' | 'intermediate' | 'advanced' = "beginner";
      const overallProgress = (vocabProgress + grammarProgress + exerciseSuccess) / 3;
      if (overallProgress > 70) level = "advanced";
      else if (overallProgress > 40) level = "intermediate";
      
      // Construct progress object
      const progress: UserProgress = {
        userId: "user_1", // Mock user ID
        languageId: languageId,
        vocabularyProgress: vocabProgress,
        grammarProgress: grammarProgress,
        exerciseSuccess: exerciseSuccess,
        completedExercises: completedExercises,
        totalExercises: totalExercises,
        masteredWords: masteredFlashcards,
        totalWords: totalFlashcards,
        learnedGrammarRules: learnedGrammarRules,
        totalGrammarRules: totalGrammarRules,
        level: level,
        streak: Math.floor(Math.random() * 30) + 1, // Simulate streak (1-30 days)
        totalTimeSpent: Math.floor(Math.random() * 1000) + 60, // Simulate time spent (60-1060 minutes)
        lastActive: new Date(Date.now() - Math.floor(Math.random() * 86400000)), // Random time in the last 24 hours
        strengthByCategory: {
          vocabulary: vocabProgress,
          grammar: grammarProgress,
          listening: Math.floor(Math.random() * 100),
          speaking: Math.floor(Math.random() * 100),
          reading: Math.floor(Math.random() * 100),
          writing: Math.floor(Math.random() * 100)
        }
      };
      
      setUserProgress(progress);
      setLoading(false);
    } catch (err) {
      console.error("Error calculating progress:", err);
      setError("Failed to load progress data. Please try again.");
      setLoading(false);
    }
  };

  // Simulated API call to fetch user activity history
  const fetchUserActivities = (languageId: string) => {
    // In a real app, this would be an API call to your backend
    try {
      // Generate sample activity data for the past 7 days
      const today = new Date();
      const activities: UserActivity[] = [];
      
      // Activity types
      const activityTypes: ('dictionary' | 'phrases' | 'grammar' | 'exercises' | 'flashcards')[] = [
        'dictionary', 'phrases', 'grammar', 'exercises', 'flashcards'
      ];
      
      // Generate 1-5 activities per day for the last 7 days
      for (let i = 0; i < 7; i++) {
        const day = new Date(today);
        day.setDate(today.getDate() - i);
        
        const dailyActivityCount = Math.floor(Math.random() * 5) + 1;
        
        for (let j = 0; j < dailyActivityCount; j++) {
          const activityType = activityTypes[Math.floor(Math.random() * activityTypes.length)];
          
          let itemId = '';
          // Assign realistic item IDs based on activity type
          switch(activityType) {
            case 'dictionary':
              const dictEntries = exercises.filter(ex => ex.languageId === languageId);
              itemId = dictEntries.length ? dictEntries[Math.floor(Math.random() * dictEntries.length)].id : 'dict_1';
              break;
            case 'phrases':
              const availablePhrases = phrases.filter(p => p.targetLanguageId === languageId);
              itemId = availablePhrases.length ? availablePhrases[Math.floor(Math.random() * availablePhrases.length)].id : 'phrase_1';
              break;
            case 'grammar':
              const availableRules = grammarRules.filter(rule => rule.languageId === languageId);
              itemId = availableRules.length ? availableRules[Math.floor(Math.random() * availableRules.length)].id : 'grammar_1';
              break;
            case 'exercises':
              const availableExercises = exercises.filter(ex => ex.languageId === languageId);
              itemId = availableExercises.length ? availableExercises[Math.floor(Math.random() * availableExercises.length)].id : 'exercise_1';
              break;
            case 'flashcards':
              const availableDecks = flashcardDecks.filter(deck => deck.targetLanguageId === languageId);
              itemId = availableDecks.length ? availableDecks[Math.floor(Math.random() * availableDecks.length)].id : 'deck_1';
              break;
          }
          
          // Create activity record
          const activity: UserActivity = {
            id: `activity_${i}_${j}`,
            userId: "user_1",
            languageId: languageId,
            activityType: activityType,
            itemId: itemId,
            completedAt: new Date(day.getTime() - Math.floor(Math.random() * 86400000 / 2)), // Random time during the day
            score: activityType === 'exercises' ? Math.floor(Math.random() * 100) : null
          };
          
          activities.push(activity);
        }
      }
      
      // Sort activities by completion date (most recent first)
      activities.sort((a, b) => b.completedAt.getTime() - a.completedAt.getTime());
      
      setUserActivities(activities);
    } catch (err) {
      console.error("Error fetching activity data:", err);
    }
  };

  // Handle language change
  const handleLanguageChange = (langId: string) => {
    setCurrentLanguage(langId);
  };
  
  // Get language name by ID
  const getLanguageName = (id: string) => {
    const language = languages.find(lang => lang.id === id);
    return language ? language.name : id;
  };
  
  // Format minutes to hours and minutes
  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}m`;
  };
  
  // Calculate time since last active
  const getTimeSinceLastActive = (lastActive: Date) => {
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - lastActive.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours === 1) return '1 hour ago';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return '1 day ago';
    return `${diffInDays} days ago`;
  };
  
  // Get friendly name for activity type
  const getActivityTypeName = (type: string) => {
    switch(type) {
      case 'dictionary': return 'Dictionary Search';
      case 'phrases': return 'Learned Phrases';
      case 'grammar': return 'Grammar Lesson';
      case 'exercises': return 'Completed Exercise';
      case 'flashcards': return 'Flashcard Practice';
      default: return type;
    }
  };
  
  // Calculate next level percentage
  const getNextLevelProgress = () => {
    if (!userProgress) return 0;
    
    switch(userProgress.level) {
      case 'beginner':
        return (userProgress.vocabularyProgress + userProgress.grammarProgress + userProgress.exerciseSuccess) / 3;
      case 'intermediate':
        return (userProgress.vocabularyProgress * 0.3 + userProgress.grammarProgress * 0.5 + userProgress.exerciseSuccess * 0.2);
      case 'advanced':
        return (userProgress.vocabularyProgress * 0.4 + userProgress.grammarProgress * 0.4 + userProgress.exerciseSuccess * 0.2);
      default:
        return 50;
    }
  };
  
  // Get next level name
  const getNextLevel = () => {
    if (!userProgress) return '';
    
    switch(userProgress.level) {
      case 'beginner': return 'Intermediate';
      case 'intermediate': return 'Advanced';
      case 'advanced': return 'Mastery';
      default: return 'Next Level';
    }
  };
  
  // Calculate daily activity hours for the last 7 days
  const getDailyActivityHours = () => {
    if (!userActivities.length) return Array(7).fill(0);
    
    const hours = Array(7).fill(0);
    const today = new Date();
    
    userActivities.forEach(activity => {
      const activityDate = new Date(activity.completedAt);
      const dayDiff = Math.floor((today.getTime() - activityDate.getTime()) / (1000 * 60 * 60 * 24));
      
      if (dayDiff >= 0 && dayDiff < 7) {
        // Assume each activity takes around 10-30 minutes
        hours[dayDiff] += (Math.random() * 0.33 + 0.17); // 0.17-0.5 hours (10-30 minutes)
      }
    });
    
    // Round to 1 decimal place
    return hours.map(h => Math.round(h * 10) / 10);
  };
  
  // Get weekday labels
  const getWeekdayLabels = () => {
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    const today = new Date().getDay();
    
    // Return days with today at the end
    return [...days.slice(today + 1), ...days.slice(0, today + 1)].reverse();
  };
  
  // Get personalized recommendations based on progress
  const getRecommendations = (): Recommendation[] => {
    if (!userProgress) return [];
    
    const recommendations: Recommendation[] = [];
    
    // Recommendation based on vocabulary progress
    if (userProgress.vocabularyProgress < 50) {
      recommendations.push({
        title: 'Improve Vocabulary',
        description: 'Practice with flashcards daily to build your vocabulary',
        action: 'Go to Flashcards',
        link: '#flashcards'
      });
    }
    
    // Recommendation based on grammar progress
    if (userProgress.grammarProgress < 50) {
      recommendations.push({
        title: 'Focus on Grammar',
        description: 'Complete more grammar lessons to strengthen your foundation',
        action: 'Study Grammar',
        link: '#grammar'
      });
    }
    
    // Recommendation for exercise success
    if (userProgress.exerciseSuccess < 70) {
      recommendations.push({
        title: 'Practice More Exercises',
        description: 'Regular exercise practice will improve your comprehension',
        action: 'Try Exercises',
        link: '#exercises'
      });
    }
    
    // Recommendation for streak
    if (userProgress.streak < 5) {
      recommendations.push({
        title: 'Build Your Streak',
        description: 'Practice daily to build a learning habit and improve faster',
        action: 'Daily Practice',
        link: '#exercises'
      });
    }
    
    // Return 2 random recommendations or fewer if not enough
    return recommendations.sort(() => 0.5 - Math.random()).slice(0, 2);
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
      
      {/* Language Selection */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Language</label>
        <select
          value={currentLanguage}
          onChange={(e) => handleLanguageChange(e.target.value)}
          className="w-full md:w-1/3 p-2 border rounded-md"
        >
          {languages.filter(lang => lang.id !== "lang_en").map(lang => (
            <option key={lang.id} value={lang.id}>{lang.name}</option>
          ))}
        </select>
      </div>
      
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="text-center">
            <div className="w-8 h-8 border-t-2 border-b-2 border-blue-500 rounded-full animate-spin mx-auto mb-2"></div>
            <p className="text-gray-600">Loading your progress...</p>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-red-600">{error}</p>
          <button 
            onClick={() => {
              setError(null);
              fetchUserProgress(currentLanguage);
              fetchUserActivities(currentLanguage);
            }}
            className="mt-2 px-4 py-2 bg-red-100 text-red-700 rounded-md hover:bg-red-200"
          >
            Try Again
          </button>
        </div>
      ) : userProgress ? (
        <>
          {/* Summary Stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Current Streak</h3>
                <span className="p-1.5 rounded-full bg-orange-100">
                  <span className="text-orange-600">🔥</span>
                </span>
              </div>
              <p className="mt-1 text-3xl font-semibold">{userProgress.streak} days</p>
              <p className="text-xs text-gray-500">Last active: {getTimeSinceLastActive(userProgress.lastActive)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Total Time Spent</h3>
                <span className="p-1.5 rounded-full bg-blue-100">
                  <span className="text-blue-600">⏱️</span>
                </span>
              </div>
              <p className="mt-1 text-3xl font-semibold">{formatTime(userProgress.totalTimeSpent)}</p>
              <p className="text-xs text-gray-500">Learning {getLanguageName(currentLanguage)}</p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Mastered Words</h3>
                <span className="p-1.5 rounded-full bg-green-100">
                  <span className="text-green-600">📚</span>
                </span>
              </div>
              <p className="mt-1 text-3xl font-semibold">{userProgress.masteredWords}</p>
              <p className="text-xs text-gray-500">
                {userProgress.totalWords ? `${Math.round((userProgress.masteredWords / userProgress.totalWords) * 100)}% of vocabulary` : 'Keep learning!'}
              </p>
            </div>
            
            <div className="bg-white p-4 rounded-lg shadow-sm border">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-gray-500">Current Level</h3>
                <span className="p-1.5 rounded-full bg-purple-100">
                  <span className="text-purple-600">🏆</span>
                </span>
              </div>
              <p className="mt-1 text-3xl font-semibold capitalize">{userProgress.level}</p>
              <div className="mt-1 h-1.5 w-full bg-gray-200 rounded-full">
                <div 
                  className="h-1.5 bg-purple-500 rounded-full" 
                  style={{ width: `${getNextLevelProgress()}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                {Math.round(getNextLevelProgress())}% to {getNextLevel()}
              </p>
            </div>
          </div>
          
          {/* Progress Bars */}
          <div className="grid gap-6 md:grid-cols-3 mb-8">
            <div className="p-4 bg-blue-50 rounded-lg">
              <h3 className="font-medium mb-2">Vocabulary Progress</h3>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-blue-500 rounded" style={{ width: `${userProgress.vocabularyProgress}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{userProgress.vocabularyProgress}% completed</p>
            </div>
            
            <div className="p-4 bg-green-50 rounded-lg">
              <h3 className="font-medium mb-2">Grammar Mastery</h3>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-green-500 rounded" style={{ width: `${userProgress.grammarProgress}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{userProgress.grammarProgress}% completed</p>
            </div>
            
            <div className="p-4 bg-purple-50 rounded-lg">
              <h3 className="font-medium mb-2">Exercise Success</h3>
              <div className="h-2 bg-gray-200 rounded">
                <div className="h-2 bg-purple-500 rounded" style={{ width: `${userProgress.exerciseSuccess}%` }}></div>
              </div>
              <p className="text-sm text-gray-600 mt-2">{userProgress.exerciseSuccess}% success rate</p>
            </div>
          </div>
          
          {/* Weekly Activity Chart */}
          <div className="bg-white p-6 rounded-lg shadow-sm border mb-8">
            <h3 className="font-medium mb-4">Weekly Activity</h3>
            <div className="h-48">
              <div className="flex h-full items-end space-x-2">
                {getDailyActivityHours().map((hours, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div 
                      className="w-full bg-blue-400 rounded-t"
                      style={{ height: `${Math.min((hours / 3) * 100, 100)}%` }}
                    ></div>
                    <span className="text-xs mt-1">{getWeekdayLabels()[index]}</span>
                    <span className="text-xs text-gray-500">{hours}h</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Two-Column Layout for Remaining Sections */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Skill Strength Chart */}
            <div className="bg-white p-6 rounded-lg shadow-sm border">
              <h3 className="font-medium mb-4">Skill Strength</h3>
              <div className="space-y-4">
                {Object.entries(userProgress.strengthByCategory).map(([category, strength]) => (
                  <div key={category} className="flex flex-col">
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-medium capitalize">{category}</span>
                      <span className="text-sm font-medium text-gray-500">{strength}%</span>
                    </div>
                    <div className="h-2 bg-gray-200 rounded">
                      <div 
                        className={`h-2 rounded ${
                          strength >= 70 ? 'bg-green-500' :
                          strength >= 50 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${strength}%` }}
                      ></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      {strength >= 70 ? 'Strong' :
                      strength >= 50 ? 'Good' :
                      'Needs practice'}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Recent Activity & Recommendations */}
            <div className="space-y-8">
              {/* Personalized Recommendations */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-4">Recommendations</h3>
                <div className="space-y-4">
                  {getRecommendations().map((rec, index) => (
                    <div key={index} className="p-3 bg-blue-50 rounded-md">
                      <h4 className="font-medium text-blue-700">{rec.title}</h4>
                      <p className="text-sm text-gray-600 mt-1">{rec.description}</p>
                      <a 
                        href={rec.link} 
                        className="inline-block mt-2 text-sm text-blue-600 hover:text-blue-800"
                      >
                        {rec.action} →
                      </a>
                    </div>
                  ))}
                  
                  {getRecommendations().length === 0 && (
                    <p className="text-gray-600">
                      Great job! You're making excellent progress with your learning.
                    </p>
                  )}
                </div>
              </div>
              
              {/* Recent Activity */}
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <h3 className="font-medium mb-4">Recent Activity</h3>
                <div className="space-y-4 max-h-64 overflow-y-auto">
                  {userActivities.slice(0, 5).map((activity, index) => (
                    <div key={index} className="flex items-start">
                      <div className="p-2 rounded-full bg-gray-100 mr-3">
                        <span>{
                          activity.activityType === 'dictionary' ? '📕' :
                          activity.activityType === 'phrases' ? '💬' :
                          activity.activityType === 'grammar' ? '📝' :
                          activity.activityType === 'exercises' ? '✏️' :
                          activity.activityType === 'flashcards' ? '🔤' : 
                          '📚'
                        }</span>
                      </div>
                      <div className="flex-1">
                        <p className="font-medium">{getActivityTypeName(activity.activityType)}</p>
                        <p className="text-sm text-gray-500">
                          {activity.score !== null ? `Score: ${activity.score}% • ` : ''}
                          {getTimeSinceLastActive(activity.completedAt)}
                        </p>
                      </div>
                    </div>
                  ))}
                  
                  {userActivities.length === 0 && (
                    <p className="text-gray-600">
                      No recent activity found. Start learning to see your progress!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="bg-yellow-50 p-4 rounded-lg">
          <p className="text-yellow-700">No progress data available. Start learning to track your progress!</p>
        </div>
      )}
    </div>
  );
};

export default Progress;