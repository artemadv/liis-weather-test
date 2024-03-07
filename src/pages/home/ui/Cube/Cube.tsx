import { FC } from 'react';

import { Header } from '../../../../widgets/header';
import { Footer } from '../../../../widgets/footer';
import { Container } from '../../../../shared/ui';
import { CubeWeather } from '../../../../widgets/cube-weather';

import styles from './Cube.module.css';

export const Cube: FC = () => {
    return (
        <div className={styles.page}>
            <Header />
            <main className={styles.page__content}>
                <Container className={styles.page__section}>
                    <h1 className={styles.page__title}>Куб 🧊 с погодой в Санкт-Петербурге </h1>
                </Container>
                <CubeWeather />
            </main>
            <Footer className={styles.page__footer} />
        </div>
    );
};
