import React, { useEffect, useState } from 'react';
import { Box, Stack, Typography } from '@mui/material';

// Timer component
const Timer = () => {
  const [time, setTime] = useState({
    first: 0,
    second: 0,
    third: 0,
    fourth: 0,
  });

  const maxValues = {
    first: 100,
    second: 80,
    third: 60,
    fourth: 20,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((prevTime) => {
        const updatedTime = {};
        for (const key in maxValues) {
          if (prevTime[key] < maxValues[key]) {
            updatedTime[key] = prevTime[key] + 1;
          } else {
            updatedTime[key] = prevTime[key];
          }
        }

        return updatedTime;
      });
    }, 100);

    return () => clearInterval(interval); // Cleanup on component unmount
  }, []);

  return (
    <Box sx={{ py: 5, backgroundColor: "#673de6", mt: 4, mb: 4 }}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }} // Mobile is column, web is row
        spacing={2}
        justifyContent="center"
        alignItems="center"
        sx={{ flexWrap: 'wrap' }}
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {time.first}
          </Typography>
          <Typography variant="h5">Test</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {time.second}
          </Typography>
          <Typography variant="h5">Test</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {time.third}
          </Typography>
          <Typography variant="h5">Test</Typography>
        </Box>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 1 }}>
          <Typography variant="h2" fontWeight="bold">
            {time.fourth}
          </Typography>
          <Typography variant="h5">Test</Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default Timer;
