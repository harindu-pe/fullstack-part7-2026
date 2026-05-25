import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAnecdotes, useField } from "../hooks";

const CreateNew = () => {
  const { addAnecdote } = useAnecdotes();

  const contentField = useField("text");
  const authorField = useField("text");
  const infoField = useField("text");
  const navigate = useNavigate();

  const { reset: contentReset, ...content } = contentField;
  const { reset: authorReset, ...author } = authorField;
  const { reset: infoReset, ...info } = infoField;

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addAnecdote({
      content: contentField.value,
      author: authorField.value,
      info: infoField.value,
      votes: 0,
    });
    navigate("/");
  };

  return (
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          content
          <input name="content" {...content} />
        </div>
        <div>
          author
          <input name="author" {...author} />
        </div>
        <div>
          url for more info
          <input name="info" {...info} />
        </div>
        <button>create</button>
        <button
          type="button"
          onClick={() => {
            contentField.reset();
            authorField.reset();
            infoField.reset();
          }}
        >
          reset
        </button>
      </form>
    </div>
  );
};

export default CreateNew;
