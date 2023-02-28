import React, { useState } from 'react';
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
  const [error, setError] = useState(false);
  const [wrongMovie, setWrongMovie] = useState(false);

  const showMovie = () => {
    if (search === '') {
      setError(true);
      setTimeout(() => {
        setError(false);
      }, 2000);
      return;
    }

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
      <h1 className="text-center text-3xl">Movie App</h1>
      <form className="flex justify-center my-2" onSubmit={submit}>
        <input
          className="
        text-center
        border-2
        border-gray-300
        bg-white
        outline-none
        "
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button className="border p-1 hover:bg-gray-200" onClick={showMovie}>
          Search
        </button>
      </form>
      {movie ? (
        <div key={movie.id}>
          <h1 className="text-center">{movie.title}</h1>
          <p>{movie.Year}</p>
          <img
            src={movie.image}
            alt="movie poster"
            className="sm:w-[400px] h-[400px] m-auto"
          />
        </div>
      ) : null}
      {error ? <p className="text-center">Please enter a movie name.</p> : null}
    </div>
  );
}

export default App;
