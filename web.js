// src/components/CareerBooster.jsx
import React, { useState } from "react";
import axios from "axios";

const containerStyle = {
maxWidth: "700px",
margin: "auto",
padding: "30px",
fontFamily: "Arial, sans-serif",
backgroundColor: "#000", // Black background
color: "#fff", // White text
borderRadius: "10px",
boxShadow: "0px 4px 8px rgba(255, 255, 255, 0.1)", // Light shadow for contrast
textAlign: "center",
};

const textareaStyle = {
width: "100%",
height: "120px",
marginBottom: "10px",
padding: "10px",
borderRadius: "5px",
border: "1px solid #ccc",
fontSize: "16px",
backgroundColor: "#222", // Dark textarea background
color: "#fff", // White text
};

const buttonStyle = {
padding: "10px 20px",
backgroundColor: "#800080", // Purple buttons
color: "white",
border: "none",
borderRadius: "5px",
cursor: "pointer",
fontSize: "16px",
margin: "10px",
transition: "background-color 0.3s ease",
};

const buttonHoverStyle = {
backgroundColor: "#4B0082", // Darker purple on hover
};

const resultContainerStyle = {
marginTop: "20px",
padding: "20px",
backgroundColor: "#111", // Dark result container
borderRadius: "8px",
boxShadow: "0px 2px 6px rgba(255, 255, 255, 0.1)",
textAlign: "left",
};

const resultItemStyle = {
marginBottom: "20px",
};

const resultTitleStyle = {
fontSize: "18px",
fontWeight: "bold",
color: "#fff", // White text
marginBottom: "10px",
};

const resultContentStyle = {
fontSize: "16px",
color: "#ddd", // Light gray text
whiteSpace: "pre-wrap", // Preserve line breaks
backgroundColor: "#222", // Dark background for text
padding: "10px",
borderRadius: "5px",
border: "1px solid #444",
};

const CareerBooster = () => {
const [resume, setResume] = useState("");
const [jobDescription, setJobDescription] = useState("");
const [role, setRole] = useState("");
const [results, setResults] = useState({});
const [loading, setLoading] = useState(false);

const handleRequest = async (endpoint, requestBody) => {
setLoading(true);
try {
const response = await axios.post(http://localhost:5000${endpoint}, requestBody);
setResults((prev) => ({ ...prev, [endpoint]: response.data }));
} catch (error) {
setResults((prev) => ({ ...prev, [endpoint]: { error: "Request failed. Please try again." } }));
}
setLoading(false);
};

// Function to format the response into multiple lines
const formatResponse = (response) => {
if (typeof response === "object") {
return Object.entries(response).map(([key, value]) => (
<div key={key}>
<strong>{key}:</strong> {formatResponse(value)}
</div>
));
} else if (typeof response === "string") {
return response.split("\n").map((line, index) => (
<p key={index} style={{ margin: "5px 0" }}>
{line}
</p>
));
}
return response;
};

const renderResults = () => {
return Object.entries(results).map(([key, value]) => {
const title = key.replace("/", "").replace("-", " ").toUpperCase();
return (
<div key={key} style={resultItemStyle}>
<h3 style={resultTitleStyle}>{title}</h3>
<div style={resultContentStyle}>
{value.error ? (
<p style={{ color: "red" }}>{value.error}</p>
) : (
formatResponse(value) // Format the response into multiple lines
)}
</div>
</div>
);
});
};

return (
<div style={containerStyle}>
<h2 style={{ color: "#fff" }}>🚀 AI-Powered Career Booster</h2>
<p style={{ color: "#ccc" }}>Parse, enhance, match, and generate interview questions for your career boost.</p>

<textarea
style={textareaStyle}
placeholder="Paste your resume here..."
value={resume}
onChange={(e) => setResume(e.target.value)}
/>
<textarea
style={textareaStyle}
placeholder="Paste job description here..."
value={jobDescription}
onChange={(e) => setJobDescription(e.target.value)}
/>
<input
type="text"
style={{ ...textareaStyle, height: "40px" }}
placeholder="Enter role for interview questions..."
value={role}
onChange={(e) => setRole(e.target.value)}
/>

<div>
<button
style={buttonStyle}
onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
onClick={() => handleRequest("/parse-resume", { resumeText: resume })}
disabled={loading}
>
Parse Resume
</button>
<button
style={buttonStyle}
onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
onClick={() => handleRequest("/enhance-resume", { resumeText: resume })}
disabled={loading}
>
Enhance Resume
</button>
<button
style={buttonStyle}
onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
onClick={() => handleRequest("/match-jd", { resumeText: resume, jobDescription })}
disabled={loading}
>
Match JD
</button>
<button
style={buttonStyle}
onMouseEnter={(e) => (e.target.style.backgroundColor = buttonHoverStyle.backgroundColor)}
onMouseLeave={(e) => (e.target.style.backgroundColor = buttonStyle.backgroundColor)}
onClick={() => handleRequest("/generate-questions", { role })}
disabled={loading}
>
Generate Questions
</button>
</div>

<div style={resultContainerStyle}>
{loading ? <p>Loading...</p> : renderResults()}
</div>
</div>
);
};

export default CareerBooster;
