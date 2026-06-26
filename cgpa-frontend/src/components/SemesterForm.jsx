import { useState } from 'react';
import API from '../api';

export default function SemesterForm({ onAdded, nextSemesterNumber }) {
  const [subjects, setSubjects] = useState([{ name: '', credits: '', gradePoint: '' }]);
  const [saving, setSaving] = useState(false);

  const updateSubject = (index, field, value) => {
    const updated = [...subjects];
    updated[index][field] = value;
    setSubjects(updated);
  };

  const addRow = () => setSubjects([...subjects, { name: '', credits: '', gradePoint: '' }]);
  const removeRow = (index) => setSubjects(subjects.filter((_, i) => i !== index));

  const handleSubmit = async e => {
    e.preventDefault();
    setSaving(true);
    const payload = {
      semesterNumber: nextSemesterNumber,
      subjects: subjects.map(s => ({
        name: s.name,
        credits: Number(s.credits),
        gradePoint: Number(s.gradePoint)
      }))
    };
    try {
      const { data } = await API.post('/semesters', payload);
      onAdded(data);
      setSubjects([{ name: '', credits: '', gradePoint: '' }]);
    } catch (err) {
      alert('Failed to add semester');
    }
    setSaving(false);
  };

  return (
    <form className="semester-form" onSubmit={handleSubmit}>
      <h3>Add Semester {nextSemesterNumber}</h3>
      {subjects.map((s, i) => (
        <div className="subject-row" key={i}>
          <input
            placeholder="Subject name"
            value={s.name}
            onChange={e => updateSubject(i, 'name', e.target.value)}
            required
          />
          <input
            type="number"
            placeholder="Credits"
            value={s.credits}
            onChange={e => updateSubject(i, 'credits', e.target.value)}
            min="1"
            required
          />
          <input
            type="number"
            placeholder="Grade Point (0-10)"
            value={s.gradePoint}
            onChange={e => updateSubject(i, 'gradePoint', e.target.value)}
            min="0"
            max="10"
            required
          />
          {subjects.length > 1 && (
            <button type="button" onClick={() => removeRow(i)}>✕</button>
          )}
        </div>
      ))}
      <button type="button" onClick={addRow}>+ Add Subject</button>
      <button type="submit" disabled={saving}>
        {saving ? 'Saving...' : 'Save Semester'}
      </button>
    </form>
  );
}