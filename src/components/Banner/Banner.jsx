import React from 'react';
import { TextField, Stack, Box, Typography, Link, InputAdornment } from '@mui/material';

import bannerImage from "../../assets/banner.jpg";
import SearchIcon from '@mui/icons-material/Search';

export default function App() {

  const popularSearches = [
    "Construction",
    "Education Services",
    "Health Services",
    "Security Services",
    "Printing"
  ];

  return (
    <header>
      <div
        id='intro-example'
        className='text-center bg-image mask'
        style={{
          background: `url(${bannerImage}) no-repeat center center / cover`, 
          maxHeight: '650px', 
          paddingBottom: '12%', 
          paddingTop: '12%',
          backgroundColor : 'rgba(0, 0, 0, 0.3)'
        }}
      >
        <div>
          <div className='d-flex justify-content-center align-items-center h-100'>
            <div className='text-white' align="left">
              <Typography variant ={'h3'} className='mb-2' sx={{fontWeight: 600, lineHeight: 1.2}}>Find government bids <br/> matching  your business.</Typography>
              
              <Box mt={2}>
                <Stack direction="row" spacing={1} alignItems="center">
                <TextField 
                    variant="outlined" 
                    placeholder="Search for bids..." 
                    sx={{ backgroundColor: 'white', borderRadius: 1, width: '700px', height: '46px' }}
                    InputProps={{
                      sx: { height: '46px' },
                      endAdornment: (
                        <InputAdornment position="end">
                          <SearchIcon />
                        </InputAdornment>
                      )
                    }}
                  />
                </Stack>
              </Box>
              <Box mt={1}>
                <Typography variant="subtitle1" className='text-white' sx={{ display: 'inline', marginRight: '7px' }}>
                  Popular searches:
                </Typography>
                {popularSearches.map((search, index) => (
                  <Link 
                    key={index} 
                    href="#" 
                    color="inherit" 
                    underline="always" 
                    sx={{ marginRight: '10px', '&:hover': { color: 'lightgray' } }}
                  >
                    {search}
                  </Link>
                ))}
              </Box>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
