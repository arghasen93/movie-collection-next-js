"use client";
import { useEffect, useState } from "react";
import axios from "axios";
type Movie = {
  Title: string;
  Genre: string;
  YearOfRelease: string;
  ImageContent: string; // base64
};

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const response = await axios.get(
          "https://5hjl4oaz48.execute-api.ap-south-1.amazonaws.com/fetchMovies"
        );
        setMovies(response.data);
      } catch (err) {
        setError("Failed to fetch movies.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Movie Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-4">
        {movies.map((movie, index) => (
          <div key={index} className="bg-white p-4 shadow rounded w-60">
            <img src={`data:image/jpeg;base64,${movie.ImageContent}`} className="w-50 h-50" />
            <h2 className="font-semibold text-lg">{movie.Title}</h2>
            <p className="text-sm text-gray-600">
              {movie.Genre} • {movie.YearOfRelease}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
