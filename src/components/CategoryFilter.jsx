const CategoryFilter = ({ categories, selectedCategory, onSelectCategory }) => (
  <div className="category-filter">
    <button
      type="button"
      onClick={() => onSelectCategory('')}
      className={`category-btn ${selectedCategory === '' ? 'active' : ''}`}
    >
      Semua
    </button>
    {categories.map((category) => (
      <button
        key={category}
        type="button"
        onClick={() => onSelectCategory(category)}
        className={`category-btn ${selectedCategory === category ? 'active' : ''}`}
      >
        #{category}
      </button>
    ))}
  </div>
);

export default CategoryFilter;
