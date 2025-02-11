import React from 'react';

const Phrases = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Common Phrases</h2>
      <div className="space-y-4">
        <div className="flex gap-4">
          <select className="flex-1 p-2 border rounded-md">
            <option value="">Select a category</option>
            <option value="greetings">Greetings</option>
            <option value="travel">Travel</option>
            <option value="dining">Dining</option>
            <option value="emergency">Emergency</option>
          </select>
        </div>
        <div className="mt-4 space-y-3">
          <p className="text-gray-600">Select a category to see common phrases</p>
        </div>
      </div>
    </div>
  );
};

export default Phrases;