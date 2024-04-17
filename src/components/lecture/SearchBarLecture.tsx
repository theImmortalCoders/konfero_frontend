"use client";
import { useEffect, useState } from "react";

interface SearchableItem {
  id: number;
  username?: string;
  email?: string;
}

interface SearchComponentProps {
  items: SearchableItem[];
  renderItem: (item: SearchableItem) => string;
  onItemSelected: (item: any) => void;
  onEmptySearch?: () => void;
  placeholder: string;
  handleReset: boolean;
  pt: number;
}

const SearchBar: React.FC<SearchComponentProps> = ({
  items,
  renderItem,
  onItemSelected,
  onEmptySearch,
  placeholder,
  handleReset,
  pt,
}) => {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState<SearchableItem[]>([]);

  useEffect(() => {
    if (handleReset) {
      setSearch("");
    }
  }, [handleReset]);

  const handleChange = (event: any) => {
    setSearch(event.target.value);

    if (event.target.value.length > 0) {
      const searchResults = items
        .filter(
          (item) =>
            (item.username &&
              item.username
                .toLowerCase()
                .includes(event.target.value.toLowerCase())) ||
            (item.email &&
              item.email
                .toLowerCase()
                .includes(event.target.value.toLowerCase()))
        )

      setResults(searchResults);
    } else {
      setResults([]);
      if (onEmptySearch !== undefined) {
        onEmptySearch();
      }
    }
  };

  const handleSelect = (item: SearchableItem) => {
    setSearch(
      (item.username ? item.username + " " : "") +
        "" +
        (item.email ? item.email : "")
    );
    setResults([]);
    onItemSelected(item);
  };

  return (
    <div className="max-h-40 overflow-y-auto">
      <input
        type="text"
        placeholder={`${placeholder}`}
        value={search}
        onChange={handleChange}
        className={`w-full pt-${pt.toString()} outline-none focus:outline-none bg-close2White text-darkblue`}
      />
      {results.map((item) => (
        <div
          key={item.id}
          onClick={() => handleSelect(item)}
          className="w-full pt-0 outline-none focus:outline-none bg-close2White text-darkblue opacity-75"
        >
          {renderItem(item)}
        </div>
      ))}
    </div>
  );
};

export default SearchBar;