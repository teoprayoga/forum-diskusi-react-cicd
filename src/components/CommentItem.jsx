import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import DOMPurify from 'dompurify';
import { postedAt } from '../utils/helpers';
import {
  asyncUpVoteComment,
  asyncDownVoteComment,
  upVoteCommentOptimistic,
  downVoteCommentOptimistic,
} from '../states/threadDetail/threadDetailSlice';

const CommentItem = ({ comment, threadId }) => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const isUpVoted = user && comment.upVotesBy.includes(user.id);
  const isDownVoted = user && comment.downVotesBy.includes(user.id);

  const handleUpVote = () => {
    if (!user) {
      // alert('Silakan login terlebih dahulu');
      // replace using react-toastify
      toast('Silakan login terlebih dahulu', { type: 'warning' });
      return;
    }

    dispatch(upVoteCommentOptimistic({ commentId: comment.id, userId: user.id }));
    dispatch(asyncUpVoteComment({ threadId, commentId: comment.id }));
  };

  const handleDownVote = () => {
    if (!user) {
      // alert('Silakan login terlebih dahulu');
      // replace using react-toastify
      toast('Silakan login terlebih dahulu', { type: 'warning' });
      return;
    }

    dispatch(downVoteCommentOptimistic({ commentId: comment.id, userId: user.id }));
    dispatch(asyncDownVoteComment({ threadId, commentId: comment.id }));
  };

  return (
    <div className="comment-item">
      <div className="comment-header">
        <div className="comment-owner">
          <img src={comment.owner.avatar} alt={comment.owner.name} className="avatar-small" />
          <span className="owner-name">{comment.owner.name}</span>
        </div>
        <span className="comment-time">{postedAt(comment.createdAt)}</span>
      </div>

      <div
        className="comment-content"
        dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(comment.content) }}
      />

      <div className="comment-votes">
        <button
          type="button"
          onClick={handleUpVote}
          className={`vote-button ${isUpVoted ? 'active-up' : ''}`}
        >
          👍
          {' '}
          {comment.upVotesBy.length}
        </button>
        <button
          type="button"
          onClick={handleDownVote}
          className={`vote-button ${isDownVoted ? 'active-down' : ''}`}
        >
          👎
          {' '}
          {comment.downVotesBy.length}
        </button>
      </div>
    </div>
  );
};

export default CommentItem;
