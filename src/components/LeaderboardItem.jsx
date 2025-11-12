const LeaderboardItem = ({ user, rank }) => {
  const getMedal = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return `#${position}`;
  };

  return (
    <div className="leaderboard-item">
      <div className="rank">{getMedal(rank)}</div>
      <img src={user.avatar} alt={user.name} className="leaderboard-avatar" />
      <div className="user-details">
        <h3>{user.name}</h3>
        <p className="user-email">{user.email}</p>
      </div>
      <div className="score">
        <span className="score-number">{user.score}</span>
        <span className="score-label">poin</span>
      </div>
    </div>
  );
};

export default LeaderboardItem;
