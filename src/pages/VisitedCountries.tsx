import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const VISITED_PLACES_CONFIG = {
  map: "world",
  projection: "geoOrthographic",
  theme: "dark-green",
  water: 1,
  graticule: 1,
  names: 1,
  duration: 2000,
  placeduration: 100,
  slider: 0,
  autoplay: 0,
  autozoom: "step",
  autostep: 1,
  pie: 1,
  home: "BE",
  data: [
    {
      places: ["BE"],
      text: "My Home",
      position: { zoomLevel: 2.4, geoPoint: { longitude: 12.1, latitude: 53.3 }, rotationX: -12.1, rotationY: -53.3 },
      colors: { BE: "daaa44" },
    },
    {
      places: ["GB","IE","DE","NL","CZ","PL","SK","HU","AT","CH","IT","ES","PT","FR","GR","HR","SI","UA","RU","FI","AD"],
      text: "Europe",
      position: { geoPoint: { longitude: 12.1, latitude: 53.3 }, rotationX: -12.1, rotationY: -53.3, zoomLevel: 2.4 },
    },
    {
      places: ["MA","EG"],
      text: "Africa",
      position: { geoPoint: { longitude: 18, latitude: 1.6 }, rotationX: -18, rotationY: -1.6, zoomLevel: 1.5 },
    },
    {
      places: ["IL","AE","TR","NP","SG","ID","JP","JO"],
      text: "Asia",
      position: { geoPoint: { longitude: 83.8, latitude: 33.3 }, rotationX: -83.8, rotationY: -33.3, zoomLevel: 1.5 },
    },
    {
      places: ["DO","US"],
      text: "North America",
      position: { geoPoint: { longitude: -100.6, latitude: 44.4 }, rotationX: 100.6, rotationY: -44.4, zoomLevel: 1.6 },
    },
    {
      places: ["BR"],
      text: "South America",
      position: { geoPoint: { longitude: -65.9, latitude: -20.1 }, rotationX: 65.9, rotationY: 20.1, zoomLevel: 1.5 },
    },
  ],
};

const VisitedCountries = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Set the global config variable the embed script expects
    (window as any).visitedplaces_config = VISITED_PLACES_CONFIG;

    // Load the embed script
    const script = document.createElement("script");
    script.src = "https://visitedplaces.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
      delete (window as any).visitedplaces_config;
    };
  }, []);

  return (
    <div className="relative w-screen h-screen bg-black overflow-hidden flex flex-col">
      <Link
        to="/blog"
        className="absolute top-6 left-6 flex items-center gap-2 text-white/40 hover:text-white/80 text-xs tracking-wide uppercase transition-colors z-10"
      >
        <ArrowLeft size={14} />
        Back
      </Link>

      <div className="flex-1 flex items-center justify-center pt-14">
        <div
          id="chartdiv"
          ref={containerRef}
          className="w-full max-w-[900px] h-[70vh] max-h-[600px]"
        />
      </div>

      <div className="text-center pb-6 text-white/30 text-[10px] tracking-wide uppercase">
        29 / 215 countries and counting
      </div>
    </div>
  );
};

export default VisitedCountries;
