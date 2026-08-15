export default function StatCell({ label, value }) {
    return (
        <div style={{
            background: '#f5f5f3',
            borderRadius: 8,
            padding: '12px 14px',
        }}>
            <div style={{
                fontSize: 11, color: '#999',
                textTransform: 'uppercase',
                letterSpacing: '0.06em',
                marginBottom: 4,
            }}>
                {label}
            </div>
            <div style={{ fontSize: 16, fontWeight: 500, color: '#111' }}>
                {value}
            </div>
        </div>

    );
};