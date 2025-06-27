# GenAI-Doc_Analyser

A ready-to-run full-stack web app that lets users upload PDFs or TXT files, then ask semantic/logical questions about the document.

---

## 🌟 Features

- **Upload PDFs or TXT files** (document ingestion)
- **Backend storage** (Flask/Python)
- **Document analysis** (basic demo; easily extensible to LLMs/OpenAI)
- **Chat interface** to ask questions about the uploaded document (React)
- **Dockerized** for easy local or cloud deployment

---

## 🏗️ Architecture & Reasoning Flow

### Overview

```
User
 │
 ▼
React Frontend (file upload, chat UI)
 │
 ▼
Flask Backend (Python)
 │
 ▼
Document Storage (uploads folder & memory)
 │
 ▼
Document Analysis (extract text, [optional: LLM/AI])
```

### Reasoning Flow

1. **Document Upload**
   - User uploads a PDF or TXT file via the React frontend.
   - File is sent to the Flask backend via HTTP POST `/api/upload`.
   - Backend saves the file and extracts all text.
   - (All extracted text is kept in memory for fast question answering.)

2. **Analysis & Chat**
   - User types a question about the document.
   - Frontend sends the question and doc_id to `/api/ask`.
   - Backend retrieves the document text and (currently) generates a demo answer:
     - *(For real AI: Plug in OpenAI API, Llama.cpp, etc. for semantic answers!)*
   - The answer is sent back and displayed in the chat UI.

3. **Extensibility**
   - Swap the simple extract/echo logic for LLM-based answers (OpenAI, Gemini, etc.).
   - Store documents in a database if desired.

---

## 🚀 Setup & Running Locally (with Docker)

### 1. Clone the repo

```sh
git clone https://github.com/YOUR_USERNAME/genai-doc_analyser.git
cd ai-docbot
```

### 2. Build & Run Everything (Docker Compose)

```sh
docker-compose up --build
```

- **Frontend:** [http://localhost:3000](http://localhost:3000)
- **Backend API:** [http://localhost:5000](http://localhost:5000)

### 3. Try It Out

- Open the app in your browser
- Upload a PDF or TXT file
- Ask questions about the document!

---

## 🛠️ Development

- **Backend:** `backend/` (Flask)
- **Frontend:** `frontend/` (React)
- **To add AI/LLM:** Replace logic in `backend/app.py` in `/api/ask` route

### Run Backend Locally (without Docker)

```sh
cd backend
pip install -r requirements.txt
python app.py  # Or: gunicorn app:app
```

### Run Frontend Locally (without Docker)

```sh
cd frontend
npm install
npm start
```

---

## ☁️ Deploying on Render.com

**Backend:** Create a Web Service from `/backend`  
**Frontend:** Create a Static Site from `/frontend`  
**Update API URL** in `frontend/src/App.js` to point to your backend Render URL.

---

## 📦 File Structure

```
ai-docbot/
├── backend/
│   ├── app.py
│   ├── requirements.txt
├── frontend/
│   ├── Dockerfile
│   └── [React app files, e.g. src/App.js]
├── docker-compose.yml
└── README.md
```

---

## ⚡ Extending

- Replace demo answer with OpenAI, Gemini, or other LLM integrations for real semantic Q&A.
- Add document search, database storage, multi-user support, etc.

---
