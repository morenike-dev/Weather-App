import WeatherPage from './pages/WeatherPage';
import darkClouds from './assets/dark-clouds.png';

export default function App() {
  return (
    <div
      style={{
        minHeight: '100vh',
        backgroundImage: `url(${darkClouds})`,
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
