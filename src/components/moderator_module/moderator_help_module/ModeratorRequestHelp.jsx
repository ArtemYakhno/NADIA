import React, { useState } from "react";
import PendingRequestsHelp from "./PendingRequestsHelp.jsx";
import ReviewedRequestsHelp from "./ReviewedRequestsHelp.jsx";
import { helpRequest } from "../../../datas/helpRequest.js";
import styles from './ModeratorRequestHelp.module.css';

export default function ModeratorRequestHelp() {
    const [requests, setRequests] = useState(helpRequest);

    const handleUpdate = (updatedRequests) => {
        setRequests(updatedRequests);
    };

    return (
        <div className={styles.container}>
            <PendingRequestsHelp onUpdate={handleUpdate} />
            <ReviewedRequestsHelp />
        </div>
    );
}
