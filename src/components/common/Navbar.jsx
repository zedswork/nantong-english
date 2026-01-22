import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../stores/authStore';
import { useProgressStore } from '../../stores/progressStore';

function Navbar() {
  const location = useLocation();
  const { user, logout } = useAuthStore();
  const { stats, getAccuracy } = useProgressStore();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { path: '/vocabulary', label: '单词拓展' },
    { path: '/phrases', label: '核心词组' },
    { path: '/reading', label: '课文知识' },
    { path: '/grammar', label: '语法练习' },
    { path: '/ai-reading', label: 'AI阅读' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className="navbar">
      <Link to="/" className="nav-brand">
        <span className="brand-emoji">📚</span> English Learning
      </Link>

      <button 
        className="nav-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Toggle menu"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
        {navLinks.map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={isActive(link.path) ? 'active' : ''}
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </Link>
        ))}
      </div>

      <div className="nav-auth">
        {user ? (
          <div className="user-menu">
            <span className="user-name">{user.name || user.email}</span>
            <button onClick={logout} className="btn-logout">
              退出
            </button>
          </div>
        ) : (
          <Link to="/login" className="btn-login">
            登录
          </Link>
        )}
      </div>

      <div className="progress-container">
        <div 
          className="progress-bar" 
          style={{ width: `${getAccuracy()}%` }}
        ></div>
      </div>
    </nav>
  );
}

export default Navbar;
