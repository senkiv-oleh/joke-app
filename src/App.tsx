import React from "react";
import { Container, Stack, Typography } from "@mui/material";
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
      <Container style={{ padding: "20px" }}>
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          style={{ margin: 30, fontWeight: "bold" }}
        >
          Joke LIST
        </Typography>
        <JokeList
          jokes={jokes}
          onDelete={handleDelete}
          onRefresh={handleRefresh}
        />{" "}
      </Container>

      <Controls onLoadMore={handleLoadMore} onAdd={handleAdd} />
    </Stack>
  );
};

export default App;
