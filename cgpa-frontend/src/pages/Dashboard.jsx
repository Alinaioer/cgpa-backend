import { useEffect, useState } from 'react';
import API from '../api';
import SemesterForm from '../components/SemesterForm';
import WhatIfSimulator from '../components/WhatIfSimulator';
import TrendChart from '../components/TrendChart';

export default function Dashboard() {
  const [semesters, setSemesters] = useState([]);
  const [cgpa, setCgpa] = useState(0);
  const [totalPoints, setTotalPoints] = useState(0);
  const [totalCredits, setTotalCredits] = useState(0);
  const [showForm, setShowForm] = useState(false);

  const fetchData = async () => {
    const { data } = await API.get('/semesters');
    setSemesters(data.semesters);
    setCgpa(data.cgpa);
    setTotalPoints(data.totalPoints);
    setTotalCredits(data.totalCredits);
  };

  useEffect(() => { fetchData(); }, []);

  const handleAdded = () => {
    setShowForm(false);
    fetchData();
  };

  return (
    <div className="dashboard">
      <div className="cgpa-banner">
        <h1>Current CGPA: {cgpa.toFixed(2)}</h1>
        <button onClick={() => setShowForm(!showForm)}>
          {showForm ? 'Cancel' : '+ Add Semester'}
        </button>
      </div>

      {showForm && (
        <SemesterForm
          nextSemesterNumber={semesters.length + 1}
          onAdded={handleAdded}
        />
      )}

      {semesters.length > 0 && (
        <>
          <TrendChart semesters={semesters} />
          <WhatIfSimulator
            completedPoints={totalPoints}
            completedCredits={totalCredits}
          />
        </>
      )}

      <div className="semester-list">
        <h3>Semester History</h3>
        {semesters.map(s => (
          <div className="semester-row" key={s._id}>
            <span>Semester {s.semesterNumber}</span>
            <span>SGPA: {s.sgpa.toFixed(2)}</span>
          </div>
        ))}
      </div>
    </div>
  );
}