// SearchForm.tsx
import React, { useState } from 'react';

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
    <form onSubmit={handleSearch}>
      <input
        type="text"
        placeholder="Année de publication"
        value={searchYear}
        onChange={(e) => setSearchYear(e.target.value)}
      />
      <input
        type="text"
        placeholder="Nom de région"
        value={searchRegion}
        onChange={(e) => setSearchRegion(e.target.value)}
      />
      <button type="submit">Rechercher</button>
    </form>
  );
};

export default SearchForm;
