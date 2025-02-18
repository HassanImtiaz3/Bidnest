import React from 'react';
import { Stack } from '@mui/material';

export default function ResponsiveStack({ children }) {
  return (
    <Stack
    className='mb-5 mt-4'
      direction={{ xs: 'column', sm: 'row' }}
      spacing={10}
      justifyContent="center"
      alignItems="center"
    >
      {children} {/* Render the children here */}
    </Stack>
  );
}
