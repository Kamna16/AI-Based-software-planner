import React, { useState } from 'react';

const UserInput = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    projectName: '',
    goals: '',
    complexity: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("form data", formData);
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="border text-White shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="projectName">
          Project Name
        </label>
        <input 
          name="projectName" 
          value={formData.projectName} 
          onChange={handleChange} 
          className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="goals">
          Project Goals
        </label>
        <textarea 
          name="goals" 
          value={formData.goals} 
          onChange={handleChange} 
          className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline" 
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-bold mb-2" htmlFor="complexity">
          Complexity Level
        </label>
        <select 
          name="complexity" 
          value={formData.complexity} 
          onChange={handleChange} 
          className="text-black shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Select Complexity</option> {/* Placeholder option */}
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" 
        type="submit"
      >
        Generate Roadmap
      </button>
    </form>
  );
};

export default UserInput;
