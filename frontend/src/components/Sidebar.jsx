import React from 'react';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar-container">
      <h3 className="sidebar-title">Workflow Components</h3>
      <ul className="components-list">
        <li className="component-item">📝 User Query</li>
        <li className="component-item">📚 Knowledge Base</li>
        <li className="component-item">🤖 LLM Engine</li>
        <li className="component-item">💬 Chat Output</li>
      </ul>
      <div className="sidebar-description">
        <strong>Interactive Workflow</strong>
        The canvas visualizes the data flow from user input through knowledge retrieval to AI-powered responses. Upload PDFs and chat with your documents!
      </div>
    </div>
  );
}
