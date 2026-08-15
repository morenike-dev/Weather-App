import StatCell from './StatCell';
import { getWeatherIcon, formatTemp, formatWind } from '../utils/weather';

function formatDate() {
    return new Date().toLocaleDateString('en-GB', {
        weekday: 'long', day: 'numeric', month: 'long',
    });
}

export default function WeatherCard({ data, unit }) {
    const w = data.weather[0];
    const icon = getWeatherIcon(w.id);
    const condition = w.description.charAt(0).toUpperCase() + w.description.slice(1);

    return (
        <div style={{
            background: '#fff',
            border: '0.5px solid #e5e5e5',
            borderRadius: 14,
            padding: '1.5rem',
            marginBottom: '1rem',
        }}>
            {/* City + date */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                    <div style={{ fontSize: 22, fontWeight: 500, color: '#111' }}>{data.name}</div>
                    <div style={{ fontSize: 13, color: '#bbb', marginTop: 2 }}>{formatDate()}</div>
                </div>
                <div style={{ fontSize: 12, color: '#bbb', paddingTop: 4 }}>{data.sys.country}</div>
            </div>

            {/* Temp + icon */}
            <div style={{
                display: 'flex', alignItems: 'center',
                justifyContent: 'space-between',
                margin: '1.5rem 0 0.5rem',
            }}>
                <div style={{ fontSize: 64, fontWeight: 500, lineHeight: 1, color: '#111' }}>
                    {formatTemp(data.main.temp, unit)}
                    <sup style={{ fontSize: 22, fontWeight: 400, verticalAlign: 'super' }}>°</sup>
                </div>
                <div style={{ fontSize: 64, lineHeight: 1 }}>{icon}</div>
            </div>

            <div style={{ fontSize: 16, color: '#888', marginBottom: '1.25rem' }}>{condition}</div>

            <div style={{ height: '0.5px', background: '#ebebeb', margin: '0 0 1rem' }} />

            {/* Stats */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10 }}>
                <StatCell label="Feels Like" value={`${formatTemp(data.main.feels_like, unit)}°`} />
                <StatCell label="Humidity" value={`${data.main.humidity}%`} />
                <StatCell label="Pressure" value={`${data.main.pressure} hPa`} />
                <StatCell label="Wind Speed" value={formatWind(data.wind.speed, unit)} />
            </div>
        </div>
    );
}
