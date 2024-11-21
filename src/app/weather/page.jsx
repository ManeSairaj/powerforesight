import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function WeatherFetcher() {
  const { user } = useUser();
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const fetchWeather = async () => {
    if (!user) {
      setError("User not authenticated");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/get-weather", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: user.id }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.error || "Unknown error occurred");
        setLoading(false);
        return;
      }

      const data = await response.json();
      setWeatherData(data);
    } catch (err) {
      setError("Failed to fetch weather data. Please try again later.");
      console.error("Error fetching weather data:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="weather-fetcher">
      <h1>Fetch Weather Data</h1>
      <button onClick={fetchWeather} disabled={loading}>
        {loading ? "Fetching..." : "Fetch Weather"}
      </button>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {weatherData && (
        <div>
          <h2>Weather Data:</h2>
          <pre>{JSON.stringify(weatherData, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}
