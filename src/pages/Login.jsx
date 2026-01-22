import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();

    try {
      await login(email, password);
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };

  return (
    <section className="section auth-section">
      <div className="container">
        <div className="auth-card">
          <h2>登录</h2>
          <p className="auth-desc">登录后可以同步学习进度</p>

          {error && (
            <div className="auth-error">{error}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="email">邮箱</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="your@email.com"
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">密码</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
              />
            </div>

            <button 
              type="submit" 
              className="btn-auth"
              disabled={isLoading}
            >
              {isLoading ? '登录中...' : '登录'}
            </button>
          </form>

          <p className="auth-switch">
            还没有账号？ <Link to="/register">注册</Link>
          </p>

          <div className="demo-accounts">
            <p>演示账号:</p>
            <p>teacher@example.com / Demo123!</p>
            <p>student@example.com / Demo123!</p>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Login;
