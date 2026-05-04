import "./CategoryFilter.css";

export default function CategoryFilter({ categories, selected, onSelect }) {
  return (
    <div className="cat-filter" role="navigation" aria-label="Filter by category">
      <button
        className={`cat-filter__pill ${selected === "" ? "cat-filter__pill--active" : ""}`}
        onClick={() => onSelect("")}
      >
        All
      </button>

      {categories.map((cat) => (
        <button
          key={cat}
          className={`cat-filter__pill ${selected === cat ? "cat-filter__pill--active" : ""}`}
          onClick={() => onSelect(cat)}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}
