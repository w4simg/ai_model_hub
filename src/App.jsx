import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import ModelDetails from './pages/ModelDetails';
import Compare from './pages/Compare';
import Chat from './pages/Chat';

function AppContent() {
  const location = useLocation();
  const showFooter = location.pathname !== '/chat';

  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/models/*" element={<ModelDetails />} />
          <Route path="/compare" element={<Compare />} />
          <Route path="/chat" element={<Chat />} />
        </Routes>
      </main>
      {showFooter && <Footer />}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
