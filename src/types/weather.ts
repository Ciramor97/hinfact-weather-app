type Weather = {
  weather: [{ id: number; main: string; description: string; icon: string }];
  main: {
    temp: number;
    feels_like: number;
    temp_min: number;
    temp_max: number;
    pressure: number;
    humidity: number;
  };
  sys: {
    type: number;
    id: number;
    country: string;
    sunrise: number;
    sunset: number;
  };
  name: string;
};

type GetWeatherError = { cod: string; message: string };
type SearchBar = { queryStr: string };

export { Weather, GetWeatherError, SearchBar };
