// src/components/TreeViewer.jsx
// Created by AI

import { useMemo } from 'react';

export default function TreeViewer({
  treeJson,
  width = 700,
  levelGap = 70,
  nodeR = 14,
}) {
  const tree = useMemo(() => {
    try {
      return JSON.parse(treeJson);
    } catch {
      return null;
    }
  }, [treeJson]);

  const nodes = [],
    links = [];
  const layout = (n, depth, x0, x1) => {
    if (!n) return;
    const x = (x0 + x1) / 2,
      y = 30 + depth * levelGap;
    const id = nodes.push({ x, y, v: n.value }) - 1;
    if (n.left) {
      links.push({ x1: x, y1: y, x2: (x0 + x) / 2, y2: y + levelGap });
      layout(n.left, depth + 1, x0, x);
    }
    if (n.right) {
      links.push({ x1: x, y1: y, x2: (x + x1) / 2, y2: y + levelGap });
      layout(n.right, depth + 1, x, x1);
    }
    return id;
  };
  if (tree) layout(tree, 0, 30, width - 30);

  const height = Math.max(
    120,
    nodes.reduce((m, n) => Math.max(m, n.y), 0) + nodeR + 20
  );

  return (
    <svg
      width="100%"
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      className="border rounded"
    >
      {links.map((l, i) => (
        <line
          key={i}
          x1={l.x1}
          y1={l.y1}
          x2={l.x2}
          y2={l.y2}
          stroke="#bbb"
          strokeWidth="2"
        />
      ))}
      {nodes.map((n, i) => (
        <g key={i}>
          <circle cx={n.x} cy={n.y} r={nodeR} fill="white" stroke="#333" />
          <text x={n.x} y={n.y + 4} fontSize="12" textAnchor="middle">
            {n.v}
          </text>
        </g>
      ))}
      {!tree && (
        <text x={width / 2} y={height / 2} textAnchor="middle" fill="#888">
          No tree
        </text>
      )}
    </svg>
  );
}
