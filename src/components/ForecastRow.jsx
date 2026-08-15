import ForecastCard from './ForecastCard';

function getDailyForecast(list, maxDays = 5) {
    const daily = [];
    const seenDays = new Set();
    for (const item of list) {
        const day = new Date(item.dt * 1000).toDateString();
        if (!seenDays.has(day) && daily.length < maxDays) {
            seenDays.add(day);
            daily.push(item);
        }
    }
    return daily;
}

export default function ForecastRow({ forecastList, unit }) {
    const daily = getDailyForecast(forecastList);
    if (!daily.length) return null;

    return (
        <div style={{ display: 'flex', gap: 8 }}>
            {daily.map((item) => (
                <ForecastCard key={item.dt} item={item} unit={unit} />
            ))}
        </div>
    );
};