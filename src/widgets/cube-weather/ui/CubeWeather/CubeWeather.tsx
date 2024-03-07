/* eslint-disable react/no-unknown-property */
import { FC } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { clsx } from 'clsx';

import { Button, Container } from '../../../../shared/ui';
import { MeteoData, useMeteoQuery } from '../../../../shared/api';
import { Skeleton } from '../Skeleton';
import { useGetCanvasCubeSidesWithWeather } from '../../lib/hooks/use-get-canvas-cube-sides-with-weather';

import styles from './CubeWeather.module.css';

enum Role {
    IsLoading = 'IsLoading',
    HasError = 'HasError',
    CanShowContent = 'CanShowContent',
}

const calculateWidgetRole = ({
    isLoading,
    hasError,
}: {
    isLoading: boolean;
    hasError: boolean;
}) => {
    if (hasError) {
        return Role.HasError;
    }

    if (isLoading) {
        return Role.IsLoading;
    }

    return Role.CanShowContent;
};

const Box: FC<{ days: MeteoData['days'] }> = ({ days }) => {
    const refs = useGetCanvasCubeSidesWithWeather(days);

    return (
        <mesh scale={3.5}>
            <boxGeometry />
            {refs.map((ref, index) => (
                <meshBasicMaterial key={index} attach={`material-${index}`}>
                    <canvasTexture attach="map" image={ref.current} />
                </meshBasicMaterial>
            ))}
        </mesh>
    );
};

export const CubeWeather: FC = () => {
    const { isLoading, data, hasError, refetch } = useMeteoQuery();
    const { days } = data;

    const role = calculateWidgetRole({ isLoading, hasError });

    return (
        <section>
            <Container>
                {role === Role.HasError && (
                    <>
                        <h3 className={styles.widget__errorTitle}>Ошибка загрузки данных</h3>
                        <Button className={styles.widget__errorButton} onClick={refetch}>
                            Попробовать еще раз
                        </Button>
                    </>
                )}
                {role === Role.IsLoading && (
                    <div className={styles.widget}>
                        <div
                            className={clsx(
                                styles.widget__cubeWrapper,
                                styles.widget__cubeWrapper_theme_skeleton,
                            )}
                        >
                            <Skeleton />
                        </div>
                    </div>
                )}
                {role === Role.CanShowContent && (
                    <div className={styles.widget}>
                        <div className={styles.widget__cubeWrapper}>
                            <Canvas flat camera={{ position: [3.5, 0, 3.5] }}>
                                <Box days={days} />
                                <OrbitControls makeDefault enableZoom={false} />
                            </Canvas>
                        </div>
                    </div>
                )}
            </Container>
        </section>
    );
};
