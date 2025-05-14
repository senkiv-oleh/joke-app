import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { Joke } from "../types/joke";

interface JokeListProps {
  joke: Joke;
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
}

const JokeCard: React.FC<JokeListProps> = ({ joke, onDelete, onRefresh }) => {
  const [isHovered, setIsHovered] = useState<boolean>(false);

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <Card
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        minHeight: 200,
        borderRadius: 2,
        boxShadow: 3,
        border: "1px solid #ccc"
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <CardContent
        sx={{
          flexGrow: 1,
          justifyContent: "space-between",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Stack>
          <Typography variant="body2" color="text.secondary" style={{fontWeight: "bold"}}>
            {joke.id}
          </Typography>
          <Typography
            variant="subtitle1"
            gutterBottom
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden"
            }}
          >
            {joke.setup}
          </Typography>

          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingTop: '10px'
            }}
          >
              {joke.punchline}
            </Typography>
        </Stack>

        {isHovered &&
          <Stack direction="row" spacing={1} sx={{ alignSelf: "flex-end" }}>
            <Button
              onClick={() => onDelete(joke.id)}
              variant="contained"
              color="error"
              size="small"
              sx={{ flexGrow: 1 }}
            >
              Delete
            </Button>
            <Button
              onClick={() => onRefresh(joke.id)}
              color="primary"
              sx={{ flexGrow: 1 }}
            >
              Refresh
            </Button>
          </Stack>}
      </CardContent>
    </Card>
  );
};

export default JokeCard;
