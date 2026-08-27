import React, { useEffect, useRef, useState } from "react";
import mermaid from "mermaid";

mermaid.initialize({
  startOnLoad: false,
  theme: "default",
});

// Ensures the diagram starts with a valid Mermaid graph declaration
const cleanMermaidChart = (diagram) => {
  if (!diagram) return "";

  let clean = diagram.replace(/\r\n/g, "\n").trim();

  if (!/^(graph|flowchart)\s/.test(clean)) {
    clean = `graph TD\n${clean}`;
  }

  return clean;
};

// Auto-quotes node labels so special characters (parentheses, colons, etc.)
// don't break Mermaid's parser — WITHOUT renaming node IDs, so edges stay intact.
const autoFixBadNotes = (diagram) => {
  return diagram.replace(/(\w+)\[(.*?)\]/g, (match, nodeId, label) => {
    const trimmed = label.trim();

    // Already quoted — leave as-is
    if (trimmed.startsWith('"') && trimmed.endsWith('"')) {
      return `${nodeId}[${trimmed}]`;
    }

    // Escape stray double quotes inside the label (Mermaid doesn't support \" escaping)
    const safeLabel = trimmed.replace(/"/g, "'");
    return `${nodeId}["${safeLabel}"]`;
  });
};

const MermaidSetup = ({ diagram }) => {
  const containerRef = useRef(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!diagram || !containerRef.current) return;

    const renderDiagram = async () => {
      try {
        setError(null);
        containerRef.current.innerHTML = "";

        const uniqueId = `mermaid-${Math.random().toString(36).substring(2, 9)}`;

        const safeChart = autoFixBadNotes(cleanMermaidChart(diagram));

        const { svg } = await mermaid.render(uniqueId, safeChart);

        containerRef.current.innerHTML = svg;
      } catch (err) {
        console.error("Mermaid render failed:", err);
        setError("Unable to render diagram. Please check the diagram syntax.");
      }
    };

    renderDiagram();
  }, [diagram]);

  return (
    <div className="bg-white border rounded-lg p-4 overflow-x-auto">
      {error && (
        <div className="text-sm text-red-600 mb-2">{error}</div>
      )}
      <div ref={containerRef} />
    </div>
  );
};

export default MermaidSetup;