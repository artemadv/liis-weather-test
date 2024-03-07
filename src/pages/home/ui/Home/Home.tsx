import { FC } from 'react';

import { Header } from '../../../../widgets/header';
import { Footer } from '../../../../widgets/footer';
import { Container } from '../../../../shared/ui';
import { WeekWeather } from '../../../../widgets/week-weather';

import styles from './Home.module.css';

export const Home: FC = () => {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.page__content}>
                <Container className={styles.page__section}>
                    <h1 className={styles.page__title}>Погода в Санкт-Петербурге на 7 дней</h1>
                </Container>
                <WeekWeather />
            </main>
            <Footer className={styles.page__footer} />
        </div>
    );
};
