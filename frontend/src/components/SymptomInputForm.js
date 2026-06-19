// import React, { useState } from 'react';

// function SymptomInputForm({ onSubmit }) {
//   const [symptoms, setSymptoms] = useState('');
//   const [age, setAge] = useState('');
//   const [gender, setGender] = useState('male');

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     onSubmit({ symptoms, age, gender });
//   };

//   return (
//     <form onSubmit={handleSubmit} className="form">
//       <textarea
//         placeholder="Describe your symptoms..."
//         value={symptoms}
//         onChange={(e) => setSymptoms(e.target.value)}
//         required
//       />
//       <input
//         type="number"
//         placeholder="Age"
//         value={age}
//         onChange={(e) => setAge(e.target.value)}
//         required
//       />
//       <select value={gender} onChange={(e) => setGender(e.target.value)}>
//         <option value="male">Male</option>
//         <option value="female">Female</option>
//         <option value="other">Other</option>
//       </select>
//       <button type="submit">Check Health</button>
//     </form>
//   );
// }

// export default SymptomInputForm;
import React, { useState } from 'react';

function SymptomInputForm({ onSubmit, isLoading }) {
  const [symptoms, setSymptoms] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('male');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoading) return;
    onSubmit({ symptoms, age, gender });
  };

  return (
    <form onSubmit={handleSubmit} className="form-card">
      <div className="input-group">
        <label>Describe your symptoms in detail</label>
        <textarea
          placeholder="e.g., Dry cough and mild fever for 3 days, feeling fatigued..."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
          disabled={isLoading}
        />
        <small className="char-count">{symptoms.length} characters</small>
      </div>

      <div className="row">
        <div className="input-group half">
          <label>Age</label>
          <input
            type="number"
            placeholder="Age"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            min="1"
            max="120"
            required
            disabled={isLoading}
          />
        </div>

        <div className="input-group half">
          <label>Biological Gender</label>
          <select value={gender} onChange={(e) => setGender(e.target.value)} disabled={isLoading}>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <button type="submit" className="submit-btn" disabled={isLoading}>
        {isLoading ? 'Processing...' : 'Run Diagnostics'}
      </button>
    </form>
  );
}

export default SymptomInputForm;