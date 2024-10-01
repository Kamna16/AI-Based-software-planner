const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  name: String,
  goals: String,
  complexity: String,
  roadmap: [String],
});

const Project = mongoose.model('Project', ProjectSchema);
