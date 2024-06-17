import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import HelpCard from './HelpCard';
import HelpFilters from './HelpFilters.jsx';
import { helpRequest } from '../../datas/helpRequest.js';
import styles from './HelpPage.module.css';

const ITEMS_PER_PAGE = 8;

const HelpPage = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        categoryFilter: '',
    });

    const [filteredHelp, setFilteredHelp] = useState([]);
    const { page = 1 } = useParams();
    const navigate = useNavigate();

    const handleFilterChange = (name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    useEffect(() => {
        const filtered = helpRequest.filter(help => {
            const matchesSearchTerm = help.topic && help.topic.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesCategory = filters.categoryFilter ? help.type === filters.categoryFilter : true;
            const matchesStatus = help.confirmationInfo.status === 'accept';

            return matchesSearchTerm && matchesCategory && matchesStatus;
        });
        setFilteredHelp(filtered);
    }, [filters]);

    const totalPages = Math.ceil(filteredHelp.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (page > totalPages) {
            navigate(`/help/${totalPages > 0 ? totalPages : 1}`);
        }
    }, [page, totalPages, navigate]);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const selectedHelp = filteredHelp.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={styles.helpPage}>
            <div className={styles.filtersSection}>
                <HelpFilters filters={filters} handleFilterChange={handleFilterChange} />
            </div>
            <div className={styles.resultsSection}>
                {filteredHelp.length === 0 ? (
                    <div className={styles.noResults}>Жодного результату не знайдено за вашими параметрами.</div>
                ) : (
                    <div className={styles.helpCardsContainer}>
                        {selectedHelp.map(help => (
                            <HelpCard key={help.helpRequestID} help={help} />
                        ))}
                    </div>
                )}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Link key={index + 1} to={`/help/${index + 1}`} className={styles.pageLink}>
                                {index + 1}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default HelpPage;
