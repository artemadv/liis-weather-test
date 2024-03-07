import { FC } from 'react';
import clsx from 'clsx';

import { Meteo } from '../../../../shared/api';
import { WeatherIcon } from '../WetherIcon/WetherIcon';

import styles from './WeatherDay.module.css';

type WeatherDay = {
    className?: string;
    onClick?: () => void;
} & Meteo;

export const WeatherDay: FC<WeatherDay> = (props) => {
    const { className, temperatureMax, temperatureMin, day, degree, weatherCode, onClick } = props;

    return (
        <button className={clsx(styles.card, className)} onClick={onClick}>
            {String(weatherCode) && (
                <WeatherIcon className={styles.card__icon} weatherCode={weatherCode as number} />
            )}

            {Boolean(day) && <p className={clsx(styles.card__day, styles.card__text)}>{day}</p>}

            {Boolean(temperatureMax && degree) && (
                <p className={clsx(styles.card__temperature, styles.card__text)}>
                    <span className={styles.card__temperatureMax}>
                        {temperatureMax}
                        {degree}
                    </span>
                    <span>
                        {temperatureMin}
                        {degree}
                    </span>
                </p>
            )}
        </button>
    );
};
