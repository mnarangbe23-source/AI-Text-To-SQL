# 🤖 AI Text-to-SQL Generator

An AI-powered Text-to-SQL application that converts natural language questions into SQL queries using Large Language Models (LLMs).

This project allows users to interact with databases using simple English commands instead of manually writing SQL queries.

The system uses **Ollama Llama 3.2**, **FastAPI**, **MySQL**, and a responsive frontend interface to generate, validate, execute, and display SQL results securely.

---

# 📌 Project Overview

Writing SQL queries requires database knowledge and understanding of SQL syntax.

This project solves this problem by allowing users to ask database questions in natural language.

The AI converts user questions into SQL queries, executes them on the database, and displays the results in an interactive web interface.

### Example:

User Input:


Show all artists


AI Generated SQL:

```sql
SELECT name FROM artist;

Output:

Displays all artist records from the database.

🚀 Features
🤖 AI Based SQL Generation
Converts English language questions into SQL queries.
Uses Llama 3.2 model through Ollama.
Understands database schema and generates relevant queries.
🔐 SQL Safety Layer

Implemented SQL validation to improve database security.

Features:

Allows only SELECT queries.
Blocks dangerous commands:
DELETE
DROP
UPDATE
INSERT
ALTER

Example:

Blocked Query:

DELETE FROM customer;

Allowed Query:

SELECT * FROM customer;
🌐 Application Features
Frontend

Developed using:

HTML5
CSS3
JavaScript

Features:

Modern responsive UI
Dark mode
Loading animation
SQL copy button
Query history
CSV download option
Backend

Developed using:

Python
FastAPI

Features:

REST API integration
AI model communication
Database query execution
Error handling
🏗️ System Architecture

User

↓

Natural Language Question

↓

Frontend Interface

↓

FastAPI Backend

↓

Ollama Llama 3.2 AI Model

↓

Generated SQL Query

↓

SQL Safety Validation

↓

Database Execution

↓

Results Display

🛠️ Technologies Used
Technology	Purpose
Python	Backend Development
FastAPI	API Development
Ollama	Local LLM Integration
Llama 3.2	SQL Generation Model
MySQL	Database
HTML	Frontend Structure
CSS	UI Design
JavaScript	Frontend Logic
GitHub	Version Control
📂 Project Structure
AI-Text-To-SQL

│
├── Backend
│   ├── main.py
│   ├── ai_model.py
│   └── database.py
│
├── Frontend
│   ├── index.html
│   ├── style.css
│   └── script.js
│
├── requirements.txt
│
└── README.md

⚙️ Installation & Setup
1. Clone Repository
git clone https://github.com/mnarangbe23-source/AI-Text-To-SQL.git
2. Install Python Dependencies
pip install -r requirements.txt
3. Install Ollama Model

Download Llama model:

ollama pull llama3.2:3b
4. Run Backend Server
uvicorn main:app --reload

Backend will run on:

http://127.0.0.1:8000
5. Open Frontend

Open:

index.html

in your browser.

🧪 Sample Queries

Try these questions:

Show all artists
Show all albums
Show all customers
Show all tracks
Show all genres
📊 Output Features

The application displays:

✅ Generated SQL Query
✅ Database Results
✅ Total Records
✅ Execution Time
✅ Query History

Users can also:

Copy SQL query
Download results as CSV
Switch between light and dark mode
🔒 Security Implementation

The project includes an SQL safety layer.

Before execution, every AI-generated query is checked.

Only safe read operations are allowed.

This prevents accidental database modification.

🔮 Future Improvements

Future upgrades:

Support multiple databases
Deploy on cloud platforms
Add authentication system
Voice-to-SQL support
AI generated SQL explanations
Automatic database schema detection
🎯 Skills Demonstrated

This project demonstrates:

Generative AI Application Development
Large Language Model Integration
Natural Language Processing
Backend API Development
Database Management
Full Stack Development
AI Safety Implementation
👨‍💻 Author

Mohit Narang

B.Tech Engineering Student

GitHub:

https://github.com/mnarangbe23-source