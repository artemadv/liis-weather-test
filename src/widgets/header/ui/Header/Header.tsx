import { FC } from 'react';
import { NavLink } from 'react-router-dom';

import { Col, Container, Row } from '../../../../shared/ui';
import { Navigation } from '../Navigation';

import styles from './Header.module.css';

export const Header: FC = () => {
    return (
        <header className={styles.header}>
            <Container>
                <Row align="center">
                    <Col size={{ mediaDesktop: 4 }}>
                        <NavLink to="/" className={styles.header__logo}>
                            ☀️ ЛИИС.Погода
                        </NavLink>
                    </Col>
                    <Col size={{ mediaDesktop: 8 }}>
                        <Navigation className={styles.header__navigation} />
                    </Col>
                </Row>
            </Container>
        </header>
    );
};
