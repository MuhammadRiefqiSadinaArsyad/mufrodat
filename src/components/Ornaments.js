export default function MosqueArt() {
  return (
    <svg
      className="mosque-art-bg"
      viewBox="0 0 800 260"
      preserveAspectRatio="xMidYMax slice"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="mosqueDome" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#D7AE63" />
          <stop offset="100%" stopColor="#B08439" />
        </linearGradient>
      </defs>
      <circle cx="680" cy="58" r="28" fill="#F6E7C1" opacity="0.55" />
      <path d="M0 260V185L90 165L190 190L310 160L480 185L640 155L800 180V260Z" fill="#8D8878" opacity="0.28" />
      <rect x="235" y="68" width="24" height="152" fill="#E5DFD3" />
      <rect x="231" y="92" width="32" height="6" fill="#C49A45" />
      <path d="M235 68Q247 42 259 68Z" fill="url(#mosqueDome)" />
      <line x1="247" y1="32" x2="247" y2="46" stroke="#C49A45" strokeWidth="2" />
      <rect x="541" y="68" width="24" height="152" fill="#E5DFD3" />
      <rect x="537" y="92" width="32" height="6" fill="#C49A45" />
      <path d="M541 68Q553 42 565 68Z" fill="url(#mosqueDome)" />
      <line x1="553" y1="32" x2="553" y2="46" stroke="#C49A45" strokeWidth="2" />
      <path d="M325 152C325 92 400 64 400 64C400 64 475 92 475 152Z" fill="url(#mosqueDome)" />
      <line x1="400" y1="44" x2="400" y2="65" stroke="#C49A45" strokeWidth="2.5" />
      <rect x="275" y="150" width="250" height="90" rx="4" fill="#D5CEC0" />
      <path d="M376 240V188C376 173 400 165 400 165C400 165 424 173 424 188V240Z" fill="#6D6658" />
      <path d="M312 240V196C312 186 328 180 328 180C328 180 344 186 344 196V240Z" fill="#7D7566" />
      <path d="M456 240V196C456 186 472 180 472 180C472 180 488 186 488 196V240Z" fill="#7D7566" />
      <path d="M0 260V215Q60 190 120 218Q190 192 260 222Q360 205 450 224Q560 195 670 220Q740 198 800 218V260Z" fill="#5D7466" opacity="0.52" />
    </svg>
  );
}

export function Mandala() {
  return (
    <svg className="kat-mandala" viewBox="0 0 120 120" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
      <rect x="22" y="22" width="76" height="76" rx="4" />
      <rect x="22" y="22" width="76" height="76" rx="4" transform="rotate(45 60 60)" />
      <circle cx="60" cy="60" r="24" />
      <circle cx="60" cy="60" r="8" />
    </svg>
  );
}

export function OctaBadge() {
  return (
    <svg viewBox="0 0 40 40" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="7" y="7" width="26" height="26" rx="2" />
      <rect x="7" y="7" width="26" height="26" rx="2" transform="rotate(45 20 20)" />
    </svg>
  );
}

export function ArchDoor() {
  return (
    <svg viewBox="0 0 36 44" width="30" height="36" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
      <path d="M4 40V18C4 9 18 3 18 3s14 6 14 15v22" />
      <path d="M10 40V20c0-5 8-9 8-9s8 4 8 9v20" />
      <line x1="18" y1="11" x2="18" y2="40" />
      <line x1="2" y1="40" x2="34" y2="40" />
    </svg>
  );
}
