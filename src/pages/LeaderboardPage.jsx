import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetLeaderboards } from '../states/leaderboards/leaderboardsSlice';
import LeaderboardItem from '../components/LeaderboardItem';
import LoadingSpinner from '../components/LoadingSpinner';

const LeaderboardPage = () => {
  const dispatch = useDispatch();
  const { leaderboards, isLoading } = useSelector((state) => state.leaderboards);

  useEffect(() => {
    dispatch(asyncGetLeaderboards());
  }, [dispatch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="leaderboard-page">
      <div className="page-header">
        <h2>🏆 Leaderboard</h2>
        <p>Pengguna dengan kontribusi terbaik</p>
      </div>

      <div className="leaderboard-container">
        {leaderboards.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada data leaderboard.</p>
          </div>
        ) : (
          leaderboards.map((user, index) => (
            <LeaderboardItem key={user.user.id} user={user.user} rank={index + 1} />
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderboardPage;
