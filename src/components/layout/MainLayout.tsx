import React, { useState } from 'react';
import { Book, Globe, GraduationCap, Type, Layout, BarChart2, MessageSquare } from 'lucide-react';
import Dictionary from '../features/Dictionary';
import Grammar from '../features/Grammar';
import Exercises from '../features/Exercises';
import Phrases from '../features/Phrases';
import Flashcards from '../features/Flashcards';
import Progress from '../features/Progress';
import AIConversationPartner from '../features/AIConversationPartner';

interface Tab {
  id: string;
  label: string;
  icon: React.ElementType;
  component: React.ComponentType;
}

const tabs: Tab[] = [
  { id: 'dictionary', label: 'Dictionary', icon: Book, component: Dictionary },
  { id: 'phrases', label: 'Common Phrases', icon: Globe, component: Phrases },
  { id: 'grammar', label: 'Grammar', icon: Type, component: Grammar },
  { id: 'exercises', label: 'Exercises', icon: GraduationCap, component: Exercises },
  { id: 'flashcards', label: 'Flashcards', icon: Layout, component: Flashcards },
  { id: 'progress', label: 'Progress', icon: BarChart2, component: Progress },
  { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, component: AIConversationPartner }
];

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<string>('dictionary');

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dictionary;

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">Language Learning Platform</h1>
          </div>
        </div>
      </header>

      <nav className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    flex items-center px-3 py-4 text-sm font-medium border-b-2 whitespace-nowrap
                    ${activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }
                  `}
                >
                  <Icon className="h-5 w-5 mr-2" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;