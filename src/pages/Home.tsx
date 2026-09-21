import Hero from '../components/sections/Hero';
import ServicesSection from '../components/home/ServicesSection';
import GovernmentActivitySection from '../components/home/GovernmentActivitySection';
import PortalHighlights from '../components/home/PortalHighlights';
import QuickAccessSection from '../components/home/QuickAccessSection';
import WeatherMapSection from '../components/civic/WeatherMapSection';
import SEO from '../components/SEO';

const Home: React.FC = () => {
  return (
    <>
      <SEO
        title="Home"
        description="BetterLal-lo is a community-run civic information portal for the Municipality of Lal-lo, Cagayan."
        keywords="Lal-lo, Cagayan, local government, public services, barangays, transparency"
      />
      <main className="flex-grow">
        <Hero />
        <QuickAccessSection />
        <PortalHighlights />
        <ServicesSection />
        <GovernmentActivitySection />
        <WeatherMapSection />
      </main>
    </>
  );
};

export default Home;
