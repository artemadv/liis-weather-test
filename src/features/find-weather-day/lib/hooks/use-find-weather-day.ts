import { useEffect, useState } from 'react';

import { Meteo, MeteoData } from '../../../../shared/api';

export const useFindWeatherDay = (days: MeteoData['days']) => {
    const [targetDate, setTargetDate] = useState<string>();
    const [targetDay, setTargetDay] = useState<Meteo>();

    useEffect(() => {
        if (targetDate) {
            const currentTargetDay = days?.find(({ day }) => day === targetDate);

            setTargetDay(currentTargetDay);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [targetDate]);

    return {
        setTargetDate,
        targetDay,
    };
};
