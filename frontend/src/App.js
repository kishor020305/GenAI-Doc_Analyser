import React, { useState } from 'react';

const API_URL = process.env.NODE_ENV === "production" ? "/api" : "http://localhost:5000/api";

function App() {
  const [docId, setDocId] = useState('');
  const [uploading, setUploading] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [uploaded, setUploaded] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);
    const res = await fetch(`${API_URL}/upload`, {
      method: 'POST',
      body: formData,
    });
    const data = await res.json();
    if (data.doc_id) {
      setDocId(data.doc_id);
      setUploaded(true);
    }
    setUploading(false);
  };

  const handleAsk = async () => {
    if (!question || !docId) return;
    setAnswer('Thinking...');
    const res = await fetch(`${API_URL}/ask`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ doc_id: docId, question }),
    });
    const data = await res.json();
    setAnswer(data.answer);
  };

  return (
    <div style={{
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      marginTop: 50,
    }}>
      <div style={{
        background: '#eef2fa',
        borderRadius: 10,
        padding: 30,
        width: 400,
        boxShadow: '0 2px 8px #bcd',
      }}>
        <h2 style={{textAlign:'center'}}>🤖 AI DocBot</h2>
        <input type="file" accept=".pdf,.txt" onChange={handleFileChange} disabled={uploading} />
        {uploading && <p>Uploading...</p>}
        {uploaded && (
        <>
          <div style={{margin: '20px 0'}}>
            <input
              type="text"
              placeholder="Type your question about the document..."
              value={question}
              onChange={e => setQuestion(e.target.value)}
              style={{
                width: '100%',
                padding: 10,
                borderRadius: 5,
                border: '1px solid #ccc'
              }}
            />
            <button
              onClick={handleAsk}
              style={{
                marginTop:10,
                width:'100%',
                padding:10,
                background: '#4a90e2',
                color: '#fff',
                border: 'none',
                borderRadius: 5,
                cursor: 'pointer'
              }}
            >Ask</button>
          </div>
          <div style={{
            minHeight: 50,
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: 5,
            padding: 10,
          }}>{answer}</div>
        </>
        )}
      </div>
    </div>
  );
}

export default App;
