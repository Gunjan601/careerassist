import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios'; // Updated import
import Groq from 'groq-sdk';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());



// Basic route
app.get('/', (req, res) => {
  res.send('AI-Powered Career Booster Backend is running!');
});

// Parse Resume (Regex-Based)
app.post('/parse-resume', (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  // Regex to extract fields
  const nameRegex = /([A-Z][a-z]+)\s+([A-Z][a-z]+)/; // Simple name extraction
  const emailRegex = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/;
  const phoneRegex = /(\+\d{1,2}\s?)?(\d{3}[-.\s]?\d{3}[-.\s]?\d{4})/;
  const skillsRegex = /(?:skills|technologies):\s*([\w\s,]+)/i;

  const name = resumeText.match(nameRegex)?.[0] || 'Not found';
  const email = resumeText.match(emailRegex)?.[0] || 'Not found';
  const phone = resumeText.match(phoneRegex)?.[0] || 'Not found';
  const skills = resumeText.match(skillsRegex)?.[1]?.split(',').map(skill => skill.trim()) || [];

  res.json({ name, email, phone, skills });
});

//enhance resume

// Initialize Groq Client
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Enhance Resume Endpoint
app.post('/enhance-resume', async (req, res) => {
  const { resumeText } = req.body;

  if (!resumeText) {
    return res.status(400).json({ error: 'Resume text is required' });
  }

  try {
    const chatCompletion = await groq.chat.completions.create({
      messages: [
        { role: 'system', content: 'You are a professional resume writer.' },
        { role: 'user', content: `Rewrite the following resume section to make it more professional, concise, and impactful:\n${resumeText}` },
      ],
      model: 'llama-3.3-70b-versatile', // Use the appropriate Groq model
      temperature: 0.7, // Adjust for creativity
      max_tokens: 500, // Limit response length
    });

    const enhancedText = chatCompletion.choices[0]?.message?.content || 'Failed to enhance resume';
    res.json({ enhancedText });
  } catch (error) {
    console.error('Groq API Error:', error);
    res.status(500).json({ error: 'Failed to enhance resume', details: error.message });
  }
});



// Match Resume with Job Description
app.post('/match-jd', async (req, res) => {
  const { resumeText, jobDescription } = req.body;

  if (!resumeText || !jobDescription) {
    return res.status(400).json({ error: 'Resume text and job description are required in the request body.' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions', // Groq API endpoint
      {
        model: 'llama-3.3-70b-versatile', // Use the Llama model
        messages: [
          { role: 'system', content: 'You are a helpful assistant that compares resumes with job descriptions and identifies skill gaps.' },
          { role: 'user', content: `Compare this resume with the job description and identify skill gaps:\nResume:\n${resumeText}\nJob Description:\n${jobDescription}` },
        ],
        max_tokens: 500, // Adjust as needed
        temperature: 0.7, // Adjust for creativity
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Ensure GROQ_API_KEY is set in .env
          'Content-Type': 'application/json',
        },
      }
    );

    // Validate the response structure
    if (!response.data.choices || !response.data.choices[0] || !response.data.choices[0].message) {
      throw new Error('Invalid response structure from Groq API.');
    }

    const analysis = response.data.choices[0].message.content;
    res.json({ analysis });
  } catch (error) {
    console.error('Error analyzing resume:', error);

    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Groq API Response Error:', error.response.data);
      res.status(error.response.status).json({
        error: 'Failed to analyze resume using Groq API',
        details: error.response.data,
      });
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received from Groq API');
      res.status(500).json({
        error: 'No response received from Groq API',
        details: error.message,
      });
    } else {
      // Something happened in setting up the request that triggered an Error
      console.error('Error setting up the request to Groq API:', error.message);
      res.status(500).json({
        error: 'Error setting up the request to Groq API',
        details: error.message,
      });
    }
  }
});

// Generate Interview Questions

// Generate Interview Questions using Groq API (LLaMA-3.3-70B)
app.post('/generate-questions', async (req, res) => {
  const { role } = req.body;

  if (!role) {
    return res.status(400).json({ error: 'Role is required' });
  }

  try {
    const response = await axios.post(
      'https://api.groq.com/openai/v1/chat/completions', // Groq endpoint
      {
        model: 'llama-3.3-70b-versatile', // Updated model name
        messages: [
          { role: 'system', content: 'You are a helpful assistant that generates interview questions.' },
          { role: 'user', content: `Generate 10 interview questions for the role of ${role}.` },
        ],
        max_tokens: 500,
        temperature: 0.7, // Adjust as needed for more/less creative output
      },
      {
        headers: {
          'Authorization': `Bearer ${process.env.GROQ_API_KEY}`, // Ensure GROQ_API_KEY is set in .env
          'Content-Type': 'application/json',
        },
      }
    );

    const questions = response.data.choices[0].message.content;
    res.json({ questions });
  } catch (error) {
    console.error('Error generating questions:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to generate questions using Groq API' });
  }
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});