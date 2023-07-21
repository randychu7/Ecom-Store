import Navbar from "../components/navbar/navlog";
import MovieCard from "../components/movieCard";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";

export default function List() {
    let token = localStorage.getItem("token");

    let decoded = jwtDecode(token);
    let userId = decoded.id;
    
  const [movies, setMovies] = useState([]);

  const fetchList = async () => {
   
    console.log(userId);

    try {
      const { data } = await axios.get(`http://localhost:5080/api/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setMovies(data);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
  }, [])

  const removeMovie = async (movieId) => {
    console.log(movieId);
    try {
      await axios.delete(`http://localhost:5080/api/favorites/delete/${movieId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
  
      // Remove the deleted movie from the state
      setMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));
    } catch (error) {
      console.log(error);
    }
  };
  

  const renderMovies = movies.map((movie) => {
    return (
        <MovieCard
        key={movie._id}
        movie={movie}
        onClick={() => removeMovie(movie._id)}
      />
      
    );
  });

  return (
    <div className="w-full h-screen flex flex-col justify-center">
    <Navbar />
    <div className="w-[95%] h-full">
      <div className="mt-[6em] ml-[100px]">
        <h1 className="text-2xl text-white">My List</h1>
      </div>
      <div className="w-full mt-[3em] h-[50%] flex justify-center">
        <div className=" w-[80%] md:w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-10  ">
          {renderMovies}
        </div>
      </div>
    </div>
  </div>
  
  )
}
