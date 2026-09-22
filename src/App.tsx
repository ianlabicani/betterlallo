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
import Contact from './pages/Contact';
import Updates from './pages/Updates';
import Resources from './pages/Resources';
import FAQ from './pages/FAQ';
import Privacy from './pages/Privacy';
import TermsOfUse from './pages/TermsOfUse';
import Accessibility from './pages/Accessibility';
import Sitemap from './pages/Sitemap';
import NotFound from './pages/NotFound';
import Heritage from './pages/Heritage';
import Contribute from './pages/Contribute';
import SkipLink from './components/layout/SkipLink';
import EmergencyBar from './components/civic/EmergencyBar';
import { WeatherProvider } from './components/civic/WeatherProvider';
import PublicChat from './components/PublicChat';
import { BrowserRouter as Router, Routes, Route } from 'react-router';

function App() {
  return (
    <HelmetProvider>
      <Router>
        <NuqsAdapter>
          <WeatherProvider>
            <div className="min-h-screen flex flex-col">
              <SkipLink />
              <header className="sticky top-0 z-50">
                <EmergencyBar />
                <Navbar />
              </header>
              <ScrollToTop />
              <div id="main-content" className="flex-grow" tabIndex={-1}>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/statistics" element={<Statistics />} />
                  <Route path="/heritage" element={<Heritage />} />
                  <Route path="/openlgu" element={<OpenLGU />} />
                  <Route path="/updates" element={<Updates />} />
                  <Route path="/resources" element={<Resources />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/contribute" element={<Contribute />} />
                  <Route path="/faq" element={<FAQ />} />
                  <Route path="/privacy" element={<Privacy />} />
                  <Route path="/terms-of-use" element={<TermsOfUse />} />
                  <Route path="/accessibility" element={<Accessibility />} />
                  <Route path="/sitemap" element={<Sitemap />} />
                  <Route
                    path="/transparency/:section"
                    element={<Transparency />}
                  />
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
                  <Route
                    path="/government/:category"
                    element={<Government />}
                  />
                  <Route path="/government" element={<Government />} />
                  <Route
                    path="/government/:category/:documentSlug"
                    element={<Document categoryType="government" />}
                  />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <Footer />
              <PublicChat />
            </div>
          </WeatherProvider>
        </NuqsAdapter>
      </Router>
    </HelmetProvider>
  );
}

export default App;
