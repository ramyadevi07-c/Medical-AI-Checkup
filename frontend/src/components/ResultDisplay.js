// import React from 'react';

// function ResultDisplay({ results }) {
//   return (
//     <div className="results">
//       <h2>Possible Conditions:</h2>
//       <ul>
//         {results.map((r, i) => (
//           <li key={i}>
//             <strong>{r.condition}</strong> — Probability: {(r.probability * 100).toFixed(2)}%
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

import React from 'react';

function ResultDisplay({ results }) {
  // 1. SAFEGUARD: If results hasn't loaded yet, don't render anything
  if (!results) return null;

  // 2. SAFEGUARD: Check if 'results' is a valid array before looping
  const validList = Array.isArray(results) ? results : [];

  if (validList.length === 0) {
    return (
      <div className="results-card">
        <h2>AI Assessment Results</h2>
        <p className="results-intro" style={{ color: '#721c24' }}>
          Received an unexpected data format or an empty evaluation from the engine. Please try again.
        </p>
      </div>
    );
  }

  return (
    <div className="results-card">
      <h2>AI Assessment Results</h2>
      <p className="results-intro">Based on your input, here are the most statistically relevant findings:</p>
      
      <div className="conditions-list">
        {validList.map((r, i) => (
          <div key={i} className={`condition-item urgency-${r.urgency ? r.urgency.toLowerCase() : 'low'}`}>
            <div className="condition-header">
              <h3>{r.condition}</h3>
              <span className={`badge badge-${r.urgency ? r.urgency.toLowerCase() : 'low'}`}>
                {r.urgency || 'Low'} Urgency
              </span>
            </div>
            
            <div className="probability-bar-container">
              <div className="probability-label">
                <span>Confidence Match</span>
                <span>{((r.probability || 0) * 100).toFixed(0)}%</span>
              </div>
              <div className="bar-bg">
                <div className="bar-fill" style={{ width: `${(r.probability || 0) * 100}%` }}></div>
              </div>
            </div>

            <div className="advice-box">
              <strong>Recommended Action:</strong> {r.advice || 'No specific advice available.'}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// REMEMBER TO KEEP THIS LINE AT THE VERY BOTTOM AT ALL COSTS!
export default ResultDisplay;