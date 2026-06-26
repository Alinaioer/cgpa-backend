import { useState, useMemo } from 'react';

export default function WhatIfSimulator({ completedPoints, completedCredits }) {
  const [remainingCredits, setRemainingCredits] = useState(20);
  const [targetCGPA, setTargetCGPA] = useState(8.0);

  const result = useMemo(() => {
    if (remainingCredits <= 0) return null;
    const totalCredits = completedCredits + Number(remainingCredits);
    const neededTotalPoints = targetCGPA * totalCredits;
    const neededPoints = neededTotalPoints - completedPoints;
    const neededAvgGP = neededPoints / remainingCredits;

    return {
      neededAvgGP: neededAvgGP.toFixed(2),
      achievable: neededAvgGP <= 10 && neededAvgGP >= 0,
      impossible: neededAvgGP > 10,
      alreadyThere: neededAvgGP < 0
    };
  }, [remainingCredits, targetCGPA, completedPoints, completedCredits]);

  return (
    <div className="whatif-card">
      <h3>What-If Simulator</h3>

      <label>
        Target CGPA: <strong>{targetCGPA}</strong>
        <input
          type="range"
          min="0" max="10" step="0.1"
          value={targetCGPA}
          onChange={e => setTargetCGPA(Number(e.target.value))}
        />
      </label>

      <label>
        Remaining Credits:
        <input
          type="number"
          value={remainingCredits}
          onChange={e => setRemainingCredits(Number(e.target.value))}
          min="1"
        />
      </label>

      {result && (
        <div className={`result ${result.impossible ? 'impossible' : 'achievable'}`}>
          {result.alreadyThere ? (
            <p>You've already crossed this target! 🎉</p>
          ) : result.impossible ? (
            <p>Not mathematically achievable — even a perfect 10 GPA in remaining subjects won't get you there.</p>
          ) : (
            <p>You need an average grade point of <strong>{result.neededAvgGP}</strong> in your remaining {remainingCredits} credits.</p>
          )}
        </div>
      )}
    </div>
  );
}