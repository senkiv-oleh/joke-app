import React, { useState } from "react";
import { Card, CardContent, Typography, Stack, Button } from "@mui/material";
import { Joke } from "../types/joke";
import { JokeProps } from "../types/controls";

type JokeCardProps = JokeProps & { joke: Joke };

const JokeCard: React.FC<JokeCardProps> = ({ joke, onDelete, onRefresh }) => {
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
        minHeight: 250,
        height: "100%",
        backgroundColor: "#f9f9f9",
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
          flexDirection: "column",
          position: "relative"
        }}
      >
        <Stack>
          <Typography
            variant="body2"
            color="text.secondary"
            gutterBottom
            style={{ fontWeight: "bold" }}
          >
            {joke.id}
          </Typography>
          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,

              fontWeight: "bold"
            }}
          >
            Setup:
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {joke.setup}
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              mt: 1,

              fontWeight: "bold"
            }}
          >
            Punchline:
          </Typography>
          <Typography
            variant="body1"
            color="text.secondary"
            sx={{
              textOverflow: "ellipsis",
              overflow: "hidden",
              paddingTop: "10px"
            }}
          >
            {joke.punchline}
          </Typography>
        </Stack>

        {isHovered &&
          <Stack
            direction="row"
            spacing={1}
            sx={{
              position: "absolute",
              bottom: 0,
              right: 0,
              left: 0,
              backgroundColor: "#fff",
              alignSelf: "flex-end",
              padding: "10px"
            }}
          >
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
