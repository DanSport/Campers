import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchVans } from "../../store/vanSlice";
import styles from "./SidebarFilters.module.css";

/**
 * Sidebar for filtering the van catalog
 * Calls onFilter callback with the current filter data
 */
export default function SidebarFilters({ onFilter }) {
  const dispatch = useDispatch();
  // retrieve last-applied filters from Redux slice
  const { savedFilters = {} } = useSelector((state) => state.vans);

  const [location, setLocation] = useState(savedFilters.location || "");
  const [options, setOptions] = useState({
    AC: savedFilters.options?.AC || false,
    Kitchen: savedFilters.options?.Kitchen || false,
    Bathroom: savedFilters.options?.Bathroom || false,
    TV: savedFilters.options?.TV || false,
    Radio: savedFilters.options?.Radio || false,
    Refrigerator: savedFilters.options?.Refrigerator || false,
    Microwave: savedFilters.options?.Microwave || false,
    Gas: savedFilters.options?.Gas || false,
    Water: savedFilters.options?.Water || false,
  });
  const [form, setForm] = useState(savedFilters.form || "");

  // input handlers
  const handleLocationChange = (e) => setLocation(e.target.value);
  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };
  const handleFormChange = (e) => setForm(e.target.value);

  // apply filters
  const handleSearch = () => {
    const filterData = { location, options, form };
    dispatch(fetchVans({ page: 1, filters: filterData }));
    if (onFilter) onFilter(filterData);
  };

  return (
    <aside className={styles.sidebar}>
      <h3>Location</h3>
      <input
        type="text"
        value={location}
        onChange={handleLocationChange}
        placeholder="e.g. Kyiv"
        className={styles.input}
      />

      <h3>Vehicle Type</h3>
      <div className={styles.choiceGroup}>
        {["Van", "FullyIntegrated", "Alcove"].map((type) => (
          <label key={type} className={styles.choiceItem}>
            <input
              type="radio"
              name="form"
              value={type}
              checked={form === type}
              onChange={handleFormChange}
            />
            {type === "FullyIntegrated" ? "Fully Integrated" : type}
          </label>
        ))}
      </div>

      <h3>Options</h3>
      <div className={styles.optionsGrid}>
        {Object.keys(options).map((opt) => (
          <label key={opt} className={styles.optionItem}>
            <input
              type="checkbox"
              name={opt}
              checked={options[opt]}
              onChange={handleOptionChange}
            />
            {opt}
          </label>
        ))}
      </div>

      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
}
