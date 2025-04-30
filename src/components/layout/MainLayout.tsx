import React, { useState } from 'react';
import { Book, Globe, GraduationCap, Type, Layout, BarChart2, MessageSquare, LogOut } from 'lucide-react';
import Dictionary from '../features/Dictionary';
import Grammar from '../features/Grammar';
import Exercises from '../features/Exercises';
import Phrases from '../features/Phrases';
import Flashcards from '../features/Flashcards';
import Progress from '../features/Progress';
import AIConversationPartner from '../features/AIConversationPartner';
import { useRouter } from 'next/navigation';

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
  { id: 'ai-chat', label: 'AI Chat', icon: MessageSquare, component: AIConversationPartner },
  { id: 'progress', label: 'Progress', icon: BarChart2, component: Progress }
];

const MainLayout = () => {
  const [activeTab, setActiveTab] = useState<string>('dictionary');
  const router = useRouter();

  const ActiveComponent = tabs.find(tab => tab.id === activeTab)?.component || Dictionary;

  const handleLogout = () => {
    // Add logout logic here
    router.push('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="bg-white dark:bg-gray-800 shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-2xl font-bold gradient-text">Language Learning Platform</h1>
            <button 
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 text-gray-700 hover:text-gray-900 hover:bg-gray-100 rounded-md transition-colors"
            >
              <LogOut className="h-5 w-5" />
              <span>Logout</span>
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Navigation */}
      <nav className="hidden md:block bg-white dark:bg-gray-800 shadow-md">
        <div className="mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-4 overflow-x-auto py-4">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    nav-item
                    ${isActive ? 'nav-item-active' : 'nav-item-inactive'}
                    transform transition-all duration-300 hover:scale-105
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

      {/* Mobile Navigation */}
      <nav className="md:hidden mobile-nav">
        <div className="grid grid-cols-4 gap-1 p-2">
          {tabs.slice(0, 4).map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  mobile-nav-item
                  ${isActive ? 'text-primary' : 'text-gray-500'}
                `}
              >
                <Icon className="h-6 w-6 mx-auto mb-1" />
                <span className="text-xs">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </nav>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="card card-hover-effect">
          <ActiveComponent />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;