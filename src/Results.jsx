import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Results.css";
import cheapestRoundtrips from "./cheapest_roundtrips.json"; // make sure path is correct

const CITY_IMAGES = {
  SEA: "/src/assets/images/sea.jpg",
  SFO: "/src/assets/images/sfo.jpg",
  YYZ: "/src/assets/images/yyz.jpg",
  YYC: "/src/assets/images/yyc.jpg",
  YUL: "/src/assets/images/yul.jpg",
  JFK: "/src/assets/images/jfk.jpg",
  LAX: "/src/assets/images/lax.jpg",
  LAS: "/src/assets/images/las.jpg",
  HND: "/src/assets/images/hnd.jpg",
  LHR: "/src/assets/images/lhr.jpg",
  CDG: "/src/assets/images/cdg.jpg",
  DXB: "/src/assets/images/dxb.jpg",
  YQB: "/src/assets/images/yqb.jpg",
  YYJ: "/src/assets/images/yyj.jpg",
  YOW: "/src/assets/images/yow.jpg",
};

export default function Results() {
  const { origin } = useParams();
  const [results, setResults] = useState([]);

  useEffect(() => {
    const filtered = cheapestRoundtrips.filter(
      (flight) => flight.Origin.toUpperCase() === origin.toUpperCase()
    );

    filtered.sort((a, b) => a.Price / a.AveragePrice - b.Price / b.AveragePrice);

    setResults(filtered);
  }, [origin]);

  if (!results.length)
    return (
      <div className="results-page">
        <h2>No results found for {origin}</h2>
      </div>
    );

  return (
    <div className="results-page">
      <h2>Best destinations from {origin}</h2>
      <div className="results-grid">
        {results.map((item) => {
          const cheaperPercent = Math.round(
            ((item.AveragePrice - item.Price) / item.AveragePrice) * 100
          );
          return (
            <div className="result-card" key={item.Destination}>
              <div className="result-image">
                <img
                  src={CITY_IMAGES[item.Destination] || "/src/assets/images/placeholder.jpg"}
                  alt={item.Destination}
                />
              </div>
              <div className="result-info">
                <h3>{item.Destination}</h3>
                <p className="dates">
                  {item.DepartureDate} → {item.ReturnDate}
                </p>
                <p className="price">${item.Price.toFixed(2)}</p>
                <p className="avg">Avg: ${item.AveragePrice.toFixed(2)}</p>
                <p className="deal">{cheaperPercent}% cheaper than usual</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
