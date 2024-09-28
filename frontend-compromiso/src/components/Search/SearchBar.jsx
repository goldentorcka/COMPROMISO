import React, { useState } from 'react';
import '../styles/SearchBar.css'; // Asegúrate de tener este archivo CSS

const SearchBar = ({ data, onSearch, searchField }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const handleSearch = (e) => {
        const term = e.target.value;
        setSearchTerm(term);
        onSearch(term); // Pasar el término de búsqueda al componente padre
    };

    const filteredData = data.filter(item => {
        if (!searchField) return true; // Si no se especifica searchField, no filtra
        return item[searchField]?.toLowerCase().includes(searchTerm.toLowerCase());
    });

    return (
        <div className="search-bar">
            <input
                type="text"
                placeholder={`Buscar por ${searchField}...`}
                value={searchTerm}
                onChange={handleSearch}
                className="search-input"
            />
            <i className="fas fa-search search-icon" />
        </div>
    );
};

export default SearchBar;
