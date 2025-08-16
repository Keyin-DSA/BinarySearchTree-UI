// src/pages/EnterNumbers.jsx
import { useState } from 'react';
import { buildTree } from '../api/client';
import TreeViewer from '../components/TreeViewer';

export default function EnterNumbers({ onBuilt, last }) {
  const [input, setInput] = useState('');
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState('');

  const parse = (s) =>
    s
      .split(/[,\s]+/)
      .map((t) => t.trim())
      .filter(Boolean)
      .map(Number);

  const submit = async (e) => {
    e.preventDefault();
    setErr('');
    const nums = parse(input);
    if (!nums.length || nums.some((n) => Number.isNaN(n))) {
      setErr('Enter integers separated by commas or spaces.');
      return;
    }
    try {
      setBusy(true);
      const data = await buildTree(nums);
      onBuilt?.(data);
    } catch (ex) {
      setErr(ex?.response?.data?.message || 'Request failed.');
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <form className="row gy-2 align-items-center" onSubmit={submit}>
        <div className="col-sm-9">
          <input
            className="form-control"
            placeholder="e.g. 7, 3, 9, 1, 5"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <div className="col-sm-3 d-grid">
          <button className="btn btn-primary" disabled={busy} type="submit">
            {busy ? 'Building...' : 'Build Tree'}
          </button>
        </div>
      </form>

      {err && <div className="alert alert-danger mt-3">{err}</div>}

      {last && (
        <div className="card mt-3">
          <div className="card-body">
            <div className="mb-2">
              <strong>Input:</strong> {last.numbersJson}
            </div>
            <TreeViewer treeJson={last.treeJson} />
          </div>
        </div>
      )}
    </>
  );
}
