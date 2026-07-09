import React, { useState } from 'react';
import { Products } from './components/Products';
import { Search } from './components/Search';
import { LanguageSwitcher } from './components/LanguageSwitcher';
import { LanguageProvider } from './hooks/use-language';
import { MOCK_PRODUCTS, SMART_SEARCH_MAP } from './constants/data';

function App() {
  const [products, setProducts] = useState(MOCK_PRODUCTS);

  const handleSearch = (query: string) => {
    if (!query) {
      setProducts(MOCK_PRODUCTS);
      return;
    }
    const lowerCaseQuery = query.toLowerCase();
    const searchResult = MOCK_PRODUCTS.filter(p => p.name.toLowerCase().includes(lowerCaseQuery) || p.name_ha?.toLowerCase().includes(lowerCaseQuery));
    setProducts(searchResult);
  };

  return (
    <LanguageProvider>
      <div className="container p-4 mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold">StockNear</h1>
          <LanguageSwitcher />
        </div>
        <Search onSearch={handleSearch} />
        <Products products={products} />
      </div>
    </LanguageProvider>
  );
}

export default App;
