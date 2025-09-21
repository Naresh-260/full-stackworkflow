import React from 'react';
import { ReactFlow, Background, Controls } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import './Canvas.css';

const initialNodes = [
  { 
    id: '1', 
    type: 'input', 
    data: { label: '📝 User Query' }, 
    position: { x: 50, y: 50 },
    className: 'workflow-node node-user'
  },
  { 
    id: '2', 
    data: { label: '📚 Knowledge Base' }, 
    position: { x: 300, y: 150 },
    className: 'workflow-node node-knowledge'
  },
  { 
    id: '3', 
    data: { label: '🤖 LLM Engine' }, 
    position: { x: 550, y: 250 },
    className: 'workflow-node node-llm'
  },
  { 
    id: '4', 
    type: 'output', 
    data: { label: '💬 Chat Output' }, 
    position: { x: 800, y: 350 },
    className: 'workflow-node node-output'
  }
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', animated: true, style: { stroke: '#6366f1', strokeWidth: 3 } },
  { id: 'e2-3', source: '2', target: '3', animated: true, style: { stroke: '#06b6d4', strokeWidth: 3 } },
  { id: 'e3-4', source: '3', target: '4', animated: true, style: { stroke: '#10b981', strokeWidth: 3 } }
];

export default function Canvas() {
  return (
    <div className="canvas-container">
      <ReactFlow 
        nodes={initialNodes} 
        edges={initialEdges} 
        fitView
        attributionPosition="bottom-left"
      >
        <Background variant="dots" gap={20} size={1} color="#e2e8f0" />
        <Controls showInteractive={false} />
      </ReactFlow>
    </div>
  );
}
