import React from 'react';

const Exercises = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Interactive Exercises</h2>
      <div className="grid gap-4 md:grid-cols-2">
        {[
          { title: 'Multiple Choice', desc: 'Test your knowledge with multiple choice questions' },
          { title: 'Fill in the Blanks', desc: 'Complete sentences with the correct words' },
          { title: 'Word Order', desc: 'Arrange words to form correct sentences' },
          { title: 'Listening Practice', desc: 'Listen and answer questions' }
        ].map((exercise) => (
          <div key={exercise.title} className="p-4 border rounded-lg hover:shadow-md transition-shadow">
            <h3 className="font-medium mb-2">{exercise.title}</h3>
            <p className="text-sm text-gray-600">{exercise.desc}</p>
            <button className="mt-4 text-blue-500 hover:text-blue-600">
              Start Exercise →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Exercises;