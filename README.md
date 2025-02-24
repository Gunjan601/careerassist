**AI-Powered Career Assistant**

A smart career assistant that helps users enhance their resumes, match them with job descriptions, and prepare for interviews using AI. This tool is built with features like resume parsing, resume enhancement, job description matching, and generating interview questions.

Features
Resume Parsing: Extract key information from resumes to analyze skills, experience, education, and other important sections.
Enhance Resume: Suggest improvements to make resumes more impactful, including keyword optimization and formatting tips.
Match Job Description: Compare resumes with job descriptions and highlight matching skills, qualifications, and experience.
Interview Preparation: Based on the job description, generate relevant interview questions to help candidates prepare effectively.
Technologies Used
Frontend: React
Backend: Node.js, Express
API: Groq API (for resume enhancement and job matching)
AI/ML Models: For parsing resumes, skill extraction, and interview question generation.
Installation
To run the project locally, follow these steps:

Clone the repository:

git clone https://github.com/yourusername/ai-career-assistant.git

Navigate to the project directory:

cd ai-career-assistant

Install the necessary dependencies for both frontend and backend:

# Frontend
cd frontend

npm install

# Backend
cd ../backend

npm install

Set up the environment variables (e.g., API keys for Groq, etc.). Create a .env file and add the following:


GROQ_API_KEY=your_api_key_here

Run the backend:

cd backend
npm start

Run the frontend:

cd frontend
npm start

Now, open your browser and go to http://localhost:5000 to interact with the app.

Usage
Resume Parsing: Upload a resume in PDF or Word format, and the assistant will parse it and extract the key details.

Enhance Resume: After parsing the resume, the assistant will provide suggestions to improve its content.

Job Description Matching: Paste a job description, and the assistant will compare it with the parsed resume, highlighting the match and suggesting improvements.

Interview Prep: Based on the job description, the assistant will generate a set of possible interview questions tailored to the role.

Contributing
Feel free to fork the repository and contribute by submitting issues or pull requests. We welcome contributions, whether it's bug fixes, enhancements, or new features.

License
This project is licensed under the MIT License - see the LICENSE file for details.


