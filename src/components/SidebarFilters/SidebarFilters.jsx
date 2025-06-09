// src/components/SidebarFilters/SidebarFilters.jsx
import { useState, useEffect } from "react"; 
import { useDispatch, useSelector } from "react-redux";
import { fetchVans } from "../../store/vanSlice";
import styles from "./SidebarFilters.module.css";


const optionIcons = {
  AC: "icon-ac",
  Automatic: "icon-automatic",
  Kitchen: "icon-kitchen",
  TV: "icon-tv",
  Bathroom: "icon-bathroom", 
};

const vehicleTypeIcons = {
  Van: "icon-van",
  "Fully Integrated": "icon-fully-integrated", 
  Alcove: "icon-alcove",
};

export default function SidebarFilters({ onFilter }) {
  const dispatch = useDispatch();
  
  const { savedFilters = {} } = useSelector((state) => state.vans);

  const [location, setLocation] = useState(savedFilters.location || "");

  
  const [options, setOptions] = useState({
    AC: savedFilters.options?.AC || false,
    Automatic: savedFilters.options?.Automatic || false,
    Kitchen: savedFilters.options?.Kitchen || false,
    TV: savedFilters.options?.TV || false,
    Bathroom: savedFilters.options?.Bathroom || false, 
  });

  
  const [vehicleType, setVehicleType] = useState(savedFilters.form || ""); 

  
  useEffect(() => {
    setLocation(savedFilters.location || "");
    setOptions({
      AC: savedFilters.options?.AC || false,
      Automatic: savedFilters.options?.Automatic || false,
      Kitchen: savedFilters.options?.Kitchen || false,
      TV: savedFilters.options?.TV || false,
      Bathroom: savedFilters.options?.Bathroom || false,
    });
    setVehicleType(savedFilters.form || "");
  }, [savedFilters]);

  const handleLocationChange = (e) => setLocation(e.target.value);

  const handleOptionChange = (e) => {
    setOptions({ ...options, [e.target.name]: e.target.checked });
  };

  const handleVehicleTypeChange = (e) => {
    
    setVehicleType((prevType) =>
      prevType === e.target.name ? "" : e.target.name
    );
  };

  const handleSearch = () => {
    const filterData = {
      location,
      options, 
      form: vehicleType, 
    };

    dispatch(fetchVans({ page: 1, filters: filterData }));
    if (onFilter) onFilter(filterData);
  };

 
  const handleClearFilters = () => {
    setLocation("");
    setOptions({
      AC: false,
      Automatic: false,
      Kitchen: false,
      TV: false,
      Bathroom: false,
      Microwave: false,
    });
    setVehicleType(""); 
    
    dispatch(
      fetchVans({ page: 1, filters: { location: "", options: {}, form: "" } })
    );
  };

  return (
    <aside className={styles.sidebar}>
      <h3>Location</h3>
      <div className={styles.locationWrapper}>
        <svg className={styles.icon}>
          <use href="/images/icons.svg#icon-map"></use>
        </svg>
        <input
          type="text"
          value={location}
          onChange={handleLocationChange}
          placeholder="Kyiv, Ukraine"
          className={styles.inputFieldWithIcon}
        />
      </div>
      <h3 className={styles.filtersTitle}>Filters</h3>{" "}
      {}
      <div className={styles.filterGroup}>
        {" "}
        {}
        <h3>Vehicle equipment</h3>
        <hr className={styles.line} />
        <button onClick={handleClearFilters} className={styles.clearAllButton}>
          Clear All
        </button>{" "}
        {}
      </div>
      <div className={styles.filterGrid}>
        {Object.keys(options).map((opt) => (
          <label
            key={opt}
            className={`${styles.filterItem} ${
              options[opt] ? styles.selected : ""
            }`}
          >
            <input
              type="checkbox"
              name={opt}
              checked={options[opt]}
              onChange={handleOptionChange}
              className={styles.checkbox}
            />
            <svg className={styles.icon}>
              <use href={`/images/icons.svg#${optionIcons[opt]}`}></use>
            </svg>
            <span>
              {}
              {opt === "FullyIntegrated"
                ? "Fully Integrated"
                : opt === "Automatic"
                ? "Automatic"
                : opt}
            </span>
          </label>
        ))}
      </div>
      <h3>Vehicle type</h3>
      <hr className={styles.line} />
      <div className={styles.filterGrid}>
        {Object.keys(vehicleTypeIcons).map(
          (
            type 
          ) => (
            <label
              key={type}
              data-name={type}
              className={`${styles.filterItem} ${
                vehicleType === type ? styles.selected : "" 
              }`}
            >
              <input
                type="checkbox" 
                name={type}
                        checked={vehicleType === type} 
                        
                onChange={handleVehicleTypeChange}
                className={styles.checkbox}
              />
              <svg className={styles.icon}>
                <use href={`/images/icons.svg#${vehicleTypeIcons[type]}`}></use>
              </svg>
              <span>
                {type === "FullyIntegrated" ? "Fully Integrated" : type}
              </span>
            </label>
          )
        )}
      </div>
      <button className={styles.searchButton} onClick={handleSearch}>
        Search
      </button>
    </aside>
  );
}
