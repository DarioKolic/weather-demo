import React, { useState } from "react";
import WeatherWidget from "./WeatherWidget";

export default function Home() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-300 ${theme === "dark" ? "bg-gray-900 text-white" : "bg-blue-50 text-gray-900"}`}
    >
      <div className="absolute top-4 right-4">
        <button
          onClick={toggleTheme}
          className={`p-2 rounded-full ${theme === "dark" ? "bg-gray-700 text-yellow-300" : "bg-blue-100 text-gray-700"}`}
          aria-label="Toggle theme"
        >
          {theme === "dark" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-sun"
            >
              <circle cx="12" cy="12" r="4" />
              <path d="M12 2v2" />
              <path d="M12 20v2" />
              <path d="m4.93 4.93 1.41 1.41" />
              <path d="m17.66 17.66 1.41 1.41" />
              <path d="M2 12h2" />
              <path d="M20 12h2" />
              <path d="m6.34 17.66-1.41 1.41" />
              <path d="m19.07 4.93-1.41 1.41" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-moon"
            >
              <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
            </svg>
          )}
        </button>
      </div>

      <header className="mb-8 text-center">
        <h1 className="text-3xl font-bold mb-2">Weather Dashboard</h1>
        <p className="text-lg opacity-80">
          Check the current weather and forecast
        </p>
      </header>

      <main className="w-full max-w-md">
        <WeatherWidget theme={theme} />
      </main>

      <footer className="mt-12 text-center text-sm opacity-70">
        <p>
          © {new Date().getFullYear()} Weather Widget | Powered by Weather API
        </p>
      </footer>
    </div>
  );
}
