import Navbar from "../components/navbar/navlog";
import MovieCard from "../components/movieCard";
import axios from "axios";
import jwtDecode from "jwt-decode";
import { useEffect, useState } from "react";
import Details from "../components/movieDetails";

export default function List() {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [movies, setMovies] = useState([]);
    const [object, setObject] = useState(null);

    const modalHandler = () => {
      setModalOpen(true);
   
   }
  
   const closeModalHandler = () => {
      setModalOpen(false);
   }

   const updateMoviesState = (newMovies) => {
    setMovies(newMovies);
  }

   
  useEffect(() => {
    console.log(selectedMovieId);
  }, [selectedMovieId]);
  
    let token = localStorage.getItem("token");

    let decoded = jwtDecode(token);
    let userId = decoded.id;
    


  const fetchList = async () => {

    try {
      const { data } = await axios.get(`http://localhost:5080/api/favorites/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        }
      });
      setMovies(data);
 
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchList();
    
  }, [])

  const removeMovie = async (movieId) => {

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
   console.log(object)   
    return (
      <MovieCard
      key={movie.id}
      movie={movie}
      onClick={() => removeMovie(movie._id)}
      setSelectedMovieId={setSelectedMovieId}
      modalChange={modalHandler}
      objectId={setObject}
    
    />
    );
});

  

  return (
    <div className="w-full h-screen flex flex-col justify-center">

    {modalOpen ? <Details closeModal={closeModalHandler} movieId={selectedMovieId} object={object} updateMovies={updateMoviesState}/> : ''}
        
    <div className="w-[95%] h-full">
      <div className="mt-[6em] ml-[100px]">
        <h1 className="text-2xl text-white">My List</h1>
      </div>
      <div className="w-full mt-[3em] h-[50%] flex justify-center">
        <div className=" w-[80%] md:w-[90%] grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-x-16 gap-y-[10px]  ">
          {renderMovies}
        </div>
      </div>
    </div>
  </div>
  
  )
}
