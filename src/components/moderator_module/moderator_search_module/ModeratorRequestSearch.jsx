import React, { useState } from "react";

import { missingPeople } from "../../../datas/missingPeople.js";
import styles from './ModeratorRequestSearch.module.css';
import PendingRequestsSearch from "./PendingRequestsSearch.jsx";
import ReviewedRequestsSearch from "./ReviewedRequestsSearch.jsx";

export default function ModeratorRequestSearch() {
    const [people, setPeople] = useState(missingPeople);

    const handleUpdate = (updatedPeople) => {
        setPeople(updatedPeople);
    };

    return (
        <div className={styles.container}>
            <PendingRequestsSearch onUpdate={handleUpdate} />
            <ReviewedRequestsSearch />
        </div>
    );
}
