export default function UnitToggle({ unit, onChange }) {
    function Btn({ label, value }) {
        const active = unit === value;
        return (
            <button
                onClick={() => onChange(value)}
                style={{
                    height: 28, width: 36,
                    border: '0.5px solid',
                    borderColor: active ? '#999' : '#ddd',
                    borderRadius: 8,
                    background: active ? '#f5f5f3' : 'transparent',
                    fontSize: 13, fontFamily: 'inherit',
                    fontWeight: active ? 500 : 400,
                    color: active ? '#111' : '#aaa',
                    cursor: 'pointer', transition: 'all 0.12s',
                }}
            >
                {label}
            </button>
        );
    };
}