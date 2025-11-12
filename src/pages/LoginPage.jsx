import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { asyncLoginUser } from '../states/auth/authSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const LoginPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [user, navigate]);

  const onSubmit = (data) => {
    dispatch(asyncLoginUser({ email: data.email, password: data.password }));
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="auth-page">
      <div className="auth-container">
        <h2>Login</h2>
        <p className="auth-subtitle">Masuk ke akun Anda</p>

        {error && <div className="error-message">{error}</div>}

        <form onSubmit={handleSubmit(onSubmit)} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">
              Email
              <input
                type="email"
                id="email"
                {...register('email', {
                  required: 'Email harus diisi',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Email tidak valid',
                  },
                })}
                placeholder="email@example.com"
              />
            </label>
            {errors.email && (
              <span className="error-text">{errors.email.message}</span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="password">
              Password
              <input
                type="password"
                id="password"
                {...register('password', {
                  required: 'Password harus diisi',
                  minLength: {
                    value: 6,
                    message: 'Password minimal 6 karakter',
                  },
                })}
                placeholder="Password"
              />
            </label>
            {errors.password && (
              <span className="error-text">{errors.password.message}</span>
            )}
          </div>

          <button type="submit" className="btn-submit">
            Login
          </button>
        </form>

        <p className="auth-footer">
          Belum punya akun?
          {' '}
          <Link to="/register">Daftar di sini</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
