import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';

interface Movie {
  id: string;
  title: string;
  Year: string;
  image: string;
}

function App() {
  const [search, setSearch] = useState('');
  const [movie, setMovie] = useState<Movie | null>(null);

  const showMovie = () => {
    axios
      .get(`https://imdb-api.com/en/API/Search/k_fq7cg5zc/${search}`)
      .then((response) => {
        console.log(response.data.results[0]);
        setMovie(response.data.results[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    showMovie();
  };

  return (
    <div className="App">
      <form className="flex justify-center" onSubmit={submit}>
        <input
          className="
        text-center
        border-2
        border-gray-300
        bg-white
        "
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="border p-1" onClick={showMovie}>
          Search
        </button>
      </form>
      {movie ? (
        <div key={movie.id}>
          <h1 className="text-center">{movie.title}</h1>
          <p>{movie.Year}</p>
          <img src={movie.image} alt="movie poster" />
        </div>
      ) : null}
      {movie === null ? <p>No movie found.</p> : null}
    </div>
  );
}

export default App;
