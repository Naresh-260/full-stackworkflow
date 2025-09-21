import React, { useState } from 'react';
import axios from 'axios';
import './Chat.css';

export default function Chat() {
  const [query, setQuery] = useState('');
  const [messages, setMessages] = useState([]);
  const [file, setFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const uploadFile = async () => {
    if (!file) return alert('📁 Please choose a PDF file first');
    
    setIsUploading(true);
    try {
      const form = new FormData();
      form.append('file', file);
      const res = await axios.post('http://localhost:8001/upload-doc', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      alert(`✅ ${res.data.message}`);
      setFile(null); // Clear file after successful upload
    } catch (err) {
      console.error(err);
      alert('❌ Upload failed. Please try again.');
    } finally {
      setIsUploading(false);
    }
  };

  const sendQuery = async () => {
    if (!query.trim()) return;
    
    const userMessage = { role: 'user', content: query };
    setMessages(prev => [...prev, userMessage]);
    setQuery('');
    setIsLoading(true);
    
    try {
      const res = await axios.post('http://localhost:8001/query', { query });
      const aiMessage = { role: 'ai', content: res.data.response };
      setMessages(prev => [...prev, aiMessage]);
    } catch (err) {
      console.error(err);
      const errorMessage = { role: 'ai', content: '❌ Error: Failed to query backend. Please try again.' };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendQuery();
    }
  };

  return (
    <div className="chat-container">
      <h3>Chat & Upload</h3>

      <div className="chat-upload">
        <div className="file-input-wrapper">
          <input 
            type="file" 
            accept="application/pdf" 
            onChange={e => setFile(e.target.files?.[0] ?? null)}
            id="file-input"
          />
          <label 
            htmlFor="file-input" 
            className={`file-input-label ${file ? 'file-selected' : ''}`}
          >
            {file ? `📄 ${file.name}` : '📁 Choose PDF file...'}
          </label>
        </div>
        <button 
          onClick={uploadFile} 
          className="upload-button"
          disabled={!file || isUploading}
        >
          {isUploading ? '🔄 Uploading...' : '🚀 Upload PDF'}
        </button>
      </div>

      <div className="chat-messages">
        {messages.length === 0 && (
          <div className="no-messages">
            <div>Start by uploading a PDF document</div>
            <div>Then ask questions about it!</div>
          </div>
        )}
        
        {messages.map((m, idx) => (
          <div key={idx} className={`chat-message ${m.role}`}>
            <div className="role">{m.role === 'user' ? '💬 You' : '🤖 AI Assistant'}</div>
            <div className="content">{m.content}</div>
          </div>
        ))}
        
        {isLoading && (
          <div className="typing-indicator">
            <span>AI is thinking</span>
            <div className="typing-dots">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>
        )}
      </div>

      <div className="chat-input">
        <input
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Ask a question about your document..."
          disabled={isLoading}
        />
        <button 
          onClick={sendQuery} 
          className="send-button"
          disabled={!query.trim() || isLoading}
        >
          {isLoading ? '⏳' : '🚀 Send'}
        </button>
      </div>
    </div>
  );
}
