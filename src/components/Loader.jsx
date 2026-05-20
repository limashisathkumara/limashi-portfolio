import { useEffect, useState } from 'react';

export default function Loader() {
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setHidden(true), 1600);
    return () => clearTimeout(t);
  }, []);

  if (hidden) return null;

  return (
    <div className="fixed inset-0 z-[1000] bg-dark-bg flex flex-col items-center justify-center gap-4 transition-opacity duration-500">
      <div className="font-serif text-4xl bg-gradient-to-r from-accent to-teal bg-clip-text text-transparent">
        LS
      </div>
      <div className="w-44 h-0.5 bg-white/10 rounded-full overflow-hidden">
        <div className="h-full bg-gradient-to-r from-accent to-teal rounded-full loader-bar-fill" />
      </div>
      <p className="text-white/30 text-xs tracking-widest uppercase">Loading Portfolio</p>
    </div>
  );
}
