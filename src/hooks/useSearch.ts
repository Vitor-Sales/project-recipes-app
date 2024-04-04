import { useState, ChangeEvent } from 'react';

interface SearchState {
  [key: number]: number;
}

// adaptação de função generica para Buscas
function useSearch<StateSearch extends SearchState>(initialState: StateSearch): {
  search: StateSearch; // O estado atual de busca
  handleSearch: (event: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  resetSearch: () => void;
} {
  const [search, setSearch] = useState<StateSearch>(initialState);

  const handleSearch = (
    event: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    // Atualiza o estado de busca usando a função de atualização do useState
    setSearch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const resetSearch = () => {
    setSearch(initialState);
  };

  return {
    search,
    handleSearch,
    resetSearch,
  };
}

export default useSearch;
