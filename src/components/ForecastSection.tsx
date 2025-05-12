import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export interface ForecastDay {
  day: string;
  temperature: number;
  condition: string;
  date?: string;
}

interface ForecastSectionProps {
  forecast?: ForecastDay[];
  isLoading?: boolean;
  unit?: "celsius" | "fahrenheit";
  darkMode?: boolean;
}

const ForecastSection: React.FC<ForecastSectionProps> = ({
  forecast = [
    { day: "Mon", temperature: 22, condition: "sunny", date: "2023-06-12" },
    { day: "Tue", temperature: 19, condition: "cloudy", date: "2023-06-13" },
    { day: "Wed", temperature: 18, condition: "rainy", date: "2023-06-14" },
    {
      day: "Thu",
      temperature: 21,
      condition: "partly-cloudy",
      date: "2023-06-15",
    },
    { day: "Fri", temperature: 24, condition: "sunny", date: "2023-06-16" },
  ],
  isLoading = false,
  unit = "celsius",
  darkMode = false,
}) => {
  if (isLoading) {
    return (
      <Card className="w-full bg-background">
        <CardContent className="p-4">
          <h3 className="text-lg font-medium mb-3">5-Day Forecast</h3>
          <div className="flex justify-between">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex flex-col items-center">
                <Skeleton className="h-4 w-8 mb-2" />
                <Skeleton className="h-12 w-12 rounded-full mb-2" />
                <Skeleton className="h-4 w-10" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="w-full bg-background">
      <CardContent className="p-4">
        <h3 className="text-lg font-medium mb-3">5-Day Forecast</h3>
        <div className="flex justify-between">
          {forecast.map((day, index) => (
            <div key={index} className="flex flex-col items-center">
              <span className="text-sm font-medium mb-1">{day.day}</span>
              <div className="w-12 h-12 mb-1 bg-blue-100 rounded-full flex items-center justify-center">
                {/* Placeholder for weather icon */}
                <span className="text-xs">{day.condition}</span>
              </div>
              <span className="text-sm">
                {day.temperature}°{unit === "celsius" ? "C" : "F"}
              </span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default ForecastSection;
