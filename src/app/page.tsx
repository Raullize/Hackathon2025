import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Partners from '@/components/Partners';
import InteractiveMap from '@/components/InteractiveMap';
import Testimonials from '@/components/Testimonials';
import FAQ from '@/components/FAQ';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />
      <Hero />
      <InteractiveMap />
      <Partners />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
