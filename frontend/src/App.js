// import React, { useState } from 'react';
// import axios from 'axios';
// import SymptomInputForm from './components/SymptomInputForm';
// import ResultDisplay from './components/ResultDisplay';

// function App() {
//   const [results, setResults] = useState(null);

//   const handleFormSubmit = async (data) => {
//     try {
//       const response = await axios.post('http://localhost:5000/api/checkup', data);
//       setResults(response.data.data);
//     } catch (error) {
//       alert('Error: ' + error.message);
//     }
//   };

//   return (
//     <div className="app">
//       <h1>🩺 MedAI - AI Medical Checkup</h1>
//       <SymptomInputForm onSubmit={handleFormSubmit} />
//       {results && <ResultDisplay results={results} />}
//     </div>
//   );
// }

// export default App;
import React, { useState } from 'react';
import SymptomInputForm from './components/SymptomInputForm';
import ResultDisplay from './components/ResultDisplay'; // Thani file-la irunthu import aaguthu

function App() {
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState('');
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const handleFormSubmit = async (formData) => {
    setResults(null);
    setError(null);
    setLoading(true);
    setLoadingMessage("Analyzing symptom keywords...");

    try {
      const response = await fetch('http://localhost:5000/api/checkup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: null,
          symptoms: formData.symptoms,
          age: Number(formData.age),
          gender: formData.gender
        })
      });

      const result = await response.json();

      console.log("========== API RESPONSE ==========");
      console.log(result);
      console.log("Success:", result.success);
      console.log("Data:", result.data);
      console.log("Is Array:", Array.isArray(result.data));
      console.log("==================================");

      if (result.success) {
        setResults(result.data); // Array data setup
      } else {
        setError(result.message || "The AI engine failed to analyze symptoms.");
      }
    } catch (err) {
      setError("Unable to connect to the medical server.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <div className="logo">👑 MedAI</div>
        <p>AI-Powered Symptom Assessment Assistant</p>
      </header>
      <div className="disclaimer-banner">
        ⚠️ <strong>Disclaimer:</strong> MedAI is an experimental AI tool for informational purposes only.
      </div>
      <main className="main-content">
        <section className="input-section">
          <h2>Symptom Assessment</h2>
          <SymptomInputForm onSubmit={handleFormSubmit} isLoading={loading} />
        </section>
        <section className="results-section">
          {loading && <p>{loadingMessage}</p>}
          {error && <div className="error-box"><strong>Error:</strong> {error}</div>}
          {results && !loading && <ResultDisplay results={results} />}
        </section>
      </main>
    </div>
  );
}

// ITHU MATTUM THAN KADAISI LINE-A IRUKANUM!
export default App;