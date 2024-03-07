import { FC } from 'react';

import { Button, Col, Container, Row } from '../../../../shared/ui';
import { WeatherCard, WeatherDay } from '../../../../entities/weather';
import { useMeteoQuery } from '../../../../shared/api';
import { useFindWeatherDay } from '../../../../features/find-weather-day';
import { Skeleton } from '../Skeleton';

import styles from './WeekWeather.module.css';

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

export const WeekWeather: FC = () => {
    const { isLoading, data, hasError, refetch } = useMeteoQuery();
    const { currentDay, days } = data;

    const { setTargetDate, targetDay } = useFindWeatherDay(days);
    const role = calculateWidgetRole({ isLoading, hasError });

    return (
        <section>
            <Container>
                <Row>
                    <Col size={{ mediaDesktop: 9 }}>
                        {role === Role.IsLoading && <Skeleton />}
                        {role === Role.HasError && (
                            <>
                                <h3 className={styles.widget__errorTitle}>
                                    Ошибка загрузки данных
                                </h3>
                                <Button className={styles.widget__errorButton} onClick={refetch}>
                                    Попробовать еще раз
                                </Button>
                            </>
                        )}
                        {role === Role.CanShowContent && (
                            <div className={styles.widget}>
                                <Row>
                                    <Col order={{ mediaDesktop: 2 }} size={{ mediaDesktop: 4 }}>
                                        <WeatherCard
                                            className={styles.widget__card}
                                            theme="currentDay"
                                            {...currentDay}
                                        />
                                    </Col>
                                    <Col order={{ mediaDesktop: 1 }} size={{ mediaDesktop: 8 }}>
                                        <WeatherCard
                                            className={styles.widget__card}
                                            {...(targetDay ?? days[0])}
                                        />
                                    </Col>
                                </Row>

                                <ul className={styles.widget__list}>
                                    {days.map((day) => (
                                        <li key={day.day}>
                                            <WeatherDay
                                                {...day}
                                                onClick={() => {
                                                    setTargetDate(day.day);
                                                }}
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </section>
    );
};
