import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function TrendChart({ semesters }) {
  const data = semesters.map(s => ({
    name: `Sem ${s.semesterNumber}`,
    sgpa: Number(s.sgpa.toFixed(2))
  }));

  return (
    <div className="chart-container">
      <h3>SGPA Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
          <XAxis dataKey="name" stroke="#9ca3af" />
          <YAxis domain={[0, 10]} stroke="#9ca3af" />
          <Tooltip
            contentStyle={{ background: '#1e1b3a', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '10px', color: '#fff' }}
          />
          <Line type="monotone" dataKey="sgpa" stroke="#a5b4fc" strokeWidth={3} dot={{ fill: '#818cf8', r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}