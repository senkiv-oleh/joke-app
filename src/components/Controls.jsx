// components/Controls.tsx
import React from "react";
import { Stack, Button } from "@mui/material";

const Controls = ({ onLoadMore, onAdd }) => {
  return (
    <Stack direction="row" spacing={2} justifyContent="center" mt={2}>
      <Button variant="contained" color="primary" onClick={onLoadMore}>
        Load More
      </Button>
      <Button variant="outlined" color="secondary" onClick={onAdd}>
        Add Joke
      </Button>
    </Stack>
  );
};

export default Controls;
