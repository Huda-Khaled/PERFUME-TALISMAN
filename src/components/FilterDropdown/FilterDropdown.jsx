import { useState, useMemo } from "react";

const FilterDropdown = ({ packages = [], children }) => {
  const [filter, setFilter] = useState("default");

  const sortedPackages = useMemo(() => {
    if (filter === "low-to-high")
      return [...packages].sort((a, b) => a.price - b.price);
    if (filter === "high-to-low")
      return [...packages].sort((a, b) => b.price - a.price);
    return packages;
  }, [packages, filter]);

  const FilterUI = (
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="border border-brand  px-4 py-2 text-sm bg-white"
    >
      <option value="default">مقترحاتنا</option>
      <option value="low-to-high">الأقل سعراً</option>
      <option value="high-to-low">الأعلى سعراً</option>
    </select>
  );

  return children(sortedPackages, FilterUI);
};

export default FilterDropdown;
