import { useState, useRef, useEffect } from 'react';

const CITY_SUGGESTIONS = [
    'London', 'New York', 'Tokyo', 'Paris', 'Sydney',
    'Berlin', 'Toronto', 'Mumbai', 'Dubai', 'Singapore',
    'Los Angeles', 'Chicago', 'Barcelona', 'Amsterdam', 'Rome',
    'Seoul', 'Istanbul', 'Mexico City', 'São Paulo', 'Cairo',
    'Bangkok', 'Melbourne', 'Vienna', 'Prague', 'Lisbon',
];

export default function SearchBar({ onSearch, loading }) {
    const [query, setQuery] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const [open, setOpen] = useState(false);
    const wrapRef = useRef(null);

    useEffect(() => {
        function handleClick(e) {
            if (wrapRef.current && !wrapRef.current.contains(e.target)) {
                setOpen(false);
            }
        }
        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, []);

    function handleInput(e) {
        const val = e.target.value;
        setQuery(val);
        if (!val.trim()) { setSuggestions([]); setOpen(false); return }
        const matches = CITY_SUGGESTIONS.filter((c) =>
            c.toLowerCase().startsWith(val.toLowerCase())
        ).slice(0, 5);
        setSuggestions(matches);
        setOpen(matches.length > 0);
    }

    function submit(city) {
        const q = city || query;
        if (!q.trim()) return;
        setQuery(q);
        setOpen(false);
        onSearch(q.trim());
    }

    return (
        <div ref={wrapRef} style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
                <svg
                    style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
                    width="18" height="18" viewBox="0 0 24 24" fill="none"
                    stroke="#aaa" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                    aria-hidden="true"
                >
                    <circle cx="11" cy="11" r="8" />
                    <line x1="22" y1="21" x2="16.65" y2="16.65" />
                </svg>

                <input
                    type="text"
                    value={query}
                    onChange={handleInput}
                    onKeyDown={(e) => e.key === 'Enter' && submit()}
                    placeholder="Search city or town..."
                    aria-label="City name"
                    style={{
                        width: '100%', height: 48, padding: '0 120px 0 42px',
                        border: '0.5px solid #ddd', borderRadius: 12,
                        fontSize: 15, fontFamily: 'inherit',
                        background: '#fff', color: '#111', outline: 'none',
                        boxSizing: 'border-box', transition: 'border-color 0.15s, box-shadow 0.15s',
                    }}
                    onFocus={(e) => { e.target.style.borderColor = '#999'; e.target.style.boxShadow = '0 0 0 spx rgba(0,0,0,0.06)'; }}
                    onBlur={(e) => { e.target.style.borderColor = '#ddd'; e.target.style.boxShadow = 'none'; }}
                />

                <button
                    onClick={() => submit()}
                    disabled={loading}
                    style={{
                        position: 'absolute', right: 8, top: '50%', transform: 'translateY(-50%)',
                        height: 34, padding: '0 14px', border: '0.5px solid #ddd', borderRadius: 8,
                        background: 'transparent', color: '#111', fontSixe: 13,
                        fontFamily: 'inherit', cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.5 : 1,
                    }}
                    onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f5f3'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.background = "transparent"; }}
                >
                    {loading ? 'Loading...' : 'Search →'}
                </button>
            </div>

            {open && (
                <div style={{
                    position: 'absolute', top: 52, left: 0, right: 0,
                    background: '#fff', border: '0.5px solid #e5e5e5',
                    borderRadius: 12, overflow: 'hidden', zIndex: 10,
                    boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                }}>
                    {suggestions.map((city) => (
                        <button
                            key={city}
                            onClick={() => submit(city)}
                            style={{
                                display: 'flex', alignItems: 'center', gap: 8,
                                width: '100%', padding: '10px 16px',
                                background: 'transparent', border: 'none',
                                textAlign: 'left', fontSize: 14, color: '#333',
                                cursor: 'pointer', fontFamily: 'inherit',
                            }}
                            onMouseEnter={(e) => { e.currentTarget.style.background = '#f5f5f3'; }}
                            onMouseLeave={(e) => { e.currentTarget.style.background = 'transparent'; }}
                        >
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none"
                                stroke="#bbb" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                                aria-hidden="true">
                                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                                <circle cx="12" cy="10" r="3" />
                            </svg>
                            {city}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
}