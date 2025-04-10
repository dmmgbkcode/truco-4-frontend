import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Sala from './pages/Sala';

function App() {
  const [nome, setNome] = useState('');

  if (!nome) {
    return <Login setNome={setNome} />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home nome={nome} />} />
        <Route path="/sala/:codigo" element={<Sala nome={nome} />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;