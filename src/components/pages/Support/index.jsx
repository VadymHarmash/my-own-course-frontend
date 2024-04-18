import React from 'react';
import styles from './styles/index.module.scss';
import { contacts } from './contacts';

export default function Support() {
    return (
        <div className={styles.support}>
            <div className="container">
                <div className={styles.support__wrapper}>
                    <h1>За питаннями ви можете звернутись до нас в:</h1>
                    <table>
                        <thead>
                            <tr>
                                {contacts.map(contact => (
                                    <th key={contact.service}>
                                        <div>
                                            <img src={contact.icon} alt={contact.service} />
                                            <span>{contact.service}</span>
                                        </div>
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                {contacts.map(contact => (
                                    <td key={contact.service}>
                                        <a href={contact.link} target='_blank'>{contact.text}</a>
                                    </td>
                                ))}
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
