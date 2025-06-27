from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
import uuid

app = Flask(__name__)
CORS(app)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Simulate document storage and analysis results
DOCUMENTS = {}

def analyze_document(file_path, file_type):
    # Placeholder for semantic analysis, LLM embedding, etc.
    # For now, just read text
    if file_type == 'pdf':
        import PyPDF2
        with open(file_path, 'rb') as f:
            reader = PyPDF2.PdfReader(f)
            text = "\n".join(page.extract_text() for page in reader.pages if page.extract_text())
    elif file_type == 'txt':
        with open(file_path, 'r', encoding='utf-8', errors='ignore') as f:
            text = f.read()
    else:
        text = ""
    DOCUMENTS[file_path] = text
    return True

@app.route('/api/upload', methods=['POST'])
def upload_file():
    file = request.files['file']
    if file:
        ext = file.filename.split('.')[-1].lower()
        if ext not in ['pdf', 'txt']:
            return jsonify({'error': 'Invalid file type'}), 400
        filename = f"{uuid.uuid4()}.{ext}"
        file_path = os.path.join(UPLOAD_FOLDER, filename)
        file.save(file_path)
        analyze_document(file_path, ext)
        return jsonify({'doc_id': filename})
    return jsonify({'error': 'No file provided'}), 400

@app.route('/api/ask', methods=['POST'])
def ask_question():
    data = request.json
    doc_id = data.get('doc_id')
    question = data.get('question')
    file_path = os.path.join(UPLOAD_FOLDER, doc_id)
    # For demo, just echo context and question
    context = DOCUMENTS.get(file_path, "")
    # Here you can add OpenAI/LLM logic, e.g., call GPT-3/4 with context+question
    # For now, just naive answer:
    answer = f"(DEMO) You asked: '{question}'. Document starts with: {context[:200]}"
    return jsonify({'answer': answer})

@app.route('/uploads/<path:filename>')
def download_file(filename):
    return send_from_directory(UPLOAD_FOLDER, filename)
    
if __name__ == '__main__':
    app.run(debug=True)