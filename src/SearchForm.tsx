// Path : src/SearchForm.tsx
import React, { useState } from 'react';
import './App.css';

type SearchFormProps = {
  onSearch: (year: string, region: string) => void;
};

const SearchForm: React.FC<SearchFormProps> = ({ onSearch }) => {
  const [searchYear, setSearchYear] = useState('');
  const [searchRegion, setSearchRegion] = useState('');

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSearch(searchYear, searchRegion);
  };

  return (
    <form onSubmit={handleSearch} className="flex space-x-2 mb-4">
      <select
        value={searchYear}
        onChange={(e) => setSearchYear(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded"
      >
        <option value="">Année de publication</option>
        {[2018, 2019, 2020, 2021, 2022].map((year) => (
          <option key={year} value={String(year)}>
            {year}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Nom de région"
        value={searchRegion}
        onChange={(e) => setSearchRegion(e.target.value)}
        className="px-4 py-2 border border-gray-300 rounded"
      />
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300">
        Rechercher
      </button>
    </form>
  );
};

export default SearchForm;
