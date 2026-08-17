import WeatherPage from './pages/WeatherPage';
import blueClouds from './assets/clouds.png';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${blueClouds})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundAttachment: 'fixed',
      }}
    >
      <div
        style={{
          minHeight: '100vh',
          background: 'rgba(2, 8, 23, 0.45)',
        }}
      >
        <WeatherPage />
      </div>
    </div>
  );
}
