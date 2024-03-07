/* eslint-disable no-param-reassign */
import { useEffect, useRef } from 'react';

import { MeteoData } from '../../../../shared/api';

const COUNT_OF_SIDE = 6;
const SIDE_SIZE = 600;
const SIDE_COLORS = ['#ffffff', '#faf0e6', '#fff5ee', '#fdf5e6', '#faf0e6', '#faebd7'];

const createCanvas = (canvasElements: HTMLCanvasElement[], data: MeteoData['days']) => {
    canvasElements.forEach((canvas, index) => {
        const { degree = '', day = '', temperatureMin = '', temperatureMax = '' } = data[index];

        // Размер
        canvas.width = SIDE_SIZE;
        canvas.height = SIDE_SIZE;

        const context = canvas.getContext('2d');

        if (context) {
            // Бэкграунд
            context.fillStyle = SIDE_COLORS[index];
            context.fillRect(0, 0, SIDE_SIZE, SIDE_SIZE);

            // Дата
            context.fillStyle = '#000000';
            context.font = '24px "Roboto Condensed", sans-serif';
            context.fillText(day, 30, 70);

            // Температура
            context.fillStyle = '#000000';
            context.font = '48px "Roboto Condensed", sans-serif';
            context.fillText(
                `max ${temperatureMax}${degree} min ${temperatureMin}${degree} `,
                30,
                140,
            );

            let startPosition = 210;
            const step = 40;
            // Другие дни после текущего
            data.slice(index + 1, data.length).forEach(
                ({
                    day: nextDay = '',
                    temperatureMin: nextTemperatureMin = '',
                    temperatureMax: nextTemperatureMax = '',
                }) => {
                    context.fillStyle = '#000000';
                    context.font = '18px "Roboto Condensed", sans-serif';
                    context.fillText(
                        `${nextDay} / max ${nextTemperatureMin}${degree} min ${nextTemperatureMax}${degree} `,
                        30,
                        startPosition,
                    );
                    startPosition += step;
                },
            );
        }
    });
};

// Хук формирует канвас с температурой для 6 граней куба
export const useGetCanvasCubeSidesWithWeather = (data: MeteoData['days']) => {
    const canvasRef1 = useRef(document.createElement('canvas'));
    const canvasRef2 = useRef(document.createElement('canvas'));
    const canvasRef3 = useRef(document.createElement('canvas'));
    const canvasRef4 = useRef(document.createElement('canvas'));
    const canvasRef5 = useRef(document.createElement('canvas'));
    const canvasRef6 = useRef(document.createElement('canvas'));

    useEffect(() => {
        const canvas1 = canvasRef1.current;
        const canvas2 = canvasRef2.current;
        const canvas3 = canvasRef3.current;
        const canvas4 = canvasRef4.current;
        const canvas5 = canvasRef5.current;
        const canvas6 = canvasRef6.current;

        const canCreateCanvas = canvas1 && canvas2 && canvas3 && canvas4 && canvas5 && canvas6;

        if (canCreateCanvas) {
            createCanvas(
                [canvas1, canvas2, canvas3, canvas4, canvas5, canvas6],
                data.slice(0, COUNT_OF_SIDE),
            );
        }
    }, []);

    return [canvasRef1, canvasRef2, canvasRef3, canvasRef4, canvasRef5, canvasRef6];
};
