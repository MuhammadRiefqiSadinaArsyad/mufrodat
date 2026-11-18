'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/context/AppProvider';
import Icon from '@/components/Icon';
import ThemeToggle from '@/components/ThemeToggle';

export default function LoginPage() {
  const { session, login } = useApp();
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (session) router.replace('/');
  }, [session, router]);

  const submit = (event) => {
    event.preventDefault();
    const result = login(username, password);
    if (!result.ok) {
      setError(result.error);
      return;
    }
    setError('');
    router.replace('/');
  };

  return (
    <div className="login-page">
      <div className="login-theme">
        <ThemeToggle compact />
      </div>
      <div className="login-shell">
        <section className="login-hero">
          <div className="brand login-brand">
            <span className="brand-mark">
              <span />
              <span />
            </span>
            <span className="brand-text">
              <strong>Al-Mufradat</strong>
              <small>Kosakata Arab untuk pemula</small>
            </span>
          </div>
          <div className="login-arabic">اَلْمُفْرَدَات</div>
          <h1>Belajar satu kata,<br />membuka banyak makna.</h1>
          <p>
            Hafalkan kosakata, ulangi dengan kartu, dan uji pemahamanmu lewat kuis serta permainan.
            Progres belajarmu tersimpan di perangkat ini.
          </p>
          <ul className="login-points">
            <li><Icon name="check" /> 10 tema kosakata harian</li>
            <li><Icon name="check" /> Latihan membaca & menyusun kalimat</li>
            <li><Icon name="check" /> Pengulangan berjarak agar tidak lupa</li>
          </ul>
          <div className="login-mosque" aria-hidden="true">
            <span className="lm-dome" />
            <span className="lm-tower left" />
            <span className="lm-tower right" />
            <span className="lm-base" />
          </div>
        </section>

        <section className="login-panel">
          <div className="login-panel-head">
            <span className="eyebrow">Masuk ke ruang belajar</span>
            <h2>Assalamu’alaikum</h2>
            <p>Masukkan nama dan kata sandi pilihanmu. Tidak perlu mendaftar.</p>
          </div>

          <form className="login-form" onSubmit={submit} noValidate>
            <label className="field">
              <span>Nama pengguna</span>
              <div className="input-wrap">
                <Icon name="user" />
                <input
                  type="text"
                  name="username"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setError('');
                  }}
                  placeholder="Contoh: Ahmad"
                  autoComplete="username"
                  autoCapitalize="none"
                  maxLength={30}
                />
              </div>
            </label>

            <label className="field">
              <span>Kata sandi</span>
              <div className="input-wrap">
                <Icon name="target" />
                <input
                  type={show ? 'text' : 'password'}
                  name="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setError('');
                  }}
                  placeholder="Kata sandi bebas"
                  autoComplete="current-password"
                  maxLength={64}
                />
                <button
                  type="button"
                  className="peek-btn"
                  onClick={() => setShow((v) => !v)}
                  aria-label={show ? 'Sembunyikan kata sandi' : 'Tampilkan kata sandi'}
                >
                  <Icon name="eye" />
                </button>
              </div>
            </label>

            {error ? <div className="form-error" role="alert">{error}</div> : null}

            <button type="submit" className="btn btn-primary btn-block btn-lg">
              Mulai belajar
              <Icon name="arrowRight" />
            </button>
          </form>

          <p className="login-note">
            Kata sandi hanya menjadi kunci masuk di perangkat ini dan tidak disimpan.
            Progres tetap ada setelah keluar, selama kamu memakai nama yang sama.
          </p>
        </section>
      </div>
      <footer className="login-foot">
        <span>Al-Mufradat</span>
        <span>Media pembelajaran Bahasa Arab</span>
      </footer>
    </div>
  );
}
