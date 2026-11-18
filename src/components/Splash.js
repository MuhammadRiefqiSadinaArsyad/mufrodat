export default function Splash() {
  return (
    <div className="loading-screen" aria-live="polite">
      <div className="ls-inner">
        <div className="sp-ornament">
          <span />
          <span />
        </div>
        <div className="sp-arabic">أَهْلًا وَسَهْلًا</div>
        <div className="sp-title">Al-Mufradat</div>
        <p className="sp-sub">Menyiapkan kosakata dan progres belajarmu…</p>
        <div className="sp-bar">
          <div className="sp-fill" />
        </div>
        <div className="sp-sample">هَذَا كِتَابٌ — Ini buku</div>
      </div>
    </div>
  );
}
