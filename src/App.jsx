import { Routes, Route } from 'react-router-dom';
import Navbar from './components/common/Navbar';
import Footer from './components/common/Footer';
import Home from './pages/Home';
import Vocabulary from './pages/Vocabulary';
import Phrases from './pages/Phrases';
import Reading from './pages/Reading';
import Grammar from './pages/Grammar';
import AIReading from './pages/AIReading';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <div className="app">
      <Navbar />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vocabulary" element={<Vocabulary />} />
          <Route path="/phrases" element={<Phrases />} />
          <Route path="/reading" element={<Reading />} />
          <Route path="/grammar" element={<Grammar />} />
          <Route path="/ai-reading" element={<AIReading />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;
