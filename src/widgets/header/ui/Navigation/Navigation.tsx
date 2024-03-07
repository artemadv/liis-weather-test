import { FC } from 'react';
import clsx from 'clsx';
import { NavLink } from 'react-router-dom';

import styles from './Navigation.module.css';

type Navigation = {
    className?: string;
};

export const Navigation: FC<Navigation> = ({ className }) => {
    return (
        <nav className={clsx(styles.navigation, className)}>
            <ul className={styles.navigation__list}>
                <li>
                    <NavLink className={styles.navigation__link} to="/">
                        Погода на 7 дней
                    </NavLink>
                </li>
                <li>
                    <NavLink className={styles.navigation__link} to="/cube">
                        Куб с погодой
                    </NavLink>
                </li>
            </ul>
        </nav>
    );
};
