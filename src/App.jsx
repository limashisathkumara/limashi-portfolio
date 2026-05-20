import { useState } from 'react';
import Loader from './components/Loader';
import Cursor from './components/Cursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import UIUXDesign from './components/UIUXDesign';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';

export default function App() {
  const [dark, setDark] = useState(true);

  const toggleTheme = () => {
    setDark(d => !d);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className={dark ? 'dark bg-dark-bg text-white' : 'bg-[#f4f3f0] text-gray-900'}>
      <Loader />
      <Cursor />
      <Navbar dark={dark} toggleTheme={toggleTheme} />
      <main>
        <Hero dark={dark} />
        <About dark={dark} />
        <Skills dark={dark} />
        <Projects dark={dark} />
        <UIUXDesign dark={dark} />
        <Experience dark={dark} />
        <Services dark={dark} />
        <Contact dark={dark} />
      </main>
      <Footer dark={dark} />
    </div>
  );
}
