// src/pages/PreviousTrees.jsx
import { useEffect, useState } from 'react';
import { fetchPrevious } from '../api/client';
import TreeViewer from '../components/TreeViewer';

export default function PreviousTrees() {
  const [items, setItems] = useState([]);
  const [sel, setSel] = useState(null);
  const [err, setErr] = useState('');

  useEffect(() => {
    (async () => {
      try {
        setItems(await fetchPrevious());
      } catch {
        setErr('Failed to load previous trees.');
      }
    })();
  }, []);

  return (
    <div className="row g-3">
      <div className="col-md-4">
        {err && <div className="alert alert-danger">{err}</div>}
        <ul className="list-group">
          {items.length === 0 && (
            <li className="list-group-item">No saved trees</li>
          )}
          {items.map((x) => (
            <li
              key={x.id}
              className={`list-group-item ${sel?.id === x.id ? 'active' : ''}`}
              role="button"
              onClick={() => setSel(x)}
            >
              <div>
                <strong>ID:</strong> {x.id}
              </div>
              <div className="small text-muted">
                {new Date(x.createdAt ?? Date.now()).toLocaleString()}
              </div>
              <div className="text-truncate">{x.numbersJson}</div>
            </li>
          ))}
        </ul>
      </div>

      <div className="col-md-8">
        {sel ? (
          <div className="card">
            <div className="card-body">
              <div className="mb-2">
                <strong>Input:</strong> {sel.numbersJson}
              </div>
              <TreeViewer treeJson={sel.treeJson} />
            </div>
          </div>
        ) : (
          <div className="text-muted">Select a tree to preview.</div>
        )}
      </div>
    </div>
  );
}
