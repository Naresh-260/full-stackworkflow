import React from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import Canvas from './components/Canvas';
import Chat from './components/Chat';

export default function App() {
  return (
    <div className="app-container">
      <div className="app-content">
        <Sidebar />
        <Canvas />
        <Chat />
      </div>
    </div>
  );
}
