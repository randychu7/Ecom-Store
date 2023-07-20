import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';



const MovieCard = ({ movie, svg }) => {
    const [isHovered, setIsHovered] = useState(false);
    const[genres, setGenres] = useState([]); // new genres state
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  

    const getGenres = async () => {
        try{
    
            const {data: {genres}} = await axios.get(`https://api.themoviedb.org/3/genre/movie/list`, {
                params: {
                    api_key: import.meta.env.VITE_APP_MOVIE_KEY
    
            }
        });
        setGenres(genres);
        }catch(error){
          console.log(error);
        }
    
    
      }

      useEffect(() => {
        getGenres();
      }
        , []);

    return (
      <div 
        className='relative' 
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      > 
        <div className="flex justify-center relative h-[15em]">
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            className='text-[200px] flex justify-center font-bold items-center absolute right-[90px]'
          />
  
          <div className='w-[200px] relative z-10'>
            {movie.poster_path ? 
              <img 
                className='h-[250px] ml-9' 
                src={`${IMAGE_PATH}${movie.poster_path}`} 
                alt=''
              /> 
              : null }
          </div>
        </div>
        
        <div className={`absolute left-[-100px] top-[-43px] rounded-lg shadow-dark  bg-[#101010]  transition-all h-[22em] w-[25em] duration-500 ease-in-out transform-gpu`} 
    style={{zIndex:9999, opacity: isHovered ? 1 : 0, transform: isHovered ? 'scale(1)' : 'scale(0)' }}
>
  <div className='flex h-full w-full flex-col'>
  <div className='h-[60%] w-full relative' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
backgroundSize: 'cover', }}>
    <div className='absolute w-full h-full top-0 bg-black opacity-40'></div>
   <h2 className='absolute left-0 bottom-0 p-4 font-bold w-[50%] text-white'>{movie.title}</h2> 
  </div>
  <div className='h-[40%] w-full'>
        <div className='h-full w-full'>

            <div className='w-full p-5 pb-4 pt-3 flex items-center'>
                <div className='w-[40px] h-[40px] bg-white hover:bg-gray-400 flex items-center justify-center rounded-full'>
                    <PlayArrowIcon sx={{fontSize:"30px"}}/>
                </div>
                <div className='w-[40px] h-[40px] border-2 ml-2 text-gray-500 border-gray-500 hover:border-white hover:text-white flex items-center justify-center rounded-full'>
                    <AddIcon/>
                </div>
                <div className='w-[40px] h-[40px] border-2 ml-2 text-gray-500 border-gray-500 hover:border-white hover:text-white flex items-center justify-center rounded-full'>
                    <ThumbUpOffAltIcon/>
                </div>
            </div>
           
           <div className='w-full flex flex-col p-5 pt-0 text-gray-200 '>
                
                    <div className='text-gray-200 flex'>
                            <p className='text-green-500 mr-2'>{movie.vote_average * 10}%</p>
                            <p>{movie.duration}</p>
                    </div>

                    <div className='mt-2'> 
                    <p>
                        {genres
                        .filter((genre) => movie.genre_ids.includes(genre.id))
                        .map((genre) => genre.name)
                        .join(' · ')}
                    </p>
                    </div>

               
                </div>


        </div>

  </div>
  </div>


</div>

      </div>
    );
  };

  export default MovieCard;