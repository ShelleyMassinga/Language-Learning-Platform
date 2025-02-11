import React from 'react';

const Grammar = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Grammar Lessons</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {['Beginner', 'Intermediate', 'Advanced'].map((level) => (
          <div key={level} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">{level} Level</h3>
            <p className="text-sm text-gray-600">Grammar lessons for {level.toLowerCase()} learners</p>
            <button className="mt-4 text-blue-500 hover:text-blue-600">
              Start Learning →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Grammar;