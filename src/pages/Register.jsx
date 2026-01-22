import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stores/authStore';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [localError, setLocalError] = useState('');
  const { register, isLoading, error, clearError } = useAuthStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    clearError();
    setLocalError('');

    if (password !== confirmPassword) {
      setLocalError('两次输入的密码不一致');
      return;
    }

    if (password.length < 8) {
      setLocalError('密码至少需要8个字符');
      return;
    }

    if (!/[a-z]/.test(password) || !/[A-Z]/.test(password) || !/[0-9]/.test(password)) {
      setLocalError('密码必须包含大写字母、小写字母和数字');
      return;
    }

    try {
      await register(email, password, name);
      navigate('/');
    } catch (err) {
      // Error is handled by the store
    }
  };

  const displayError = localError || error;

  return (
    <section className="section auth-section">
      <div className="container">
        <div className="auth-card">
          <h2>注册</h2>
          <p className="auth-desc">创建账号以保存学习进度</p>

          {displayError && (
            <div className="auth-error">{displayError}</div>
          )}

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-group">
              <label htmlFor="name">姓名 (可选)</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="你的名字"
              />
            </div>

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
                placeholder="至少8个字符，含大小写和数字"
                minLength={8}
              />
            </div>

            <div className="form-group">
              <label htmlFor="confirmPassword">确认密码</label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
                placeholder="再次输入密码"
              />
            </div>

            <button 
              type="submit" 
              className="btn-auth"
              disabled={isLoading}
            >
              {isLoading ? '注册中...' : '注册'}
            </button>
          </form>

          <p className="auth-switch">
            已有账号？ <Link to="/login">登录</Link>
          </p>
        </div>
      </div>
    </section>
  );
}

export default Register;
