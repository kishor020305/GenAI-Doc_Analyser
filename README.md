# GenAI-Doc_Analyser

A ready-to-run full-stack web app that lets users upload PDFs or TXT files, then ask semantic questions about the uploaded documents.

## Features

- Upload PDF or TXT files
- Stores files in a backend (Flask/Python)
- Simple document analysis (can be extended with LLM/AI)
- Chat interface to ask questions about the uploaded document (React)
- Dockerized for easy local deployment

## Usage

### 1. Clone the repo

```sh
git clone https://github.com/YOUR_USERNAME/ai-docbot.git
cd ai-docbot
```

### 2. Build & Run (Docker Compose)

```sh
docker-compose up --build
```

- Frontend runs at: [http://localhost:3000](http://localhost:3000)
- Backend API runs at: [http://localhost:5000](http://localhost:5000)

### 3. Try It Out

- Open the app in your browser
- Upload a PDF or TXT file
- Ask questions about the document

## Development

- `backend/`: Flask backend
- `frontend/`: React frontend

### Tips

- Extend `backend/app.py` to use OpenAI or other LLMs for smarter answers.
- The React code is in `frontend/src/App.js`.

---
