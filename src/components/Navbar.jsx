import { useState, useEffect } from 'react';
import { NAV_LINKS } from '../data';

export default function Navbar({ dark, toggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState('');

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMobileOpen(false);
    setActive(id);
  };

  return (
    <>
      <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 md:px-10 py-4 transition-all duration-300 ${
        scrolled
          ? dark ? 'bg-dark-bg/90 backdrop-blur-2xl border-b border-white/[0.06]' : 'bg-white/90 backdrop-blur-2xl border-b border-black/[0.06]'
          : dark ? 'bg-dark-bg/50 backdrop-blur-md' : 'bg-white/50 backdrop-blur-md'
      }`}>
        {/* Logo */}
        <a
          href="#"
          onClick={e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
          className="font-serif text-2xl bg-gradient-to-r from-accent to-teal bg-clip-text text-transparent"
        >
          Limashi S.
        </a>

        {/* Desktop links */}
        <ul className="hidden lg:flex gap-8 list-none">
          {NAV_LINKS.map(link => (
            <li key={link}>
              <button
                onClick={() => scrollTo(link)}
                className={`text-sm font-medium tracking-wide transition-colors capitalize ${
                  active === link
                    ? 'text-accent'
                    : dark ? 'text-white/50 hover:text-white' : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {link}
              </button>
            </li>
          ))}
        </ul>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggleTheme}
            className={`w-9 h-9 rounded-lg border flex items-center justify-center text-base transition-all ${
              dark ? 'border-white/10 text-white/50 hover:border-white/20 hover:text-white' : 'border-black/10 text-gray-500 hover:border-black/20 hover:text-gray-900'
            }`}
            aria-label="Toggle theme"
          >
            {dark ? '🌙' : '☀️'}
          </button>
          <button
            onClick={() => scrollTo('contact')}
            className="hidden md:block bg-gradient-to-r from-accent to-purple-600 text-white text-sm font-semibold px-4 py-2 rounded-lg hover:opacity-90 hover:-translate-y-0.5 transition-all"
          >
            Hire Me
          </button>
          {/* Hamburger */}
          <button
            className="lg:hidden flex flex-col gap-1.5 p-1"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            <span className={`block w-5 h-0.5 transition-all ${dark ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? 'rotate-45 translate-y-2' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all ${dark ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? 'opacity-0' : ''}`} />
            <span className={`block w-5 h-0.5 transition-all ${dark ? 'bg-white' : 'bg-gray-800'} ${mobileOpen ? '-rotate-45 -translate-y-2' : ''}`} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className={`fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 ${
          dark ? 'bg-dark-bg/98 backdrop-blur-2xl' : 'bg-white/98 backdrop-blur-2xl'
        }`}>
          <button
            className={`absolute top-6 right-6 text-2xl ${dark ? 'text-white/50' : 'text-gray-400'}`}
            onClick={() => setMobileOpen(false)}
            aria-label="Close menu"
          >
            ✕
          </button>
          {NAV_LINKS.map(link => (
            <button
              key={link}
              onClick={() => scrollTo(link)}
              className={`font-serif text-3xl capitalize transition-colors ${
                dark ? 'text-white hover:text-accent' : 'text-gray-900 hover:text-accent'
              }`}
            >
              {link}
            </button>
          ))}
          <button
            onClick={() => scrollTo('contact')}
            className="bg-gradient-to-r from-accent to-purple-600 text-white font-semibold px-6 py-3 rounded-xl mt-2"
          >
            Hire Me
          </button>
        </div>
      )}
    </>
  );
}
