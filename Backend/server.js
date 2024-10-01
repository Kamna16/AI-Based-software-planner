import express from 'express';
import http from 'http';
import { Server } from 'socket.io';
import cors from 'cors';
import mongoose from 'mongoose';
import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 5000;
const server = http.createServer(app);

const client = new OpenAI({
  apiKey: process.env.API_KEY,
});

mongoose.connect('mongodb://localhost:27017/planner')
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.log(err));

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
});

app.use(cors());
app.use(express.json());

app.post('/api/generate-roadmap', async (req, res) => {
  const { goals, complexity } = req.body;
  const roadmap = await generateRoadmapFromAI(goals, complexity);
  res.json({ roadmap });
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('updateRoadmap', (roadmap) => {
    io.emit('roadmapUpdated', roadmap);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const generateRoadmapFromAI = async (goals, complexity) => {
  try {
    const chatCompletion = await client.chat.completions.create({
      messages: [{ role: 'user', content: `Generate a detailed roadmap for a project with the following goals: ${goals}. The complexity level is ${complexity}. Include key milestones and timelines.` }],
      model: 'gpt-3.5-turbo', 
    });

    console.log("Response from GPT: ", chatCompletion.choices[0].message.content);
    return chatCompletion.choices[0].message.content;
  } catch (error) {
    console.error(error);
    return ['Error generating roadmap']; 
  }
};

server.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
