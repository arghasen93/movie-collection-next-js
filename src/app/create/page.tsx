'use client';
import axios from 'axios';
import { ChangeEvent, useState } from 'react';
import SpinnerOverlay from '../SpinnerOverlay';

export default function CreateMoviePage() {
  const [form, setForm] = useState({
    Title: "",
    YearOfRelease: "",
    Genre: "",
    PosterUrl: "", // Now holds image URL
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const handleChange = (e: ChangeEvent<HTMLInputElement>) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const response = await axios.post(
        '/api/create-movie',
        JSON.stringify(form),
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setLoading(false);
      setSuccess("Movie saved successfully");
      console.log("Lambda Response:", response.data);
    } catch (error) {
      setError("Error saving movie");
      console.error("Error saving movie:", error);
    }
  };
  
  if (error) return <p>{error}</p>;

  return (
    <>
    {loading && <SpinnerOverlay/>}
    <div className="space-y-4">
      <h1 className="text-xl font-bold">Create Movie</h1>
      <input name="Title" className="border p-2 rounded w-full" onChange={handleChange} placeholder="Title" />
      <input name="YearOfRelease" className="border p-2 rounded w-full" onChange={handleChange} placeholder="Year Of Release" />
      <input name="Genre" className="border p-2 rounded w-full" onChange={handleChange} placeholder="Genre" />
      <input name="PosterUrl" className="border p-2 rounded w-full" onChange={handleChange} placeholder="Poster URL" />
      {form.PosterUrl && <img src={form.PosterUrl} alt="poster" width={100} />}
      <button className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
         onClick={handleSubmit}>Create Movie</button>
      {success && <p>{success}</p>}
    </div>
    </>
  );
}