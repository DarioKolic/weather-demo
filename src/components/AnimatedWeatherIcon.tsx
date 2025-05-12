import React from "react";
import { motion } from "framer-motion";
import Lottie from "lottie-react";

export type WeatherCondition =
  | "sunny"
  | "cloudy"
  | "partlyCloudy"
  | "rainy"
  | "snowy"
  | "stormy"
  | "foggy"
  | "windy"
  | "loading";

interface AnimatedWeatherIconProps {
  condition: WeatherCondition;
  size?: number;
  className?: string;
  darkMode?: boolean;
  // Optional props for Lottie animations
  useLottie?: boolean;
  animationData?: any;
  animationPath?: any;
}

const AnimatedWeatherIcon = ({
  condition = "sunny",
  size = 120,
  className = "",
  darkMode = false,
  useLottie = false,
  animationData,
  animationPath,
}: AnimatedWeatherIconProps) => {
  // If using Lottie animations and either animationData or animationPath is provided
  if (useLottie && (animationData || animationPath)) {
    return (
      <div
        className={`${className}`}
        style={{ width: size, height: size }}
      >
        <Lottie
          animationData={animationData}
          assetsPath={animationPath}
          loop={true}
          autoplay={true}
          style={{ width: size, height: size }}
        />
      </div>
    );
  }

  // Fallback to SVG animations if Lottie is not used or animations are not provided
  const renderIcon = () => {
    switch (condition) {
      case "sunny":
        return (
          <div className="relative">
            <motion.circle
              cx={size / 2}
              cy={size / 2}
              r={size / 5}
              fill="#FFD700"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {[...Array(8)].map((_, i) => (
              <motion.line
                key={i}
                x1={size / 2}
                y1={size / 6}
                x2={size / 2}
                y2={size / 12}
                stroke="#FFD700"
                strokeWidth={3}
                strokeLinecap="round"
                initial={{
                  rotate: i * 45,
                  originX: size / 2,
                  originY: size / 2,
                }}
                animate={{
                  scale: [1, 1.2, 1],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>
        );

      case "cloudy":
        return (
          <>
            <motion.path
              d="M25,60 Q40,45 60,55 Q80,40 95,55 Q110,45 120,60 Q130,80 115,90 Q105,100 85,95 Q65,105 45,95 Q25,100 20,85 Q10,70 25,60"
              fill="#E0E0E0"
              stroke="#CCCCCC"
              strokeWidth="2"
              initial={{ y: 10 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      case "partlyCloudy":
        return (
          <>
            <motion.circle
              cx={size / 3}
              cy={size / 3}
              r={size / 6}
              fill="#FFD700"
              animate={{
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            <motion.path
              d="M40,70 Q55,55 75,65 Q95,50 110,65 Q125,55 135,70 Q145,90 130,100 Q120,110 100,105 Q80,115 60,105 Q40,110 35,95 Q25,80 40,70"
              fill="#E0E0E0"
              stroke="#CCCCCC"
              strokeWidth="2"
              initial={{ y: 10 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          </>
        );

      case "rainy":
        return (
          <>
            <motion.path
              d="M25,50 Q40,35 60,45 Q80,30 95,45 Q110,35 120,50 Q130,70 115,80 Q105,90 85,85 Q65,95 45,85 Q25,90 20,75 Q10,60 25,50"
              fill="#708090"
              stroke="#607080"
              strokeWidth="2"
              initial={{ y: 10 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {[...Array(5)].map((_, i) => (
              <motion.line
                key={i}
                x1={30 + i * 20}
                y1={85}
                x2={25 + i * 20}
                y2={105}
                stroke="#4682B4"
                strokeWidth="3"
                strokeLinecap="round"
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: [0, 20],
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
              />
            ))}
          </>
        );

      case "snowy":
        return (
          <>
            <motion.path
              d="M25,50 Q40,35 60,45 Q80,30 95,45 Q110,35 120,50 Q130,70 115,80 Q105,90 85,85 Q65,95 45,85 Q25,90 20,75 Q10,60 25,50"
              fill="#B0C4DE"
              stroke="#A0B4CE"
              strokeWidth="2"
              initial={{ y: 10 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {[...Array(6)].map((_, i) => (
              <motion.circle
                key={i}
                cx={30 + i * 15}
                cy={95}
                r={3}
                fill="white"
                initial={{ y: -10, opacity: 0 }}
                animate={{
                  y: [0, 20],
                  opacity: [0, 1, 0],
                  x: [0, i % 2 === 0 ? 5 : -5, 0],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.2,
                  repeat: Infinity,
                  ease: "easeIn",
                }}
              />
            ))}
          </>
        );

      case "stormy":
        return (
          <>
            <motion.path
              d="M25,50 Q40,35 60,45 Q80,30 95,45 Q110,35 120,50 Q130,70 115,80 Q105,90 85,85 Q65,95 45,85 Q25,90 20,75 Q10,60 25,50"
              fill="#4A4A4A"
              stroke="#3A3A3A"
              strokeWidth="2"
              initial={{ y: 10 }}
              animate={{ y: [0, 5, 0] }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
            {[...Array(2)].map((_, i) => (
              <motion.path
                key={i}
                d={`M${55 + i * 30},85 L${45 + i * 30},105 L${60 + i * 30},100 L${50 + i * 30},120`}
                stroke="#FFD700"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
                initial={{ opacity: 0 }}
                animate={{
                  opacity: [0, 1, 0],
                }}
                transition={{
                  duration: 0.5,
                  delay: i * 0.7,
                  repeat: Infinity,
                  repeatDelay: 1.5,
                  ease: "easeOut",
                }}
              />
            ))}
          </>
        );

      case "foggy":
        return (
          <>
            {[...Array(4)].map((_, i) => (
              <motion.path
                key={i}
                d={`M20,${50 + i * 15} Q40,${45 + i * 15} 60,${55 + i * 15} Q80,${45 + i * 15} 100,${55 + i * 15} Q120,${45 + i * 15} 140,${55 + i * 15}`}
                stroke="#C0C0C0"
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ x: 0 }}
                animate={{
                  x: [0, 10, 0, -10, 0],
                }}
                transition={{
                  duration: 5,
                  delay: i * 0.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "windy":
        return (
          <>
            {[...Array(3)].map((_, i) => (
              <motion.path
                key={i}
                d={`M10,${50 + i * 20} Q40,${35 + i * 20} 70,${55 + i * 20} Q100,${35 + i * 20} 130,${55 + i * 20}`}
                stroke={i === 1 ? "#87CEEB" : "#C0C0C0"}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
                initial={{ x: -20 }}
                animate={{
                  x: [0, 20],
                }}
                transition={{
                  duration: 2,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </>
        );

      case "loading":
        return (
          <motion.circle
            cx={size / 2}
            cy={size / 2}
            r={size / 3}
            stroke="#E0E0E0"
            strokeWidth="8"
            strokeDasharray="80 30"
            fill="transparent"
            animate={{
              rotate: [0, 360],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        );

      default:
        return (
          <circle cx={size / 2} cy={size / 2} r={size / 3} fill="#E0E0E0" />
        );
    }
  };

  return (
    <div
      className={`bg-background ${className}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
        {renderIcon()}
      </svg>
    </div>
  );
};

export default AnimatedWeatherIcon;
