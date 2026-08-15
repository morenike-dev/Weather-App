export function getWeatherIcon(id) {
    if (id >= 200 && id < 300) return '⛈️';
    if (id >= 300 && id < 400) return '⛈️';
    if (id >= 500 && id < 600) return '⛈️';
    if (id >= 600 && id < 700) return '⛈️';
    if (id >= 700 && id < 800) return '🌫️';
    if (id === 800) return '☀️';
    if (id >= 801) return '🌥️';
    if (id === 802) return '🌥️';
    if (id >= 803) return '☁️';
    return '🌡️';
}

export function formatTemp(celsius, unit) {
    const rounded = Math.round(celsius);
    if (unit === 'F') return Math.round(celsius * 9 / 5 + 32);
    return rounded;
}

export function formatWind(ms, unit) {
    return unit === 'C'
        ? `${Math.round(ms * 3.6)} km/h`
        : `${Math.round(ms * 2.237)} mph`;
}