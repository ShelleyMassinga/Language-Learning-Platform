import React from 'react';

const Progress = () => {
  return (
    <div className="p-6">
      <h2 className="text-xl font-semibold mb-4">Progress Tracking</h2>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="p-4 bg-blue-50 rounded-lg">
          <h3 className="font-medium mb-2">Vocabulary Progress</h3>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-blue-500 rounded" style={{ width: '60%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">60% completed</p>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <h3 className="font-medium mb-2">Grammar Mastery</h3>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-green-500 rounded" style={{ width: '45%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">45% completed</p>
        </div>
        <div className="p-4 bg-purple-50 rounded-lg">
          <h3 className="font-medium mb-2">Exercise Success</h3>
          <div className="h-2 bg-gray-200 rounded">
            <div className="h-2 bg-purple-500 rounded" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-600 mt-2">75% success rate</p>
        </div>
      </div>
    </div>
  );
};

export default Progress;