import React from 'react';
import { useRouter } from 'next/navigation';
import { Book, Globe, GraduationCap, MessageSquare, Brain, Trophy } from 'lucide-react';

const LandingPage: React.FC = () => {
  const router = useRouter();

  const features = [
    {
      icon: Book,
      title: 'Interactive Dictionary',
      description: 'Search and learn words with pronunciation and examples in multiple languages.'
    },
    {
      icon: Globe,
      title: 'Common Phrases',
      description: 'Master essential phrases and expressions used in everyday conversations.'
    },
    {
      icon: GraduationCap,
      title: 'Grammar Lessons',
      description: 'Learn grammar rules and structures with clear explanations and examples.'
    },
    {
      icon: MessageSquare,
      title: 'AI Conversation Partner',
      description: 'Practice speaking with our AI-powered conversation partner.'
    },
    {
      icon: Brain,
      title: 'Smart Flashcards',
      description: 'Review and memorize vocabulary with our spaced repetition system.'
    },
    {
      icon: Trophy,
      title: 'Track Progress',
      description: 'Monitor your learning journey with detailed progress tracking.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto">
          <div className="relative z-10 pb-8 sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32">
            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
              <div className="sm:text-center lg:text-left">
                <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                  <span className="block">Learn Languages</span>
                  <span className="block text-teal-600">with Confidence</span>
                </h1>
                <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                  Master new languages through interactive lessons, AI-powered conversations, and personalized learning tools. Start your language journey today!
                </p>
                <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                  <div className="rounded-md shadow">
                    <button
                      onClick={() => router.push('/signup')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gradient-to-r from-teal-600 to-purple-600 hover:from-teal-700 hover:to-purple-700 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Get Started
                    </button>
                  </div>
                  <div className="mt-3 sm:mt-0 sm:ml-3">
                    <button
                      onClick={() => router.push('/login')}
                      className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-teal-50 hover:bg-teal-100 md:py-4 md:text-lg md:px-10 transition-all duration-300"
                    >
                      Sign In
                    </button>
                  </div>
                </div>
              </div>
            </main>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:text-center">
            <h2 className="text-base text-teal-600 font-semibold tracking-wide uppercase">Features</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              Everything you need to learn a new language
            </p>
            <p className="mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto">
              Our platform combines modern technology with proven learning methods to help you achieve fluency faster.
            </p>
          </div>

          <div className="mt-10">
            <div className="space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10">
              {features.map((feature, index) => {
                const Icon = feature.icon;
                return (
                  <div key={index} className="relative">
                    <div className="absolute flex items-center justify-center h-12 w-12 rounded-md bg-teal-50 text-teal-600">
                      <Icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <div className="ml-16">
                      <h3 className="text-lg leading-6 font-medium text-gray-900">{feature.title}</h3>
                      <p className="mt-2 text-base text-gray-500">{feature.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-r from-teal-600 to-purple-600">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to start learning?</span>
            <span className="block text-teal-200">Join our community today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <button
                onClick={() => router.push('/signup')}
                className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-teal-600 bg-white hover:bg-teal-50 transition-all duration-300"
              >
                Get started
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingPage; 