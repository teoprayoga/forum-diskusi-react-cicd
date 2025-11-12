import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncGetThreads } from '../states/threads/threadsSlice';
import { asyncGetUsers } from '../states/users/usersSlice';
import ThreadItem from '../components/ThreadItem';
import LoadingSpinner from '../components/LoadingSpinner';
import CategoryFilter from '../components/CategoryFilter';

const HomePage = () => {
  const dispatch = useDispatch();
  const { threads, isLoading } = useSelector((state) => state.threads);
  const { users } = useSelector((state) => state.users);
  const [selectedCategory, setSelectedCategory] = useState('');

  useEffect(() => {
    dispatch(asyncGetThreads());
    dispatch(asyncGetUsers());
  }, [dispatch]);

  const threadsWithOwner = useMemo(() => {
    if (!threads.length || !users.length) return [];

    return threads.map((thread) => ({
      ...thread,
      owner: users.find((user) => user.id === thread.ownerId) || {
        id: thread.ownerId,
        name: 'Unknown',
        avatar: '',
      },
    }));
  }, [threads, users]);

  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(threadsWithOwner.map((thread) => thread.category))];
    return uniqueCategories.filter((cat) => cat);
  }, [threadsWithOwner]);

  const filteredThreads = useMemo(() => {
    if (!selectedCategory) return threadsWithOwner;
    return threadsWithOwner.filter((thread) => thread.category === selectedCategory);
  }, [threadsWithOwner, selectedCategory]);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="home-page">
      <div className="page-header">
        <h2>Diskusi Terbaru</h2>
        <p>Temukan berbagai topik diskusi menarik</p>
      </div>

      {categories.length > 0 && (
        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelectCategory={setSelectedCategory}
        />
      )}

      <div className="threads-container">
        {filteredThreads.length === 0 ? (
          <div className="empty-state">
            <p>Belum ada thread tersedia.</p>
          </div>
        ) : (
          filteredThreads.map((thread) => (
            <ThreadItem key={thread.id} thread={thread} />
          ))
        )}
      </div>
    </div>
  );
};

export default HomePage;
