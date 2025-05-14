import { Joke } from "../types/joke";

export interface JokeProps {
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
}

export interface JokeListProps {
  jokes: Joke[];
  onDelete: (id: number) => void;
  onRefresh: (id: number) => void;
}
