import React, { useState, useEffect } from 'react';
import styles from './SearchFilters.module.css';

const SearchFilters = ({ filters, handleFilterChange }) => {
    return (
        <div className={styles.filtersContainer}>
            <div>
                <p>Пошук за ПІБ:</p>
                <div className={styles.filter}>
                    <input
                        type="text"
                        placeholder="Пошук за ПІБ..."
                        value={filters.searchTerm}
                        onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p>Стать:</p>
                <div className={styles.filter}>
                    <select value={filters.sexFilter} onChange={(e) => handleFilterChange('sexFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Чоловіча">Чоловіча</option>
                        <option value="Жіноча">Жіноча</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Тип тіла:</p>
                <div className={styles.filter}>
                    <select value={filters.bodyTypeFilter} onChange={(e) => handleFilterChange('bodyTypeFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Худе">Худе</option>
                        <option value="Середнє">Середнє</option>
                        <option value="Повне">Повне</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Тип зачіски:</p>
                <div className={styles.filter}>
                    <select value={filters.hairstyleFilter} onChange={(e) => handleFilterChange('hairstyleFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Коротке">Коротке</option>
                        <option value="Довге">Довге</option>
                        <option value="Кучеряве">Кучеряве</option>
                        <option value="Відсутнє">Відсутнє</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Колір очей:</p>
                <div className={styles.filter}>
                    <select value={filters.eyesColorFilter} onChange={(e) => handleFilterChange('eyesColorFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Блакитні">Блакитні</option>
                        <option value="Карі">Карі</option>
                        <option value="Чорні">Чорні</option>
                        <option value="Жовті">Жовті</option>
                        <option value="Зелені">Зелені</option>
                        <option value="Кольорові">Кольорові</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Тип шкіри</p>
                <div className={styles.filter}>
                    <select value={filters.skinColorFilter} onChange={(e) => handleFilterChange('skinColorFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Світлий">Світлий</option>
                        <option value="Темний">Темний</option>
                        <option value="Дуже світлий">Дуже світлий</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Колір волосся:</p>
                <div className={styles.filter}>
                    <select value={filters.hairColorFilter} onChange={(e) => handleFilterChange('hairColorFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="Коричневий">Коричневий</option>
                        <option value="Чорне">Чорне</option>
                        <option value="Руде">Руде</option>
                        <option value="Біле">Біле</option>
                        <option value="Кольорове">Кольорове</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Наявність тату:</p>
                <div className={styles.filter}>
                    <select value={filters.tattooFilter} onChange={(e) => handleFilterChange('tattooFilter', e.target.value)}>
                        <option value="">Всі</option>
                        <option value="true">З татуюванням</option>
                        <option value="false">Без татуювання</option>
                    </select>
                </div>
            </div>
            <div>
                <p>Місце зникнення:</p>
                <div className={styles.filter}>
                    <input
                        type="text"
                        placeholder="Місце зникнення..."
                        value={filters.locationFilter}
                        onChange={(e) => handleFilterChange('locationFilter', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p>Дата народження:</p>
                <div className={styles.filter}>
                    <input
                        type="date"
                        value={filters.birthDateFilter}
                        onChange={(e) => handleFilterChange('birthDateFilter', e.target.value)}
                    />
                </div>
            </div>
            <div>
                <p>Дата зникнення від:</p>
                <div className={styles.filter}>
                    <input
                        type="date"
                        value={filters.disappearanceDateFilter}
                        onChange={(e) => handleFilterChange('disappearanceDateFilter', e.target.value)}
                    />
                </div>
            </div>
        </div>
    );
};

export default SearchFilters;
