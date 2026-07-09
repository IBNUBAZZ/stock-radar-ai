import React, { useState } from 'react';
import { useLanguage } from '../hooks/use-language';

interface SearchProps {
  onSearch: (query: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [query, setQuery] = useState('');
  const { t } = useLanguage();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 mb-4">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('search.placeholder')}
        className="flex-grow px-4 py-2 border rounded-md"
      />
      <button type="submit" className="px-6 py-2 text-white bg-blue-500 rounded-md">
        {t('search.button')}
      </button>
    </form>
  );
}
