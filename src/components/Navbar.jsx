import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const isLanding = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        padding: scrolled ? '12px 20px' : '18px 20px',
        background: scrolled ? 'rgba(250,250,250,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div
          onClick={() => navigate('/')}
          style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <div style={{
            width: '32px',
            height: '32px',
            background: 'var(--primary)',
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
            <span style={{ color: 'white', fontSize: '16px', fontWeight: '800', fontFamily: 'var(--font-display)' }}>A</span>
          </div>
          <span style={{
            fontSize: '17px',
            fontWeight: '700',
            fontFamily: 'var(--font-display)',
            letterSpacing: '-0.03em',
            color: 'var(--primary)',
          }}>ABTalks</span>
        </div>

        {/* Desktop nav links - hidden on mobile */}
        {isLanding && (
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '28px',
          }} className="desktop-nav">
            {['Tracks', 'Community', 'Leaderboard'].map(item => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{
                fontSize: '14px',
                fontWeight: '500',
                color: 'var(--secondary)',
                transition: 'var(--transition)',
              }}
                onMouseEnter={e => e.target.style.color = 'var(--primary)'}
                onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
              >{item}</a>
            ))}
          </div>
        )}

        {/* Right side */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          {isLanding ? (
            <>
              <button
                onClick={() => navigate('/dashboard')}
                style={{
                  fontSize: '13px',
                  fontWeight: '600',
                  color: 'var(--secondary)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  transition: 'var(--transition)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'var(--bg-secondary)'}
                onMouseLeave={e => e.currentTarget.style.background = 'var(--surface)'}
              >
                Sign in
              </button>
              <button
                onClick={() => navigate('/dashboard')}
                className="btn-primary"
                style={{ fontSize: '13px', padding: '8px 16px' }}
              >
                Start free
              </button>
            </>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <button
                onClick={() => navigate('/')}
                style={{
                  fontSize: '13px',
                  fontWeight: '500',
                  color: 'var(--muted)',
                  padding: '8px 14px',
                  borderRadius: 'var(--radius-full)',
                  border: '1px solid var(--border)',
                  background: 'var(--surface)',
                  transition: 'var(--transition)',
                }}
              >
                ← Home
              </button>
              <div style={{
                width: '34px',
                height: '34px',
                borderRadius: '50%',
                background: 'var(--accent)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                fontSize: '13px',
                fontWeight: '700',
                cursor: 'pointer',
              }}>RG</div>
            </div>
          )}
        </div>
      </nav>

      {/* Mobile menu overlay */}
      {menuOpen && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(250,250,250,0.97)',
          backdropFilter: 'blur(20px)',
          zIndex: 99,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '32px',
          animation: 'fadeIn 0.2s ease',
        }}>
         {['Tracks', 'Community', 'Leaderboard'].map(item =>
  item === 'Leaderboard' ? (
    <span
      key={item}
      onClick={() => { navigate('/dashboard'); setMenuOpen(false) }}
      style={{
        fontSize: '28px',
        fontWeight: '500',
        color: 'var(--secondary)',
        transition: 'var(--transition)',
        cursor: 'pointer',
      }}
      onMouseEnter={e => e.target.style.color = 'var(--primary)'}
      onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
    >{item}</span>
  ) : (
    <a key={item} href={`#${item.toLowerCase()}`} style={{
      fontSize: '14px',
      fontWeight: '500',
      color: 'var(--secondary)',
      transition: 'var(--transition)',
    }}
      onMouseEnter={e => e.target.style.color = 'var(--primary)'}
      onMouseLeave={e => e.target.style.color = 'var(--secondary)'}
    >{item}</a>
  )
)}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', width: '200px', marginTop: '16px' }}>
            <button onClick={() => { navigate('/dashboard'); setMenuOpen(false) }} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
              Start free
            </button>
            <button onClick={() => { navigate('/dashboard'); setMenuOpen(false) }} className="btn-secondary" style={{ width: '100%', justifyContent: 'center' }}>
              Sign in
            </button>
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 640px) {
          .desktop-nav { display: none !important; }
        }
      `}</style>
    </>
  )
}
