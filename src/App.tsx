import React from "react";
import { Container, Stack, Typography } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import JokeList from "./components/JokeList";
import Controls from "./components/Controls";
import { useJokes } from "./hooks/useJokes";

const App: React.FC = () => {
  const {
    jokes,
    handleLoadMore,
    handleAdd,
    handleDelete,
    handleRefresh
  } = useJokes();

  return (
    <Stack>
      <Container
        style={{
          padding: "20px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column"
        }}
      >
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ margin: 30, fontWeight: "bold" }}
        >
          Joke LIST
        </Typography>
        {jokes.length > 0
          ? <JokeList
              jokes={jokes}
              onDelete={handleDelete}
              onRefresh={handleRefresh}
            />
          : <CircularProgress color="secondary" />}
      </Container>

      <Controls onLoadMore={handleLoadMore} onAdd={handleAdd} />
    </Stack>
  );
};

export default App;
