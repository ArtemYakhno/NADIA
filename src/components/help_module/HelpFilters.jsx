import React from 'react';
import styles from './HelpFilters.module.css';

const HelpFilters = ({ filters, handleFilterChange }) => {
    return (
        <div className={styles.filtersContainer}>
            <div>
                <p>Пошук за темою:</p>
                <div className={styles.filter}>
                    <input
                        type="text"
                        placeholder="Пошук за темою..."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p>Категорія допомоги:</p>
                <div className={styles.filter}>
                    <select value={filters.categoryFilter} onChange={(e) => handleFilterChange('categoryFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Матеріальна">Матеріальна</option>
                        <option value="Психологічна">Психологічна</option>
                        <option value="Медична">Медична</option>
                    </select>
                </div>
            </div>
        </div>
    );
};

export default HelpFilters;
