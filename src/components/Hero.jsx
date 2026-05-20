import { useEffect, useState } from 'react';
import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi';
import profilePhoto from '../assets/limashi.jpg';

const ROLES = [
  'Full-Stack Developer',
  'UI/UX Designer',
  'CS Undergraduate',
  'React.js Developer',
  'Problem Solver',
];

export default function Hero({ dark }) {
  const [text, setText] = useState('');
  const [roleIndex, setRoleIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const role = ROLES[roleIndex];
    let timeout;
    if (!deleting && text.length < role.length) {
      timeout = setTimeout(() => setText(role.slice(0, text.length + 1)), 90);
    } else if (!deleting && text.length === role.length) {
      timeout = setTimeout(() => setDeleting(true), 1800);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(() => setText(text.slice(0, -1)), 55);
    } else if (deleting && text.length === 0) {
      setDeleting(false);
      setRoleIndex((i) => (i + 1) % ROLES.length);
    }
    return () => clearTimeout(timeout);
  }, [text, deleting, roleIndex]);

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden pt-24 pb-16 px-6 md:px-10"
    >
      {/* Background orbs */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="orb w-[600px] h-[600px] bg-accent/10 top-[-100px] right-[-100px]" />
        <div className="orb w-[400px] h-[400px] bg-teal/8 bottom-[50px] left-[-80px]" />
        <div className="orb w-[300px] h-[300px] bg-purple-500/5 top-[40%] left-[30%]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center">

        {/* ── LEFT: Text content ── */}
        <div>

          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 border rounded-full px-4 py-1.5 text-xs font-medium mb-6 border-accent/25 bg-accent/10 text-accent2">
            <span className="w-1.5 h-1.5 rounded-full bg-teal animate-pulse-slow" />
            Available for Internships & Roles
          </div>

          {/* Name */}
          <h1 className={`font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.08] mb-4 ${dark ? 'text-white' : 'text-gray-900'}`}>
            Limashi<br />
            <em className="not-italic text-accent2">Sathkumara</em>
          </h1>

          {/* Typing animation */}
          <div className="text-teal font-medium text-lg mb-5 h-7 flex items-center">
            <span className="typing-cursor">{text}</span>
          </div>

          {/* Intro */}
          <p className={`text-base leading-relaxed max-w-lg mb-8 ${dark ? 'text-white/55' : 'text-gray-500'}`}>
            Passionate about building modern web applications, UI/UX experiences,
            and smart software solutions that solve real-world problems.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-3 mb-8">
            <button
              onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
              className="bg-gradient-to-r from-accent to-purple-600 text-white font-semibold px-5 py-3 rounded-xl flex items-center gap-2 hover:opacity-90 hover:-translate-y-0.5 transition-all shadow-lg shadow-accent/20"
            >
              View Projects
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </button>

            <button
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              className={`border font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/15 text-white/80 hover:border-accent hover:text-accent'
                  : 'border-gray-200 text-gray-700 hover:border-accent hover:text-accent'
              }`}
            >
              Contact Me
            </button>

            {/* To enable CV download: place your PDF in the public/ folder as "LimashiCV.pdf"
                then change href="#" to href="/LimashiCV.pdf" and remove onClick */}
            <a
              href="#"
              onClick={e => e.preventDefault()}
              className={`border font-medium px-5 py-3 rounded-xl flex items-center gap-2 transition-all hover:-translate-y-0.5 ${
                dark
                  ? 'border-white/15 text-white/80 hover:border-teal hover:text-teal'
                  : 'border-gray-200 text-gray-700 hover:border-teal hover:text-teal'
              }`}
            >
              Download CV ↓
            </a>
          </div>

          {/* Social links */}
          <div className="flex gap-3 items-center">
            {[
              { href: 'https://github.com/limashisathkumara',                         icon: <FiGithub size={18} />,   label: 'GitHub'   },
              { href: 'https://www.linkedin.com/in/limashi-sathkumara-9b9a17297/',    icon: <FiLinkedin size={18} />, label: 'LinkedIn' },
              { href: 'mailto:limashisathkumara@gmail.com',                           icon: <FiMail size={18} />,     label: 'Email'    },
            ].map(s => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all hover:-translate-y-1 ${
                  dark
                    ? 'border-white/10 bg-dark-card text-white/50 hover:border-accent hover:text-accent'
                    : 'border-gray-200 bg-white text-gray-500 hover:border-accent hover:text-accent'
                }`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        {/* ── RIGHT: Profile photo card ── */}
        <div className="flex justify-center lg:justify-end">
          <div className={`relative w-72 h-96 md:w-80 md:h-[440px] rounded-3xl border overflow-hidden flex-shrink-0 ${
            dark ? 'border-white/10' : 'border-gray-200 shadow-2xl'
          }`}>

            {/* Profile photo */}
            <img
              src={profilePhoto}
              alt="Limashi Sathkumara"
              className="w-full h-full object-cover object-top"
            />

            {/* Subtle gradient overlay so the badge text is readable */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

            {/* Bottom info badge */}
            <div className="absolute bottom-0 left-0 right-0 px-4 py-4 backdrop-blur-md border-t z-10 bg-black/40 border-white/10">
              <div className="text-teal text-xs font-semibold mb-0.5">📍 Sri Lanka</div>
              <div className="text-sm font-semibold text-white">University of Plymouth</div>
              <div className="text-xs mt-0.5 text-white/60">BSc (Hons) Computer Science</div>
            </div>
          </div>
        </div>

      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce-slow">
        <span className="text-xs tracking-widest uppercase text-white/25">scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </section>
  );
}
