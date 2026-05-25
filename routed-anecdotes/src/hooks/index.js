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

  useEffect(() => {
    const fetchAnecdotes = async () => {
      try {
        const data = await anecdotesService.getAll();
        setAnecdotes(data);
      } catch (error) {
        console.error("Error fetching anecdotes:", error);
      }
    };
    fetchAnecdotes();
  }, []);

  const addAnecdote = async (anecdote) => {
    try {
      const created = await anecdotesService.createNew(anecdote);
      setAnecdotes((prev) => prev.concat(created));
    } catch (error) {
      console.error("Error creating anecdote:", error);
    }
  };

  const deleteAnecdote = async (id) => {
    try {
      await anecdotesService.deleteAnecdote(id);
      setAnecdotes((prev) => prev.filter((anecdote) => anecdote.id !== id));
    } catch (error) {
      console.error("Error deleting anecdote:", error);
    }
  };

  return {
    anecdotes,
    addAnecdote,
    deleteAnecdote,
  };
};
