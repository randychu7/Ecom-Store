import React, { useState, useEffect } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, useLocation } from 'react-router-dom';

function SearchComponent({onSearch}) {
  const[searchValue, setSearchValue] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const [previousUrl, setPreviousUrl] = useState('/');

  useEffect(() => {
    if (location.pathname !== '/search') {
      setPreviousUrl(location.pathname);
      console.log(previousUrl);
    }
  }, [location]);

  const handleSearchInputChanges = (e) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onSearch(newValue);

    // If the new value is not empty, push it to the URL. 
    // If it is empty, go back to the root URL.
    if(newValue.trim() !== '') {
      navigate(`/search?query=${newValue}`);
    } else {
      navigate(previousUrl);
    }
  }

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onSearch(searchValue);
    }, 500); // delay of 500ms

    return () => clearTimeout(timeoutId); // this will clear the timeout if the searchValue changes before the 500ms has passed
  }, [searchValue]);

  const [showSearch, setShowSearch] = useState(false);

  return (
    <div className='md:flex hidden' style={{ display: 'flex', alignItems: 'center', justifyContent: 'flex-end', position: 'relative' }}>
      
      <div 
        style={{ 
          display: 'flex', 
          alignItems: 'center', 
          padding: '5px',
          marginRight: '9px'
        }}
      >
        <div className='translate-x-[39px]'><SearchIcon
          sx={{ color: 'white', fontSize: '30px', marginRight: '5px', cursor: 'pointer' }}
          onClick={() => setShowSearch(!showSearch)}
        /></div>
        
        <div 
          style={{
            border: showSearch ? '1px solid white' : 'none',
            width: showSearch ? '300px' : '0',
            transition: 'width 0.3s ease, border 0.3s ease',
            overflow: 'hidden'
          }}
        >
          <InputBase
            placeholder="Titles, people, genres..."
            inputProps={{ 'aria-label': 'search' }}
            style={{ color: 'white', marginLeft: '33px',}}
            onChange={handleSearchInputChanges}
            value={searchValue}
          />
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
