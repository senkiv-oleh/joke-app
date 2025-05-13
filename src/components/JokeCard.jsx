import React from "react";
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import RefreshIcon from "@mui/icons-material/Refresh";
// import { Joke } from "../types/joke";

const JokeCard = ({ joke, onDelete, onRefresh }) => {
  return (
    <Card sx={{ width: '100%', display: 'flex', flexDirection: 'column', minHeight: 200 }}>
      <CardContent sx={{ flexGrow: 1, justifyContent: 'space-between', display: 'flex', flexDirection: 'column' }}>
        <Stack>
        <Typography variant="body2" color="text.secondary">
          {joke.id}
        </Typography>
        <Typography variant="subtitle1" gutterBottom>
          {joke.setup}
        </Typography>
        </Stack>

        <Stack direction="row" spacing={1} sx={{alignSelf: 'flex-end',  }}>


          <Button
            onClick={() => onDelete(joke.id)}
            variant="contained"
            color="error" 
            size="small"
            sx={{ flexGrow: 1 }}
          >
            Delete
          </Button>
          {/* <Button
            onClick={() => onDelete(joke.id)}
            aria-label="delete"
            color="error"
          >
            Delete
          </Button> */}
          <Button
            onClick={() => onRefresh(joke.id)}
            // aria-label="refresh"
            color="primary"
            sx={{ flexGrow: 1 }}

          >
            Refresh          
            </Button>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default JokeCard;
