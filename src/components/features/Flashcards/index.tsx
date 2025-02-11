import React from 'react';

const Flashcards = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Flashcards</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <select className="flex-1 p-2 border rounded-md">
            <option value="">Select a deck</option>
            <option value="basic">Basic Vocabulary</option>
            <option value="intermediate">Intermediate Words</option>
            <option value="advanced">Advanced Terms</option>
          </select>
        </div>
        <div className="aspect-[3/2] max-w-md mx-auto mt-8 bg-white rounded-xl shadow-lg flex items-center justify-center border">
          <p className="text-gray-600">Select a deck to start practicing</p>
        </div>
      </div>
    </div>
  );
};

export default Flashcards;