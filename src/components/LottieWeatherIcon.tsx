import React from "react";
import Lottie from "lottie-react";
import { WeatherCondition } from "./AnimatedWeatherIcon";

interface LottieWeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
  darkMode?: boolean;
  // The user will provide these paths or data
  animationData?: any;
  animationPath?: string;
}

const LottieWeatherIcon: React.FC<LottieWeatherIconProps> = ({
  condition,
  size = 120,
  className = "",
  darkMode = false,
  animationData,
  animationPath,
}) => {
  // Function to determine which animation to use based on condition
  const getAnimationSource = () => {
    // If animationData is provided directly, use it
    if (animationData) {
      return { animationData };
    }

    // If a specific path is provided, use it
    if (animationPath) {
      return { path: animationPath };
    }

    // Otherwise, construct a path based on the condition
    // The user will need to place their animation files in this location
    const path = `/src/assets/lottie/${condition}${darkMode ? "_dark" : ""}.json`;
    return { path };
  };

  const animationSource = getAnimationSource();

  return (
    <div className={`${className}`} style={{ width: size, height: size }}>
      <Lottie
        {...animationSource}
        loop={true}
        autoplay={true}
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
};

export default LottieWeatherIcon;
