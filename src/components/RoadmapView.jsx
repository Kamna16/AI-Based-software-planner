import React from 'react';

const RoadmapView = ({ roadmap }) => {
  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md text-black">
      <h2 className="text-xl font-bold mb-4">Project Roadmap</h2>
      <ul>
        {roadmap.map((task, index) => (
          <li key={index} className="mb-2">{task}</li>
        ))}
      </ul>
    </div>
  );
};

export default RoadmapView;
