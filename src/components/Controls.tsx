import React from "react";
import { Stack, Button } from "@mui/material";

interface ControlsProps {
  onLoadMore: () => void;
  onAdd: () => void;
}

const Controls: React.FC<ControlsProps> = ({ onLoadMore, onAdd }) => {
  return (
    <Stack
      direction="row"
      spacing={2}
      justifyContent="center"
      style={{ gap: "10px", paddingBottom: "20px" }}
    >
      <Button
        variant="contained"
        color="primary"
        onClick={onLoadMore}
        size="large"
        style={{ width: "200px" }}
      >
        Load More
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={onAdd}
        size="large"
        style={{ marginLeft: 0, width: "200px" }}
      >
        Add Joke
      </Button>
    </Stack>
  );
};

export default Controls;
