import { NuqsAdapter } from 'nuqs/adapters/react';
import { HelmetProvider } from 'react-helmet-async';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import ScrollToTop from './components/ui/ScrollToTop';
import Services from './pages/Services';
import Document from './pages/Document';
import Government from './pages/Government';
import Search from './pages/Search';
import About from './pages/About';
import ServiceRecordPage from './pages/ServiceRecordPage';
import GovernmentDirectory from './pages/GovernmentDirectory';
import Officials from './pages/Officials';
import Statistics from './pages/Statistics';
import OpenLGU from './pages/OpenLGU';
import Transparency from './pages/Transparency';
import { WeatherProvider } from './components/civic/WeatherProvider';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <WeatherProvider>
          <div className="min-h-screen flex flex-col">
            <Navbar />
            <ScrollToTop />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/statistics" element={<Statistics />} />
              <Route path="/openlgu" element={<OpenLGU />} />
              <Route path="/transparency/:section" element={<Transparency />} />
              <Route path="/transparency" element={<Transparency />} />
              <Route path="/search" element={<Search />} />
              <Route
                path="/services/record/:serviceSlug"
                element={<ServiceRecordPage />}
              />
              <Route path="/services/:category" element={<Services />} />
              <Route path="/services" element={<Services />} />
              <Route
                path="/services/:category/:documentSlug"
                element={<Document categoryType="service" />}
              />
              <Route
                path="/government/directory"
                element={<GovernmentDirectory />}
              />
              <Route path="/government/officials" element={<Officials />} />
              <Route path="/government/:category" element={<Government />} />
              <Route path="/government" element={<Government />} />
              <Route
                path="/government/:category/:documentSlug"
                element={<Document categoryType="government" />}
              />
              <Route path="/:lang/:documentSlug" element={<Document />} />
              <Route path="/:documentSlug" element={<Document />} />
            </Routes>
            <Footer />
          </div>
          </WeatherProvider>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
