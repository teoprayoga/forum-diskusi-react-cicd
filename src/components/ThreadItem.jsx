import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { postedAt } from '../utils/helpers';
import {
  asyncUpVoteThread,
  asyncDownVoteThread,
  asyncNeutralVoteThread,
  upVoteThreadOptimistic,
  downVoteThreadOptimistic,
} from '../states/threads/threadsSlice';

const ThreadItem = ({ thread }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isUpVoted = user && thread.upVotesBy.includes(user.id);
  const isDownVoted = user && thread.downVotesBy.includes(user.id);

  const handleUpVote = (e) => {
    e.preventDefault();
    if (!user) {
      // alert('Silakan login terlebih dahulu');
      // replace using react-toastify
      toast('Silakan login terlebih dahulu', { type: 'warning' });
      return;
    }

    dispatch(upVoteThreadOptimistic({ threadId: thread.id, userId: user.id }));

    if (isUpVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncUpVoteThread(thread.id));
    }
  };

  const handleDownVote = (e) => {
    e.preventDefault();
    if (!user) {
      // alert('Silakan login terlebih dahulu');
      // replace using react-toastify
      toast('Silakan login terlebih dahulu', { type: 'warning' });
      return;
    }

    dispatch(downVoteThreadOptimistic({ threadId: thread.id, userId: user.id }));

    if (isDownVoted) {
      dispatch(asyncNeutralVoteThread(thread.id));
    } else {
      dispatch(asyncDownVoteThread(thread.id));
    }
  };

  return (
    <Link to={`/threads/${thread.id}`} className="thread-item">
      <div className="thread-header">
        <div className="thread-category">
          #
          {thread.category}
        </div>
        <div className="thread-owner">
          <img src={thread.owner.avatar} alt={thread.owner.name} className="avatar-small" />
          <span>{thread.owner.name}</span>
        </div>
      </div>

      <h3 className="thread-title">{thread.title}</h3>
      <div
        className="thread-body"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(thread.body.substring(0, 150)) }}
      />

      <div className="thread-footer">
        <div className="thread-votes">
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
        <div className="thread-meta">
          <span>
            💬
            {thread.totalComments}
          </span>
          <span>{postedAt(thread.createdAt)}</span>
        </div>
      </div>
    </Link>
  );
};

export default ThreadItem;
