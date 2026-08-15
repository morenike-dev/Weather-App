import { getWeatherIcon, formatTemp } from '../utils/weather';

function formatDay(timestamp) {
    return new Date(timestamp * 1000).toLocaleDateString('en-GB', { weekday: 'short' });
}

export default function ForecastCard({ item, unit }) {
    return (
        <div style={{
            background: '#fff',
            border: '0.5px solid #e5e5e5',
            borderRadius: 10,
            padding: '10px 8px',
            textAlign: 'center',
            flex: 1,
            minWidth: 0,
        }}>
            <div style={{ fontsize: 11, color: '#aaa', marginBottom: 6 }}>
                {formatDay(item.dt)}
            </div>
            <div style={{ fontSize: 22, marginBottom: 4 }}>
                {getWeatherIcon(item.weather[0].id)}
            </div>
            <div style={{ fontSize: 14, fontWeight: 500, color: '#111' }}>
                {formatTemp(item.main.temp_max, unit)}°
            </div>
        </div >
    );
};