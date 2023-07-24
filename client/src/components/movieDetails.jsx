import {useEffect} from 'react'
import CloseIcon from '@mui/icons-material/Close';
import {useState} from 'react'
import axios from 'axios'
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import jwtDecode from 'jwt-decode';
import {useLocation} from 'react-router-dom'
import RemoveIcon from '@mui/icons-material/Remove';

export default function Details({closeModal, movieId , object, updateMovies}) {
    const [movieDetails, setMovieDetails] = useState(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [verify, setVerify] = useState(false);
    const location = useLocation();
    const isListPage = location.pathname === '/my-list';
    const isDashboard = location.pathname === '/browse';

     const convertDurationToHoursMinutes = (duration) => {  
    const hours = Math.floor(duration / 60);
    const minutes = duration % 60;
    
    return `${hours}h ${minutes}m`;
  };
  

    let token = localStorage.getItem("token");

    let decoded = jwtDecode(token);
    
    const verifyHandler = () => {
        setVerify(true);
    }


    async function fetchMovieDetails(movieId) {
        try {
            const [movieResponse, creditsResponse] = await Promise.all([
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}`, {
                    params: {
                        api_key: import.meta.env.VITE_APP_MOVIE_KEY,
                        language: 'en-US',
                    }
                }),
                axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits`, {
                    params: {
                        api_key: import.meta.env.VITE_APP_MOVIE_KEY,
                    }
                }),
            ]);
    
            const movieDetails = movieResponse.data;
            const cast = creditsResponse.data.cast;
    
            const duration = movieDetails.runtime;
            const convertedDuration = convertDurationToHoursMinutes(duration);
            console.log(movieDetails);
            return {
                ...movieDetails,
                duration: convertedDuration,
                cast: cast,
            };
        } catch (error) {
            console.error("Failed to fetch movie details: ", error);
            // Handle errors as needed, e.g., show an error message in the UI
        }
    }
    

    const addMovie = async () => {
        let userId = decoded.id;

        try {
            const data = {
                userId: userId,
                id: movieDetails.id,
                title: movieDetails.title,
                description: movieDetails.overview,
                poster_path: movieDetails.poster_path,
                genre_ids: movieDetails.genre,
                vote_average: movieDetails.vote_average,
              };

              console.log(data)
      
          const response = await axios.post("http://localhost:5080/api/favorites/add", data, {
            
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            }
          });
       
        } catch (error) {
          console.log(error);
        }
    
      }
    

    useEffect(() => {
        fetchMovieDetails(movieId).then(details => setMovieDetails(details));
        const timer = setTimeout(() => setIsAnimating(true), 100);
        return () => clearTimeout(timer);  // clear the timer when the component unmounts
    }, [movieId]);

    if (!movieDetails) {
        return null; // or some loading indicator
    }

    const removeMovie = async (movieId) => {
        try {
          await axios.delete(`http://localhost:5080/api/favorites/delete/${movieId}`, {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          });
          updateMovies((prevMovies) => prevMovies.filter((movie) => movie._id !== movieId));

        } catch (error) {
          console.log(error);
        }
      };

    

    return (
        <div className="relative rounded-lg">
            <div className="fixed top-0 h-full w-full bg-black opacity-80" onClick={closeModal} style={{zIndex:99998}}>
       
             </div>

             <div 
                    className={`fixed top-1/2 left-1/2 transform-gpu rounded-xl -translate-x-1/2 -translate-y-1/2  w-[50em] bg-[#101010]
                                ${isAnimating ? 'opacity-100 scale-100' : 'opacity-0 scale-90'} 
                                transition-all duration-500 ease-in-out`}
                                style={{ 
                                    zIndex:99998,
                                    
                                }}
                >
                    <div className='absolute top-5 right-5 w-[40px] h-[40px] rounded-full bg-black'style={{zIndex:99999}}>
                        <CloseIcon className='text-white w-[30px] h-[30px] m-2 cursor-pointer' onClick={closeModal} /></div>

                            <div className='w-full h-[30em] relative bg-gray-500 rounded-tl-xl rounded-tr-xl'   
                                style={{ 
                                    backgroundImage: `url(https://image.tmdb.org/t/p/w500${movieDetails.backdrop_path}), linear-gradient(180deg, rgba(16, 16, 16, 0) 80%, rgba(16, 16, 16) 99%)`, 
                                    backgroundSize: 'cover', 
                                    backgroundBlendMode: 'overlay',
                                }}>
                                            <div className='absolute bottom-0 p-10  text-white'>
                                                        <h2 className='text-5xl mb-7'>{movieDetails.title}</h2>
                                                
                                                        <div className='flex '>

                                                                <button className='bg-white rounded-md hover:bg-gray-300 text-black w-[120px] h-[35px] text-[15px] flex items-center justify-center'><PlayArrowIcon sx={{fontSize:"30px"}}/> <p className='mr-4'>Play</p></button>

                                                                <div  onClick={() => {
                                                                        if (isListPage) {
                                                                            removeMovie(object);
                                                                        } else {
                                                                            addMovie();
                                                                            verifyHandler();
                                                                        }
                                                                    }}   
                                                                    className='w-[40px] h-[40px] relative border-2 bg-gray-600 ml-2 text-gray-400 border-gray-400 hover:border-white hover:text-white flex items-center justify-center rounded-full'
                                                                >
                                                                    {isListPage ? <RemoveIcon/> : isDashboard && verify ? <CheckIcon/> : <AddIcon/>}
                                                                </div>


                                                        </div>
                                                 
                                             </div>                
                                    
                                
                                    </div>

                                <div className='flex pb-5'>
                                    <div className='w-[70%] flex flex-col justify-center text-white p-6'>
                                        <div className='w-[93%] flex'>
                                            <p className='text-green-500'>
                                             {(movieDetails.vote_average * 10).toString().split('.')[0]}% Match</p> 
                                            <p className='text-gray-400 ml-2'>{movieDetails.release_date.slice(0,4) }</p>
                                            <p className='text-gray-400 ml-2'>{movieDetails.duration}</p>
                                        
                                        </div>

                                             <p className='text-slate-200 text-[13px] mt-2'>{movieDetails.overview}</p>
                                          
                                             

                                    </div>

                                    <div className='w-[30%] flex text-white p-3'>  
                                                    <div>
                                                    <div className='text-[13px]'> <span className='text-gray-500'>Cast:</span> {movieDetails.cast.slice(0, 5).map(actor => actor.name).join(", ")}</div>
                                                    <div className='text-[13px] mt-3'> <span className='text-gray-500'>Genres:</span> {movieDetails.genres.map(genre => genre.name).join(", ")}</div>

                                                    </div>
                                               
                                    </div>

                                    </div>



                            </div>

   
   
    </div>
    )
}

