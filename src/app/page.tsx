"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import axios from "axios";
import SpinnerOverlay from "./SpinnerOverlay";

type Movie = {
  Title: string;
  Genre: string;
  YearOfRelease: string;
  ImageContent: string; // base64
};

export default function DashboardPage() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [lastKey, setLastKey] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true); // NEW
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const observer = useRef<IntersectionObserver | null>(null);

  const fetchMovies = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      const query = lastKey ? `?NextPageKey=${encodeURIComponent(lastKey)}` : '';
      const res = await axios.get(`/api/fetch-movies${query}`);
      const data = res.data;
      console.log(data);
      setMovies(prev => [...prev, ...data.items]);
      setLastKey(data.lastEvaluatedKey || null);
      setHasMore(!!data.lastEvaluatedKey); // update hasMore
    } catch (err) {
      console.error("Error fetching movies:", err);
      setError("Failed to load movies.");
    } finally {
      setLoading(false);
    }
  }, [lastKey, loading, hasMore]);

  useEffect(() => {
    fetchMovies();
  }, []);

  useEffect(() => {
    if (!hasMore || !loadMoreRef.current) return;

    if (observer.current) observer.current.disconnect();

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        fetchMovies();
      }
    });

    observer.current.observe(loadMoreRef.current);

    return () => observer.current?.disconnect();
  }, [fetchMovies, hasMore]);

  if (error) return <p>{error}</p>;

  return (
    <div>
      {loading && <SpinnerOverlay />}
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

      {hasMore ? (
        <div ref={loadMoreRef} className="h-1" />
      ) : (
        <div className="text-center text-gray-400 my-4">No more movies to load.</div>
      )}
    </div>
  );
}
