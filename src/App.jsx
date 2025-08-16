// src/App.jsx
import { useState } from 'react';
import EnterNumbers from './pages/EnterNumbers.jsx';
import PreviousTrees from './pages/PreviousTrees.jsx';

export default function App() {
  const [view, setView] = useState('enter');
  const [last, setLast] = useState(null);

  return (
    <div className="container my-4">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'enter' ? 'active' : ''}`}
            onClick={() => setView('enter')}
          >
            Build Tree
          </button>
        </li>
        <li className="nav-item">
          <button
            className={`nav-link ${view === 'previous' ? 'active' : ''}`}
            onClick={() => setView('previous')}
          >
            Previous Trees
          </button>
        </li>
      </ul>

      {view === 'enter' ? (
        <EnterNumbers onBuilt={setLast} last={last} />
      ) : (
        <PreviousTrees />
      )}
    </div>
  );
}
