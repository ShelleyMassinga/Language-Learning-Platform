import React from 'react';

const Dictionary = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Dictionary & Translations</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Enter a word to translate..."
            className="flex-1 p-2 border rounded-md"
          />
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
            Translate
          </button>
        </div>
        <div className="mt-8">
          <p className="text-gray-600">Translation results will appear here</p>
        </div>
      </div>
    </div>
  );
};

export default Dictionary;