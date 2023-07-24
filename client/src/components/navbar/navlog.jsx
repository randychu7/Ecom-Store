import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Searchbar from '../searchbar';
import {useState, useEffect} from 'react';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import {useLocation} from 'react-router-dom';

import SearchModal from './searchModal';
import axios from 'axios';

export default function navLogin (){
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [movies, setMovies] = useState([]);
    const location = useLocation();

    const isHomePage = location.pathname === '/' || location.pathname === '/login' || location.pathname === '/signup';

    const handleMouseEnter = () => {
      setShowDropdown(true);
    };


       
    const searchMovies = async (searchValue) => {
      try {
          const { data } = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
              params: {
                  api_key: import.meta.env.VITE_APP_MOVIE_KEY,
                  language: 'en-US',
                  query: searchValue,
                  page: 1,
                  include_adult: false,
              }
          });
          setMovies(data.results); // update the movies state
      } catch (error) {
          console.error('Failed to search movies:', error);
      }
  };

  const handleSearch = (searchValue) => {
    if (searchValue) {
        // fetch data from API and then show the modal
        searchMovies(searchValue);
        setShowSearchModal(true);
    } else {
        setShowSearchModal(false); // hide modal if searchValue is empty
    }
};

 

    const handleMouseLeave = () => {
      setShowDropdown(false);
    };
  
    const logout = async () => {
  
          localStorage.removeItem('token');
          window.location.href = "/login";

      };

   
    return (

      <>
      
      {isHomePage ? null :       <div>

<nav>
      {showSearchModal ? <SearchModal movies={movies}/> : ''}

        <div className="flex absolute top-0 left-0 right-0 flex-wrap items-center justify-between mx-auto mr-8 ml-6" style={{ zIndex: 99999 }}>
          <div className='flex items-center'>
            <a className="flex items-center hover:cursor-pointer">
              <img src="../netflix.png" className="h-[70px] md:h-[70px] ml-6" alt="Logo" />
            </a>
            <h2 className='text-gray-300 ml-2 text-[12px] md:hidden flex'>Browse</h2>
            <ul className='w-2/3 text-[12px] ml-4 hidden md:flex justify-center items-center gap-6 '>
              <li className='text-gray-300 hover:text-gray-500 hover:cursor-pointer'><a href='/browse'>Home</a></li>
        
              <li className='text-gray-400 hover:text-gray-500 hover:cursor-pointer'><a href='/my-list'>My List</a></li>
            </ul>
          </div>

          <div className="items-center flex md:w-auto md:order-1">
            <ul className="flex flex-col items-center font-medium md:p-0 mt-4 md:flex-row md:space-x-8 md:mt-0">
              <li className="flex items-center justify-center">
              <div className='hidden md:flex mr-6'>
                      <Searchbar onSearch={handleSearch}/>
                    </div>
                <a href="#" className="py-2 pl-3 text-2xl pr-4 md:p-0">
                  <div
                    className='flex justify-center items-center relative'
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                   
                    <NotificationsNoneIcon sx={{ color: "white", fontSize: "30px", marginRight: "9px" }} />
                    <div className='flex items-center'>
                      <img
                        className='profile-icon'
                        src="https://occ-0-1340-1339.1.nflxso.net/dnm/api/v6/K6hjPJd6cR6FpVELC5Pd6ovHRSk/AAAABdpkabKqQAxyWzo6QW_ZnPz1IZLqlmNfK-t4L1VIeV1DY00JhLo_LMVFp936keDxj-V5UELAVJrU--iUUY2MaDxQSSO-0qw.png?r=e6e"
                        alt=""
                      />
                      <ArrowDropDownIcon
                        sx={{
                          height: "70px",
                          color: "white",
                          transform: showDropdown ? 'rotate(180deg)' : 'rotate(0deg)',
                          transition: 'transform 0.3s',
                          cursor: 'pointer'
                        }}
                      />
                    </div>

                    {showDropdown && (
                      <div
                        className='absolute w-[200px] top-[100%] right-0 bg-black border border-[#303030] rounded overflow-hidden'
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                      >
                        <div className='relative'>
                          <div className='absolute right-[14px] top-[-24px]'>
                            <ArrowDropUpIcon sx={{ color: "white", fontSize: "40px" }} />
                          </div>
                          <div>
                            <div className='text-white text-[15px] flex hover:cursor-pointer hover:underline items-center p-2 h-[50px]'>
                              <PermIdentityIcon />
                              <p className='ml-3'>Account</p>
                            </div>
                            <div className='text-white text-[15px] flex hover:cursor-pointer hover:underline items-center p-2 h-[50px]'>
                              <HelpOutlineIcon />
                              <p className='ml-3'>Help Center</p>
                            </div>
                            <div className='text-white text-[15px] flex hover:cursor-pointer hover:underline justify-center items-center border border-[#303030] h-[50px]' onClick={logout} style={{ cursor: 'pointer' }}>
                              Sign out of Netflix
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      </div>
}

      </>


    )

}