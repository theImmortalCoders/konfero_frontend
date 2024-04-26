"use client";
import {useEffect, useState} from "react";
import SingleFormInput from "../common/Input/SingleFormInput";

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

const SearchBarLecture: React.FC<SearchComponentProps> = ({
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
        <div className="max-h-40 pt-4 overflow-y-auto">
            <div className="relative">
                <SingleFormInput
                    type="text"
                    id="searchbar"
                    name="searchbar"
                    placeholder=" "
                    value={search}
                    onChange={handleChange}
                />
                <label htmlFor="searchbar"
                       className="absolute left-0 -top-4 text-xs text-darkblue font-bold cursor-text peer-placeholder-shown:top-1 peer-placeholder-shown:text-base  peer-placeholder-shown:font-normal peer-placeholder-shown:text-blue peer-focus:text-xs peer-focus:-top-4 peer-focus:text-darkblue font-sans peer-focus:font-bold transition-all">
                    {placeholder}
                </label>
            </div>
            {results.map((item) => (
                <div
                    key={item.id}
                    onClick={() => handleSelect(item)}
                    className="w-full text-sm outline-none focus:outline-none bg-close2White text-darkblue opacity-75 cursor-pointer"
                >
                    {renderItem(item)}
                </div>
            ))}
        </div>
    );
};

export default SearchBarLecture;