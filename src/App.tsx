import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import RSVPPage from './pages/RSVPPage';
import GiftsPage from './pages/GiftsPage';
import SchedulePage from './pages/SchedulePage';
import WishesPage from './pages/WishesPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white flex flex-col">
        <Navigation />
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/rsvp" element={<RSVPPage />} />
            <Route path="/gifts" element={<GiftsPage />} />
            <Route path="/schedule" element={<SchedulePage />} />
            <Route path="/wishes" element={<WishesPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
