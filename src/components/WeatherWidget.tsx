import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Sun,
  Cloud,
  CloudRain,
  CloudSnow,
  CloudLightning,
  CloudFog,
  Search,
  Moon,
  MapPin,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import AnimatedWeatherIcon, { WeatherCondition } from "./AnimatedWeatherIcon";
import ForecastSection, { ForecastDay } from "./ForecastSection";

interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

interface LocationOption {
  value: string;
  label: string;
}

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastDay[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [location, setLocation] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [open, setOpen] = useState(false);
  const [locationOptions, setLocationOptions] = useState<LocationOption[]>([
    { value: "New York", label: "New York, NY, USA" },
    { value: "Los Angeles", label: "Los Angeles, CA, USA" },
    { value: "Chicago", label: "Chicago, IL, USA" },
    { value: "Houston", label: "Houston, TX, USA" },
    { value: "Phoenix", label: "Phoenix, AZ, USA" },
    { value: "Philadelphia", label: "Philadelphia, PA, USA" },
    { value: "San Antonio", label: "San Antonio, TX, USA" },
    { value: "San Diego", label: "San Diego, CA, USA" },
    { value: "Dallas", label: "Dallas, TX, USA" },
    { value: "San Jose", label: "San Jose, CA, USA" },
    { value: "London", label: "London, UK" },
    { value: "Paris", label: "Paris, France" },
    { value: "Tokyo", label: "Tokyo, Japan" },
    { value: "Sydney", label: "Sydney, Australia" },
    { value: "Berlin", label: "Berlin, Germany" },
    { value: "Madrid", label: "Madrid, Spain" },
    { value: "Rome", label: "Rome, Italy" },
    { value: "Toronto", label: "Toronto, Canada" },
    { value: "Singapore", label: "Singapore" },
    { value: "Hong Kong", label: "Hong Kong" },
    { value: "Dubai", label: "Dubai, UAE" },
    { value: "Mumbai", label: "Mumbai, India" },
    { value: "Bangkok", label: "Bangkok, Thailand" },
    { value: "Seoul", label: "Seoul, South Korea" },
    { value: "Amsterdam", label: "Amsterdam, Netherlands" },
    { value: "Vienna", label: "Vienna, Austria" },
    { value: "Stockholm", label: "Stockholm, Sweden" },
    { value: "Oslo", label: "Oslo, Norway" },
    { value: "Helsinki", label: "Helsinki, Finland" },
    { value: "Copenhagen", label: "Copenhagen, Denmark" },
    { value: "Athens", label: "Athens, Greece" },
    { value: "Istanbul", label: "Istanbul, Turkey" },
    { value: "Cairo", label: "Cairo, Egypt" },
    { value: "Cape Town", label: "Cape Town, South Africa" },
    { value: "Rio de Janeiro", label: "Rio de Janeiro, Brazil" },
    { value: "Buenos Aires", label: "Buenos Aires, Argentina" },
    { value: "Mexico City", label: "Mexico City, Mexico" },
  ]);
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [loadingLocation, setLoadingLocation] = useState<boolean>(true);

  // Background colors based on weather condition
  const getBackgroundColor = (condition: string) => {
    if (darkMode) {
      switch (condition.toLowerCase()) {
        case "clear":
        case "sunny":
          return "bg-gradient-to-b from-blue-900 to-blue-950";
        case "cloudy":
        case "partly cloudy":
          return "bg-gradient-to-b from-slate-800 to-slate-900";
        case "rainy":
        case "rain":
          return "bg-gradient-to-b from-slate-700 to-slate-900";
        case "snowy":
        case "snow":
          return "bg-gradient-to-b from-slate-600 to-slate-800";
        case "stormy":
        case "thunderstorm":
          return "bg-gradient-to-b from-slate-900 to-gray-950";
        case "foggy":
        case "fog":
          return "bg-gradient-to-b from-gray-700 to-gray-900";
        default:
          return "bg-gradient-to-b from-slate-800 to-slate-950";
      }
    } else {
      switch (condition.toLowerCase()) {
        case "clear":
        case "sunny":
          return "bg-gradient-to-b from-sky-300 to-blue-400";
        case "cloudy":
        case "partly cloudy":
          return "bg-gradient-to-b from-gray-200 to-gray-300";
        case "rainy":
        case "rain":
          return "bg-gradient-to-b from-blue-200 to-blue-300";
        case "snowy":
        case "snow":
          return "bg-gradient-to-b from-slate-100 to-slate-200";
        case "stormy":
        case "thunderstorm":
          return "bg-gradient-to-b from-slate-400 to-slate-500";
        case "foggy":
        case "fog":
          return "bg-gradient-to-b from-gray-300 to-gray-400";
        default:
          return "bg-gradient-to-b from-blue-100 to-blue-200";
      }
    }
  };

  // Get user's current location
  useEffect(() => {
    const getUserLocation = () => {
      setLoadingLocation(true);
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            // In a real app, we would use reverse geocoding here
            // For this demo, we'll just set a default location
            setLocation("New York");
            setLoadingLocation(false);
          },
          (error) => {
            console.error("Error getting location:", error);
            setLocation("New York"); // Fallback
            setLoadingLocation(false);
          },
          { timeout: 10000 },
        );
      } else {
        setLocation("New York"); // Fallback if geolocation not supported
        setLoadingLocation(false);
      }
    };

    getUserLocation();
  }, []);

  // Mock data fetching
  useEffect(() => {
    const fetchWeatherData = async () => {
      if (!location) return; // Don't fetch if no location is set

      setLoading(true);

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Mock weather data
      const mockWeatherData: WeatherData = {
        location: location,
        temperature: Math.floor(Math.random() * 30) + 5, // Random temp between 5-35°C
        condition: ["sunny", "cloudy", "rainy", "snowy", "stormy", "foggy"][
          Math.floor(Math.random() * 6)
        ],
        humidity: Math.floor(Math.random() * 50) + 30, // Random humidity between 30-80%
        windSpeed: Math.floor(Math.random() * 20) + 1, // Random wind speed between 1-20 km/h
      };

      // Mock forecast data
      const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];
      const mockForecast: ForecastDay[] = days.map((day) => ({
        day,
        temperature: Math.floor(Math.random() * 30) + 5,
        condition: ["sunny", "cloudy", "rainy", "snowy", "stormy", "foggy"][
          Math.floor(Math.random() * 6)
        ],
      }));

      setWeatherData(mockWeatherData);
      setForecast(mockForecast);
      setLoading(false);
    };

    fetchWeatherData();
  }, [location]);

  const handleLocationChange = (value: string) => {
    setLocation(value);
    setOpen(false);
  };

  const filteredLocations = locationOptions.filter((option) => {
    if (!searchQuery) return true;
    return option.label.toLowerCase().includes(searchQuery.toLowerCase());
  });

  const toggleTheme = () => {
    setDarkMode(!darkMode);
  };

  return (
    <Card
      className={`w-full max-w-md mx-auto overflow-hidden rounded-xl shadow-lg transition-all duration-300 ${darkMode ? "text-white" : "text-gray-800"} ${weatherData ? getBackgroundColor(weatherData.condition) : darkMode ? "bg-slate-800" : "bg-blue-100"}`}
    >
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl font-bold">Weather Widget</CardTitle>
          <Button
            variant="outline"
            size="icon"
            onClick={toggleTheme}
            className={`rounded-full ${darkMode ? "bg-slate-700 text-white hover:bg-slate-600" : "bg-white text-gray-800 hover:bg-gray-100"}`}
          >
            {darkMode ? (
              <Sun className="h-4 w-4" />
            ) : (
              <Moon className="h-4 w-4" />
            )}
          </Button>
        </div>
        <div className="mt-4">
          <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                role="combobox"
                aria-expanded={open}
                className={`w-full justify-between ${loadingLocation ? "opacity-70" : ""} ${darkMode ? "bg-slate-700 text-white border-slate-600" : "bg-white text-gray-800"}`}
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <div className="flex items-center">
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{
                        duration: 1,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      className="mr-2"
                    >
                      <MapPin className="h-4 w-4" />
                    </motion.div>
                    <span>Detecting location...</span>
                  </div>
                ) : location ? (
                  locationOptions.find((option) => option.value === location)
                    ?.label || "Select location"
                ) : (
                  "Select location"
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent
              className={`w-full p-0 ${darkMode ? "bg-slate-800 text-white border-slate-700" : ""}`}
              align="start"
              side="bottom"
            >
              <Command className={darkMode ? "bg-slate-800" : ""}>
                <CommandInput
                  placeholder="Search location..."
                  className={
                    darkMode ? "bg-slate-800 text-white border-slate-700" : ""
                  }
                  value={searchQuery}
                  onValueChange={setSearchQuery}
                />
                <CommandEmpty className="py-2 text-center text-sm">
                  No location found.
                </CommandEmpty>
                <CommandGroup className="max-h-60 overflow-auto">
                  {filteredLocations.map((option) => (
                    <CommandItem
                      key={option.value}
                      value={option.value}
                      onSelect={handleLocationChange}
                      className={
                        darkMode ? "hover:bg-slate-700 focus:bg-slate-700" : ""
                      }
                    >
                      {option.label}
                    </CommandItem>
                  ))}
                </CommandGroup>
              </Command>
            </PopoverContent>
          </Popover>
        </div>
      </CardHeader>

      <CardContent>
        {loading ? (
          <div className="flex flex-col items-center justify-center py-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12"
            >
              <Sun className="w-12 h-12" />
            </motion.div>
            <p className="mt-4">Loading weather data...</p>
          </div>
        ) : weatherData ? (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h2 className="text-3xl font-bold">
                  {weatherData.temperature}°C
                </h2>
                <p className="text-lg capitalize">{weatherData.condition}</p>
                <p className="text-sm opacity-80">{weatherData.location}</p>
              </div>
              <div className="w-24 h-24">
                <AnimatedWeatherIcon
                  condition={weatherData.condition as WeatherCondition}
                  darkMode={darkMode}
                  useLottie
                  animationPath={import(`../assets/lottie/${weatherData.condition}.json`)}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 py-4">
              <div
                className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-white/50"}`}
              >
                <p className="text-xs opacity-70">Humidity</p>
                <p className="text-lg font-semibold">{weatherData.humidity}%</p>
              </div>
              <div
                className={`p-3 rounded-lg ${darkMode ? "bg-slate-800/50" : "bg-white/50"}`}
              >
                <p className="text-xs opacity-70">Wind Speed</p>
                <p className="text-lg font-semibold">
                  {weatherData.windSpeed} km/h
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-opacity-20 border-current">
              <h3 className="text-lg font-semibold mb-3">5-Day Forecast</h3>
              <ForecastSection forecast={forecast} darkMode={darkMode} />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10">
            <p>No weather data available</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
