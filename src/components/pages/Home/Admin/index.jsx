import React from 'react';
import Panel from './Panel';
import List from './List';

export default function Admin({ styles }) {
    return (
        <div className={styles.home__admin}>
            <Panel styles={styles} />
            <List styles={styles} />
        </div>
    )
}
