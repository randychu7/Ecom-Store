import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import AddIcon from '@mui/icons-material/Add';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import {useLocation} from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import CheckIcon from '@mui/icons-material/Check';
import Youtube from 'react-youtube';
import zIndex from '@mui/material/styles/zIndex';


const MovieCard = ({ movie, svg, onClick, modalChange, setSelectedMovieId, objectId }) => {
    const [isHovered, setIsHovered] = useState(false);
    const [verify, setVerify] = useState(false);
    const [hoveredMovie1, setHoveredMovie1] = useState(false);
    const [hoveredMovie, setHoveredMovie] = useState(false);
    const [hoveredMovie2, setHoveredMovie2] = useState(false);
    const [showPlayer, setShowPlayer] = useState(false);
    const [playerKey, setPlayerKey] = useState(0);  // new state for YouTube player key


    const verifyHandler = () => {
        setVerify(true);
    }

    const handleMouseHover = () => {
        setHoveredMovie(true);
    }

    const handleMouseLeave = () => {
        setHoveredMovie(false);
    }

    const handleMouseHover1 = () => {
        setHoveredMovie1(true);
    }
    const handleMouseLeave1 = () => {
        setHoveredMovie1(false);
    }
    const handleMouseHover2 = () => {
        setHoveredMovie2(true);
    }
    const handleMouseLeave2 = () => {
        setHoveredMovie2(false);
    }




    const[genres, setGenres] = useState([]); // new genres state
    const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";

    const location = useLocation();

    const isListPage = location.pathname === '/my-list';
    const isDashboard = location.pathname === '/browse';
    const isSearch = location.pathname === '/search';
  
    const opts = {
        height: '211',
        width: '401',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
        },
    };

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
            onMouseEnter={() => {
                setIsHovered(true);
                setShowPlayer(true); // Start the video when mouse enters
            }}
            onMouseLeave={() => {
                setIsHovered(false);
                setShowPlayer(false); // Stop the video when mouse leaves
            }}

      > 
      
        <div className="flex justify-center relative h-[15em]">
          <div
            dangerouslySetInnerHTML={{ __html: svg }}
            style={{ width: "100%", height: "100%", zIndex: 1 }}
            className='text-[190px] 2xl:text-[300px] flex justify-center font-bold items-center absolute right-[66px] 2xl:right-[150px]'
          />
  
          <div className='w-[200px] 2xl:w-[300px] relative z-10'>
          {movie.poster_path ? 
                <img 
                    className='2xl:h-[360px] h-[290px] md:w-full translate-y-[-21px] ml-10' 
                    src={`${IMAGE_PATH}${movie.poster_path}`} 
                    alt=''
                /> 
                : null }

          </div>
        </div>

        <div className={`absolute top-[-35px] left-[-70px] 2xl:left-[-40px] rounded-lg shadow-dark  bg-[#101010]  transition-all h-[22em] w-[25em] duration-500 ease-in-out transform-gpu`} 
                    style={{zIndex:99999, opacity: isHovered ? 1 : 0, transform: isHovered ? 'scale(1)' : 'scale(0)' }}
                >
                <div className='flex h-full w-full flex-col'>
                <div className='h-[60%] w-full relative' style={{backgroundImage:`url(https://image.tmdb.org/t/p/w500${movie.poster_path})`,
                backgroundSize: 'cover', }}>
                    <div className='absolute w-full h-full top-0 bg-black opacity-40'></div>

                    {showPlayer && <div className='absolute w-[50px]' style={{zIndex:99998}}> <Youtube videoId={movie.youtubeTrailerKey} opts={opts}/></div>}


                <h2 className='absolute left-0 bottom-0 p-4 font-bold w-[50%] text-white'>{movie.title}</h2> 
                </div>
                <div className='h-[40%] w-full'>
                        <div className='h-full w-full'>

            <div className='w-full pb-4 pt-3 flex items-center'>


                {hoveredMovie1 ? (
                    <div>
                        <div style={{zIndex:99999}} className="h-[50px] w-[150px] bg-white absolute bottom-[140px] left-[12px] flex justify-center rounded-xl">
                        
                        {isListPage ? <p className="mt-3 font-bold">Remove From List</p> : <p className="mt-3 font-bold">Add To List</p>}
                        
                        </div>
                    <div className="absolute bottom-[118px] left-[68px] text-white">
                        <ArrowDropDownIcon sx={{ fontSize: "40px" }} />
                    </div>
                    </div>
                ) : null}


                <div onClick={() => {onClick(movie); verifyHandler();}} onMouseEnter={handleMouseHover1}
                    onMouseLeave={handleMouseLeave1} 
                    className='w-[40px] h-[40px] relative border-2 ml-2 text-gray-500 border-gray-500 hover:border-white hover:text-white flex items-center justify-center rounded-full'
                >
                    {isListPage ? <RemoveIcon/> : (isDashboard || isSearch) && verify ? <CheckIcon/> : <AddIcon/>}
                    
                </div>

                            


                {hoveredMovie2 ? (
                    <div>
                    <div style={{zIndex:99999}} className="h-[50px] w-[150px] bg-white absolute bottom-[140px] left-[60px] flex justify-center rounded-xl">
                       
                       <p className="mt-3 font-bold">Details</p>
                       
                    </div>
                    <div className="absolute bottom-[118px] left-[117px] text-white">
                        <ArrowDropDownIcon sx={{ fontSize: "40px" }} />
                    </div>
                    </div>
                ) : null}

                <div onMouseEnter={handleMouseHover2}
                onMouseLeave={handleMouseLeave2} 
                onClick={() =>{ 
                    modalChange(); 
                    setSelectedMovieId(movie.id);
                    objectId(movie._id) 
                    
                    }} className='w-[40px] h-[40px] relative border-2 ml-2 text-gray-500 border-gray-500 hover:border-white hover:text-white flex items-center justify-center rounded-full'>
                    <KeyboardArrowDownIcon/>
                </div>

                
            </div>
           
           <div className='w-full flex flex-col p-5 pt-0 text-gray-200 '>
                
                    <div className='text-gray-200 flex'>
                    <p className='text-green-500 mr-2'>{(movie.vote_average * 10).toString().split('.')[0]}%</p>
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