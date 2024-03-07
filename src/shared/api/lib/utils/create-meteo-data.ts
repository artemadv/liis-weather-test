import { getFormatDate } from '../../../lib';
import { MeteoData, MeteoQueryData } from '../../model/types';

const createDays = (daily?: MeteoQueryData['daily'], degree?: string) => {
    if (!daily) return [];

    const {
        time,
        temperature_2m_max: temperatureMax,
        temperature_2m_min: temperatureMin,
        weather_code: weatherCode,
    } = daily;

    return time.map((day, index) => ({
        degree,
        day: getFormatDate(day),
        temperatureMax: String(Math.round(temperatureMax[index])),
        temperatureMin: String(Math.round(temperatureMin[index])),
        weatherCode: weatherCode[index],
    }));
};

export const createMeteoData = (data?: MeteoQueryData): MeteoData => {
    const { current_units: currentUnits, current, daily } = data ?? {};

    return {
        currentDay: {
            weatherCode: current?.weather_code,
            degree: currentUnits?.temperature_2m,
            day: current ? getFormatDate(String(current.temperature_2m)) : undefined,
            temperatureMax: current ? String(Math.round(current.temperature_2m)) : undefined,
        },
        days: createDays(daily, currentUnits?.temperature_2m),
    };
};
