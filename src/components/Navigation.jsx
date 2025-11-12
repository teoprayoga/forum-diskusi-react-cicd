import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { unsetAuthUser } from '../states/auth/authSlice';

const Navigation = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(unsetAuthUser());
    navigate('/');
  };

  return (
    <nav className="navigation">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <h1>💬 Forum Diskusi</h1>
        </Link>

        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/leaderboards" className="nav-link">Leaderboard</Link>

          {user ? (
            <>
              <Link to="/new-thread" className="nav-link btn-new-thread">
                ➕ Thread Baru
              </Link>
              <div className="user-info">
                <img src={user.avatar} alt={user.name} className="user-avatar-small" />
                <span>{user.name}</span>
              </div>
              <button type="button" onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-link">Login</Link>
              <Link to="/register" className="nav-link btn-register">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
