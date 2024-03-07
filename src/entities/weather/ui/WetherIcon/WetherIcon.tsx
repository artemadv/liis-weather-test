import { FC } from 'react';

import { Meteo } from '../../../../shared/api';

type WeatherIcon = {
    className?: string;
} & Required<Pick<Meteo, 'weatherCode'>>;

const getEmojiByWeatherCode = (code: number) => {
    switch (true) {
        case [2, 3, 45, 48].includes(code):
            return '☁️';
        case [51, 53, 55, 56, 57, 61, 63, 65, 66, 67, 80, 81, 82].includes(code):
            return '🌧️';
        case [95, 96, 99].includes(code):
            return '🌩️';
        case [71, 73, 75, 77, 85, 86].includes(code):
            return '🌨️';
        case [0, 1].includes(code):
        default:
            return '☀️';
    }
};

export const WeatherIcon: FC<WeatherIcon> = (props) => {
    const { className, weatherCode } = props;

    return <span className={className}>{getEmojiByWeatherCode(weatherCode)}</span>;
};
