import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import PersonCard from './PersonCard';
import SearchFilters from './SearchFilters.jsx';
import { missingPeople } from '../../datas/missingPeople.js';
import styles from './SearchPage.module.css';

const ITEMS_PER_PAGE = 8;

const SearchPage = () => {
    const [filters, setFilters] = useState({
        searchTerm: '',
        sexFilter: '',
        bodyTypeFilter: '',
        hairstyleFilter: '',
        eyesColorFilter: '',
        skinColorFilter: '',
        hairColorFilter: '',
        tattooFilter: '',
        locationFilter: '',
        birthDateFilter: '',
        disappearanceDateFilter: '',
    });

    const [filteredPeople, setFilteredPeople] = useState([]);
    const { page = 1 } = useParams();
    const navigate = useNavigate();

    const handleFilterChange = (name, value) => {
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value,
        }));
    };

    useEffect(() => {
        const filtered = missingPeople.filter(person => {
            const { additionInformation, confirmationInfo } = person;
            const matchesSearchTerm = person.fullName && person.fullName.toLowerCase().includes(filters.searchTerm.toLowerCase());
            const matchesSex = filters.sexFilter ? person.sex === filters.sexFilter : true;
            const matchesBodyType = filters.bodyTypeFilter ? additionInformation.tpBody === filters.bodyTypeFilter : true;
            const matchesHairstyle = filters.hairstyleFilter ? additionInformation.tpHairstyle === filters.hairstyleFilter : true;
            const matchesEyesColor = filters.eyesColorFilter ? additionInformation.clEyes === filters.eyesColorFilter : true;
            const matchesSkinColor = filters.skinColorFilter ? additionInformation.clSkin === filters.skinColorFilter : true;
            const matchesHairColor = filters.hairColorFilter ? additionInformation.clHair === filters.hairColorFilter : true;
            const matchesTattoo = filters.tattooFilter ? filters.tattooFilter === additionInformation.tattoo : true;
            const matchesLocation = filters.locationFilter ? person.lastSeenLocation.toLowerCase().includes(filters.locationFilter.toLowerCase()) : true;
            const matchesBirthDate = filters.birthDateFilter ? person.dob === filters.birthDateFilter : true;
            const matchesDisappearanceDate = filters.disappearanceDateFilter ? new Date(person.dom) >= new Date(filters.disappearanceDateFilter) : true;
            const matchesStatus = confirmationInfo.status === 'accept';

            return matchesSearchTerm && matchesSex && matchesBodyType && matchesHairstyle && matchesEyesColor && matchesSkinColor && matchesHairColor && matchesTattoo && matchesLocation && matchesBirthDate && matchesDisappearanceDate && matchesStatus;
        });
        setFilteredPeople(filtered);
    }, [filters]);

    const totalPages = Math.ceil(filteredPeople.length / ITEMS_PER_PAGE);

    useEffect(() => {
        if (page > totalPages) {
            navigate(`/search/${totalPages > 0 ? totalPages : 1}`);
        }
    }, [page, totalPages, navigate]);

    const startIndex = (page - 1) * ITEMS_PER_PAGE;
    const selectedPeople = filteredPeople.slice(startIndex, startIndex + ITEMS_PER_PAGE);

    return (
        <div className={styles.searchPage}>
            <div className={styles.filtersSection}>
                <SearchFilters filters={filters} handleFilterChange={handleFilterChange} />
            </div>
            <div className={styles.resultsSection}>
                {filteredPeople.length === 0 ? (
                    <div className={styles.noResults}>Жодного результату не знайдено за вашими параметрами.</div>
                ) : (
                    <div className={styles.personCardsContainer}>
                        {selectedPeople.map(person => (
                            <PersonCard key={person.ID} person={person} />
                        ))}
                    </div>
                )}
                {totalPages > 1 && (
                    <div className={styles.pagination}>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <Link key={index + 1} to={`/search/${index + 1}`} className={styles.pageLink}>
                                {index + 1}
                            </Link>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchPage;
