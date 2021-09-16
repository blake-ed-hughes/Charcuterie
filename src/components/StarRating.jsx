import React from 'react';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

function StarRating() {
  return (
    <Stack spacing={1}>
      <Rating name="quarter-rating" defaultValue={2.5} precision={0.25} />
    </Stack>
  )
}

export default StarRating;
//currently not being imported anywhere