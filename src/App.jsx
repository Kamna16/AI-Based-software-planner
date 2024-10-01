import React, { useState } from 'react';
import UserInput from './components/UserInput';
import RoadmapView from './components/RoadmapView';

const App = () => {
  const [roadmap, setRoadmap] = useState([]);

  const handleFormSubmit = async (formData) => {
    // Call the backend to generate the roadmap
    const response = await fetch('http://localhost:5000/api/generate-roadmap', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });
    const data = await response.json();
    setRoadmap(data.roadmap);
  };

  return (
    <div className="container mx-auto p-4">
      <UserInput onSubmit={handleFormSubmit} />
      {roadmap.length > 0 && <RoadmapView roadmap={roadmap} />}
    </div>
  );
};

export default App;
