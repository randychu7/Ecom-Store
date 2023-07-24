import MovieCard from '../movieCard';
import Details from '../movieDetails';
import { useState } from 'react';
import axios from 'axios';
import jwtDecode from 'jwt-decode';

export default function SearchModal({movies}) {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedMovieId, setSelectedMovieId] = useState(null);

    const modalHandler = (movieId) => {
        setSelectedMovieId(movieId);
        setModalOpen(true);
     }
    
    const closeModalHandler = () => {
        setModalOpen(false);
    }



    const decoded = jwtDecode(localStorage.getItem("token"));

    const handleSubmit = async (movie) => {

        let userId = decoded.id;
    
    
        try {
            const data = {
                userId: userId,
                id: movie.id,
                title: movie.title,
                description: movie.overview,
                poster_path: movie.poster_path,
                duration: movie.duration,
                genre_ids: movie.genre_ids,
                vote_average: movie.vote_average,
                youtubeTrailerKey: movie.youtubeTrailerKey,

              };
    
         console.log(data);
      
          const response = await axios.post("https://netflix-mern-a2a236f0a8be.herokuapp.com/api/favorites/add", data, {
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          });
       
        } catch (error) {
          console.log(error);
        }
      };
  
    // render the movies
    const movieCards = movies.map(movie => (
        <MovieCard 
            key={movie.id}
            movie={movie}
            onClick={handleSubmit}
            modalChange={() => modalHandler(movie.id)}
        />
    ));

    return(
        <div className="h-full w-full flex items-center justify-center fixed overflow-auto top-0 bg-black" style={{zIndex:99999}}>
            {modalOpen ? <Details closeModal={closeModalHandler} movieId={selectedMovieId} /> : ''} 
            
            <div className='grid grid-cols-2 md:grid-cols-4 pb-[4em] mt-[30em] md:mt-[] xl:mt-[35em] mr-[7em] lg:grid-cols-5 gap-x-11 gap-y-[120px]'>
                {movieCards}
            </div>

        </div>
    )
}
