import React, { useState } from 'react';
import InputBase from '@mui/material/InputBase';
import SearchIcon from '@mui/icons-material/Search';

function SearchComponent() {
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
          />
        </div>
      </div>
    </div>
  );
}

export default SearchComponent;
