import { FC } from 'react';
import clsx from 'clsx';

import { Meteo } from '../../../../shared/api';
import { WeatherIcon } from '../WetherIcon/WetherIcon';

import styles from './WeatherCard.module.css';

type WeatherCard = {
    theme?: 'currentDay' | 'day';
    className?: string;
} & Meteo;

const CLASS_NEME_MAPPER = {
    currentDay: styles.card_theme_currentDay,
    day: styles.card_theme_day,
} as const;

export const WeatherCard: FC<WeatherCard> = (props) => {
    const { className, temperatureMax, day, degree, theme = 'day', weatherCode } = props;

    return (
        <div className={clsx(styles.card, className, CLASS_NEME_MAPPER[theme])}>
            {Boolean(temperatureMax && degree) && (
                <p className={clsx(styles.card__temperature, styles.card__text)}>
                    {String(weatherCode) && (
                        <WeatherIcon
                            className={styles.card__icon}
                            weatherCode={weatherCode as number}
                        />
                    )}
                    {temperatureMax}
                    {degree}
                </p>
            )}

            <div className={styles.card__info}>
                {theme === 'currentDay' && (
                    <span className={clsx(styles.card__label, styles.card__text)}>
                        Температура сейчас
                    </span>
                )}

                {theme === 'day' && (
                    <>
                        <p className={clsx(styles.card__city, styles.card__text)}>
                            Санкт-Петербург
                        </p>
                        {Boolean(day) && (
                            <p className={clsx(styles.card__day, styles.card__text)}>{day}</p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
};
