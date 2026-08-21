import { useState } from 'react';
import SearchBar from '../components/SearchBar';
import UnitToggle from '../components/UnitToggle';
import WeatherCard from '../components/WeatherCard';
import ForecastRow from '../components/ForecastRow';

const API_KEY = import.meta.env.VITE_API_KEY; // Replace with your key from openweathermap.org
console.log('API KEY:', API_KEY);

export default function WeatherPage() {
    const [unit, setUnit] = useState('C');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [currentData, setCurrentData] = useState(null);
    const [forecastList, setForecastList] = useState([]);

    async function handleSearch(city) {
        setLoading(true);
        setError(null);
        setCurrentData(null);
        setForecastList([]);

        try {
            const base = 'https://api.openweathermap.org/data/2.5';
            const params = `q=${encodeURIComponent(city)}&appid=${API_KEY}&units=metric`;

            const [wRes, fRes] = await Promise.all([
                fetch(`${base}/weather?${params}`),
                fetch(`${base}/forecast?${params}`),
            ]);

            if (!wRes.ok) {
                if (wRes.status === 404) throw new Error(`"${city}" not found. Check the spelling and try again.`);
                throw new Error('Something went wrong. Please try again.');
            }

            const [wData, fData] = await Promise.all([wRes.json(), fRes.json()]);
            setCurrentData(wData);
            setForecastList(fData.list);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div style={{
            maxWidth: 560, margin: '0 auto', padding: '2rem 1rem',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif',
        }}>
            {/* Header */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.75rem' }}>
                <UnitToggle unit={unit} onChange={setUnit} />
            </div>

            {/* Search */}
            <div style={{ marginBottom: '1.5rem' }}>
                <SearchBar onSearch={handleSearch} loading={loading} />
            </div>

            {/* Error */}
            {error && (
                <div style={{
                    display: 'flex', alignItems: 'center', gap: 8,
                    background: '#fef2f2', border: '0.5px solid #fca5a5',
                    borderRadius: 10, padding: '12px 16px',
                    fontSize: 14, color: '#b91c1c', marginBottom: '1rem',
                }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                        aria-hidden="true">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="12" />
                        <line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    {error}
                </div>
            )}

            {/* Loading */}
            {loading && (
                <div style={{ textAlign: 'center', padding: '3rem 0', fontSize: 14, color: '#bbb' }}>
                    <div style={{
                        width: 28, height: 28, border: '2px solid #eee',
                        borderTopColor: '#aaa', borderRadius: '50%',
                        animation: 'spin 0.8s linear infinite', margin: '0 auto 12px',
                    }} />
                    Fetching weather…
                    <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
                </div>
            )}

            {/* Empty state */}
            {!loading && !error && !currentData && (
                <div style={{ textAlign: 'center', padding: '4rem 1rem', color: '#ccc' }}>
                    <div style={{ fontSize: 48, marginBottom: 16 }}>🌍</div>
                    <div style={{ fontSize: 15, color: '#bbb' }}>Search a city to see the forecast</div>
                </div>
            )}

            {/* Results */}
            {!loading && currentData && (
                <>
                    <WeatherCard data={currentData} unit={unit} />
                    <ForecastRow forecastList={forecastList} unit={unit} />
                </>
            )}

            {/* Footer */}
            <div style={{ textAlign: 'center', marginTop: '2rem', fontSize: 12, color: '#bbb' }}>
                © {new Date().getFullYear()} Pied-Weather. All rights reserved.
            </div>

        </div>
    );
}