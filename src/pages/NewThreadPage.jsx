import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { asyncCreateThread } from '../states/threads/threadsSlice';
import LoadingSpinner from '../components/LoadingSpinner';

const NewThreadPage = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [category, setCategory] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { isLoading } = useSelector((state) => state.threads);

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !body.trim()) {
      alert('Judul dan isi thread harus diisi');
      return;
    }

    const result = await dispatch(asyncCreateThread({ title, body, category }));

    if (result.payload?.thread) {
      alert('Thread berhasil dibuat!');
      navigate('/');
    }
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="new-thread-page">
      <div className="new-thread-container">
        <h2>Buat Thread Baru</h2>
        <p className="page-subtitle">Bagikan topik diskusi Anda</p>

        <form onSubmit={handleSubmit} className="thread-form">
          <div className="form-group">
            <label htmlFor="title">
              Judul Thread
              <input
                type="text"
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Masukkan judul thread..."
                required
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="category">
              Kategori (opsional)
              <input
                type="text"
                id="category"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                placeholder="Contoh: teknologi, programming, tips"
              />
            </label>
          </div>

          <div className="form-group">
            <label htmlFor="body">
              Isi Thread
              <textarea
                id="body"
                value={body}
                onChange={(e) => setBody(e.target.value)}
                placeholder="Tuliskan isi thread Anda..."
                rows="10"
                required
              />
            </label>
          </div>

          <div className="form-actions">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="btn-cancel"
            >
              Batal
            </button>
            <button type="submit" className="btn-submit">
              Posting Thread
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewThreadPage;
