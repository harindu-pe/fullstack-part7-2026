import { useState, useEffect } from "react";
import anecdotesService from "../services/anecdotes";

export const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    type,
    value,
    onChange,
    reset,
  };
};

export const useAnecdotes = () => {
  const [anecdotes, setAnecdotes] = useState([]);

  const fetchAnecdotes = async () => {
    try {
      const data = await anecdotesService.getAll();
      setAnecdotes(data);
    } catch (error) {
      console.error("Error fetching anecdotes:", error);
    }
  };

  useEffect(() => {
    fetchAnecdotes();
  }, []);

  const addAnecdote = (anecdote) => {
    setAnecdotes(
      anecdotes.concat({ ...anecdote, id: Math.round(Math.random() * 10000) }),
    );
  };

  return {
    anecdotes,
    addAnecdote,
  };
};
