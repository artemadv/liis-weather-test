import { useQuery } from 'react-query';

import siteConfig from '../../../config/site.config';
import { MeteoQueryData } from '../../model/types';
import { createMeteoData } from '../utils/create-meteo-data';

const QUERY_PARAMS = {
    latitude: '59.9386',
    longitude: '30.3141',
    current: 'temperature_2m,weather_code',
    daily: 'temperature_2m_max,temperature_2m_min,weather_code',
    // eslint-disable-next-line camelcase
    wind_speed_unit: 'ms',
};

export const useMeteoQuery = () => {
    const params = new URLSearchParams(QUERY_PARAMS);
    const { error, data, isLoading, refetch } = useQuery<MeteoQueryData>({
        queryKey: ['meteo'],
        queryFn: () => fetch(`${siteConfig.API_URL}?${params}`).then((res) => res.json()),
    });

    return {
        isLoading,
        hasError: Boolean(error),
        data: createMeteoData(data),
        refetch,
    };
};
