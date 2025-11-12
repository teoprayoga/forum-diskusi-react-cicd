import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import {
  asyncGetThreadDetail,
  asyncCreateComment,
  asyncUpVoteThreadDetail,
  asyncDownVoteThreadDetail,
  asyncNeutralVoteThreadDetail,
  upVoteThreadDetailOptimistic,
  downVoteThreadDetailOptimistic,
  clearThreadDetail,
} from '../states/threadDetail/threadDetailSlice';
import { postedAt } from '../utils/helpers';
import LoadingSpinner from '../components/LoadingSpinner';
import CommentItem from '../components/CommentItem';

const ThreadDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { thread, isLoading } = useSelector((state) => state.threadDetail);
  const { user } = useSelector((state) => state.auth);
  const [comment, setComment] = useState('');

  useEffect(() => {
    dispatch(asyncGetThreadDetail(id));

    return () => {
      dispatch(clearThreadDetail());
    };
  }, [dispatch, id]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();

    if (!user) {
      alert('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    if (!comment.trim()) {
      alert('Komentar tidak boleh kosong');
      return;
    }

    dispatch(asyncCreateComment({ threadId: id, content: comment }));
    setComment('');
  };

  const isUpVoted = user && thread && thread.upVotesBy.includes(user.id);
  const isDownVoted = user && thread && thread.downVotesBy.includes(user.id);

  const handleUpVote = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    dispatch(upVoteThreadDetailOptimistic({ userId: user.id }));

    if (isUpVoted) {
      dispatch(asyncNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncUpVoteThreadDetail(id));
    }
  };

  const handleDownVote = () => {
    if (!user) {
      alert('Silakan login terlebih dahulu');
      navigate('/login');
      return;
    }

    dispatch(downVoteThreadDetailOptimistic({ userId: user.id }));

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThreadDetail(id));
    } else {
      dispatch(asyncDownVoteThreadDetail(id));
    }
  };

  if (isLoading || !thread) {
    return <LoadingSpinner />;
  }

  return (
    <div className="thread-detail-page">
      <div className="thread-detail-container">
        <div className="thread-category-tag">
          #
          {thread.category}
        </div>

        <h1 className="thread-detail-title">{thread.title}</h1>

        <div className="thread-detail-owner">
          <img src={thread.owner.avatar} alt={thread.owner.name} className="avatar-medium" />
          <div>
            <p className="owner-name">{thread.owner.name}</p>
            <p className="thread-time">{postedAt(thread.createdAt)}</p>
          </div>
        </div>

        <div
          className="thread-detail-body"
          dangerouslySetInnerHTML={{ __html: thread.body }}
        />

        <div className="thread-detail-votes">
          <button
            type="button"
            onClick={handleUpVote}
            className={`vote-button ${isUpVoted ? 'active-up' : ''}`}
          >
            👍
            {' '}
            {thread.upVotesBy.length}
          </button>
          <button
            type="button"
            onClick={handleDownVote}
            className={`vote-button ${isDownVoted ? 'active-down' : ''}`}
          >
            👎
            {' '}
            {thread.downVotesBy.length}
          </button>
        </div>
      </div>

      <div className="comments-section">
        <h2>
          Komentar (
          {thread.comments.length}
          )
        </h2>

        {user && (
          <form onSubmit={handleCommentSubmit} className="comment-form">
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Tulis komentar Anda..."
              rows="4"
              className="comment-textarea"
            />
            <button type="submit" className="btn-submit">
              Kirim Komentar
            </button>
          </form>
        )}

        <div className="comments-list">
          {thread.comments.length === 0 ? (
            <p className="no-comments">Belum ada komentar. Jadilah yang pertama!</p>
          ) : (
            thread.comments.map((commentItem) => (
              <CommentItem
                key={commentItem.id}
                comment={commentItem}
                threadId={thread.id}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default ThreadDetailPage;
